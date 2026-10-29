export function FormField({ id, label, error, required = false, className = '', children }) {
  return (
    <div className={`form-field ${error ? 'form-field--error' : ''} ${className}`.trim()}>
      <label htmlFor={id}>
        {label}
        {required ? ' *' : ''}
      </label>
      {children}
      {error && (
        <span className="form-error" id={`${id}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export function Input({ id, error, ...props }) {
  return (
    <input
      id={id}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
  );
}

export function Textarea({ id, error, ...props }) {
  return (
    <textarea
      id={id}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
  );
}

export function Select({ id, error, children, ...props }) {
  return (
    <select
      id={id}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    >
      {children}
    </select>
  );
}
