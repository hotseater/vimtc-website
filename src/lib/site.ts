export const SITE_NAME = "Victory International Ministry Training College";
export const SITE_SHORT = "VIMTC";
/** Yoast's %%sitedesc%% was empty, but every indexed page title carried this suffix via the home title; keep it. */
export const SITE_TAGLINE = "Ministry Training College in Phoenix Arizona";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.vimtc.org";

export const CONTACT = {
  phone: "1-844-443-7500",
  phoneHref: "tel:18444437500",
  email: "dean@vimtc.org",
  addressLine1: "7702 N 35th Avenue, Suite 2",
  addressLine2: "Phoenix, AZ 85340",
  facebook: "https://www.facebook.com/profile.php?id=61558005628887&mibextid=ZbWKwL",
  x: "https://x.com/VimtcPhx?t=Do5of9zCER-JU84ymBk3mg&s=09",
  paypalDonate: "https://www.paypal.com/donate/?hosted_button_id=HET2MBJCUKCTA",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.1270190219802!2d-112.13470699999999!3d33.550076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b6c84d0fb89fb%3A0x461059ed019ef47d!2s7702%20N%2035th%20Ave%20%232%2C%20Phoenix%2C%20AZ%2085051%2C%20USA!5e0!3m2!1sen!2sph!4v1707402365646!5m2!1sen!2sph",
} as const;

/** The live site's Yoast meta description (same on every page). Used for the home page and as the default. */
export const SITE_DESCRIPTION =
  "Victory International Ministry Training College is a dedicated ministry training college located in Phoenix Arizona. Visit our website today to learn about us!";

export function pageTitle(title: string) {
  return `${title} | ${SITE_TAGLINE}`;
}
