(function () {
  function showFeedback(box, type, message) {
    if (!box) return;
    box.className = `form-feedback is-visible ${type}`;
    box.textContent = message;
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validatePhone(value) {
    return /^[+0-9\s()-]{7,20}$/.test(value);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const feedback = document.getElementById("formFeedback");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(form);
      const name = String(data.get("fullName") || "").trim();
      const email = String(data.get("email") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const country = String(data.get("country") || "").trim();
      const service = String(data.get("service") || "").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !email || !phone || !country || !service || !message) {
        showFeedback(feedback, "error", "Please complete all required fields.");
        return;
      }
      if (!validateEmail(email)) {
        showFeedback(feedback, "error", "Please enter a valid email address.");
        return;
      }
      if (!validatePhone(phone)) {
        showFeedback(feedback, "error", "Please enter a valid phone number.");
        return;
      }

      // Frontend-only demo state — no backend endpoint configured yet.
      showFeedback(
        feedback,
        "success",
        "Thank you. Your enquiry has been validated locally. To receive messages in production, connect this form to a backend endpoint or email service. Meanwhile, please email infovajobs@gmail.com or call 044-25580544."
      );
      form.reset();
    });
  });
})();
