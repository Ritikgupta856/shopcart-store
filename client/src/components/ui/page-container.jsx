import { cn } from "@/lib/utils";

export const PageContainer = ({ className, children }) => (
  <main className={cn("px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 pt-6 pb-16", className)}>
    {children}
  </main>
);

export const PageHeader = ({ title, description, actions, className }) => (
  <div className={cn("flex flex-wrap items-end justify-between gap-4 mb-6", className)}>
    <div className="min-w-0">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
      {description && <p className="text-sm text-text-secondary mt-1.5">{description}</p>}
    </div>
    {actions}
  </div>
);

export const SectionCard = ({ className, children }) => (
  <div className={cn("rounded-xl border border-border bg-card", className)}>{children}</div>
);

export const SectionCardHeader = ({ step, title, description, action }) => (
  <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-border">
    <div className="flex items-start gap-3 min-w-0">
      {step && (
        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
          {step}
        </span>
      )}
      <div className="min-w-0">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {description && <p className="text-xs text-text-muted-2 mt-0.5">{description}</p>}
      </div>
    </div>
    {action}
  </div>
);
