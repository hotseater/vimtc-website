import { CONTACT } from "@/lib/site";

/**
 * The WordPress Donate page embedded a Proweaver/Stripe payment form that was still in sandbox mode.
 * Until the client decides on a payment setup, the page links to the PayPal button already used
 * for "Tuition Payment" in the menus.
 */
export default function DonateBlock() {
  return (
    <div className="donate_btn">
      <a className="btn-style" href={CONTACT.paypalDonate} target="_blank" rel="noopener noreferrer">
        Donate via PayPal
      </a>
    </div>
  );
}
