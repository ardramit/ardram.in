// ==========================
// GLOBAL CONFIG
// ==========================
const phone = "917356280280";

// ==========================
// WHATSAPP GENERIC
// ==========================
function openWhatsApp(context) {
  const text =
    `Hello ARDRAM Hospital,%0A%0A` +
    `I would like to enquire about:%0A👉 ${context}`;

  window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
}

// ==========================
// CONTACT FORM → WHATSAPP
// ==========================
function sendWhatsApp() {
  const name = document.querySelector('input[placeholder="Your Name"]').value.trim();
  const phoneNo = document.querySelector('input[placeholder="Phone Number"]').value.trim();
  const message = document.querySelector('textarea').value.trim();

  if (!name || !phoneNo || !message) {
    alert("Please fill all fields");
    return;
  }

  const text =
    `Hello ARDRAM Hospital,%0A%0A` +
    `👤 Name: ${name}%0A` +
    `📞 Phone: ${phoneNo}%0A` +
    `💬 Message:%0A${message}`;

  window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
}

// ==========================
// STATS CARD ACTIONS
// ==========================
document.getElementById("patientsCard")?.addEventListener("click", () => {
  window.open(
    "https://www.google.com/search?q=ardram+hospital+reviews",
    "_blank"
  );
});

document.getElementById("experienceCard")?.addEventListener("click", () => {
  window.open(
    "https://www.instagram.com/ardramhospital/",
    "_blank"
  );
});

// ==========================
// EMERGENCY MODAL
// ==========================
document.getElementById("emergencyCard")?.addEventListener("click", () => {
  document.getElementById("emergencyModal").style.display = "flex";
});

function closeEmergency() {
  document.getElementById("emergencyModal").style.display = "none";
}

function sendEmergency() {
  const type = document.getElementById("emgType").value.trim();
  const name = document.getElementById("emgName").value.trim();
  const age = document.getElementById("emgAge").value.trim();
  const phoneNo = document.getElementById("emgPhone").value.trim();

  if (!type || !name || !age || !phoneNo) {
    alert("Please fill all details");
    return;
  }

  const text =
    `🚨 EMERGENCY REQUEST 🚨%0A%0A` +
    `Type: ${type}%0A` +
    `Name: ${name}%0A` +
    `Age: ${age}%0A` +
    `Mobile: ${phoneNo}`;

  window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  closeEmergency();
}

// ================= ADMIN CREDENTIALS =================
const ADMIN_USER = "admin";
const ADMIN_PASS = "ardram123";

// ================= STATE =================
let isAdmin = false;
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

// ================= RENDER DOCTORS =================
function renderDoctors() {
  const list = document.getElementById("doctorList");
  if (!list) return;

  list.innerHTML = "";

  doctors.forEach((doc, index) => {
    const card = document.createElement("div");
    card.className = "doctor-card";

    card.innerHTML = `
      <strong>${doc.name}</strong>
      <span>${doc.department}</span>
      <span>${doc.qualification}</span>
      ${isAdmin ? `<button onclick="deleteDoctor(${index})">Delete</button>` : ""}
    `;

    list.appendChild(card);
  });
}

// ================= ADMIN LOGIN =================
function adminLogin() {
  const u = document.getElementById("adminUser").value;
  const p = document.getElementById("adminPass").value;

  if (u === ADMIN_USER && p === ADMIN_PASS) {
    isAdmin = true;
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminControls").style.display = "block";
    renderDoctors();
  } else {
    alert("Invalid credentials");
  }
}

function adminLogout() {
  isAdmin = false;
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("adminControls").style.display = "none";
  renderDoctors();
}

// ================= ADD / DELETE DOCTOR =================
function addDoctor() {
  const name = document.getElementById("docName").value.trim();
  const dept = document.getElementById("docDept").value.trim();
  const qual = document.getElementById("docQual").value.trim();

  if (!name || !dept || !qual) {
    alert("Fill all fields");
    return;
  }

  doctors.push({ name, department: dept, qualification: qual });
  localStorage.setItem("doctors", JSON.stringify(doctors));

  document.getElementById("docName").value = "";
  document.getElementById("docDept").value = "";
  document.getElementById("docQual").value = "";

  renderDoctors();
}

function deleteDoctor(index) {
  if (!confirm("Delete this doctor?")) return;

  doctors.splice(index, 1);
  localStorage.setItem("doctors", JSON.stringify(doctors));
  renderDoctors();
}

// ================= INIT =================
renderDoctors();

// ==========================
// ADMIN VISIBILITY CONTROL
// ==========================
const params = new URLSearchParams(window.location.search);

if (params.get("admin") === "true") {
  const panel = document.getElementById("adminPanel");
  if (panel) panel.style.display = "block";
}
