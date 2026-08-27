export function WeeklyDealsChart({ data, maxValue }) {
  return (
    <div className="flex h-40 items-end gap-3">
      {data.map((d, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-32 w-full items-end">
            <div
              className="w-full rounded-t-md bg-primary/80 transition-all"
              style={{ height: `${(d.count / maxValue) * 100}%`, minHeight: d.count ? 6 : 2 }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  )
}
