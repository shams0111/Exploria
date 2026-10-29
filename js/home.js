(function () {
  var reduce = EX.reduce, $ = EX.$, $$ = EX.$$, esc = EX.esc, go = EX.go, store = EX.store;
  var ARROW = EX.ARROW, HEART = EX.HEART;

  /* ---------- hero rotating word ---------- */
  var words = ["mountains", "glaciers", "Mughal cities", "blossom valleys", "food streets", "desert forts"], wi = 0, hw = $("#heroWord");
  if (!reduce) setInterval(function () {
    hw.style.opacity = 0;
    setTimeout(function () { wi = (wi + 1) % words.length; hw.textContent = words[wi]; hw.style.opacity = 1; }, 350);
  }, 2600);

  /* ---------- hero: crossfade between clips (first clip only on reduced motion / data saver) ---------- */
  var vids = $$(".hero-vid"), vi = 0, cap = $("#heroCap");
  var saveData = navigator.connection && navigator.connection.saveData;
  if (vids.length > 1 && !reduce && !saveData) setInterval(function () {
    var cur = vids[vi], next = vids[(vi + 1) % vids.length];
    next.preload = "auto"; next.muted = true;
    var p = next.play(); if (p && p.catch) p.catch(function () {});
    next.classList.add("on"); cur.classList.remove("on");
    if (cap) cap.textContent = next.dataset.cap;
    setTimeout(function () { cur.pause(); }, 1600);
    vi = (vi + 1) % vids.length;
  }, 9000);

  /* ---------- departures ---------- */
  var featured = DEPARTURES.filter(function (d) { return d.featured; })[0] || DEPARTURES[0];
  var others = DEPARTURES.filter(function (d) { return d !== featured; });
  if (featured) {
    $("#depFeatured").innerHTML =
      '<article class="dep">' +
        '<div class="dep-media">' +
          featured.images.slice(0, 4).map(function (im, i) { return '<img class="slide cover' + (i ? "" : " on") + '" src="' + im.src + '" alt="' + esc(im.alt) + '"' + (i ? ' loading="lazy"' : "") + '>'; }).join("") +
          '<span class="dep-badge">' + esc(featured.status) + " · " + esc(featured.season) + "</span>" +
          '<div class="dep-dots">' + featured.images.slice(0, 4).map(function (_, i) { return '<button type="button" aria-label="Photo ' + (i + 1) + '"' + (i ? "" : ' class="on"') + "></button>"; }).join("") + "</div>" +
        "</div>" +
        '<div class="dep-body">' +
          '<p class="tag">' + esc(featured.region) + "</p>" +
          '<h3><a href="' + EX.tourUrl(featured) + '" style="color:inherit;text-decoration:none">' + esc(featured.title) + "</a></h3>" +
          '<p class="lede" style="font-size:17px">' + esc(featured.summary) + "</p>" +
          '<div class="facts">' +
            "<div><span>Dates</span><strong>" + esc(featured.dates) + "</strong></div>" +
            "<div><span>Duration</span><strong>" + esc(featured.duration) + "</strong></div>" +
            "<div><span>Group size</span><strong>" + esc(featured.group) + "</strong></div>" +
            "<div><span>Price</span><strong>" + esc(featured.price) + "</strong></div>" +
          "</div>" +
          '<div class="route" aria-label="Route">' + featured.route.map(function (r) { return "<span>" + esc(r) + "</span>"; }).join("<i>→</i>") + "</div>" +
          '<div class="countdown" id="cd"><p>Departs in</p><ol><li><b data-k="d">–</b><small>days</small></li><li><b data-k="h">–</b><small>hours</small></li><li><b data-k="m">–</b><small>mins</small></li></ol></div>' +
          '<div class="dep-actions">' +
            '<a class="btn btn-primary" href="' + EX.tourUrl(featured) + '">See the full tour ' + ARROW + "</a>" +
            '<a class="btn btn-ghost" href="' + EX.mailto(featured) + '">Request booking</a>' +
          "</div>" +
          '<p class="dep-note">' + esc(featured.priceNote) + " · " + esc(featured.deposit) + " deposit secures your place · single room +" + esc(featured.single) + "</p>" +
        "</div>" +
      "</article>";

    var slides = $$(".dep-media .slide"), dots = $$(".dep-dots button"), si = 0, timer;
    function show(i) { slides[si].classList.remove("on"); dots[si].classList.remove("on"); si = i; slides[si].classList.add("on"); dots[si].classList.add("on"); }
    function auto() { clearInterval(timer); if (!reduce) timer = setInterval(function () { show((si + 1) % slides.length); }, 4500); }
    dots.forEach(function (b, i) { b.addEventListener("click", function () { show(i); auto(); }); });
    auto();

    function tick() {
      var p = EX.countdownParts(featured.start), el = $("#cd");
      if (!p) { el.innerHTML = "<p>On tour now — next dates coming soon</p>"; return; }
      $$("[data-k]", el).forEach(function (b) { b.textContent = p[b.dataset.k]; });
      $("#heroCount").textContent = p.d + " days to go · " + featured.region + " · " + featured.group;
    }
    tick(); setInterval(tick, 30000);
  }
  $("#depMore").innerHTML =
    others.map(function (d) {
      return '<a class="soon photo" href="' + EX.tourUrl(d) + '"><img class="zoom" src="' + d.images[0].src + '" alt="" loading="lazy"><span class="shade" aria-hidden="true"></span><div class="soon-in"><small>' + esc(d.status) + " · " + esc(d.dates) + "</small><strong>" + esc(d.title) + "</strong><span>" + esc(d.duration) + " · " + esc(d.price) + "</span></div></a>";
    }).join("") +
    COMING.map(function (c) {
      return '<article class="soon photo"><img class="zoom" src="' + c.img + '" alt="" loading="lazy"><span class="shade" aria-hidden="true"></span><div class="soon-in"><small>Coming soon · ' + esc(c.season) + "</small><strong>" + esc(c.title) + "</strong><span>" + esc(c.line) + "</span></div></article>";
    }).join("") +
    '<form class="notify js-notify" novalidate><strong>Be first to hear about new dates</strong><p>We release a handful of small-group departures each season. Get them before they fill.</p><div class="field"><label class="sr" for="nf">Email address</label><input id="nf" type="email" placeholder="you@example.com" required><button class="btn btn-primary" type="submit">Notify me</button></div></form>';

  /* ---------- journey finder ---------- */
  var jf = { intent: null, level: null };
  function card(c, attr) {
    return '<button type="button" class="pick" ' + attr + '><img class="zoom cover" src="' + c.img + '" alt="" style="position:absolute;inset:0"><span class="shade" aria-hidden="true"></span><span class="pick-in"><span class="n">' + c.num + '</span><span class="t">' + esc(c.label) + '</span><span class="l">' + esc(c.line) + '</span><span class="c">Choose ' + ARROW + "</span></span></button>";
  }
  function renderJF(scroll) {
    var cur = jf.intent ? FLOW[jf.intent] : null, step = !jf.intent ? 0 : (!jf.level ? 1 : 2);
    $("#jfSteps").innerHTML = [["01", "Your style"], ["02", "Your focus"], ["03", "Your trip"]].map(function (s, i) {
      return "<li" + (i === step ? ' aria-current="step"' : "") + ">" + s[0] + " " + s[1] + "</li>";
    }).join("");
    $("#jfTitle").textContent = step === 0 ? "Three ways to see Pakistan" : step === 1 ? cur.q : "Your Pakistan";
    $("#jfChosen").innerHTML = step === 1 ? '<div class="chosen"><span>You chose <strong>' + esc(cur.title) + '</strong></span><button type="button" class="textbtn" data-jf="back">Change</button></div>' : "";
    if (step < 2) {
      var list = step === 0 ? INTENTS : cur.options;
      $("#jfBody").innerHTML = '<div class="picks">' + list.map(function (c) { return card(c, 'data-jf="' + (step === 0 ? "i:" : "l:") + c.id + '"'); }).join("") + "</div>";
    } else {
      var opt = cur.options.filter(function (o) { return o.id === jf.level; })[0], r = opt.result;
      var href = r.href || "#tours";
      $("#jfBody").innerHTML = '<div class="result"><div class="result-img"><img class="cover" src="' + r.img + '" alt="' + esc(r.alt) + '"></div><div class="result-body"><p class="eyebrow">' + esc(cur.title) + " · " + esc(opt.label) + "</p><h3>" + esc(r.title) + '</h3><p class="lede">' + esc(r.text) + '</p><div class="season"><span>Best time to go</span><b>' + esc(r.season) + '</b></div><div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:4px"><a class="btn btn-primary" href="' + href + '"' + (r.filter ? ' data-filter="' + r.filter + '"' : "") + ">" + esc(r.cta) + " " + ARROW + '</a><button type="button" class="btn btn-ghost" data-jf="restart">Start over</button></div></div></div>';
    }
    if (scroll) setTimeout(function () { go("#journey"); }, 30);
  }
  $("#journey").addEventListener("click", function (e) {
    var b = e.target.closest("[data-jf]"); if (!b) return;
    var v = b.dataset.jf;
    if (v.indexOf("i:") === 0) { jf.intent = v.slice(2); jf.level = null; }
    else if (v.indexOf("l:") === 0) { jf.level = v.slice(2); }
    else { jf.intent = null; jf.level = null; }
    renderJF(v !== "back");
  });
  renderJF(false);

  /* ---------- tours rail with filters + saved + region (from hero search) ---------- */
  var saved = store("exploria-saved") || [], filter = "all", where = "any", rail = $("#rail");
  function kindOk(t, f) { return f === "all" || (f === "saved" ? saved.indexOf(t.title) > -1 : f === "group" ? t.group : t.kind === f); }
  function whereOk(t) { return where === "any" || (" " + t.where + " ").indexOf(" " + where + " ") > -1; }
  function savedCount() { $("#savedCount").textContent = saved.length; }
  function renderChips() {
    $("#tourChips").innerHTML = FILTERS.map(function (f) {
      var n = TOURS.filter(function (t) { return kindOk(t, f[0]) && (f[0] === "saved" || whereOk(t)); }).length;
      return '<button type="button" class="chip" data-f="' + f[0] + '" aria-pressed="' + (f[0] === filter) + '">' + f[1] + '<span class="ct">' + n + "</span></button>";
    }).join("");
    var w = WHERE.filter(function (x) { return x[0] === where; })[0];
    $("#whereNote").innerHTML = where === "any" ? "" : 'Showing trips in <b>' + esc(w[1]) + '</b> <button type="button" class="textbtn" data-where-clear>Show all regions</button>';
  }
  function renderTours() {
    var list = TOURS.filter(function (t) { return kindOk(t, filter) && (filter === "saved" || whereOk(t)); });
    rail.innerHTML = list.length ? list.map(function (t) {
      var on = saved.indexOf(t.title) > -1;
      return '<li class="tour photo"><div class="tour-img"><img class="zoom cover" src="' + t.img + '" alt="" loading="lazy"><span class="tour-kind' + (t.group ? " is-group" : "") + '">' + esc(t.label) + '</span><button type="button" class="heart" data-save="' + esc(t.title) + '" aria-pressed="' + on + '" aria-label="Save ' + esc(t.title) + '">' + HEART + '</button></div><div class="tour-body"><h3>' + esc(t.title) + "</h3><p>" + esc(t.line) + '</p><div class="tour-foot"><b>' + esc(t.days) + (t.price ? " · " + esc(t.price) : "") + '</b><a href="' + t.url + '">View tour →</a></div></div></li>';
    }).join("") : '<li class="empty">' + (filter === "saved" ? "Nothing saved yet. Tap the heart on any tour to keep it here." : "No trips match yet. Try another region or trip type, or ask us for a private trip.") + "</li>";
    rail.scrollLeft = 0;
  }
  function setFilter(f, w) { filter = f; if (w) where = w; renderChips(); renderTours(); }
  EX.setTourFilter = setFilter;
  $("#tourChips").addEventListener("click", function (e) { var b = e.target.closest("[data-f]"); if (b) setFilter(b.dataset.f); });
  $("#whereNote").addEventListener("click", function (e) { if (e.target.closest("[data-where-clear]")) setFilter(filter, "any"); });
  rail.addEventListener("click", function (e) {
    var b = e.target.closest("[data-save]"); if (!b) return;
    var k = b.dataset.save, i = saved.indexOf(k);
    if (i > -1) saved.splice(i, 1); else saved.push(k);
    store("exploria-saved", saved);
    b.setAttribute("aria-pressed", i < 0); b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
    savedCount(); renderChips();
    if (filter === "saved") renderTours();
  });
  $$("[data-rail]").forEach(function (b) { b.addEventListener("click", function () { rail.scrollBy({ left: +b.dataset.rail * 330, behavior: reduce ? "auto" : "smooth" }); }); });
  $("#savedPill").addEventListener("click", function () { setFilter("saved"); go("#tours"); });
  /* any link with data-filter jumps to the rail pre-filtered */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-filter]"); if (!a) return;
    e.preventDefault(); setFilter(a.dataset.filter, "any"); go("#tours");
  });
  savedCount(); renderChips(); renderTours();

  /* ---------- where-to-go bento: tour counts + filter on tap ---------- */
  $$("[data-count-where]").forEach(function (n) {
    var w = n.dataset.countWhere, c = TOURS.filter(function (t) { return (" " + t.where + " ").indexOf(" " + w + " ") > -1; }).length;
    n.textContent = c + (c === 1 ? " tour" : " tours") + " →";
  });
  $$("[data-where]").forEach(function (b) {
    b.addEventListener("click", function () { setFilter("all", b.dataset.where); go("#tours"); });
  });

  /* ---------- hero search ---------- */
  var hs = $("#heroSearch");
  if (hs) {
    $("#hsWhere").innerHTML = WHERE.map(function (w) { return '<option value="' + w[0] + '">' + esc(w[1]) + "</option>"; }).join("");
    $("#hsWhen").innerHTML = '<option value="">Any month</option>' + MONTH_NOTES.map(function (m, i) { return '<option value="' + i + '">' + m[0] + "</option>"; }).join("");
    hs.addEventListener("submit", function (e) {
      e.preventDefault();
      var m = $("#hsWhen").value;
      if (m !== "") pickMonth(+m);
      setFilter($("#hsType").value, $("#hsWhere").value);
      $("#monthHint").innerHTML = m === "" ? "" : "<b>" + MONTH_NOTES[m][0] + ":</b> " + esc(MONTH_NOTES[m][1]);
      go("#tours");
    });
  }

  /* ---------- heritage arrows ---------- */
  var tl = $("#timeline");
  $$("[data-tl]").forEach(function (b) { b.addEventListener("click", function () { tl.scrollBy({ left: +b.dataset.tl * 320, behavior: reduce ? "auto" : "smooth" }); }); });

  /* ---------- map explorer ---------- */
  var NS = "http://www.w3.org/2000/svg", svg = $("#mapSvg");
  function px(lon, lat) { return [((lon - 60.5) * 40).toFixed(1), ((37.4 - lat) * 46).toFixed(1)]; }
  function el(tag, attrs, parent) { var n = document.createElementNS(NS, tag); for (var k in attrs) n.setAttribute(k, attrs[k]); (parent || svg).appendChild(n); return n; }
  el("path", { class: "land", d: "M" + BORDER.map(function (p) { return px(p[0], p[1]).join(","); }).join(" L") + " Z" });
  [["Punjab", 72.2, 31.0], ["Sindh", 67.9, 26.4], ["Balochistan", 64.6, 28.0], ["KP", 71.1, 33.4]].forEach(function (r) {
    var p = px(r[1], r[2]); el("text", { class: "region", x: p[0], y: p[1], "text-anchor": "middle" }).textContent = r[0];
  });
  var pi = 1;
  PLACES.forEach(function (pl, i) {
    var p = px(pl.lon, pl.lat);
    var g = el("g", { class: "pin", tabindex: "0", role: "button", "aria-label": pl.name, "data-i": i, transform: "translate(" + p[0] + "," + p[1] + ")" });
    var s = el("g", { class: "pin-s" }, g);
    el("circle", { class: "hit", r: 16 }, s);
    el("circle", { class: "halo", r: 10 }, s);
    el("circle", { class: "dot", r: 7 }, s);
    var left = pl.side === "l";
    var lab = el("text", { x: left ? -12 : 12, y: 4, "text-anchor": left ? "end" : "start" }, s);
    lab.textContent = pl.name.split(" & ")[0].replace(" Valley", "");
  });
  /* On narrow screens the map shrinks, so scale pins up to stay tappable and
     show only the selected pin's label to avoid overlaps. */
  function sizePins() {
    var w = svg.getBoundingClientRect().width || 700, k = w >= 600 ? 1 : Math.min(2.6, 1.25 * 700 / w);
    svg.classList.toggle("compact", k > 1);
    $$(".pin-s", svg).forEach(function (s) { s.setAttribute("transform", "scale(" + k.toFixed(2) + ")"); });
  }
  sizePins(); addEventListener("resize", sizePins);
  function showPlace(i, focus) {
    pi = (i + PLACES.length) % PLACES.length; var pl = PLACES[pi];
    $$(".pin", svg).forEach(function (g) { g.classList.toggle("on", +g.dataset.i === pi); g.setAttribute("aria-pressed", +g.dataset.i === pi); });
    svg.appendChild($$(".pin", svg).filter(function (g) { return +g.dataset.i === pi; })[0]);
    var img = $("#placeImg"); img.style.opacity = 0;
    setTimeout(function () { img.src = pl.img; img.alt = pl.name; img.style.opacity = 1; }, reduce ? 0 : 200);
    $("#placeReg").textContent = pl.reg; $("#placeName").textContent = pl.name; $("#placeTxt").textContent = pl.txt;
    $("#placeSeason").textContent = pl.season; $("#placeAlt").textContent = pl.alt;
    var a = $("#placeLink"); a.href = pl.link;
    if (pl.filter) a.dataset.filter = pl.filter; else delete a.dataset.filter;
    a.firstChild.textContent = pl.link === "#departures" ? "See the Blossom Tour " : pl.link === "#enquire" ? "Plan a private trip " : "See tours ";
    if (focus) $(".pin.on", svg).focus();
  }
  svg.addEventListener("click", function (e) { var g = e.target.closest(".pin"); if (g) showPlace(+g.dataset.i); });
  svg.addEventListener("keydown", function (e) {
    var g = e.target.closest(".pin"); if (!g) return;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showPlace(+g.dataset.i); }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); showPlace(pi + 1, true); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); showPlace(pi - 1, true); }
  });
  $("#placePrev").addEventListener("click", function () { showPlace(pi - 1); });
  $("#placeNext").addEventListener("click", function () { showPlace(pi + 1); });
  $$("[data-place]").forEach(function (b) {
    b.addEventListener("click", function () {
      var i = PLACES.map(function (p) { return p.id; }).indexOf(b.dataset.place);
      showPlace(i); go("#map");
    });
  });
  showPlace(1);

  /* ---------- when to go ---------- */
  var MC = ["#E6E0D6", "#FFD98F", "#FFA100"], CC = ["#E6E0D6", "#A9C4E4", "#01539D"], cal = $("#cal");
  var html = "<span></span>" + MONTHS.map(function (m, i) { return '<button type="button" class="mbtn" data-m="' + i + '" aria-pressed="false">' + m + "</button>"; }).join("");
  html += '<span class="rowlab"><b>Mountains &amp; treks</b><small>Best June – September</small></span>' + MOUNT.map(function (v, i) { return '<span class="cell" data-col="' + i + '" style="background:' + MC[v] + '"></span>'; }).join("");
  html += '<span class="rowlab"><b>Cities &amp; heritage</b><small>Best November – February</small></span>' + CITY.map(function (v, i) { return '<span class="cell" data-col="' + i + '" style="background:' + CC[v] + '"></span>'; }).join("");
  cal.innerHTML = html;
  function pickMonth(i) {
    cal.classList.add("has-pick");
    $$(".mbtn", cal).forEach(function (b) { b.setAttribute("aria-pressed", +b.dataset.m === i); });
    $$(".cell", cal).forEach(function (c) { c.classList.toggle("col-on", +c.dataset.col === i); });
    var n = MONTH_NOTES[i];
    $("#monthCard").innerHTML = '<span class="m">' + n[0] + "</span><p>" + esc(n[1]) + '</p><a href="' + n[2] + '"' + (n[3] ? ' data-filter="' + n[3] + '"' : "") + ">" + (n[2] === "#departures" ? "See the Blossom Tour →" : "Tours for " + n[0] + " →") + "</a>";
  }
  cal.addEventListener("click", function (e) { var b = e.target.closest(".mbtn"); if (b) pickMonth(+b.dataset.m); });
  pickMonth(new Date().getMonth());

  /* ---------- reveal, counters, elevation, bars ---------- */
  function countUp(n) {
    var to = +n.dataset.count, sep = n.dataset.sep, suf = n.dataset.suffix || "", t0 = null, dur = 1400;
    function fmt(v) { v = Math.round(v); return (sep ? v.toLocaleString("en-US") : String(v)) + suf; }
    if (reduce) { n.textContent = fmt(to); return; }
    function step(ts) { if (!t0) t0 = ts; var k = Math.min(1, (ts - t0) / dur); n.textContent = fmt(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");

        io.unobserve(en.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal, #elev").forEach(function (n) { io.observe(n); });
    $$(".three .photo").forEach(function (n) { io.observe(n); });
  } else {
    $$(".reveal, #elev, .three .photo").forEach(function (n) { n.classList.add("in"); });
  }

})();
