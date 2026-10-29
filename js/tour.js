/* Tour page template: renders one DEPARTURES entry, picked by /tours/<slug>
   (Vercel rewrite) or tour.html?t=<slug> when testing locally. */
(function () {
  var $ = EX.$, $$ = EX.$$, esc = EX.esc, ARROW = EX.ARROW, reduce = EX.reduce;
  var slug = new URLSearchParams(location.search).get("t") || location.pathname.replace(/\/$/, "").split("/").pop();
  var d = DEPARTURES.filter(function (x) { return x.slug === slug; })[0] || DEPARTURES[0];
  var main = $("#tour"), book = EX.mailto(d);
  var CHECK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  var CROSS = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17"/></svg>';

  document.title = d.title + " " + d.start.slice(0, 4) + " — " + d.duration + ", " + d.region + " | Exploria.pk";
  $('meta[name="description"]').setAttribute("content", d.summary + " " + d.dates + ", " + d.price + " " + d.priceNote + ".");
  $$(".js-book").forEach(function (a) { a.href = book; });

  /* which route stop each day belongs to (index into stopOrder) */
  var ptr = 0;
  var dayStop = d.days.map(function (day) {
    while (ptr < d.stopOrder.length - 1 && d.stopOrder[ptr] !== day.s) ptr++;
    return ptr;
  });

  main.innerHTML =
    '<nav class="crumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/#departures">Group departures</a><span>/</span><span aria-current="page">' + esc(d.title) + "</span></nav>" +

    /* ----- title ----- */
    '<section class="t-head wrap">' +
      '<p class="t-badges"><span class="t-badge">' + esc(d.status) + "</span><span>" + esc(d.season) + " · " + esc(d.region) + "</span></p>" +
      "<h1>" + esc(d.title) + " " + d.start.slice(0, 4) + "</h1>" +
      '<p class="t-tag">' + esc(d.tagline) + "</p>" +
      '<ul class="t-meta">' +
        "<li><span>Dates</span><b>" + esc(d.dates) + "</b></li>" +
        "<li><span>Duration</span><b>" + esc(d.duration) + "</b></li>" +
        "<li><span>Group</span><b>" + esc(d.group) + "</b></li>" +
        '<li><span>Rated</span><b>4.9/5 <i class="stars" aria-hidden="true">★★★★★</i></b></li>' +
      "</ul>" +
    "</section>" +

    /* ----- gallery ----- */
    '<section class="gallery wrap" aria-label="Photos">' +
      d.images.slice(0, 5).map(function (im, i) {
        return '<button type="button" class="g-item g' + i + '" data-photo="' + i + '" aria-label="Open photo ' + (i + 1) + ': ' + esc(im.alt) + '"><img class="cover zoom" src="' + im.src + '" alt="' + esc(im.alt) + '"' + (i ? ' loading="lazy"' : "") + "></button>";
      }).join("") +
      '<button type="button" class="g-all" data-photo="0">View all ' + d.images.length + " photos</button>" +
    "</section>" +

    /* ----- body + sticky booking card ----- */
    '<div class="t-body wrap">' +
      '<div class="t-main">' +
        '<section class="t-sec" id="overview"><p class="eyebrow">Overview</p><p class="t-lead">' + esc(d.summary) + "</p>" +
          '<p class="lede">For us, this is more than a tour of beautiful places. Northern Pakistan is our home, and we want to share it through the warmth of our people, the stories of our villages, traditional music and the hospitality that makes strangers feel like family.</p></section>' +

        '<section class="t-sec"><p class="eyebrow">Highlights</p><h2 class="t-h2">Why you’ll love it</h2><div class="hl">' +
          d.highlights.map(function (h, i) { return '<div><span class="hl-n">' + String(i + 1).padStart(2, "0") + "</span><b>" + esc(h[0]) + "</b><p>" + esc(h[1]) + "</p></div>"; }).join("") +
        "</div></section>" +

        '<section class="t-sec" id="itinerary"><p class="eyebrow">Day by day</p><h2 class="t-h2">Your ' + d.days.length + "-day journey</h2>" +
          '<div class="itin">' +
            '<div class="route-map" aria-hidden="true"><svg id="routeSvg"></svg><p class="rm-cap" id="rmCap"></p></div>' +
            '<ol class="days">' + d.days.map(function (day, i) {
              return '<li class="day" data-day="' + i + '"><span class="dn"><small>Day</small>' + String(i + 1).padStart(2, "0") + "</span><div><h3>" + esc(day.t) + '</h3><p class="date">' + esc(day.d) + "</p><ul>" + day.p.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul></div></li>";
            }).join("") + "</ol>" +
          "</div></section>" +

        '<section class="t-sec"><p class="eyebrow">What’s included</p><h2 class="t-h2">Everything planned, nothing hidden</h2><div class="incl">' +
          '<ul class="yes">' + d.included.map(function (x) { return "<li>" + CHECK + "<span>" + esc(x) + "</span></li>"; }).join("") + "</ul>" +
          '<div><h3 class="incl-h">Not included</h3><ul class="no">' + d.excluded.map(function (x) { return "<li>" + CROSS + "<span>" + esc(x) + "</span></li>"; }).join("") + "</ul></div>" +
        "</div></section>" +

        '<section class="t-sec" id="info"><p class="eyebrow">Good to know</p><h2 class="t-h2">Stays, flights &amp; booking</h2><div class="info">' +
          d.info.map(function (x) { return "<div><h3>" + esc(x[0]) + "</h3><p>" + esc(x[1]) + "</p></div>"; }).join("") +
        "</div></section>" +

        '<section class="t-sec" id="faq"><p class="eyebrow">FAQ</p><h2 class="t-h2">Questions about this tour</h2><div class="faq-list">' +
          d.faq.map(function (f, i) { return "<details" + (i ? "" : " open") + "><summary>" + esc(f.q) + '<span class="pm" aria-hidden="true">+</span></summary><p>' + esc(f.a) + "</p></details>"; }).join("") +
        "</div></section>" +
      "</div>" +

      '<aside class="bookcard" aria-label="Book this tour">' +
        '<p class="bc-from">From</p><p class="bc-price">' + esc(d.price) + "</p><p class=\"bc-note\">" + esc(d.priceNote) + "</p>" +
        '<dl class="bc-list"><div><dt>Dates</dt><dd>' + esc(d.dates) + "</dd></div><div><dt>Group</dt><dd>" + esc(d.group) + "</dd></div><div><dt>Deposit</dt><dd>" + esc(d.deposit) + " pp</dd></div><div><dt>Single room</dt><dd>+" + esc(d.single) + "</dd></div></dl>" +
        '<p class="bc-count" id="bcCount"></p>' +
        '<a class="btn btn-primary bc-btn" href="' + book + '">Request booking ' + ARROW + "</a>" +
        '<a class="btn btn-ghost bc-btn" href="https://wa.me/923495966540?text=' + encodeURIComponent("Hi Exploria, I have a question about the " + d.title + " (" + d.dates + ").") + '">Ask on WhatsApp</a>' +
        '<p class="bc-fine">No payment now. We confirm availability first, then send payment details.</p>' +
      "</aside>" +
    "</div>" +

    /* ----- closing ----- */
    '<section class="t-close"><img class="cover" src="' + d.images[1].src + '" alt="" loading="lazy"><div class="veil"></div><div class="t-close-in">' +
      "<h2>Come for the blossoms.<br>Leave with Pakistan in your heart.</h2>" +
      '<p>Small group of 4–8 · ' + esc(d.dates) + " · " + esc(d.price) + " pp</p>" +
      '<div class="hero-btns"><a class="btn btn-primary" href="' + book + '">Request booking</a><a class="btn btn-line" href="/#departures">See all departures</a></div>' +
    "</div></section>" +

    /* ----- phone sticky bar ----- */
    '<div class="mbar" id="mbar"><div><b>' + esc(d.price) + "</b><span>" + esc(d.dates) + '</span></div><a class="btn btn-primary" href="' + book + '">Request booking</a></div>';

  /* ---------- countdown in booking card ---------- */
  function tick() {
    var p = EX.countdownParts(d.start), el = $("#bcCount");
    el.innerHTML = p ? "<b>" + p.d + " days</b> until departure" : "On tour now — ask about the next dates";
  }
  tick(); setInterval(tick, 60000);

  /* ---------- route map: zoomed into the north, draws up to the day in view ---------- */
  var NS = "http://www.w3.org/2000/svg", svg = $("#routeSvg");
  var X0 = 72.2, X1 = 76.8, Y0 = 36.95, Y1 = 33.25, K = 100;
  function px(lon, lat) { return [((lon - X0) * K).toFixed(1), ((Y0 - lat) * K * 1.15).toFixed(1)]; }
  var VW = (X1 - X0) * K, VH = (Y0 - Y1) * K * 1.15;
  svg.setAttribute("viewBox", "0 0 " + VW + " " + VH);
  function el(tag, a, parent) { var n = document.createElementNS(NS, tag); for (var k in a) n.setAttribute(k, a[k]); (parent || svg).appendChild(n); return n; }
  el("path", { class: "rm-land", d: "M" + BORDER.map(function (p) { return px(p[0], p[1]).join(","); }).join(" L") + " Z" });
  var legs = [], pts = d.stopOrder.map(function (k) { var s = d.stops[k]; return px(s.lon, s.lat); });
  for (var i = 1; i < pts.length; i++) {
    var a = pts[i - 1], b = pts[i], fly = (i === 1 || i === pts.length - 1);
    var mx = (+a[0] + +b[0]) / 2 + (fly ? 40 : 0), my = (+a[1] + +b[1]) / 2 - (fly ? 30 : 0);
    legs.push(el("path", { class: "rm-leg" + (fly ? " fly" : ""), d: "M" + a.join(",") + " Q" + mx + "," + my + " " + b.join(",") }));
  }
  var dots = d.stopOrder.slice(0, -1).map(function (k, i) {
    var p = pts[i], g = el("g", { class: "rm-stop", transform: "translate(" + p.join(",") + ")" });
    el("circle", { class: "rm-halo", r: 14 }, g); el("circle", { class: "rm-dot", r: 8 }, g);
    var pos = { gilgit: [-16, 6, "end"], hunza: [-16, 6, "end"], skardu: [0, 38, "middle"], attabad: [16, 6, "start"], islamabad: [16, 6, "start"] }[k] || [16, 6, "start"];
    el("text", { x: pos[0], y: pos[1], "text-anchor": pos[2] }, g).textContent = d.stops[k].name;
    return g;
  });
  function setDay(i) {
    var s = dayStop[i];
    legs.forEach(function (l, j) { l.classList.toggle("done", j < s); });
    dots.forEach(function (g, j) { g.classList.toggle("on", j === s % dots.length); g.classList.toggle("past", j < s); });
    $$(".day").forEach(function (li) { li.classList.toggle("is-on", +li.dataset.day === i); });
    $("#rmCap").innerHTML = "<span><b>Day " + (i + 1) + "</b> · " + esc(d.stops[d.stopOrder[s]].name) + '</span><span class="rm-key"><i class="k-fly"></i>Flight <i class="k-road"></i>Road</span>';
  }
  setDay(0);
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) setDay(+en.target.dataset.day); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$(".day").forEach(function (li) { io.observe(li); });
  }

  /* ---------- lightbox ---------- */
  var lb = $("#lightbox"), li = 0;
  function show(i) {
    li = (i + d.images.length) % d.images.length; var im = d.images[li];
    lb.innerHTML = '<button type="button" class="lb-close" aria-label="Close">' + CROSS + '</button><figure><img src="' + im.src + '" alt="' + esc(im.alt) + '"><figcaption>' + esc(im.alt) + " · " + (li + 1) + " / " + d.images.length + '</figcaption></figure><button type="button" class="lb-nav prev" aria-label="Previous photo">‹</button><button type="button" class="lb-nav next" aria-label="Next photo">›</button>';
  }
  main.addEventListener("click", function (e) {
    var b = e.target.closest("[data-photo]"); if (!b) return;
    show(+b.dataset.photo); if (lb.showModal) lb.showModal(); else lb.setAttribute("open", "");
  });
  lb.addEventListener("click", function (e) {
    if (e.target === lb || e.target.closest(".lb-close")) lb.close();
    else if (e.target.closest(".prev")) show(li - 1);
    else if (e.target.closest(".next")) show(li + 1);
  });
  lb.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") show(li - 1); if (e.key === "ArrowRight") show(li + 1); });
  var tx = null;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) { if (tx === null) return; var dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 40) show(li + (dx < 0 ? 1 : -1)); tx = null; });

  /* ---------- phone booking bar: show after the title, hide at the closing CTA ---------- */
  var mbar = $("#mbar"), close = $(".t-close");
  addEventListener("scroll", function () {
    var past = scrollY > 500, atEnd = close.getBoundingClientRect().top < innerHeight;
    mbar.classList.toggle("show", past && !atEnd);
  }, { passive: true });

  /* ---------- structured data for Google (TouristTrip + Offer + FAQPage) ---------- */
  var url = location.origin + EX.tourUrl(d);
  var ld = [{
    "@context": "https://schema.org", "@type": "TouristTrip", name: d.title + " " + d.start.slice(0, 4), description: d.summary, url: url,
    image: d.images.map(function (im) { return location.origin + im.src; }),
    touristType: ["Small group", "Culture", "Nature"],
    itinerary: { "@type": "ItemList", itemListElement: d.days.map(function (day, i) { return { "@type": "ListItem", position: i + 1, name: "Day " + (i + 1) + ": " + day.t, description: day.p.join(" ") }; }) },
    offers: { "@type": "Offer", price: d.price.replace(/[^\d]/g, ""), priceCurrency: "USD", availability: "https://schema.org/InStock", url: url, validFrom: "2026-10-01", availabilityStarts: d.start, availabilityEnds: d.end },
    provider: { "@type": "TravelAgency", name: "Exploria.pk", url: "https://www.exploria.pk/", telephone: "+923495966540", email: BOOK_EMAIL }
  }, {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: d.faq.map(function (f) { return { "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }; })
  }];
  var s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld); document.head.appendChild(s);
})();
