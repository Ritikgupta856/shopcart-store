import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Newsletter = () => {
  return (
    <div className="flex items-center py-14 px-4 w-full bg-surface-beige">
      <div className="flex flex-col items-center mx-auto my-0 gap-3 max-w-lg text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Stay Updated
        </span>
        <span className="text-2xl sm:text-3xl font-semibold text-foreground">
          Get exclusive offers &amp; updates
        </span>
        <p className="text-sm text-text-secondary">
          Subscribe to our newsletter and be the first to know about new arrivals, deals and more.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 w-full sm:w-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-72 bg-card"
          />
          <Button className="w-full sm:w-auto">Subscribe</Button>
        </div>

        <span className="text-text-muted-2 text-xs mt-1">
          We respect your privacy. No spam, ever.
        </span>
      </div>
    </div>
  );
};

export default Newsletter;
