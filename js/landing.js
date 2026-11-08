/* Homepage (final design): tabs, review carousel, traveller stories,
   best-sellers row and the 2027 departures list. Uses EX from common.js
   and DEPARTURES / COMING from data.js. */
(function () {
  var $ = EX.$, $$ = EX.$$, esc = EX.esc, reduce = EX.reduce;
  var ARROW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';
  function slide(track, dir) { track.scrollBy({ left: dir * track.clientWidth * 0.9, behavior: reduce ? "auto" : "smooth" }); }

  /* ---------- Start your journey tabs ---------- */
  var tabs = $$('.tabs [role="tab"]');
  function selectTab(t) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1;
      $("#" + x.getAttribute("aria-controls")).hidden = !on;
    });
  }
  tabs.forEach(function (t, i) {
    t.tabIndex = t.getAttribute("aria-selected") === "true" ? 0 : -1;
    t.addEventListener("click", function () { selectTab(t); });
    t.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (d) { var n = tabs[(i + d + tabs.length) % tabs.length]; selectTab(n); n.focus(); }
    });
  });

  /* ---------- reviews carousel ---------- */
  var track = $("#rvTrack"), cards = $$(".rv", track), dotsBox = $("#rvDots");
  cards.forEach(function (c, i) {
    var q = $("blockquote", c), more = $(".rv-more", c);
    if (q.scrollHeight <= q.clientHeight + 2) more.hidden = true;
    more.addEventListener("click", function () { var open = c.classList.toggle("open"); more.textContent = open ? "Show less" : "Read more"; });
    var d = document.createElement("button"); d.type = "button"; d.setAttribute("aria-label", "Review " + (i + 1));
    d.addEventListener("click", function () { track.scrollTo({ left: c.offsetLeft - track.offsetLeft, behavior: reduce ? "auto" : "smooth" }); });
    dotsBox.appendChild(d);
  });
  var dots = $$("button", dotsBox);
  function markDot() {
    var i = Math.round(track.scrollLeft / (cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : 1));
    dots.forEach(function (d, j) { d.classList.toggle("on", j === i); });
  }
  track.addEventListener("scroll", function () { requestAnimationFrame(markDot); }, { passive: true }); markDot();
  $$("[data-rv]").forEach(function (b) { b.addEventListener("click", function () { slide(track, +b.dataset.rv); }); });
  var paused = false, timer;
  ["mouseenter", "focusin", "touchstart"].forEach(function (ev) { track.addEventListener(ev, function () { paused = true; }, { passive: true }); });
  track.addEventListener("mouseleave", function () { paused = false; });
  if (!reduce) timer = setInterval(function () {
    if (paused || document.hidden) return;
    var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (atEnd) track.scrollTo({ left: 0, behavior: "smooth" }); else slide(track, 1);
  }, 6500);

  /* ---------- best-sellers row ---------- */
  var sx = $("#sxTrack");
  $$("[data-sx]").forEach(function (b) { b.addEventListener("click", function () { slide(sx, +b.dataset.sx); }); });

  /* ---------- traveller stories (Google reviews, quoted as written) ---------- */
  var STORIES = [
    { name: "Prima Latha", trip: "Private tour, North Pakistan · Solo traveller", img: "/media/img/fairy-meadows.jpg",
      text: "Recently returned from a solo trip to North Pakistan. This was a spectacular trip. From the start of our communication he promised that as a solo female traveler my experience in North Pakistan will be safe and smooth – he kept his promise! This was hands down the best travel experience for me." },
    { name: "Ayesha Siddiqi", trip: "10 days in Skardu & Hunza · Family of eight from the US", img: "/media/img/attabad.jpg",
      text: "I recently went on an unforgettable 10-day tour through Skardu and Hunza with Exploria. It was not an easy trip to execute as we traveled with a large group – 6 adults (two of which were our elderly parents) and two toddlers, but they made it happen!" },
    { name: "Barb Devine", trip: "Hindu Kush Tour, Northern Pakistan", img: "/media/img/tours/hindu-kush.jpg",
      text: "I feel this tour was a great way to start to get to know the ‘real’ Pakistan. The people were always welcoming and friendly. If you enjoy amazing scenery, immersing yourself into local life, crazy roads, learning a new culture, being adaptable then Pakistan is definitely for you." },
    { name: "Francesca Parachini", trip: "Skardu & Hunza · Traveller for 25 years", img: "/media/img/deosai.jpg",
      text: "Pakistan was in the bucket list since a while. I don’t have the words to describe the beauty, the majestic of these ranges of mountains. Don’t be scared to come over, the region is safe and you’re in very good hands with Exploria." },
    { name: "Soogra Banoo Meer", trip: "Northern Pakistan", img: "/media/img/passu-bridge.jpg",
      text: "I would recommend Exploria to all my friends and family. My trip was well organised and within my budget. Tour guides Nawaz and Raheem together with driver Imraan and Noor did an excellent job of fulfilling our wishes for a memorable experience." }
  ];
  var stText = $("#stText"), stWho = $("#stWho"), stImg = $("#stImg"), pick = $("#stPick"), si = 0, stTimer;
  pick.innerHTML = STORIES.map(function (s, i) { return '<button type="button" aria-pressed="' + (i === 0) + '">' + esc(s.name.split(" ")[0]) + "</button>"; }).join("");
  function showStory(i, user) {
    si = i; var s = STORIES[i];
    [stText, stWho].forEach(function (n) { n.classList.add("fade"); });
    stImg.style.opacity = 0;
    setTimeout(function () {
      stText.textContent = "“" + s.text + "”";
      stWho.innerHTML = "<b>" + esc(s.name) + "</b><span>" + esc(s.trip) + " · Google review</span>";
      stImg.src = s.img; stImg.style.opacity = 1;
      [stText, stWho].forEach(function (n) { n.classList.remove("fade"); });
    }, reduce ? 0 : 300);
    $$("button", pick).forEach(function (b, j) { b.setAttribute("aria-pressed", j === i); });
    if (user) clearInterval(stTimer);
  }
  pick.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) showStory($$("button", pick).indexOf(b), true); });
  showStory(0);
  if (!reduce) stTimer = setInterval(function () { if (!document.hidden) showStory((si + 1) % STORIES.length); }, 9000);

  /* ---------- 2027 group departures ---------- */
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var rows = DEPARTURES.map(function (d) {
    var dt = new Date(d.start + "T00:00:00");
    return '<article class="jr ph">' +
      '<div class="jr-date"><b>' + String(dt.getDate()).padStart(2, "0") + "</b><span>" + MON[dt.getMonth()] + " " + dt.getFullYear() + "</span></div>" +
      '<a class="jr-img" href="' + EX.tourUrl(d) + '" tabindex="-1" aria-hidden="true"><img class="cover zoom" src="' + d.images[0].src + '" alt="" loading="lazy"></a>' +
      '<div class="jr-body"><span class="status">' + esc(d.status) + '</span><h3 style="margin-top:12px"><a href="' + EX.tourUrl(d) + '" style="text-decoration:none">' + esc(d.title) + "</a></h3><p>" + esc(d.summary) + '</p><ul class="jr-tags"><li>' + esc(d.dates) + "</li><li>" + esc(d.duration) + "</li><li>" + esc(d.group) + "</li><li>" + esc(d.region) + "</li></ul></div>" +
      '<div class="jr-side"><p class="jr-price" style="margin:0">' + esc(d.price) + "<small>" + esc(d.priceNote) + '</small></p><a class="btn" href="' + EX.tourUrl(d) + '">View journey</a></div>' +
    "</article>";
  }).concat(COMING.map(function (c) {
    var msg = encodeURIComponent("Hi Exploria, please let me know when dates open for: " + c.title + " (" + c.season + ").");
    return '<article class="jr soon">' +
      '<div class="jr-date"><b>TBA</b><span>' + esc(c.season) + "</span></div>" +
      '<div class="jr-img"><img class="cover" src="' + c.img + '" alt="" loading="lazy"></div>' +
      '<div class="jr-body"><span class="status tba">Dates coming soon</span><h3 style="margin-top:12px">' + esc(c.title) + "</h3><p>" + esc(c.line) + "</p></div>" +
      '<div class="jr-side"><a class="btn btn-ghost" href="https://wa.me/923495966540?text=' + msg + '">Register interest</a></div>' +
    "</article>";
  }));
  $("#jrList").innerHTML = rows.join("");

  /* hide the static poster once the hero video is actually playing */
  var hv = $(".hero video"), poster = $(".hero .poster");
  if (hv && poster) hv.addEventListener("playing", function () { poster.style.display = "none"; });
})();
