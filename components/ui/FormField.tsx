export default function FormField({
  id,
  label,
  error,
  children,
  hint,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-mist-100">
        {label}
      </label>
      {hint && (
        <span id={`${id}-hint`} className="text-xs text-mist-500">
          {hint}
        </span>
      )}
      {children}
      {error && (
        <span id={`${id}-error`} role="alert" className="text-xs text-danger-text">
          {error}
        </span>
      )}
    </div>
  );
}
