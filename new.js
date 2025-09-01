
// ==========================
// Dark Mode Toggle
// ==========================
const darkModeIcon = document.getElementById("darkMode-icon");

const enableLightMode = () => {
  document.body.classList.add("light-mode");
  localStorage.setItem("theme", "light");
  if (darkModeIcon) darkModeIcon.classList.replace("bx-moon", "bx-sun");
};

const disableLightMode = () => {
  document.body.classList.remove("light-mode");
  localStorage.setItem("theme", "dark");
  if (darkModeIcon) darkModeIcon.classList.replace("bx-sun", "bx-moon");
};

// Apply saved theme on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") enableLightMode();
else disableLightMode();

// Toggle theme on icon click
if (darkModeIcon) {
  darkModeIcon.addEventListener("click", () => {
    if (document.body.classList.contains("light-mode")) disableLightMode();
    else enableLightMode();
  });
}

// ==========================
// Navbar Highlight
// ==========================
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".navbar a").forEach(link => {
  if (link.getAttribute("href") === currentPage) link.classList.add("active");
  else link.classList.remove("active");
});

// ==========================
// Initialize EmailJS
// ==========================
emailjs.init("iB3JrI6zAEtoWO-ze"); // Public Key

// ==========================
// Contact Form Submit
// ==========================
const form = document.getElementById("contact-form");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const SERVICE_ID = "service_91gpewl";
  const TEMPLATE_ID_YOU = "template_bdwpb7g";      // Mail to you
  const TEMPLATE_ID_USER = "template_elxcbry";     // Auto-reply to user

  // Validate form fields
  const from_name = form.querySelector('[name="from_name"]').value.trim();
  const from_email = form.querySelector('[name="from_email"]').value.trim();
  const message = form.querySelector('[name="message"]').value.trim();

  if (!from_name || !from_email || !message) {
    alert("❌ Please fill all fields!");
    return;
  }

  // Send mail to YOU
  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID_YOU, this)
    .then(() => {
      // Send auto-reply to USER (only once)
      emailjs.send(SERVICE_ID, TEMPLATE_ID_USER, {
        to_email: from_email,       // Template variable for recipient email
        from_name: "Ritik Mathur",
        message: `Hi ${from_name},\n\nThank you for your enquiry. We will get back to you shortly.\n\nBest regards,\nRitik Mathur`
      })
      .then(() => {
        console.log("📩 Auto-reply sent successfully to the user.");
        alert("✅ Message sent! You will receive a confirmation email shortly.");
        form.reset();
      })
      .catch((error) => {
        console.warn("⚠️ Auto-reply skipped. Check EmailJS template settings.", error);
        alert("✅ Message sent! You will receive a confirmation email shortly.");
        form.reset();
      });
    })
    .catch((error) => {
      console.error("❌ Failed to send message:", error);
      alert("Failed to send message. Please check your EmailJS configuration.");
    });
});
