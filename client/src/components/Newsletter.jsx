import { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = email.trim();

    if (!value) {
      setError("Please enter your email address.");
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setError("That doesn't look like a valid email address.");
      return;
    }

    setError("");
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="w-full bg-surface-beige px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-card">
          <Mail size={19} className="text-primary" />
        </div>

        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Get exclusive offers &amp; updates
        </h2>
        <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-text-secondary">
          Be the first to know about new arrivals, seasonal deals and members-only pricing.
        </p>

        {subscribed ? (
          <div
            role="status"
            className="mt-7 inline-flex items-center gap-2.5 rounded-lg bg-success-bg px-5 py-3.5"
          >
            <CheckCircle2 size={18} className="shrink-0 text-success" />
            <span className="text-sm font-medium text-success">
              You&apos;re on the list — watch your inbox.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-7">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                aria-invalid={!!error}
                aria-describedby={error ? "newsletter-error" : undefined}
                className={`h-11 flex-1 bg-card ${error ? "border-danger focus-visible:ring-danger" : ""}`}
              />
              <Button type="submit" size="lg" className="shrink-0">
                Subscribe
              </Button>
            </div>

            {error && (
              <p id="newsletter-error" role="alert" className="mt-2 text-left text-xs text-danger">
                {error}
              </p>
            )}
          </form>
        )}

        <p className="mt-4 text-xs text-text-muted-2">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
