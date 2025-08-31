// Dark Mode Toggle
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

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") enableLightMode();
else disableLightMode();

if (darkModeIcon) {
  darkModeIcon.addEventListener("click", () => {
    if (document.body.classList.contains("light-mode")) disableLightMode();
    else enableLightMode();
  });
}

// Navbar highlight
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".navbar a").forEach(link => {
  if (link.getAttribute("href") === currentPage) link.classList.add("active");
  else link.classList.remove("active");
});

// Initialize EmailJS
emailjs.init("iB3JrI6zAEtoWO-ze"); // Public Key

// Contact Form Submit
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

  // ✅ Auto-fill hidden "to_email" field for auto-reply
  let toEmailField = form.querySelector('[name="to_email"]');
  if (!toEmailField) {
    toEmailField = document.createElement("input");
    toEmailField.type = "hidden";
    toEmailField.name = "to_email";
    form.appendChild(toEmailField);
  }
  toEmailField.value = from_email;

  // Send mail to YOU
  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID_YOU, this)
    .then(() => {
      // Send auto-reply to USER
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID_USER, this)
        .then(() => {
          alert("✅ Message sent! Both you and the user received emails.");
          form.reset();
        })
        .catch((error) => {
          console.error("❌ Auto-reply failed:", error);
          alert("Auto-reply failed. Please check your EmailJS template settings.");
        });
    })
    .catch((error) => {
      console.error("❌ Failed to send message:", error);
      alert("Failed to send message. Please check your EmailJS configuration.");
    });
});
