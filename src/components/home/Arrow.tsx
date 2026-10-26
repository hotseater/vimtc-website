/** The one arrow icon the redesign uses: 2px stroke, round caps. */
export default function Arrow({ size = 18, className = "arr" }: { size?: number; className?: string }) {
  return (
    <svg className={className} aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
