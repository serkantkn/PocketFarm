// PocketFarm tanıtım sitesi: gökte süzülen çiftlik adası, dil ve indirme bağlantıları.
// Sprite'lar oyunun kendi render'larıdır (art/tools/make_site_assets.py üretir).
(() => {
  "use strict";

  const BASE = "assets/";
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let SPR = {};
  const anims = []; // { el, fw, n, fps, phase, scale } kare kare oynayan sprite'lar

  // ---------- Dil ----------
  const EN = {
    "nav.features": "Features", "nav.levels": "Levels", "nav.shots": "Screenshots", "nav.download": "Download",
    "time.aria": "Change the time of day",
    "hero.badge": "Beta 2 · free for Android and Mac",
    "hero.tagline": "A little farm in your pocket.",
    "hero.lead": "Till the soil, plant seeds, look after your animals, bake bread. Villagers stop at your gate and the lamps light up at dusk. No rush and no ads; your farm keeps growing slowly while you are away.",
    "hero.cta": "Download free", "hero.more": "What's inside?",
    "hero.hint": "Tap the island: harvest ripe wheat, pet the animals.",
    "hero.islandAria": "A small farm island floating in the sky: a bakery, a coop, a field, a pond and villagers walking on the road",
    "stats.levels": "levels", "stats.goods": "goods and dishes", "stats.langs": "languages", "stats.ads": "ads",
    "feat.eyebrow": "Features", "feat.title": "A small farm, a whole world",
    "f1.t": "Plant, water, harvest", "f1.d": "Till your field and sow. Rain waters thirsty crops on its own, and with a sprinkler they never dry out. Harvested soil gets tired; tilling it again is free.",
    "f2.t": "Your animals", "f2.d": "Chickens, cows, sheep, goats, ducks, pigs and bees. Feed them and they give back; keep their homes clean and they are happier.",
    "f3.t": "From oven to table", "f3.d": "Bakery, dairy, pastry shop, kitchen, jam kettle… Turn raw goods into treats and fill the orders.",
    "f4.t": "Village life", "f4.d": "Villagers knock on your gate, a passing truck asks for cargo, and little stories gather on the village board. A fair every week, a festival every season.",
    "f5.t": "A living world", "f5.d": "Daylight follows your own clock: lamps light up in the evening, fireflies come out at night. It rains, storms roll in, and crows eye your fields.",
    "f6.t": "Even while you're away", "f6.d": "Time keeps passing while the game is closed. You get a note when goods are ready, and after a long break a summary and a small gift welcome you back.",
    "lv.eyebrow": "Level by level", "lv.title": "From a handful of wheat to a jam kettle",
    "lv.sub": "Every level opens something new. Your farm grows with you: the land expands from 10×10 to 22×22.",
    "gal.eyebrow": "Screenshots", "gal.title": "Every corner looks hand-made",
    "gal.sub": "Buildings, animals, villagers and icons are modelled in Blender and rendered under the same light.",
    "gal.a1": "The order board: eggs, wheat and a silver-quality egg order",
    "gal.a2": "The fenced farm: fields, bakery, stable, greenhouse, a roadside stand and a truck",
    "gal.a3": "First launch at night: the guide card and glowing lamps",
    "dl.eyebrow": "Download", "dl.title": "Your farm is waiting", "dl.version": "Latest:",
    "dl.android": "Phone and tablet · Android 9 or later", "dl.apk": "Download APK",
    "dl.mac": "Apple silicon Mac (M1 or later)", "dl.dmg": "Download DMG",
    "dl.ios": "Ready; coming here once it is on the App Store", "dl.soon": "Coming soon",
    "dl.sync": "Sign in with Play Games, Google or Apple if you like, and your farm follows you between phone, tablet and Mac. Everything works without an account too.",
    "dl.howto": "If installing gets stuck",
    "dl.howA": "Download and open the APK. Your phone may ask you to allow installs from unknown sources; allow it and finish the install.",
    "dl.howM": "Open the DMG and drag PocketFarm into Applications. The app is not notarized by Apple yet, so macOS stops it the first time: go to System Settings → Privacy & Security and press “Open Anyway” at the bottom.",
    "dl.howB": "This is a beta, so you may run into bugs. Opening an issue on GitHub helps a lot.",
    "dl.all": "All releases and release notes →",
    "pv.title": "Privacy",
    "pv.p1": "No ads, analytics or tracking. If you don't sign in, your farm stays on your device only.",
    "pv.p2": "If you sign in, your farm save, level, coins and device name are stored in Google Firebase under your account. You can delete your account and cloud save at any time from the game's Settings.",
    "pv.p3": "The game asks the internet for the time at launch so that moving the clock forward doesn't pay off. This site uses no cookies; it only asks GitHub for the latest release.",
    "ft.releases": "Releases", "ft.issues": "Report a bug", "ft.privacy": "Privacy",
    "ft.note": "Typeface: Baloo 2 (SIL Open Font License). All game art is the game's own renders.",
  };
  const LEVELS = [
    ["1", ["item_wheat", "item_egg"], "Buğday ve tavuk", "Wheat and chickens"],
    ["2–3", ["item_corn", "item_carrot"], "Mısır, havuç, ağaç ve çiçek", "Corn, carrots, trees and flowers"],
    ["4", ["ui_water", "ui_land"], "Fıskiye ve yeni arazi", "Sprinklers and more land"],
    ["5", ["item_milk"], "İnek, ahır ve köpek", "Cows, a stable and a dog"],
    ["6", ["item_bread"], "Fırın", "Bakery"],
    ["7", ["item_pumpkin"], "Mevsimlik ekinler ve traktör", "Seasonal crops and a tractor"],
    ["8", ["item_cheese", "item_butter"], "Mandıra ve kedi", "Dairy and a cat"],
    ["9", ["item_cake", "item_cookie"], "Pastane", "Pastry shop"],
    ["10", ["item_wool"], "Koyun ve ağıl", "Sheep and a pen"],
    ["11", ["item_sunflower_oil"], "Ayçiçeği ve yağhane", "Sunflowers and an oil mill"],
    ["12", ["item_honey"], "Arı kovanı ve biçerdöver", "Beehive and a harvester"],
    ["13", ["item_menemen", "item_tomato"], "Domates ve mutfak", "Tomatoes and a kitchen"],
    ["14", ["item_sweater"], "Dokuma tezgâhı", "Loom"],
    ["15–16", ["item_grilled_fish", "item_fish_soup"], "İskele ve balık", "Dock and fishing"],
    ["17", ["item_apple_pie"], "Elma ağacı", "Apple trees"],
    ["18", ["item_cherry_jam"], "Kiraz ve reçel kazanı", "Cherries and a jam kettle"],
    ["19", ["item_strawberry_jam"], "Sera", "Greenhouse"],
    ["20–22", ["item_goat_cheese", "item_truffle_oil"], "Keçi, ördek ve domuz", "Goats, ducks and pigs"],
  ];

  const TR = {};
  document.querySelectorAll("[data-i18n]").forEach((el) => { TR[el.dataset.i18n] = el.textContent; });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => { TR[el.dataset.i18nAlt] = el.alt; });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => { TR[el.dataset.i18nAria] = el.getAttribute("aria-label"); });
  const TR_TITLE = document.title;

  let lang = "tr";
  try { lang = localStorage.getItem("pf-lang") || ""; } catch (e) { /* özel pencere */ }
  if (!lang) lang = (navigator.language || "tr").toLowerCase().startsWith("tr") ? "tr" : "en";

  function applyLang() {
    const dict = lang === "en" ? EN : TR;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { const v = dict[el.dataset.i18n]; if (v) el.textContent = v; });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => { const v = dict[el.dataset.i18nAlt]; if (v) el.alt = v; });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => { const v = dict[el.dataset.i18nAria]; if (v) el.setAttribute("aria-label", v); });
    document.title = lang === "en" ? "PocketFarm — A little farm in your pocket" : TR_TITLE;
    const btn = document.getElementById("langBtn");
    btn.textContent = lang === "en" ? "TR" : "EN";
    btn.setAttribute("aria-label", lang === "en" ? "Türkçeye geç" : "Switch to English");
    document.querySelectorAll(".step p").forEach((p) => { p.textContent = p.dataset[lang]; });
  }
  document.getElementById("langBtn").addEventListener("click", () => {
    lang = lang === "en" ? "tr" : "en";
    try { localStorage.setItem("pf-lang", lang); } catch (e) { /* önemli değil */ }
    applyLang();
  });

  // ---------- Sprite yardımcıları ----------
  const url = (name) => `${BASE}sprites/${name}.webp`;

  /** el'i [name] sprite'ının ilk karesiyle s ölçeğinde boyar; animasyonluysa kaydeder. */
  function paint(el, name, s, phase = Math.random() * 10) {
    const m = SPR[name];
    if (!m) return null;
    const n = m.frames || 1;
    el.style.width = `${m.w * s}px`;
    el.style.height = `${m.h * s}px`;
    el.style.backgroundImage = `url(${url(name)})`;
    el.style.backgroundSize = `${m.w * n * s}px ${m.h * s}px`;
    el.style.backgroundPosition = "0 0";
    el.style.backgroundRepeat = "no-repeat";
    let a = el._anim;
    if (n > 1) {
      if (!a) { a = { el }; anims.push(a); el._anim = a; }
      Object.assign(a, { fw: m.w * s, n, fps: m.fps, phase, frame: -1, name });
    } else if (a) {
      anims.splice(anims.indexOf(a), 1);
      el._anim = null;
    }
    return m;
  }

  function icon(el, name) {
    el.style.backgroundImage = `url(${url(name)})`;
    el.style.backgroundSize = "contain";
    el.style.backgroundPosition = "center";
    el.style.backgroundRepeat = "no-repeat";
  }

  // ---------- Gökyüzü ----------
  const hero = document.querySelector(".hero");
  const TIMES = ["dawn", "day", "dusk", "night"];
  const ORB = { dawn: ["56%", "44%"], day: ["70%", "7%"], dusk: ["86%", "36%"], night: ["74%", "9%"] };
  const THEME = { dawn: "#f7c6a3", day: "#5fb4f2", dusk: "#3d4f97", night: "#070f2a" };
  function timeFromClock() {
    const h = new Date().getHours();
    if (h >= 5 && h < 8) return "dawn";
    if (h >= 8 && h < 17) return "day";
    if (h >= 17 && h < 20) return "dusk";
    return "night";
  }
  function setTime(t) {
    hero.dataset.time = t;
    const [x, y] = ORB[t];
    hero.style.setProperty("--orb-x", x);
    hero.style.setProperty("--orb-y", y);
    document.querySelector('meta[name="theme-color"]').content = THEME[t];
    const ic = document.querySelector(".time-icon");
    if (t === "night") {
      ic.style.backgroundImage = "none";
      ic.style.borderRadius = "50%";
      ic.style.boxShadow = "inset -6px -3px 0 0 #f3d36b";
    } else {
      icon(ic, "ui_sun");
      ic.style.boxShadow = "none";
    }
  }
  document.getElementById("timeBtn").addEventListener("click", () => {
    setTime(TIMES[(TIMES.indexOf(hero.dataset.time) + 1) % TIMES.length]);
  });

  function makeClouds() {
    const rnd = (a, b) => a + Math.random() * (b - a);
    const add = (layer, count, opts) => {
      for (let i = 0; i < count; i++) {
        const c = document.createElement("div");
        c.className = "cloud";
        c.innerHTML = "<i></i><b></b>";
        const dur = rnd(...opts.dur);
        c.style.setProperty("--top", `${rnd(...opts.top)}%`);
        c.style.setProperty("--w", `${rnd(...opts.w)}px`);
        c.style.setProperty("--dur", `${dur}s`);
        c.style.setProperty("--delay", `${-rnd(0, dur)}s`);
        c.style.setProperty("--o", rnd(...opts.o).toFixed(2));
        layer.appendChild(c);
      }
    };
    add(document.querySelector(".clouds.back"), 7, { top: [4, 62], w: [90, 220], dur: [90, 170], o: [.55, .95] });
    add(document.querySelector(".clouds.front"), 2, { top: [80, 92], w: [160, 260], dur: [70, 110], o: [.75, .95] });
    // Adanın önünden geçen iki bulut: metnin üstüne binmesinler diye adanın kutusunda
    const local = document.createElement("div");
    local.className = "clouds local";
    document.getElementById("islandWrap").appendChild(local);
    add(local, 2, { top: [52, 78], w: [140, 220], dur: [38, 60], o: [.8, .95] });
  }

  // ---------- Ada ----------
  const T = 64;           // karo genişliği (ada birimleri, CSS px)
  const N = 10;           // ada N×N karo
  const K = T / 128;      // sprite ölçeği: WebP'lerde karo 128 px
  const OX = N * T / 2;
  const OY = 130;         // arka köşedeki uzun sprite'lara yer
  const SOIL = 26;        // yan yüzlerdeki toprak katmanı
  const W = N * T;
  const H = OY + N * T / 2 + 160;
  const iso = (gx, gy) => [OX + (gx - gy) * T / 2, OY + (gx + gy) * T / 4];

  let world, layer, glows, coinCount = 0;

  function svgEl(tag, attrs, parent) {
    const e = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  const pts = (list) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const quad = (x0, y0, x1, y1) => [iso(x0, y0), iso(x1, y0), iso(x1, y1), iso(x0, y1)];

  // Tohumlu rastgele: ada her açılışta aynı görünsün
  let seed = 7;
  const srnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  function buildGround() {
    const svg = svgEl("svg", { class: "ground", width: W, height: H, viewBox: `0 0 ${W} ${H}` });
    const defs = svgEl("defs", {}, svg);
    const pattern = (id, tex, size, extra) => {
      const p = svgEl("pattern", { id, patternUnits: "userSpaceOnUse", width: size, height: size, ...extra }, defs);
      svgEl("image", { href: `${BASE}textures/${tex}.webp`, width: size, height: size }, p);
      return p;
    };
    pattern("g", "grass", 128);
    pattern("d", "dirt", 112);
    pattern("s", "soil", 96);
    const wp = pattern("w", "water", 96);
    if (!REDUCED) svgEl("animateTransform", { attributeName: "patternTransform", type: "translate", from: "0 0", to: "96 0", dur: "16s", repeatCount: "indefinite" }, wp);
    const grad = (id, stops, x2 = 0, y2 = 1) => {
      const g = svgEl("linearGradient", { id, x1: 0, y1: 0, x2, y2 }, defs);
      stops.forEach(([o, c, a]) => svgEl("stop", { offset: o, "stop-color": c, "stop-opacity": a ?? 1 }, g));
    };
    grad("rockL", [[0, "#8a6a4a"], [1, "#4d3a2b"]]);
    grad("rockR", [[0, "#6b5038"], [1, "#3a2b1f"]]);
    grad("shade", [[0, "#000", 0], [1, "#1d3a0c", .16]]);

    const top = [iso(0, 0), iso(N, 0), iso(N, N), iso(0, N)];
    const [L, F, R] = [iso(0, N), iso(N, N), iso(N, 0)];

    // Alt kaya: yan yüzlerin altından ortadaki uca sivrilen, pürüzlü bir koni
    const edgeY = (x) => (x <= OX ? L[1] + (F[1] - L[1]) * (x / OX) : F[1] + (R[1] - F[1]) * ((x - OX) / OX)) + SOIL;
    const bottom = [];
    for (let i = 0; i <= 24; i++) {
      const x = (W * i) / 24;
      const u = Math.abs((2 * x) / W - 1);
      const depth = 128 * Math.pow(1 - u, 1.25) + 10 + (srnd() - .5) * 22 * (1 - u * .6);
      bottom.push([x, edgeY(x) + depth]);
    }
    const leftRock = [[0, edgeY(0)], [OX, edgeY(OX)], ...bottom.filter(([x]) => x <= OX).reverse()];
    const rightRock = [[OX, edgeY(OX)], [W, edgeY(W)], ...bottom.filter(([x]) => x >= OX).reverse()];
    svgEl("polygon", { points: pts(leftRock), fill: "url(#rockL)" }, svg);
    svgEl("polygon", { points: pts(rightRock), fill: "url(#rockR)" }, svg);
    // Katman çizgileri
    for (const f of [.35, .62]) {
      const line = bottom.map(([x, y]) => [x, edgeY(x) + (y - edgeY(x)) * f + (srnd() - .5) * 4]);
      svgEl("polyline", { points: pts(line), fill: "none", stroke: "rgba(0,0,0,.18)", "stroke-width": 2, "stroke-linecap": "round" }, svg);
    }
    // Toprak katmanı
    const soilL = [L, F, [F[0], F[1] + SOIL], [L[0], L[1] + SOIL]];
    const soilR = [F, R, [R[0], R[1] + SOIL], [F[0], F[1] + SOIL]];
    soilPatch(svg, soilL, "#94603a");
    soilPatch(svg, soilR, "#94603a");
    svgEl("polygon", { points: pts(soilR), fill: "rgba(0,0,0,.3)" }, svg);
    // Çimen dudağı
    svgEl("polygon", { points: pts([L, F, [F[0], F[1] + 7], [L[0], L[1] + 7]]), fill: "#4f9a2c" }, svg);
    svgEl("polygon", { points: pts([F, R, [R[0], R[1] + 7], [F[0], F[1] + 7]]), fill: "#3d7d22" }, svg);

    // Üst yüz
    svgEl("polygon", { points: pts(top), fill: "url(#g)" }, svg);
    svgEl("polygon", { points: pts(top), fill: "url(#shade)" }, svg);

    // Yol (gx 1–2 boyunca) ve kapı patikası
    svgEl("polygon", { points: pts(quad(1, 0, 2, N)), fill: "url(#d)" }, svg);
    svgEl("polygon", { points: pts(quad(2, 4.55, 4.4, 5.45)), fill: "url(#d)", opacity: .85 }, svg);
    for (const gx of [1, 2]) {
      svgEl("line", { x1: iso(gx, 0)[0], y1: iso(gx, 0)[1], x2: iso(gx, N)[0], y2: iso(gx, N)[1], stroke: "rgba(70,45,20,.22)", "stroke-width": 2 }, svg);
    }
    // Tarla
    soilPatch(svg, quad(6, .5, 9, 3.5));
    for (let r = .83; r < 3.5; r += .33) {
      const a = iso(6.05, r), b = iso(8.95, r);
      svgEl("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: "rgba(40,22,8,.22)", "stroke-width": 1.4 }, svg);
    }
    // Kümes avlusu
    svgEl("polygon", { points: pts(quad(3.5, 7.4, 6.4, 9.8)), fill: "url(#d)", opacity: .55 }, svg);
    // Gölet: kıyı + su
    const pond = (r) => {
      const out = [];
      for (let i = 0; i < 32; i++) {
        const a = (i / 32) * Math.PI * 2;
        const wob = 1 + Math.sin(a * 3 + 1) * .06 + Math.cos(a * 5) * .04;
        out.push(iso(POND.x + Math.cos(a) * r * wob, POND.y + Math.sin(a) * r * wob));
      }
      return out;
    };
    svgEl("polygon", { points: pts(pond(POND.r + .2)), fill: "#cdb27a" }, svg);
    svgEl("polygon", { points: pts(pond(POND.r)), fill: "url(#w)" }, svg);
    svgEl("polygon", { points: pts(pond(POND.r)), fill: "none", stroke: "rgba(255,255,255,.35)", "stroke-width": 2 }, svg);
    return svg;
  }

  /** Oyundaki gibi: kahverengi taban, üstüne çarpılan kesek dokusu. */
  function soilPatch(svg, poly, color = "#8b5a32") {
    svgEl("polygon", { points: pts(poly), fill: color }, svg);
    svgEl("polygon", { points: pts(poly), fill: "url(#s)", style: "mix-blend-mode:multiply" }, svg);
  }

  const POND = { x: 7.25, y: 6.35, r: 1.12 };

  /** (gx, gy) çapasına bir sprite koyar. */
  function place(name, gx, gy, opts = {}) {
    const el = document.createElement("div");
    el.className = "spr";
    const s = K * (opts.scale || 1);
    const m = paint(el, name, s);
    if (!m) return null;
    el._s = s;
    position(el, m, gx, gy);
    if (opts.sway) {
      el.classList.add("sway");
      el.style.setProperty("--ox", `${m.ax * s}px`);
      el.style.setProperty("--oy", `${m.ay * s}px`);
      el.style.setProperty("--sd", `${2.6 + srnd() * 1.6}s`);
      el.style.setProperty("--sdl", `${-srnd() * 3}s`);
    }
    if (opts.tap) { el.classList.add("tap"); el.addEventListener("click", (e) => opts.tap(el, e)); }
    layer.appendChild(el);
    return el;
  }
  function position(el, m, gx, gy, z) {
    const [x, y] = iso(gx, gy);
    const s = el._s;
    el.style.left = `${x - m.ax * s}px`;
    el.style.top = `${y - m.ay * s}px`;
    el.style.zIndex = z ?? Math.round((gx + gy) * 100);
    el._gx = gx; el._gy = gy;
  }

  /** Adanın üstünde, tıklanan noktadan yükselen küçük bir simge. */
  function floatUp(name, x, y) {
    const f = document.createElement("div");
    f.className = "float-item";
    icon(f, name);
    f.style.left = `${x - 20}px`;
    f.style.top = `${y - 40}px`;
    layer.appendChild(f);
    setTimeout(() => f.remove(), 1000);
  }
  const headOf = (el) => [parseFloat(el.style.left) + parseFloat(el.style.width) / 2, parseFloat(el.style.top) + 6];

  function addCoins(n) {
    coinCount += n;
    const pill = document.getElementById("coinPill");
    pill.hidden = false;
    document.getElementById("coinCount").textContent = coinCount;
    pill.classList.remove("bump");
    void pill.offsetWidth;
    pill.classList.add("bump");
  }

  function regrow(el, key, stages) {
    let i = 0;
    const next = () => {
      const name = stages[i];
      const m = paint(el, name, el._s);
      position(el, m, el._gx, el._gy);
      el.style.setProperty("--ox", `${m.ax * el._s}px`);
      el.style.setProperty("--oy", `${m.ay * el._s}px`);
      el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop");
      el.dataset.ripe = i === stages.length - 1 ? "1" : "";
      if (++i < stages.length) setTimeout(next, 2600);
    };
    next();
  }

  function harvest(el) {
    if (!el.dataset.ripe) return;
    const [x, y] = headOf(el);
    floatUp("item_wheat", x, y);
    setTimeout(() => floatUp("ui_coin", x + 10, y - 6), 180);
    addCoins(1);
    regrow(el, "wheat", ["crop_wheat_s0", "crop_wheat_s1", "crop_wheat_s2_v1", "crop_wheat_s3"]);
  }
  const love = (el) => {
    const [x, y] = headOf(el);
    floatUp("ui_heart", x, y + 10);
    el.classList.remove("hop"); void el.offsetWidth; el.classList.add("hop");
  };
  const gives = (item) => (el, e) => {
    const r = layer.getBoundingClientRect();
    const sc = r.width / W;
    floatUp(item, (e.clientX - r.left) / sc, (e.clientY - r.top) / sc);
  };

  function buildIsland() {
    const island = document.getElementById("island");
    island.style.width = `${W}px`;
    island.style.height = `${H}px`;
    world = document.createElement("div");
    world.className = "world";
    world.appendChild(buildGround());
    layer = document.createElement("div");
    layer.style.position = "absolute";
    layer.style.inset = "0";
    world.appendChild(layer);
    island.appendChild(world);
    glows = document.createElement("div");
    glows.className = "glows";
    island.appendChild(glows);

    // Yolun solundaki şerit: ağaçlar ve fenerler
    place("object_pine", .45, .5);
    place("object_tree", .45, 3.7, { sway: true });
    place("object_pine", .5, 7.1);
    place("object_tree", .5, 9.5, { sway: true });
    for (const gy of [2.1, 5.4, 8.5]) {
      place("world_lamp", .9, gy);
      const [x, y] = iso(.9, gy);
      const g = document.createElement("div");
      g.className = "glow";
      g.style.left = `${x + 3}px`;
      g.style.top = `${y - 58}px`;
      glows.appendChild(g);
    }
    place("world_story_board", 2.55, 2.4);
    place("world_mailbox", 2.5, 6.3);
    place("world_crate", 2.45, 8.3);
    place("world_crate", 2.6, 8.9);

    // Çit: yol tarafı, kapı gy 4–6 arasında
    for (let j = 0; j < N; j++) {
      if (j === 4 || j === 5) continue;
      place("world_fence_y", 3, j + .5);
      place("world_fence_post", 3, j);
    }
    place("world_fence_post", 3, N);
    place("world_farm_gate", 3, 5);

    // Çiftlik
    place("object_bakery", 4.9, 1.9, { tap: gives("item_bread") });
    place("object_coop", 4.3, 7.9, { tap: gives("item_egg") });
    place("object_stable", 8.8, 8.8, { tap: gives("item_milk") });
    place("object_well", 5.1, 6.6);
    place("object_hay_bales", 6.9, 8.2);
    place("object_apple_tree_fruit", 9.45, .9, { sway: true, tap: gives("item_apple") });
    place("object_cherry_tree_fruit", 9.45, 2.9, { sway: true, tap: gives("item_cherry_jam") });
    place("object_beehive", 9.4, 4.6, { tap: gives("item_honey") });
    place("object_flowers", 9.35, 5.7, { sway: true });
    place("object_flowers", 5.6, 4.0, { sway: true });
    place("object_pine", 9.5, 9.6);

    // Tarla
    for (const gy of [1, 2]) {
      for (const gx of [6.5, 7.5, 8.5]) {
        const c = place("crop_wheat_s3", gx, gy, { sway: true, tap: harvest });
        c.dataset.ripe = "1";
      }
    }
    place("crop_sunflower_s3", 6.5, 3, { sway: true });
    place("crop_corn_s3", 7.5, 3, { sway: true });
    place("crop_pumpkin_s3", 8.5, 3);

    // Hayvanlar
    place("animal_cow_eat_sw", 7.3, 9.4, { tap: love });
    place("animal_cow_idle_se", 9.3, 7.2, { tap: love });
    place("animal_sheep_eat_sw", 5.9, 5.4, { tap: love });
    place("animal_dog_happy_se", 4.3, 4.0, { tap: love });
    place("animal_cat_sleep_se", 6.4, .3, { tap: love });

    // Yürüyenler
    for (let i = 0; i < 4; i++) actors.push(chicken(3.7 + srnd() * 2.4, 8.8 + srnd() * .8));
    actors.push(duck("bird_duck_brown_swim", .66, 0, .3));
    actors.push(duck("bird_duckling_swim", .66, -.6, .3, .85));
    actors.push(duck("bird_duckling_swim", .66, -1.05, .3, .85));
    actors.push(duck("bird_duck_white_swim", .32, Math.PI, -.45));
    actors.push(walker(0), walker(6000));
    actors.push(truck());
    if (!REDUCED) fireflies();
  }

  // ---------- Hareket edenler ----------
  const actors = [];
  const facing = (dx, dy) => (Math.abs(dx) >= Math.abs(dy) ? (dx >= 0 ? "se" : "nw") : (dy >= 0 ? "sw" : "ne"));

  function chicken(gx, gy) {
    const el = place("animal_chicken_idle_se", gx, gy, { tap: love });
    const a = { el, gx, gy, state: "idle", until: 0, tx: gx, ty: gy, dir: "se", leg: 0 };
    const setSprite = (name) => {
      if (el._name === name) return;
      el._name = name;
      position(el, paint(el, name, el._s), a.gx, a.gy);
    };
    a.step = (now, dt) => {
      if (now > a.until && a.state !== "walk") {
        if (a.state === "idle" && srnd() < .6) {
          a.state = "walk";
          a.tx = 3.7 + srnd() * 2.5; a.ty = 8.7 + srnd() * 1.0; a.leg = 0;
        } else {
          a.state = srnd() < .5 ? "eat" : "idle";
          a.until = now + 1500 + srnd() * 2500;
          const n = `animal_chicken_${a.state}_${a.dir === "sw" ? "sw" : "se"}`;
          setSprite(SPR[n] ? n : "animal_chicken_idle_se");
        }
      }
      if (a.state === "walk") {
        // Önce x, sonra y: sprite yönü harekete tam uysun
        const v = .9 * dt / 1000;
        const dx = a.tx - a.gx, dy = a.ty - a.gy;
        if (Math.abs(dx) > .02) { a.dir = facing(dx, 0); a.gx += Math.sign(dx) * Math.min(v, Math.abs(dx)); }
        else if (Math.abs(dy) > .02) { a.dir = facing(0, dy); a.gy += Math.sign(dy) * Math.min(v, Math.abs(dy)); }
        else { a.state = "idle"; a.until = now + 800 + srnd() * 1500; }
        setSprite(`animal_chicken_walk_${a.dir}`);
        position(el, SPR[el._name], a.gx, a.gy);
      }
    };
    return a;
  }

  function duck(base, r, phase, speed, scale = 1) {
    const el = place(`${base}_se`, POND.x, POND.y, { scale, tap: love });
    const a = { el, ang: phase };
    a.step = (now, dt) => {
      a.ang += speed * dt / 1000;
      const gx = POND.x + Math.cos(a.ang) * r, gy = POND.y + Math.sin(a.ang) * r;
      const dir = facing(-Math.sin(a.ang) * speed, Math.cos(a.ang) * speed);
      const name = `${base}_${dir}`;
      if (el._name !== name) { el._name = name; paint(el, name, el._s, el._anim ? el._anim.phase : 0); }
      position(el, SPR[name], gx, gy, Math.round((POND.x + POND.y) * 100 - 50));
    };
    return a;
  }

  const VILLAGERS = ["farmer", "granny", "kid", "baker"];
  function walker(delay) {
    const el = document.createElement("div");
    el.className = "spr tap";
    el._s = K;
    el.addEventListener("click", () => love(el));
    layer.appendChild(el);
    const a = { el, state: "wait", until: performance.now() + delay, gy: 0, v: 0, who: "farmer", lane: 1.5 };
    const show = (name) => {
      if (el._name === name) return;
      el._name = name;
      paint(el, name, K);
    };
    a.step = (now, dt) => {
      if (a.state === "wait") {
        el.style.opacity = 0;
        if (now < a.until) return;
        a.who = VILLAGERS[Math.floor(srnd() * VILLAGERS.length)];
        const down = srnd() < .55;
        a.v = (down ? 1 : -1) * (.75 + srnd() * .2);
        a.gy = down ? -.6 : N + .6;
        a.lane = down ? 1.38 : 1.66;
        a.stopAt = down && srnd() < .6 ? 6 + (srnd() - .5) * .4 : null;
        a.state = "walk";
      }
      if (a.state === "pause") {
        if (now > a.until) { a.state = "walk"; a.stopAt = null; }
      } else if (a.state === "walk") {
        a.gy += a.v * dt / 1000;
        if (a.stopAt != null && a.gy >= a.stopAt) {
          a.state = "pause"; a.until = now + 2500 + srnd() * 2000;
          const idle = `villager_${a.who}_idle_se`;
          show(SPR[idle] ? idle : `villager_${a.who}_idle_sw`);
        } else {
          show(`villager_${a.who}_walk_${a.v > 0 ? "sw" : "ne"}`);
        }
        if ((a.v > 0 && a.gy > N + .6) || (a.v < 0 && a.gy < -.6)) {
          a.state = "wait"; a.until = now + 1500 + srnd() * 5000;
          return;
        }
      }
      const edge = Math.min(a.gy + .4, N + .4 - a.gy);
      el.style.opacity = Math.max(0, Math.min(1, edge / .7));
      position(el, SPR[el._name], a.lane, a.gy);
    };
    return a;
  }

  function truck() {
    const el = place("world_truck", 1.5, -2);
    el.style.opacity = 0;
    const a = { el, gy: -2, next: performance.now() + 9000, driving: false };
    a.step = (now, dt) => {
      if (!a.driving) {
        if (now < a.next) return;
        a.driving = true; a.gy = -1.4;
      }
      a.gy += 1.6 * dt / 1000;
      if (a.gy > N + 1.4) { a.driving = false; a.next = now + 20000 + srnd() * 15000; el.style.opacity = 0; return; }
      const edge = Math.min(a.gy + 1.2, N + 1.2 - a.gy);
      el.style.opacity = Math.max(0, Math.min(1, edge / .9));
      position(el, SPR.world_truck, 1.5, a.gy);
    };
    return a;
  }

  function fireflies() {
    for (let i = 0; i < 9; i++) {
      const f = document.createElement("div");
      f.className = "firefly";
      const [x, y] = iso(1 + srnd() * 8, 1 + srnd() * 8);
      f.style.left = `${x}px`;
      f.style.top = `${y - 20 - srnd() * 30}px`;
      f.style.setProperty("--fx", `${(srnd() - .5) * 60}px`);
      f.style.setProperty("--fy", `${(srnd() - .5) * 40}px`);
      f.style.setProperty("--d", `${3 + srnd() * 4}s`);
      f.style.setProperty("--dl", `${-srnd() * 4}s`);
      glows.appendChild(f);
    }
  }

  // Gökte arada bir geçen karga
  function crowFlights() {
    const birds = document.getElementById("birds");
    const fly = () => {
      if (document.hidden) return setTimeout(fly, 4000);
      const el = document.createElement("div");
      el.className = "bird";
      const right = Math.random() < .5;
      const name = right ? "bird_crow_fly_fly_ne" : "bird_crow_fly_fly_nw";
      const m = paint(el, name, .9, 0);
      birds.appendChild(el);
      const w = birds.clientWidth, h = birds.clientHeight;
      const y0 = h * (.35 + Math.random() * .25), y1 = y0 - h * (.18 + Math.random() * .1);
      const x0 = right ? -m.w : w + m.w, x1 = right ? w + m.w : -m.w;
      const t0 = performance.now(), dur = 9000 + Math.random() * 3000;
      const move = (now) => {
        const t = (now - t0) / dur;
        if (t >= 1) { el.remove(); anims.splice(anims.indexOf(el._anim), 1); return; }
        el.style.transform = `translate(${x0 + (x1 - x0) * t}px, ${y0 + (y1 - y0) * t + Math.sin(t * 12) * 6}px)`;
        requestAnimationFrame(move);
      };
      requestAnimationFrame(move);
      setTimeout(fly, 16000 + Math.random() * 14000);
    };
    setTimeout(fly, 5000);
  }

  // ---------- Döngü ----------
  let last = performance.now(), heroVisible = true;
  function loop(now) {
    const dt = Math.min(now - last, 100);
    last = now;
    if (heroVisible) actors.forEach((a) => a.step(now, dt));
    for (const a of anims) {
      const f = REDUCED ? 0 : Math.floor(now / 1000 * a.fps + a.phase) % a.n;
      if (f !== a.frame) { a.frame = f; a.el.style.backgroundPosition = `${-f * a.fw}px 0`; }
    }
    requestAnimationFrame(loop);
  }

  function fitIsland() {
    const wrap = document.getElementById("islandWrap");
    const island = document.getElementById("island");
    const s = Math.min(wrap.clientWidth / W, 1.5);
    island.style.transform = `scale(${s})`;
    island.parentElement.style.height = `${H * s}px`;
    island.parentElement.style.width = `${W * s}px`;
    island.parentElement.style.margin = "0 auto";
  }

  // Fareyle hafif eğim
  function parallax() {
    if (REDUCED || matchMedia("(pointer: coarse)").matches) return;
    const f = document.querySelector(".island-float");
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      f.style.translate = `${px * -14}px ${py * -10}px`;
    });
  }

  // ---------- Bölümler ----------
  function buildSections() {
    document.querySelectorAll("[data-sprite]").forEach((el) => {
      const name = el.dataset.sprite;
      if (el.classList.contains("still")) {
        const s = .75 * parseFloat(getComputedStyle(el).getPropertyValue("--s") || 1);
        const m = paint(el, name, s);
        if (m) el.style.margin = `${-m.ay * s}px 0 0 ${-m.ax * s}px`;
      } else icon(el, name);
    });
    document.querySelectorAll(".vignette .actor").forEach((el) => {
      const sc = parseFloat(el.dataset.scale || 1.2);
      const m = paint(el, el.dataset.anim, sc);
      if (m) el.style.margin = `${-m.ay * sc}px 0 0 ${-m.ax * sc}px`;
    });

    // Büyüyen buğday
    const grow = document.getElementById("growDemo");
    const soil = document.createElement("div");
    soil.className = "soil";
    grow.appendChild(soil);
    const crop = document.createElement("div");
    crop.style.position = "absolute";
    grow.appendChild(crop);
    const stages = ["crop_wheat_s0", "crop_wheat_s1", "crop_wheat_s2_v1", "crop_wheat_s3"];
    let st = 0;
    const showStage = () => {
      const m = paint(crop, stages[st], 1.05);
      crop.style.left = `${75 - m.ax * 1.05}px`;
      crop.style.top = `${80 - m.ay * 1.05}px`;
      crop.animate([{ transform: "scale(.6)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }], { duration: 450, easing: "ease-out" });
      st = (st + 1) % stages.length;
    };
    showStage();
    if (!REDUCED) setInterval(showStage, 1300);

    // Dönen ürünler
    const goods = document.getElementById("goods");
    const items = ["item_bread", "item_cake", "item_apple_pie", "item_cheese", "item_menemen", "item_honey", "item_cookie"];
    items.forEach((n, i) => { const s = document.createElement("span"); icon(s, n); if (!i) s.classList.add("on"); goods.appendChild(s); });
    let gi = 0;
    if (!REDUCED) setInterval(() => { goods.children[gi].classList.remove("on"); gi = (gi + 1) % items.length; goods.children[gi].classList.add("on"); }, 1600);

    // Seviye yolu
    const path = document.getElementById("levelPath");
    LEVELS.forEach(([lv, icons, tr, en], i) => {
      const li = document.createElement("li");
      li.className = "step reveal";
      li.style.setProperty("--rd", `${(i % 6) * 70}ms`);
      li.innerHTML = `<span class="lv">${lv}</span><div class="icons"></div><p></p>`;
      icons.forEach((n) => { const s = document.createElement("span"); icon(s, n); li.querySelector(".icons").appendChild(s); });
      const p = li.querySelector("p");
      p.dataset.tr = tr; p.dataset.en = en; p.textContent = lang === "en" ? en : tr;
      path.appendChild(li);
    });
  }

  function reveals() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: .15, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach((el, i) => {
      if (!el.style.getPropertyValue("--rd") && el.parentElement.children.length > 1) {
        el.style.setProperty("--rd", `${[...el.parentElement.children].indexOf(el) % 6 * 90}ms`);
      }
      io.observe(el);
    });
    new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(hero);
  }

  // ---------- Son sürüm ----------
  async function latestRelease() {
    try {
      const r = await fetch("https://api.github.com/repos/serkantkn/PocketFarm/releases?per_page=10", { headers: { Accept: "application/vnd.github+json" } });
      if (!r.ok) return;
      const rel = (await r.json()).find((x) => !x.draft);
      if (!rel) return;
      document.getElementById("relName").textContent = rel.name || rel.tag_name;
      const mb = (b) => `${Math.round(b / 1e6)} MB`;
      for (const a of rel.assets || []) {
        if (a.name.endsWith(".apk")) { document.getElementById("apkLink").href = a.browser_download_url; document.getElementById("apkSize").textContent = mb(a.size); }
        if (a.name.endsWith(".dmg")) { document.getElementById("dmgLink").href = a.browser_download_url; document.getElementById("dmgSize").textContent = mb(a.size); }
      }
    } catch (e) { /* bağlantılar sabit sürüme düşer */ }
  }

  // ---------- Başlat ----------
  applyLang();
  setTime(timeFromClock());
  makeClouds();
  latestRelease();
  fetch(`${BASE}sprites.json`).then((r) => r.json()).then((json) => {
    SPR = json;
    setTime(hero.dataset.time);
    buildIsland();
    buildSections();
    applyLang();
    fitIsland();
    addEventListener("resize", fitIsland);
    parallax();
    reveals();
    crowFlights();
    requestAnimationFrame(loop);
  });
})();
