import { Order } from "../models/order.model.js";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY, { apiVersion: "2020-08-27" });

export const createCheckoutSession = async (req, res) => {
  const { products, user, totalAmount } = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: { name: product.name },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));
  const newOrder = new Order({ products, user, totalAmount });
  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
    return;
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: { allowed_countries: ["IN"] },
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}`,
      metadata: { orderId: newOrder._id.toString() },
    });
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json("Internal server error");
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

        await Order.findByIdAndUpdate(
          orderId,
          { status: "paid" },
          { new: true }
        );
    
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

