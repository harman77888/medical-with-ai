let B = {};
function show(n) {
  document
    .querySelectorAll("[id^=step]")
    .forEach((x) => x.classList.add("hidden"));
  document.querySelector("#step" + n).classList.remove("hidden");
}
function initBook() {
  docs.innerHTML = get("doctors")
    .map(
      (d) =>
        `<button class="card panel" onclick="B.d='${d.id}';show(2)"><b>${d.name}</b><p>${d.specialty} · ₹${d.fee}</p></button>`,
    )
    .join("");
  deps.innerHTML = get("departments")
    .map(
      (d) =>
        `<button class="btn secondary" onclick="B.dep='${d}';show(3)">${d}</button>`,
    )
    .join("");
  dates.innerHTML = [1, 2, 3, 4, 5]
    .map(
      (i) =>
        `<button class="btn secondary" onclick="B.date=iso(${i});show(4)">${fmt(iso(i))}</button>`,
    )
    .join("");
  times.innerHTML = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
    .map(
      (t) =>
        `<button class="btn secondary" onclick="B.time='${t}';show(5)">${t}</button>`,
    )
    .join("");
  types.innerHTML = ["In-person", "Video consultation", "Follow-up"]
    .map(
      (t) =>
        `<button class="btn secondary" onclick="B.type='${t}';show(6)">${t}</button>`,
    )
    .join("");
}
function finishBook() {
  let f = new FormData(bookform),
    d = get("doctors").find((x) => x.id === B.d) || get("doctors")[0],
    a = {
      id: gid("APT"),
      doctor: d.name,
      patient: f.get("name"),
      department: B.dep,
      date: B.date,
      time: B.time,
      type: B.type,
      reason: f.get("reason") || "Consultation",
      status: "Confirmed",
    };
  let x = get("appointments");
  x.unshift(a);
  save("appointments", x);
  aid.textContent = a.id;
  show(7);
  toast("Appointment booked successfully.");
}
