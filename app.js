(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const NS = "http://www.w3.org/2000/svg";

  const { SITE, THEMES, LENSES, CHAPTERS } = window;
  const COURSES = window.COURSES.map((c) => ({ ...c, ts: Date.parse(c.d + "T00:00:00Z") }))
    .sort((a, b) => a.ts - b.ts);
  const themeOf = (k) => THEMES.find((t) => t.key === k);
  const color = (k) => `var(--s${themeOf(k).slot})`;
  const fmtDate = (d) => new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  const fmtMon = (d) => new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
  const fmtDur = (m) => (m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? " " + (m % 60) + " min" : ""}` : `${m} min`);
  const hoursOf = (arr) => arr.filter((c) => c.k === "course").reduce((s, c) => s + c.m, 0) / 60;
  const slug = (src) => "certs/" + encodeURIComponent(src.replace(/ /g, "_")) + ".pdf";

  /* ---------- tooltip ---------- */
  const tip = $("#tip");
  function showTip(html, x, y) {
    tip.innerHTML = html; tip.hidden = false;
    const w = tip.offsetWidth, h = tip.offsetHeight;
    tip.style.left = Math.min(x + 14, innerWidth - w - 8) + "px";
    tip.style.top = Math.max(8, y - h - 12) + "px";
  }
  const hideTip = () => (tip.hidden = true);

  /* ---------- theme toggle ---------- */
  const root = document.documentElement;
  try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) {}
  $("#themeBtn").onclick = () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  };

  /* ---------- hero ---------- */
  document.title = `Continuous Learner · ${SITE.name}`;
  $("#brand").textContent = SITE.name;
  $("#tagline").textContent = SITE.tagline;
  const first = COURSES[0], last = COURSES[COURSES.length - 1];
  const years = (last.ts - first.ts) / (365.25 * 864e5);
  const nCourse = COURSES.filter((c) => c.k === "course").length;
  const nPath = COURSES.length - nCourse;
  const stats = [
    [COURSES.length, "credentials completed", 0],
    [hoursOf(COURSES), "hours across individual courses", 0],
    [years, "years of sustained learning", 1],
    [new Set(COURSES.flatMap((c) => c.sk)).size, "distinct skills covered", 0],
  ];
  $("#stats").innerHTML = stats.map(([, l], i) => `<div class="stat"><dt>${l}</dt><dd data-i="${i}">0</dd></div>`).join("");
  $("#statsNote").textContent = `${fmtMon(first.d)} – ${fmtMon(last.d)} · ${nCourse} courses + ${nPath} learning paths · hours exclude the paths to avoid double-counting`;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  stats.forEach(([v, , dec], i) => {
    const el = $(`[data-i="${i}"]`);
    const fmt = (x) => x.toFixed(dec);
    if (reduce) return (el.textContent = fmt(v));
    const t0 = performance.now();
    (function step(t) {
      const p = Math.min(1, (t - t0) / 1100);
      el.textContent = fmt(v * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  });

  /* ---------- lens ---------- */
  const lensChips = $("#lensChips");
  lensChips.innerHTML = LENSES.map((l, i) => `<button class="chip" data-k="${l.key}" aria-pressed="${i === 0}">${esc(l.label)}</button>`).join("");
  function renderLens(key) {
    const l = LENSES.find((x) => x.key === key);
    const items = COURSES.filter((c) => l.themes.includes(c.th));
    const skills = {};
    items.forEach((c) => c.sk.forEach((s) => (skills[s] = (skills[s] || 0) + 1)));
    const top = Object.entries(skills).sort((a, b) => b[1] - a[1]).slice(0, 6).map((x) => x[0]);
    const recent = items.slice(-5).reverse();
    $("#lensOut").innerHTML = `
      <p>${esc(l.blurb)}</p>
      <div class="lens-nums">
        <div><b>${items.length}</b><span>credentials</span></div>
        <div><b>${hoursOf(items).toFixed(1)}</b><span>course hours</span></div>
        <div><b>${fmtMon(items[0].d).split(" ")[1]}–${fmtMon(items[items.length - 1].d).split(" ")[1]}</b><span>span</span></div>
      </div>
      <p><strong>Top skills:</strong> ${top.map(esc).join(" · ")}</p>
      <ul class="mini">${recent.map((c) => `<li><button data-s="${esc(c.src)}"><span>${esc(c.t)}</span><small>${fmtMon(c.d)}</small></button></li>`).join("")}</ul>`;
  }
  lensChips.onclick = (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    lensChips.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", x === b));
    renderLens(b.dataset.k);
  };
  $("#lensOut").onclick = (e) => { const b = e.target.closest("button[data-s]"); if (b) openCard(b.dataset.s); };
  renderLens(LENSES[0].key);

  /* ---------- growth chart (journey) ---------- */
  const W = 640, H = 340, M = { l: 40, r: 46, t: 14, b: 30 };
  const x0 = Date.parse("2021-09-01T00:00:00Z"), x1 = Date.parse("2026-03-01T00:00:00Z");
  const X = (t) => M.l + ((t - x0) / (x1 - x0)) * (W - M.l - M.r);
  const yMax = 50;
  const Y = (v) => H - M.b - (v / yMax) * (H - M.t - M.b);
  const mk = (n, a = {}, p) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); p && p.appendChild(e); return e; };
  const cum = COURSES.map((c, i) => ({ ...c, n: i + 1 }));
  const chTs = (c) => [Date.parse(c.from + "T00:00:00Z"), Date.parse(c.to + "T00:00:00Z")];

  const svg = mk("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": `Cumulative credentials earned, from 0 in September 2021 to ${COURSES.length} in January 2026.` });
  $("#growth").appendChild(svg);
  [0, 10, 20, 30, 40, 50].forEach((v) => {
    mk("line", { x1: M.l, x2: W - M.r, y1: Y(v), y2: Y(v), class: v ? "grid" : "axis" }, svg);
    mk("text", { x: M.l - 8, y: Y(v) + 4, "text-anchor": "end" }, svg).textContent = v;
  });
  [2022, 2023, 2024, 2025, 2026].forEach((yr) => {
    const t = Date.parse(`${yr}-01-01T00:00:00Z`);
    mk("line", { x1: X(t), x2: X(t), y1: M.t, y2: H - M.b, class: "grid" }, svg);
    mk("text", { x: X(t), y: H - 8, "text-anchor": "middle" }, svg).textContent = yr;
  });
  const band = mk("rect", { y: M.t, height: H - M.t - M.b, fill: "var(--accent)", opacity: ".09" }, svg);
  const base = [{ ts: x0, n: 0 }, ...cum];
  const pathD = base.map((p, i) => (i ? `H${X(p.ts)}V${Y(p.n)}` : `M${X(p.ts)} ${Y(0)}`)).join("") + `H${X(x1)}`;
  mk("path", { d: pathD, fill: "none", stroke: "var(--muted)", "stroke-width": 2, "stroke-linejoin": "round", opacity: ".55" }, svg);
  const act = mk("path", { fill: "none", stroke: "var(--accent)", "stroke-width": 3, "stroke-linejoin": "round", "stroke-linecap": "round" }, svg);
  const dots = mk("g", {}, svg);
  const endLbl = mk("text", { x: X(x1) + 6, y: Y(COURSES.length) + 4, class: "lbl" }, svg);
  endLbl.textContent = COURSES.length;
  const cross = mk("line", { y1: M.t, y2: H - M.b, stroke: "var(--ink2)", "stroke-dasharray": "3 3", visibility: "hidden" }, svg);
  const hit = mk("rect", { x: M.l, y: M.t, width: W - M.l - M.r, height: H - M.t - M.b, fill: "transparent" }, svg);
  let curCh = 0;

  function setChapter(i) {
    curCh = i;
    const [a, b] = chTs(CHAPTERS[i]);
    band.setAttribute("x", X(a)); band.setAttribute("width", Math.max(0, X(Math.min(b, x1)) - X(a)));
    const inCh = cum.filter((c) => c.ts >= a && c.ts < b);
    const startN = inCh.length ? inCh[0].n - 1 : 0;
    let d = `M${X(a)} ${Y(startN)}`;
    inCh.forEach((c) => (d += `H${X(c.ts)}V${Y(c.n)}`));
    d += `H${X(Math.min(b, x1))}`;
    act.setAttribute("d", d);
    dots.replaceChildren();
    inCh.forEach((c) => mk("circle", { cx: X(c.ts), cy: Y(c.n), r: 4, fill: color(c.th), stroke: "var(--bg)", "stroke-width": 2 }, dots));
    document.querySelectorAll(".chapter").forEach((el, j) => el.classList.toggle("on", j === i));
  }
  hit.addEventListener("mousemove", (e) => {
    const r = svg.getBoundingClientRect();
    const t = x0 + (((e.clientX - r.left) / r.width) * W - M.l) / (W - M.l - M.r) * (x1 - x0);
    let best = cum[0];
    cum.forEach((c) => { if (Math.abs(c.ts - t) < Math.abs(best.ts - t)) best = c; });
    cross.setAttribute("x1", X(best.ts)); cross.setAttribute("x2", X(best.ts)); cross.setAttribute("visibility", "visible");
    showTip(`<b>#${best.n} · ${esc(best.t)}</b>${fmtDate(best.d)} · ${esc(themeOf(best.th).name)}`, e.clientX, e.clientY);
  });
  hit.addEventListener("mouseleave", () => { cross.setAttribute("visibility", "hidden"); hideTip(); });

  // chapters
  $("#chapters").innerHTML = CHAPTERS.map((c, i) => {
    const [a, b] = chTs(c);
    const items = cum.filter((x) => x.ts >= a && x.ts < b);
    const tc = {}; items.forEach((x) => (tc[x.th] = (tc[x.th] || 0) + 1));
    const topT = Object.entries(tc).sort((p, q) => q[1] - p[1])[0];
    const picks = items.filter((x) => x.k === "path").concat(items.filter((x) => x.k !== "path")).slice(0, 4);
    return `<article class="chapter" data-i="${i}">
      <span class="yr">${esc(c.label)}</span><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p>
      <div class="meta"><span><b>${items.length}</b> credentials</span><span><b>${hoursOf(items).toFixed(1)}</b> course hours</span><span>${topT[1] > 1 ? `Most: <b>${esc(themeOf(topT[0]).name)}</b> (${topT[1]})` : `Spread across <b>${Object.keys(tc).length}</b> themes`}</span></div>
      <div class="picks">${picks.map((p) => `<button class="pick" data-s="${esc(p.src)}">${esc(p.t.length > 38 ? p.t.slice(0, 36) + "…" : p.t)}</button>`).join("")}</div>
    </article>`;
  }).join("");
  $("#chapters").onclick = (e) => { const b = e.target.closest("[data-s]"); if (b) openCard(b.dataset.s); };
  const io = new IntersectionObserver((es) => es.forEach((en) => en.isIntersecting && setChapter(+en.target.dataset.i)), { rootMargin: "-45% 0px -45% 0px" });
  document.querySelectorAll(".chapter").forEach((el) => io.observe(el));
  setChapter(0);

  // table alternative
  $("#growthTbl").innerHTML = `<table class="tbl"><thead><tr><th>Chapter</th><th>Credentials</th><th>Course hours</th><th>Cumulative</th></tr></thead><tbody>${CHAPTERS.map((c) => {
    const [a, b] = chTs(c); const it = cum.filter((x) => x.ts >= a && x.ts < b);
    return `<tr><td>${esc(c.label)}</td><td>${it.length}</td><td>${hoursOf(it).toFixed(1)}</td><td>${it.length ? it[it.length - 1].n : "-"}</td></tr>`;
  }).join("")}</tbody></table>`;
  $("#tblBtn").onclick = (e) => {
    const t = $("#growthTbl"); t.hidden = !t.hidden;
    e.target.setAttribute("aria-expanded", !t.hidden);
    e.target.textContent = t.hidden ? "View as table" : "Hide table";
  };

  /* ---------- explorer ---------- */
  const st = { q: "", type: "", sort: "new", theme: "" };
  const themeChips = $("#themeChips");
  const chipHtml = (k, label, c) => `<button class="chip" data-k="${k}" aria-pressed="${st.theme === k}">${c ? `<span class="dot" style="background:${c}"></span>` : ""}${esc(label)}</button>`;
  function drawChips() {
    themeChips.innerHTML = chipHtml("", "All themes") + THEMES.map((t) => chipHtml(t.key, t.name, `var(--s${t.slot})`)).join("");
  }
  function render() {
    const q = st.q.trim().toLowerCase();
    let a = COURSES.filter((c) => (!st.theme || c.th === st.theme) && (!st.type || c.k === st.type) &&
      (!q || (c.t + " " + c.sk.join(" ")).toLowerCase().includes(q)));
    const s = { new: (x, y) => y.ts - x.ts, old: (x, y) => x.ts - y.ts, long: (x, y) => y.m - x.m, az: (x, y) => x.t.localeCompare(y.t) }[st.sort];
    a = a.slice().sort(s);
    $("#count").textContent = `${a.length} of ${COURSES.length} credentials · ${hoursOf(a).toFixed(1)} course hours`;
    $("#grid").innerHTML = a.length ? a.map((c) => `
      <button class="card" style="--c:${color(c.th)}" data-s="${esc(c.src)}">
        <span class="t">${esc(c.t)}</span>
        <span class="m"><span>${fmtDate(c.d)}</span><span>${fmtDur(c.m)}</span><span>${esc(themeOf(c.th).name)}</span></span>
        <span class="m">${c.k === "path" ? '<span class="badge path">Learning path</span>' : ""}${(c.cr || []).map((x) => `<span class="badge">${esc(x)}</span>`).join("")}</span>
      </button>`).join("") : `<p class="count">No matches. Try clearing a filter.</p>`;
    drawChips();
  }
  $("#q").oninput = (e) => { st.q = e.target.value; render(); };
  $("#type").onchange = (e) => { st.type = e.target.value; render(); };
  $("#sort").onchange = (e) => { st.sort = e.target.value; render(); };
  themeChips.onclick = (e) => { const b = e.target.closest(".chip"); if (b) { st.theme = b.dataset.k; render(); } };
  $("#grid").onclick = (e) => { const b = e.target.closest(".card"); if (b) openCard(b.dataset.s); };
  function filterTheme(k) { st.theme = k; st.q = ""; $("#q").value = ""; render(); $("#explore").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
  function filterQuery(q) { st.q = q; st.theme = ""; $("#q").value = q; render(); $("#explore").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }

  /* ---------- detail dialog ---------- */
  const dlg = $("#dlg");
  function openCard(src) {
    const c = COURSES.find((x) => x.src === src); if (!c) return;
    $("#dlgBody").innerHTML = `
      <span class="badge ${c.k === "path" ? "path" : ""}">${c.k === "path" ? "Learning path" : "Course"}</span>
      <h3 id="dlgT">${esc(c.t)}</h3>
      <dl><dt>Completed</dt><dd>${fmtDate(c.d)}</dd><dt>Duration</dt><dd>${fmtDur(c.m)}</dd>
      <dt>Theme</dt><dd><span class="dot" style="background:${color(c.th)}"></span> ${esc(themeOf(c.th).name)}</dd>
      <dt>Skills</dt><dd>${c.sk.map(esc).join(" · ")}</dd>
      ${c.cr ? `<dt>Credit</dt><dd>${c.cr.map(esc).join(" · ")}</dd>` : ""}
      <dt>Issuer</dt><dd>LinkedIn Learning</dd></dl>
      <a class="btn primary" href="${slug(c.src)}" target="_blank" rel="noopener">Open certificate (PDF)</a>`;
    dlg.showModal();
  }
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });

  /* ---------- theme bars + skills ---------- */
  let metric = "h";
  function drawBars() {
    const rows = THEMES.map((t) => {
      const it = COURSES.filter((c) => c.th === t.key);
      return { t, n: it.length, h: hoursOf(it) };
    }).sort((a, b) => b[metric] - a[metric]);
    const mx = Math.max(...rows.map((r) => r[metric]));
    $("#bars").innerHTML = rows.map((r) => `<button class="bar" style="--c:var(--s${r.t.slot})" data-k="${r.t.key}" aria-label="${esc(r.t.name)}: ${r.n} credentials, ${r.h.toFixed(1)} hours. Filter credentials.">
      <span class="nm"><span class="dot" style="background:var(--s${r.t.slot})"></span>${esc(r.t.name)}</span>
      <span class="tr"><span class="fill" style="display:block" data-w="${(r[metric] / mx) * 100}"></span></span>
      <span class="v">${metric === "h" ? r.h.toFixed(1) + " h" : r.n}</span></button>`).join("");
    requestAnimationFrame(() => document.querySelectorAll(".fill").forEach((f) => (f.style.width = f.dataset.w + "%")));
  }
  $("#bars").onclick = (e) => { const b = e.target.closest(".bar"); if (b) filterTheme(b.dataset.k); };
  $("#bars").addEventListener("mousemove", (e) => {
    const b = e.target.closest(".bar"); if (!b) return hideTip();
    const t = themeOf(b.dataset.k); const it = COURSES.filter((c) => c.th === t.key);
    showTip(`<b>${esc(t.name)}</b>${it.length} credentials · ${hoursOf(it).toFixed(1)} course hours`, e.clientX, e.clientY);
  });
  $("#bars").addEventListener("mouseleave", hideTip);
  document.querySelectorAll(".seg button").forEach((b) => (b.onclick = () => {
    metric = b.dataset.m;
    document.querySelectorAll(".seg button").forEach((x) => x.classList.toggle("on", x === b));
    drawBars();
  }));
  const sc = {}; COURSES.forEach((c) => c.sk.forEach((s) => (sc[s] = (sc[s] || 0) + 1)));
  $("#tags").innerHTML = Object.entries(sc).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([s, n]) => `<button class="tag ${n >= 5 ? "b3" : n >= 2 ? "b2" : ""}" data-q="${esc(s)}" title="${n} credential${n > 1 ? "s" : ""}">${esc(s)}${n > 1 ? " · " + n : ""}</button>`).join("");
  $("#tags").onclick = (e) => { const b = e.target.closest(".tag"); if (b) filterQuery(b.dataset.q); };

  /* ---------- lab: forgetting curve ---------- */
  const LW = 520, LH = 280, LM = { l: 42, r: 14, t: 12, b: 32 }, DAYS = 45, REVIEWS = [1, 3, 7, 14, 30], S0 = 2, BOOST = 2.5;
  const LX = (d) => LM.l + (d / DAYS) * (LW - LM.l - LM.r), LY = (r) => LH - LM.b - r * (LH - LM.t - LM.b);
  function retention(day, n) {
    let S = S0, last = 0;
    for (let i = 0; i < n && REVIEWS[i] <= day; i++) { last = REVIEWS[i]; S *= BOOST; }
    return 1 / (1 + (day - last) / S);
  }
  const lsvg = mk("svg", { viewBox: `0 0 ${LW} ${LH}`, role: "img", "aria-label": "Forgetting curve: retention over 45 days with and without review sessions" });
  $("#curve").appendChild(lsvg);
  [0, 0.25, 0.5, 0.75, 1].forEach((v) => {
    mk("line", { x1: LM.l, x2: LW - LM.r, y1: LY(v), y2: LY(v), class: v ? "grid" : "axis" }, lsvg);
    mk("text", { x: LM.l - 6, y: LY(v) + 4, "text-anchor": "end" }, lsvg).textContent = Math.round(v * 100) + "%";
  });
  [0, 10, 20, 30, 40].forEach((d) => (mk("text", { x: LX(d), y: LH - 10, "text-anchor": "middle" }, lsvg).textContent = d === 0 ? "Day 0" : d));
  const pBase = mk("path", { fill: "none", stroke: "var(--muted)", "stroke-width": 2, "stroke-dasharray": "5 4" }, lsvg);
  const pRev = mk("path", { fill: "none", stroke: "var(--accent)", "stroke-width": 2.5, "stroke-linejoin": "round" }, lsvg);
  const mrk = mk("g", {}, lsvg);
  const lblB = mk("text", { class: "lbl" }, lsvg), lblR = mk("text", { class: "lbl", fill: "var(--accent-ink)" }, lsvg);
  const line = (n) => { let d = ""; for (let t = 0; t <= DAYS; t += 0.25) d += (t ? "L" : "M") + LX(t).toFixed(1) + " " + LY(retention(t, n)).toFixed(1); return d; };
  function drawLab() {
    const n = +$("#rev").value; $("#revN").textContent = n;
    pBase.setAttribute("d", line(0)); pRev.setAttribute("d", line(n));
    mrk.replaceChildren();
    REVIEWS.slice(0, n).forEach((d) => mk("circle", { cx: LX(d), cy: LY(1), r: 5, fill: "var(--accent)", stroke: "var(--surface)", "stroke-width": 2 }, mrk));
    lblB.setAttribute("x", LX(DAYS) - 4); lblB.setAttribute("y", LY(retention(DAYS, 0)) - 8); lblB.setAttribute("text-anchor", "end"); lblB.textContent = "No review";
    lblR.setAttribute("x", LX(DAYS) - 4); lblR.setAttribute("y", LY(retention(DAYS, n)) + 18); lblR.setAttribute("text-anchor", "end"); lblR.textContent = n ? "With review" : "";
    $("#readout").innerHTML = `<div><b>${Math.round(retention(30, 0) * 100)}%</b><span>retained at day 30, no review</span></div><div><b style="color:var(--accent-ink)">${Math.round(retention(30, n) * 100)}%</b><span>retained at day 30, ${n} review${n === 1 ? "" : "s"}</span></div>`;
  }
  $("#rev").oninput = drawLab;
  drawLab();

  /* ---------- footer / init ---------- */
  const ct = SITE.contact;
  const links = [ct.email && `<a href="mailto:${esc(ct.email)}">Email</a>`, ct.linkedin && `<a href="${esc(ct.linkedin)}" rel="noopener">LinkedIn</a>`, ct.website && `<a href="${esc(ct.website)}" rel="noopener">Website</a>`].filter(Boolean);
  $("#contact").innerHTML = links.length ? "Let's talk: " + links.join("") : "";
  render();
  drawBars();
})();
