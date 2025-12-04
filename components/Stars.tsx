export function Stars({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <div className="flex gap-1" title={value.toFixed(1)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "text-yellow-400" : "text-neutral-600"}>★</span>
      ))}
    </div>
  );
}
