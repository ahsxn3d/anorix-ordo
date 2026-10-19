export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M20 5a15 15 0 1 0 15 15" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <rect x="28" y="5" width="7" height="7" rx="1.5" fill="var(--color-mint)" />
    </svg>
  );
}
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Mark className="h-6 w-6" />
      <span className="display text-[22px] leading-none tracking-[-0.02em]" style={{ fontStretch: "88%" }}>Ordo</span>
    </span>
  );
}
