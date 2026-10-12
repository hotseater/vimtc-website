import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  async redirects() {
    return [
      // WordPress front-page slug
      { source: "/home", destination: "/", permanent: true },
      // empty duplicate of the Student Application page (linked from the Programs page)
      { source: "/ministry-training-college-student-application", destination: "/student-application", permanent: true },
      // dead URL that shows up in the old traffic logs
      { source: "/privacy-policy", destination: "/privacy-notice", permanent: true },
      // the enrollment form used to be a standalone PHP page inside the theme folder
      { source: "/wp-content/themes/victoryinternationalon794/forms/custom/applyNowForm", destination: "/apply", permanent: true },
      { source: "/wp-content/themes/victoryinternationalon794/forms/custom/applyNowForm/", destination: "/apply", permanent: true },
      // old media URLs keep resolving (Google Images, external links)
      { source: "/wp-content/uploads/:path*", destination: "/images/uploads/:path*", permanent: true },
      { source: "/wp-content/themes/victoryinternationalon794/images/:path*", destination: "/images/theme/:path*", permanent: true },
      // WordPress noise
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/:path*/embed", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
