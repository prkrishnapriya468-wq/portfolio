/* ==========================================================================
   Krishnapriya P.R. | Cybersecurity Portfolio
   Vanilla JavaScript, no dependencies.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     EDIT HERE: project data.
     - status: "planned" | "in-progress" | "complete"
       (only set "complete" when the project really is complete)
     - category: "blue-team" | "forensics"  (must match the filter buttons)
     - repoUrl: leave as "" until a real repository exists.
       Use a full URL, e.g. "https://github.com/prkrishnapriya468-wq/repo-name"
     - image: leave as "" or set to a local path like "./assets/images/shot.png"
     - imageAlt: describe the screenshot for screen reader users
     ------------------------------------------------------------------------ */
  var PROJECTS = [
    {
      title: "Failed Login Detection System",
      category: "blue-team",
      categoryLabel: "Blue Team",
      status: "in-progress",
      description: "A beginner-friendly security monitoring project focused on detecting repeated failed login attempts from log files.",
      areas: ["Log analysis", "Authentication monitoring", "Suspicious activity detection", "Basic SOC workflows"],
      repoUrl: "",
      image: "",
      imageAlt: ""
    },
    {
      title: "Digital Forensics CTF",
      category: "forensics",
      categoryLabel: "Digital Forensics",
      status: "in-progress",
      description: "A planned digital forensics challenge project for practising investigation methods on practice scenarios.",
      areas: ["Digital evidence analysis", "Investigation methodology", "Artifact examination", "Forensic problem-solving"],
      repoUrl: "",
      image: "",
      imageAlt: ""
    }
  ];

  var STATUS_LABELS = {
    "planned": "Planned",
    "in-progress": "Planned / In Progress",
    "complete": "Complete"
  };

  var CATEGORY_LABELS = {
    "all": "All",
    "blue-team": "Blue Team",
    "forensics": "Digital Forensics"
  };

  /* ---------- Helpers ---------- */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text; // textContent avoids HTML injection
    return node;
  }

  // Only accept absolute https links, so a typo can never create a broken or unsafe link.
  function isValidUrl(value) {
    if (typeof value !== "string" || value.trim() === "") return false;
    try {
      var u = new URL(value);
      return u.protocol === "https:" && u.hostname.indexOf(".") > 0;
    } catch (e) {
      return false;
    }
  }

  /* ---------- Theme ---------- */
  function initTheme() {
    var root = document.documentElement;
    var btn = document.getElementById("theme-toggle");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!btn) return;

    function apply(theme) {
      root.setAttribute("data-theme", theme);
      var isLight = theme === "light";
      btn.setAttribute("aria-pressed", String(isLight));
      btn.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
      if (meta) meta.setAttribute("content", isLight ? "#F6F8F7" : "#0B0F0E");
    }

    apply(root.getAttribute("data-theme") === "light" ? "light" : "dark");

    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      apply(next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-links");
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    toggle.addEventListener("click", function () {
      setOpen(!menu.classList.contains("is-open"));
    });

    // Close after choosing a link
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    // Close on Escape and return focus to the menu button
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Close if the viewport grows to the desktop layout
    var mq = window.matchMedia("(min-width: 64rem)");
    var onChange = function () { if (mq.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
  }

  /* ---------- Active nav link while scrolling ---------- */
  function initActiveLink() {
    var links = document.querySelectorAll(".nav-links a");
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute("aria-current"); });
        var link = map[entry.target.id];
        if (link) link.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    Object.keys(map).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Projects: render + filter ---------- */
  function buildCard(project) {
    var card = el("li", "project-card");
    card.setAttribute("data-category", project.category);

    var top = el("div", "card-top");
    top.appendChild(el("span", "tag tag-category", project.categoryLabel));
    var status = el("span", "status status-" + project.status);
    status.appendChild(el("span", "status-dot"));
    status.lastChild.setAttribute("aria-hidden", "true");
    status.appendChild(document.createTextNode(STATUS_LABELS[project.status] || STATUS_LABELS["planned"]));
    top.appendChild(status);
    card.appendChild(top);

    if (project.image) {
      var img = el("img", "project-thumb");
      img.src = project.image;
      img.alt = project.imageAlt || "";
      img.loading = "lazy";
      card.appendChild(img);
    }

    card.appendChild(el("h3", "", project.title));
    card.appendChild(el("p", "", project.description));

    var chips = el("ul", "chip-list");
    chips.setAttribute("aria-label", "Learning areas");
    project.areas.forEach(function (area) { chips.appendChild(el("li", "", area)); });
    card.appendChild(chips);

    if (isValidUrl(project.repoUrl)) {
      var a = el("a", "btn btn-secondary card-action", "View on GitHub");
      a.href = project.repoUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.appendChild(el("span", "visually-hidden", ": " + project.title + " (opens in a new tab)"));
      card.appendChild(a);
    } else {
      card.appendChild(el("p", "card-note", "Repository link coming soon"));
    }
    return card;
  }

  function initProjects() {
    var grid = document.getElementById("project-grid");
    var filterWrap = document.getElementById("project-filters");
    var statusEl = document.getElementById("filter-status");
    if (!grid || !filterWrap) return;

    // Replace the static fallback cards with data-driven ones
    grid.textContent = "";
    PROJECTS.forEach(function (p) { grid.appendChild(buildCard(p)); });

    var buttons = filterWrap.querySelectorAll(".filter-btn");

    function applyFilter(filter) {
      var shown = 0;
      grid.querySelectorAll(".project-card").forEach(function (card) {
        var match = filter === "all" || card.getAttribute("data-category") === filter;
        card.hidden = !match;
        if (match) shown += 1;
      });
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === filter));
      });
      if (statusEl) {
        statusEl.textContent = "Showing " + shown + (shown === 1 ? " project" : " projects") +
          " in " + (CATEGORY_LABELS[filter] || "All") + ".";
      }
    }

    filterWrap.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (btn) applyFilter(btn.getAttribute("data-filter"));
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!items.length) return;

    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (i) { i.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    items.forEach(function (i) { observer.observe(i); });

    // Safety net: never leave content hidden
    window.setTimeout(function () {
      items.forEach(function (i) { i.classList.add("is-visible"); });
    }, 4000);
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* ---------- Init ---------- */
  function init() {
    // The .js class enables JS-only styles (collapsible menu, reveal).
    document.documentElement.classList.add("js");
    initTheme();
    initNav();
    initActiveLink();
    initProjects();
    initReveal();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
