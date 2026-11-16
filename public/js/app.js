// Small, motion-free enhancements: visit counting, the contribution graph
// scrolled to recent weeks, the current nav section, and a live local clock.
(() => {
  // Count this page view for the private /admin dashboard. No cookies; the
  // server records the referrer, approximate location and device.
  if (!location.pathname.startsWith("/admin") && !navigator.webdriver) {
    try {
      const params = new URLSearchParams(location.search);
      const body = JSON.stringify({
        path: location.pathname,
        referrer: document.referrer,
        tag: params.get("utm_source") || params.get("ref") || "",
      });
      if (!navigator.sendBeacon || !navigator.sendBeacon("/api/visit", new Blob([body], { type: "application/json" }))) {
        fetch("/api/visit", { method: "POST", body, keepalive: true, headers: { "content-type": "application/json" } });
      }
    } catch {
      // Counting a visit must never break the page.
    }
  }

  // Show the most recent weeks of the contribution graph on narrow screens.
  const scrollToEnd = () =>
    document.querySelectorAll("[data-scroll-end]").forEach((el) => {
      el.scrollLeft = el.scrollWidth;
    });
  scrollToEnd();
  window.addEventListener("load", scrollToEnd, { once: true });

  // Nav: the current section highlighted.
  const links = new Map(
    Array.from(document.querySelectorAll(".nav-links a")).map((a) => [a.getAttribute("href").slice(1), a])
  );

  if ("IntersectionObserver" in window && links.size) {
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          links.forEach((a, id) => a.classList.toggle("active", id === entry.target.id));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  // Local time keeps ticking.
  document.querySelectorAll("[data-clock]").forEach((el) => {
    const format = new Intl.DateTimeFormat("en-US", {
      timeZone: el.dataset.clock,
      hour: "numeric",
      minute: "2-digit",
    });
    const tick = () => (el.textContent = format.format(new Date()));
    tick();
    setInterval(tick, 15000);
  });
})();
