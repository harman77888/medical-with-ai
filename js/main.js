document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll("[data-menu]")
    .forEach(
      (x) =>
        (x.onclick = () =>
          document.querySelector(".nav")?.classList.toggle("open")),
    );
  document.querySelectorAll("[data-side]").forEach((x) => (x.onclick = side));
  document.querySelector("[data-overlay]")?.addEventListener("click", side);
  document.querySelectorAll("[data-logout]").forEach(
    (x) =>
      (x.onclick = (e) => {
        e.preventDefault();
        logout();
      }),
  );
  document
    .querySelectorAll("[data-close]")
    .forEach((x) => (x.onclick = closeModal));
  document.querySelector("[data-theme]")?.addEventListener("click", theme);
  if (window.lucide) lucide.createIcons();
});
function side() {
  document.querySelector(".side")?.classList.toggle("open");
  document.querySelector(".overlay")?.classList.toggle("show");
}
function toast(m, t = "") {
  let w = document.querySelector(".toastwrap");
  let x = document.createElement("div");
  x.className = "toast " + t;
  x.textContent = m;
  w.appendChild(x);
  setTimeout(() => x.remove(), 3000);
}
function openModal(t, b, f = "") {
  let m = document.querySelector("#modal");
  m.classList.add("open");
  m.querySelector(".mh h3").textContent = t;
  m.querySelector(".mb").innerHTML = b;
  m.querySelector(".mf").innerHTML = f;
}
function closeModal() {
  document.querySelector("#modal")?.classList.remove("open");
}
function theme() {
  let s = get("settings");
  s.theme = s.theme === "dark" ? "light" : "dark";
  save("settings", s);
  location.reload();
}
