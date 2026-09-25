const KEY = {
  users: "medicore_users",
  current: "medicore_current_user",
  appointments: "medicore_appointments",
  patients: "medicore_patients",
  doctors: "medicore_doctors",
  prescriptions: "medicore_prescriptions",
  records: "medicore_records",
  labs: "medicore_lab_reports",
  medicines: "medicore_medicines",
  invoices: "medicore_invoices",
  notifications: "medicore_notifications",
  messages: "medicore_messages",
  settings: "medicore_settings",
  staff: "medicore_staff",
  departments: "medicore_departments",
  audit: "medicore_audit_logs",
};
const departments = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Dermatology",
    "Pediatrics",
    "General Medicine",
    "Gynecology",
    "ENT",
  ],
  names = [
    "Arjun Mehta",
    "Neha Kapoor",
    "Rohan Bedi",
    "Simran Gill",
    "Vikram Sethi",
    "Aisha Sharma",
    "Karan Malhotra",
    "Priya Anand",
    "Manav Arora",
    "Ishita Rao",
    "Aditya Khanna",
    "Meera Joshi",
  ],
  first = [
    "Aarav",
    "Ananya",
    "Kabir",
    "Mehak",
    "Harsh",
    "Navya",
    "Riya",
    "Dev",
    "Ishaan",
    "Simran",
    "Manpreet",
    "Kavya",
    "Arjun",
    "Sanya",
    "Rohan",
    "Tanya",
    "Vivaan",
    "Naina",
    "Aditya",
    "Aditi",
  ],
  last = [
    "Sharma",
    "Kaur",
    "Singh",
    "Mehta",
    "Kapoor",
    "Bedi",
    "Gill",
    "Sethi",
    "Arora",
    "Joshi",
  ];
const pick = (a) => a[Math.floor(Math.random() * a.length)],
  rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a,
  iso = (n) => {
    let d = new Date();
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  },
  fmt = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—",
  gid = (p) =>
    p + Date.now().toString(36).slice(-6).toUpperCase() + rand(10, 99);
