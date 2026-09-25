document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-role]").forEach(
    (b) =>
      (b.onclick = () => {
        document
          .querySelectorAll("[data-role]")
          .forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        document.querySelector("#role").value = b.dataset.role;
      }),
  );
  document.querySelector("#login")?.addEventListener("submit", (e) => {
    e.preventDefault();
    let f = new FormData(e.target),
      u = get("users").find(
        (x) =>
          x.email === f.get("email").toLowerCase() &&
          x.password === f.get("password") &&
          x.role === f.get("role"),
      );
    if (!u) return toast("Invalid demo credentials.", "error");
    setCurrent(u);
    location.href =
      u.role === "admin"
        ? "admin-dashboard.html"
        : u.role === "doctor"
          ? "doctor-dashboard.html"
          : "patient-dashboard.html";
  });
  document.querySelector("#register")?.addEventListener("submit", (e) => {
    e.preventDefault();
    let f = new FormData(e.target);
    if (f.get("password") !== f.get("confirm"))
      return toast("Passwords do not match.", "error");
    let u = {
      id: gid("USR"),
      name: f.get("name"),
      email: f.get("email").toLowerCase(),
      password: f.get("password"),
      role: f.get("role"),
    };
    let a = get("users");
    if (a.some((x) => x.email === u.email))
      return toast("Email already registered.", "error");
    a.push(u);
    save("users", a);
    setCurrent(u);
    location.href = "patient-dashboard.html";
  });
});
