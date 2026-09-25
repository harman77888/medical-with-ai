function charts() {
  if (!window.Chart) return;
  let labs = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  new Chart(patientChart, {
    type: "line",
    data: {
      labels: labs,
      datasets: [
        {
          label: "Patients",
          data: [120, 155, 170, 210, 245, 280],
          tension: 0.35,
          borderWidth: 2,
        },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });
  new Chart(revenueChart, {
    type: "bar",
    data: {
      labels: labs,
      datasets: [
        { label: "Revenue", data: [42000, 51000, 47000, 62000, 70000, 76000] },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });
  new Chart(apptChart, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Pending", "Cancelled"],
      datasets: [{ data: [18, 7, 5] }],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });
}
