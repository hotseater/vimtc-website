import Link from "next/link";

/** Privacy checkbox every Proweaver form carried. */
export default function Consent({ light = false }: { light?: boolean }) {
  return (
    <label className="consent" style={light ? { color: "#fff" } : undefined}>
      <input type="checkbox" name="Privacy_Notice" value="Agreed" required />
      <span>
        I have read and agree to the{" "}
        <Link href="/privacy-notice" style={light ? { color: "#fceea9" } : undefined}>
          Privacy Notice
        </Link>
        . <span className="req">*</span>
      </span>
    </label>
  );
}
