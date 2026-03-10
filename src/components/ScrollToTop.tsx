"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

function hasHash() {
  return Boolean(window.location.hash);
}

function forceTop() {
  // Multiple passes ensure late layout shifts do not keep the user mid-page.
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  });
  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, 50);
}

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const handlePageShow = () => {
      if (!hasHash()) {
        forceTop();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  useLayoutEffect(() => {
    // Do not scroll to top if the URL has a hash. This allows for in-page
    // navigation to anchor links on other pages.
    if (hasHash()) {
      return;
    }

    forceTop();
  }, [pathname]);

  return null;
}
