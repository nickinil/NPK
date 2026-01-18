(function () {
  const root = document.documentElement;
  const key = "npk_theme";

  // Theme init
  const saved = localStorage.getItem(key);
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const cur = root.getAttribute("data-theme") || "dark";
      const next = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem(key, next);
    });
  }

  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Reveal on scroll
  const els = Array.from(document.querySelectorAll(".reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-in");
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));

  // Group search (for schedule pages)
  const search = document.getElementById("groupSearch");
  const groupsWrap = document.getElementById("groups");
  if (search && groupsWrap) {
    const items = Array.from(groupsWrap.querySelectorAll("[data-group]"));
    const apply = () => {
      const q = search.value.trim().toLowerCase();
      items.forEach(a => {
        const g = (a.getAttribute("data-group") || "").toLowerCase();
        const ok = !q || g.includes(q);
        a.classList.toggle("is-hidden", !ok);
      });
    };
    search.addEventListener("input", apply);
    apply();
  }
})();
