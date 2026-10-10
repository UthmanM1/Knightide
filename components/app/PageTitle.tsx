export default function PageTitle({ title, description }: { title: string; description?: string }) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl sm:text-4xl">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-sm text-mist-400">{description}</p>}
    </header>
  );
}
