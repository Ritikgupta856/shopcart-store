const StaticPageLayout = ({ title, children }) => {
  return (
    <main className="mt-10 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-8 md:py-12 min-h-[50vh] max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-6">{title}</h1>
      <div className="prose prose-sm sm:prose-base max-w-none text-text-secondary space-y-4">
        {children}
      </div>
    </main>
  );
};

export default StaticPageLayout;
