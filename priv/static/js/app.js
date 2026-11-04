// Progressive enhancement only: without this file every section is visible
// and every number is final. With it, things animate in as they scroll into view.
(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) root.classList.add("anim");

  // Children of [data-stagger] reveal one after another.
  document.querySelectorAll("[data-stagger]").forEach((group) => {
    Array.from(group.children).forEach((child, i) => child.style.setProperty("--i", i));
  });

  // Numbers count up from zero, keeping their format ("1,552", "80.9M", "600K").
  const countUp = (el) => {
    const match = el.textContent.trim().match(/^([\d,]*\.?\d+)(.*)$/);
    if (!match) return;
    const [, raw, suffix] = match;
    const target = parseFloat(raw.replace(/,/g, ""));
    const decimals = (raw.split(".")[1] || "").length;
    const format = (n) =>
      n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = format(target * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    el.textContent = format(0);
    requestAnimationFrame(tick);
  };

  const reveal = (el) => {
    el.classList.add("in");
    if (!reduceMotion) el.querySelectorAll("[data-count]").forEach(countUp);
  };

  const targets = document.querySelectorAll("[data-reveal], [data-stagger]");

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((el) => observer.observe(el));
  }

  // Show the most recent weeks of the contribution graph on narrow screens.
  const scrollToEnd = () =>
    document.querySelectorAll("[data-scroll-end]").forEach((el) => {
      el.scrollLeft = el.scrollWidth;
    });
  scrollToEnd();
  window.addEventListener("load", scrollToEnd, { once: true });

  // Nav: a shadow once the page scrolls, and the current section highlighted.
  const nav = document.querySelector(".nav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

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
  // Reading progress bar along the nav.
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    root.style.setProperty("--progress", max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  // Local time keeps ticking (not motion, so it runs either way).
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

  if (reduceMotion) return;

  // Cursor spotlight: cards light up softly where the pointer is.
  document.addEventListener(
    "pointermove",
    (event) => {
      const card = event.target.closest && event.target.closest(".spot");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    },
    { passive: true }
  );

  // Hero glows drift a little toward the pointer.
  const hero = document.querySelector("[data-parallax]");
  if (hero && window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener(
      "pointermove",
      (event) => {
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty("--px", (((event.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3));
        hero.style.setProperty("--py", (((event.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3));
      },
      { passive: true }
    );
  }

  // The highlighted phrase in the hero cycles through a few variants.
  document.querySelectorAll("[data-rotate]").forEach((el) => {
    const words = el.dataset.rotate.split("|");
    let i = 0;
    setInterval(() => {
      if (document.hidden) return;
      el.classList.add("out");
      setTimeout(() => {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        el.classList.remove("out");
        el.classList.remove("enter");
        void el.offsetWidth;
        el.classList.add("enter");
      }, 350);
    }, 3200);
  });
})();
