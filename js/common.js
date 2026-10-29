/* Shared by every page: helpers, header, phone menu, WhatsApp button,
   notify forms and muted video autoplay. Helpers are exposed on window.EX. */
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function go(sel) { var el = typeof sel === "string" ? $(sel) : sel; if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); }
  function store(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem(k)); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } }
  function mailto(d) {
    var s = d.title + " " + d.start.slice(0, 4) + " – Booking Request";
    var b = "Hello Exploria,\n\nI'd like to request a booking for the " + d.title + " (" + d.dates + ").\n\nNumber of travellers: \nRoom preference (twin / single): \nName: \nCountry: \n\nThank you.";
    return "mailto:" + BOOK_EMAIL + "?subject=" + encodeURIComponent(s) + "&body=" + encodeURIComponent(b);
  }
  function countdownParts(iso) {
    var ms = new Date(iso + "T00:00:00+05:00") - new Date();
    if (ms <= 0) return null;
    return { d: Math.floor(ms / 864e5), h: Math.floor(ms / 36e5) % 24, m: Math.floor(ms / 6e4) % 60 };
  }
  function tourUrl(d) { return "/tours/" + d.slug; }
  window.EX = {
    reduce: reduce, $: $, $$: $$, esc: esc, go: go, store: store, mailto: mailto, countdownParts: countdownParts, tourUrl: tourUrl,
    ARROW: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>',
    HEART: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3.1 4.5 6.8 4.5c2.1 0 3.6 1.1 5.2 3 1.6-1.9 3.1-3 5.2-3 3.7 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z"/></svg>'
  };

  /* ---------- header, progress, whatsapp ---------- */
  var head = $(".site-head"), bar = $("#progress"), wa = $("#wa");
  var alwaysSolid = head && head.classList.contains("solid");
  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    if (head && !alwaysSolid) head.classList.toggle("solid", y > 60);
    if (bar) bar.style.transform = "scaleX(" + (h > 0 ? y / h : 0) + ")";
    if (wa) wa.classList.toggle("show", y > innerHeight * 0.8);
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- phone / tablet menu ---------- */
  var menuBtn = $("#menuBtn"), menu = $("#menu");
  function setMenu(open) {
    if (!menu) return;
    menu.hidden = !open; menuBtn.setAttribute("aria-expanded", open);
    document.documentElement.classList.toggle("menu-open", open);
    if (open) $("a", menu).focus(); else menuBtn.focus();
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () { setMenu(menu.hidden); });
    $("#menuClose").addEventListener("click", function () { setMenu(false); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) { menu.hidden = true; menuBtn.setAttribute("aria-expanded", false); document.documentElement.classList.remove("menu-open"); } });
    addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) setMenu(false); });
  }

  /* ---------- notify forms (mock) ---------- */
  document.addEventListener("submit", function (e) {
    var f = e.target.closest(".js-notify"); if (!f) return;
    e.preventDefault();
    var inp = $("input", f);
    if (!inp.value || inp.value.indexOf("@") < 1) { inp.focus(); inp.style.borderColor = "#E0475B"; return; }
    var p = document.createElement("p"); p.className = "thanks"; p.setAttribute("role", "status");
    p.textContent = "Thank you. We'll email you when new dates open.";
    if (f.closest(".closing")) p.style.color = "#FFA100";
    $(".field", f) ? $(".field", f).replaceWith(p) : f.replaceWith(p);
  });

  /* ---------- muted autoplay helper ---------- */
  $$("video.bg-video").forEach(function (v) {
    v.muted = true; v.setAttribute("muted", "");
    if (reduce) { v.removeAttribute("autoplay"); v.pause(); return; }
    if (v.hasAttribute("autoplay")) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  });
})();
