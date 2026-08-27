export function PageHeader({ title, description, actions }) {
  return (
    <div className="flex flex-col gap-3 border-b bg-background px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  )
}
