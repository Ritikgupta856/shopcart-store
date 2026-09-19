import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useAuthStore from "@/store/useAuthStore";
import useProductReviews from "@/hooks/useProductReviews";

const StarRow = ({ rating, size = 16 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={size}
        className={i <= Math.round(rating) ? "fill-warning text-warning" : "text-border"}
      />
    ))}
  </div>
);

const ReviewsSection = ({ productId }) => {
  const { user, token } = useAuthStore();
  const navigate = useNavigate();
  const { reviews, avgRating, count, breakdown, loading, refetch } = useProductReviews(productId);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/reviews`,
        { productId, rating, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Review submitted — it'll appear once approved");
      setShowForm(false);
      setRating(0);
      setText("");
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <div className="mt-16">
      <h2 className="text-xl font-semibold tracking-tight text-foreground mb-4">Customer Reviews</h2>

      <div className="flex flex-col sm:flex-row gap-8 mb-6">
        <div className="flex flex-col items-center justify-center bg-card border border-border rounded-xl p-6 min-w-[160px]">
          <span className="text-3xl font-semibold text-foreground">{avgRating || "0"}</span>
          <StarRow rating={avgRating} />
          <span className="text-xs text-text-muted-2 mt-1">Based on {count} review{count !== 1 ? "s" : ""}</span>
        </div>

        {count > 0 && (
          <div className="flex-1 flex flex-col justify-center gap-1.5 min-w-[200px]">
            {breakdown.map((row) => (
              <div key={row.star} className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="w-8">{row.star} ★</span>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-warning" style={{ width: `${row.percent}%` }} />
                </div>
                <span className="w-8 text-right">{row.percent}%</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-start">
          <Button
            variant="outline"
            onClick={() => {
              if (!user) {
                toast("Please log in to write a review");
                navigate("/login");
                return;
              }
              setShowForm((s) => !s);
            }}
          >
            Write a Review
          </Button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-border rounded-xl p-4 mb-6 flex flex-col gap-3 max-w-lg">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <button type="button" key={i} onClick={() => setRating(i)}>
                <Star size={22} className={i <= rating ? "fill-warning text-warning" : "text-border"} />
              </button>
            ))}
          </div>
          <Textarea
            placeholder="Share your thoughts about this product..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button type="submit" disabled={submitting} className="w-fit">
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      )}

      {count === 0 ? (
        <p className="text-sm text-text-muted-2">No reviews yet. Be the first to review this product.</p>
      ) : (
        <div className="flex flex-col divide-y divide-border">
          {reviews.map((review) => (
            <div key={review._id} className="py-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm text-foreground">{review.user?.fullname || "Anonymous"}</span>
                <span className="text-xs text-text-muted-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <StarRow rating={review.rating} size={14} />
              {review.text && <p className="text-sm text-text-secondary mt-2">{review.text}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
