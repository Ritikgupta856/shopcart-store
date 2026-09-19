import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { Stripe } from "stripe";
import { calculateCart } from "../utills/cartCalculator.js";

const stripe = new Stripe(process.env.STRIPE_KEY, { apiVersion: "2020-08-27" });

export const createCheckoutSession = async (req, res) => {
  try {
    const { items, user, couponCode } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Recompute everything server-side — never trust client-sent prices/totals.
    const { items: resolvedItems, subtotal, discount, shipping, total, coupon } =
      await calculateCart(items, couponCode);

    const unavailable = resolvedItems.filter((i) => i.unavailable);
    if (unavailable.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Some items in your cart are no longer available",
        unavailable,
      });
    }

    const lineItems = resolvedItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: "inr",
          product_data: { name: "Shipping" },
          unit_amount: Math.round(shipping * 100),
        },
        quantity: 1,
      });
    }

    const discounts = [];
    if (discount > 0) {
      const stripeCoupon = await stripe.coupons.create({
        amount_off: Math.round(discount * 100),
        currency: "inr",
        duration: "once",
        name: coupon?.code || "Discount",
      });
      discounts.push({ coupon: stripeCoupon.id });
    }

    const newOrder = new Order({
      products: resolvedItems.map((item) => ({
        product: item.productId,
        variantId: item.variantId,
        name: item.name,
        image: item.image,
        price: item.price,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      })),
      user,
      subtotal,
      discount,
      shipping,
      couponCode: coupon?.valid ? coupon.code : null,
      totalAmount: total,
    });
    await newOrder.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: { allowed_countries: ["IN"] },
      line_items: lineItems,
      discounts: discounts.length > 0 ? discounts : undefined,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: { orderId: newOrder._id.toString() },
    });
    res.status(200).json({ success: true, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`Error verifying webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const orderId = session.metadata.orderId;

        const order = await Order.findByIdAndUpdate(
          orderId,
          { status: "paid" },
          { new: true }
        );

        if (order) {
          for (const item of order.products) {
            try {
              if (item.variantId) {
                await Product.findOneAndUpdate(
                  { _id: item.product },
                  { $inc: { "variants.$[v].stock": -item.quantity } },
                  { arrayFilters: [{ "v._id": item.variantId }] }
                );
              } else {
                await Product.findOneAndUpdate(
                  { _id: item.product },
                  { $inc: { stock: -item.quantity } }
                );
              }
            } catch (stockError) {
              console.error("Error decrementing stock for", item.product, stockError);
            }
          }
        }

        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object;
        const orderId = session.metadata.orderId;

        await Order.findByIdAndUpdate(
          orderId,
          { status: "cancelled" },
          { new: true }
        );
   
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata?.orderId;

        if (orderId) {
          await Order.findByIdAndUpdate(
            orderId,
            { status: "failed" },
            { new: true }
          );
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.send();
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).send("Error updating order");
  }
};

