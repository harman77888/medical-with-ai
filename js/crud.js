function renderTable(k, body, cols) {
  let b = document.querySelector(body);
  if (!b) return;
  b.innerHTML = get(k)
    .map((r) => `<tr>${cols.map((c) => `<td>${c(r)}</td>`).join("")}</tr>`)
    .join("");
}
function view(k, id) {
  let x = get(k).find((a) => a.id === id);
  openModal(
    "Details",
    Object.entries(x)
      .filter(([a]) => a !== "image")
      .map(
        ([a, v]) =>
          `<p><b>${a}</b><br>${typeof v === "object" ? JSON.stringify(v) : esc(v)}</p>`,
      )
      .join(""),
    '<button class="btn secondary" data-close>Close</button>',
  );
}
function renderDoctors() {
  let q = (
      document.querySelector("#q")?.value ||
      new URLSearchParams(location.search).get("search") ||
      ""
    ).toLowerCase(),
    s = document.querySelector("#sp")?.value || "",
    a = get("doctors").filter(
      (d) =>
        (!q || `${d.name} ${d.specialty}`.toLowerCase().includes(q)) &&
        (!s || d.specialty === s),
    );
  document.querySelector("#doctorgrid").innerHTML =
    a
      .map(
        (d) =>
          `<article class="card feature"><div class="user"><div class="avatar"><img src="${d.image}" alt="${esc(d.name)}"></div><div><h3>${esc(d.name)}</h3><p>${d.specialty}</p></div></div><p>${d.qualification} · ${d.experience} years</p><p>₹${d.fee} · Rating ${d.rating}</p><div class="actions">${badge(d.availability)}<a class="btn primary sm" href="doctor-profile.html?id=${d.id}">View</a></div></article>`,
      )
      .join("") || '<div class="empty">No doctors found.</div>';
}
function renderGeneric(k, id, cols) {
  renderTable(k, id, cols);
}
