document.addEventListener("DOMContentLoaded", () => {
  const about = document.querySelector(".about-section");
  if (!about) return;

  // prepare animation (hide instantly, no transition)
  about.classList.add("animate");

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // allow browser to register initial state
        requestAnimationFrame(() => {
          about.classList.add("show");
        });
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(about);
});

const doctorsKey = "ardram_doctors";

// Initialize data only once
if (!localStorage.getItem(doctorsKey)) {
  localStorage.setItem(doctorsKey, JSON.stringify([
    {
      name: "Dr. Asif Ali Thayyil",
      department: "General Medicine & Endocrinology",
      day: "Mon to Sat",
      time: "11:00 AM – 12:30 PM"
    }
  ]));
}

function loadDoctors() {
  const doctors = JSON.parse(localStorage.getItem(doctorsKey)) || [];
  const container = document.getElementById("doctorCards");
  if (!container) return;

  container.innerHTML = "";

  doctors.forEach(doc => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="doctor-card">
          <h5>${doc.name}</h5>
          <p class="dept">${doc.department}</p>
          <p><strong>Day:</strong> ${doc.day}</p>
          <p><strong>Time:</strong> ${doc.time}</p>
        </div>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", loadDoctors);

function openAppointment() {
  document.getElementById("appointmentModal").style.display = "flex";
}

function closeAppointment() {
  document.getElementById("appointmentModal").style.display = "none";
}

function sendAppointment() {
  const name = pname.value.trim();
  const ageVal = age.value.trim();
  const placeVal = place.value.trim();
  const phoneVal = phone.value.trim();
  const doctorVal = doctor.value;
  const dateVal = date.value;

  if (!name || !ageVal || !placeVal || !phoneVal || !doctorVal || !dateVal) {
    alert("Please fill all required fields");
    return;
  }

  const message =
`🩺 *Appointment Request*
Name: ${name}
Age: ${ageVal}
Place: ${placeVal}
Phone: ${phoneVal}
Doctor: ${doctorVal}
Preferred Date: ${dateVal}`;

  const whatsappURL =
    "https://wa.me/917356290290?text=" + encodeURIComponent(message);

  window.open(whatsappURL, "_blank");
  closeAppointment();
}
