const phone = "917356280280";

// WhatsApp
function openWhatsApp(context) {
  window.open(
    `https://wa.me/${phone}?text=Hello ARDRAM Hospital,%0A${context}`,
    "_blank"
  );
}

function sendWhatsApp() {
  const inputs = document.querySelectorAll("input");
  const msg = document.querySelector("textarea").value;
  window.open(
    `https://wa.me/${phone}?text=Name:${inputs[0].value}%0APhone:${inputs[1].value}%0AMessage:${msg}`,
    "_blank"
  );
}

// Emergency
document.getElementById("emergencyCard").onclick = () =>
  document.getElementById("emergencyModal").style.display = "flex";

function closeEmergency() {
  document.getElementById("emergencyModal").style.display = "none";
}

function sendEmergency() {
  const type = emgType.value;
  const name = emgName.value;
  const age = emgAge.value;
  const phoneNo = emgPhone.value;

  window.open(
    `https://wa.me/${phone}?text=🚨 Emergency 🚨%0AType:${type}%0AName:${name}%0AAge:${age}%0APhone:${phoneNo}`,
    "_blank"
  );
  closeEmergency();
}

// Stats clicks
patientsCard.onclick = () =>
  window.open("https://www.google.com/search?q=ardram+hospital+reviews");

experienceCard.onclick = () =>
  window.open("https://www.instagram.com/ardramhospital/");

// Admin panel toggle
if (new URLSearchParams(window.location.search).get("admin") === "true") {
  adminPanel.style.display = "block";
}

// Doctors admin
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
let isAdmin = false;

function renderDoctors() {
  doctorList.innerHTML = "";
  doctors.forEach((d, i) => {
    doctorList.innerHTML += `
      <div class="doctor-card">
        <strong>${d.name}</strong>
        <div>${d.department}</div>
        <div>${d.qualification}</div>
        ${isAdmin ? `<button onclick="deleteDoctor(${i})">Delete</button>` : ""}
      </div>`;
  });
}
renderDoctors();

function adminLogin() {
  if (adminUser.value === "admin" && adminPass.value === "ardram123") {
    isAdmin = true;
    loginBox.style.display = "none";
    adminControls.style.display = "block";
    renderDoctors();
  }
}

function adminLogout() {
  isAdmin = false;
  loginBox.style.display = "block";
  adminControls.style.display = "none";
  renderDoctors();
}

function addDoctor() {
  doctors.push({
    name: docName.value,
    department: docDept.value,
    qualification: docQual.value
  });
  localStorage.setItem("doctors", JSON.stringify(doctors));
  renderDoctors();
}

function deleteDoctor(i) {
  doctors.splice(i, 1);
  localStorage.setItem("doctors", JSON.stringify(doctors));
  renderDoctors();
}