function get(k) {
  try {
    return JSON.parse(localStorage.getItem(KEY[k])) ?? [];
  } catch {
    return [];
  }
}
function save(k, v) {
  localStorage.setItem(KEY[k], JSON.stringify(v));
  return v;
}
function esc(s = "") {
  return String(s).replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[m],
  );
}
function badge(s) {
  let x = String(s).toLowerCase(),
    c =
      x.includes("complete") ||
      x.includes("paid") ||
      x === "active" ||
      x === "available" ||
      x === "delivered"
        ? "ok"
        : x.includes("pending") ||
            x.includes("process") ||
            x === "busy" ||
            x === "ready" ||
            x.includes("leave")
          ? "warn"
          : x.includes("cancel") || x.includes("out") || x === "inactive"
            ? "bad"
            : "info";
  return `<span class="badge ${c}">${esc(s)}</span>`;
}
function current() {
  try {
    return JSON.parse(localStorage.getItem(KEY.current));
  } catch {
    return null;
  }
}
function setCurrent(u) {
  localStorage.setItem(KEY.current, JSON.stringify(u));
}
function logout() {
  localStorage.removeItem(KEY.current);
  location.href = "login.html";
}
function requireRole(r) {
  let u = current();
  if (!u) {
    location.href = "login.html";
    return null;
  }
  if (r && u.role !== r) {
    location.href = "404.html";
    return null;
  }
  return u;
}
function seed() {
  if (localStorage.getItem(KEY.doctors)) return;
  let doctors = names.map((n, i) => ({
    id: `DOC${String(i + 1).padStart(3, "0")}`,
    name: "Dr. " + n,
    specialty: departments[i % 8],
    qualification: i % 2 ? "MBBS, MD" : "MBBS, DM",
    experience: 7 + (i % 9),
    fee: 800 + i * 75,
    rating: (4.5 + (i % 5) / 10).toFixed(1),
    availability: i % 4 ? "Available" : "Busy",
    hospital: "MediCore Central Hospital",
    hours: "09:00 AM – 05:00 PM",
    image: `https://i.pravatar.cc/160?img=${10 + i}`,
    about:
      "Experienced clinician focused on evidence-based, patient-centred care.",
  }));
  let patients = Array.from({ length: 20 }, (_, i) => ({
    id: `PAT${String(i + 1).padStart(3, "0")}`,
    name: first[i] + " " + last[i % 10],
    age: 18 + ((i * 3) % 60),
    gender: i % 2 ? "Female" : "Male",
    email: `patient${i + 1}@demo.com`,
    phone: "+91 9" + rand(10000000, 99999999),
    bloodGroup: pick(["A+", "B+", "O+", "AB+"]),
    status: i % 6 ? "Active" : "Inactive",
    condition: pick([
      "Hypertension",
      "Diabetes",
      "Migraine",
      "Asthma",
      "Arthritis",
      "Routine Care",
    ]),
    lastVisit: iso(-(i % 25)),
    allergies: i % 4 ? "None" : "Penicillin",
  }));
  let appointments = Array.from({ length: 30 }, (_, i) => ({
    id: `APT${String(i + 1).padStart(3, "0")}`,
    doctorId: doctors[i % 12].id,
    doctor: doctors[i % 12].name,
    patientId: patients[i % 20].id,
    patient: patients[i % 20].name,
    department: doctors[i % 8].specialty,
    date: iso((i % 14) - 3),
    time: `${String(9 + (i % 8)).padStart(2, "0")}:00`,
    type: i % 3 ? "In-person" : "Video consultation",
    reason: pick([
      "Routine consultation",
      "Follow-up",
      "Persistent symptoms",
      "Annual review",
    ]),
    status: pick(["Confirmed", "Pending", "Completed", "Cancelled"]),
  }));
  let prescriptions = Array.from({ length: 20 }, (_, i) => ({
    id: `RX${String(i + 1).padStart(3, "0")}`,
    patient: patients[i].name,
    doctor: doctors[i % 12].name,
    date: iso(-i),
    medicines: [
      {
        name: pick([
          "Metformin 500mg",
          "Atorvastatin 20mg",
          "Amlodipine 5mg",
          "Paracetamol 500mg",
        ]),
        dosage: "1 tablet",
        frequency: "Twice daily",
        duration: "7 days",
      },
    ],
    instructions: "Take after meals and follow the prescribed schedule.",
  }));
  let records = patients.map((p, i) => ({
    id: `REC${String(i + 1).padStart(3, "0")}`,
    patient: p.name,
    doctor: doctors[i % 12].name,
    date: p.lastVisit,
    diagnosis: p.condition,
    symptoms: "Routine review and reported discomfort",
    treatment: "Continue prescribed medication and follow-up.",
    notes: "Patient counselled on adherence.",
  }));
  let labs = Array.from({ length: 20 }, (_, i) => ({
    id: `LAB${String(i + 1).padStart(3, "0")}`,
    patient: patients[i].name,
    test: [
      "CBC",
      "Blood Glucose",
      "Lipid Profile",
      "Liver Function Test",
      "Kidney Function Test",
      "Thyroid Profile",
    ][i % 6],
    date: iso(-i),
    result: i % 5 ? "Within range" : "Elevated",
    status: i % 4 ? "Completed" : "Pending",
    comments: "",
  }));
  let medicines = Array.from({ length: 30 }, (_, i) => ({
    id: `MED${String(i + 1).padStart(3, "0")}`,
    name: pick([
      "Paracetamol 500mg",
      "Metformin 500mg",
      "Atorvastatin 20mg",
      "Amlodipine 5mg",
      "Cetirizine 10mg",
      "Pantoprazole 40mg",
    ]),
    batch: "B" + rand(1000, 9999),
    supplier: pick(["MedSupply Ltd.", "HealthFirst Pharma", "CareSource"]),
    stock: rand(0, 180),
    expiry: `202${7 + (i % 3)}-${String(1 + (i % 9)).padStart(2, "0")}-${String(1 + (i % 25)).padStart(2, "0")}`,
    price: rand(80, 900),
    status: "Active",
  }));
  let invoices = Array.from({ length: 20 }, (_, i) => {
    let s = rand(600, 3000),
      d = rand(0, 300),
      t = rand(40, 250);
    return {
      id: `INV${String(i + 1).padStart(3, "0")}`,
      patient: patients[i].name,
      doctor: doctors[i % 12].name,
      date: iso(-i),
      services: pick([
        "Consultation",
        "Consultation + Lab",
        "Follow-up",
        "Health Check",
      ]),
      subtotal: s,
      discount: d,
      tax: t,
      total: s - d + t,
      paymentStatus: i % 3 ? "Paid" : "Pending",
    };
  });
  let notifications = Array.from({ length: 20 }, (_, i) => ({
      id: `NT${i + 1}`,
      title: pick([
        "Appointment booked",
        "Lab report ready",
        "Prescription created",
        "Payment received",
        "Appointment reminder",
        "Low pharmacy stock",
      ]),
      message: "MediCore demo notification.",
      date: new Date(Date.now() - i * 3600000).toISOString(),
      read: i % 3 === 0,
    })),
    messages = Array.from({ length: 10 }, (_, i) => ({
      id: `CONV${String(i + 1).padStart(2, "0")}`,
      doctor: doctors[i].name,
      lastMessage: "Your follow-up is scheduled for the next visit.",
      time: "10:" + String(10 + i).padStart(2, "0"),
      unread: i % 3,
    })),
    staff = Array.from({ length: 12 }, (_, i) => ({
      id: `STF${i + 1}`,
      name: first[i] + " " + last[i % 10],
      role: pick([
        "Nurse",
        "Receptionist",
        "Laboratory Staff",
        "Pharmacy Staff",
        "Administrative Staff",
      ]),
      department: pick(departments),
      status: i % 5 ? "Active" : "On Leave",
    }));
  [
    "doctors",
    "patients",
    "appointments",
    "prescriptions",
    "records",
    "labs",
    "medicines",
    "invoices",
    "notifications",
    "messages",
    "staff",
    "departments",
  ].forEach((k, i) =>
    save(
      k,
      [
        doctors,
        patients,
        appointments,
        prescriptions,
        records,
        labs,
        medicines,
        invoices,
        notifications,
        messages,
        staff,
        departments,
      ][i],
    ),
  );
  save("settings", { theme: "light" });
  save("users", [
    {
      id: "USR001",
      name: "Demo Patient",
      email: "patient@medicore.demo",
      password: "patient123",
      role: "patient",
    },
    {
      id: "USR002",
      name: "Dr. Arjun Mehta",
      email: "doctor@medicore.demo",
      password: "doctor123",
      role: "doctor",
    },
    {
      id: "USR003",
      name: "MediCore Admin",
      email: "admin@medicore.demo",
      password: "admin123",
      role: "admin",
    },
  ]);
}
seed();
