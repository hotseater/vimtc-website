/** Hidden field bots fill in; the API route silently drops submissions where it is set. */
export default function Honeypot() {
  return (
    <div className="hp" aria-hidden="true">
      <label>
        Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
