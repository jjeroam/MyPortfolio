document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const submitBtn = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Disable the button while sending
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Your message has been sent!");
        form.reset();
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        alert("Failed to send message. Try again later.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Something went wrong. Check your connection and try again.");
    } finally {
      // Re-enable the button
      submitBtn.disabled = false;
      submitBtn.textContent = "Contact Me";
    }
  });
});
