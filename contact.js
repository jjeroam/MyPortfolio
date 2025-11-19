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
        // Read the body once, try JSON first, fallback to text
        let errorData;
        const text = await response.text(); // read body once
        try {
          errorData = JSON.parse(text); // try parsing JSON
        } catch {
          errorData = { message: text }; // fallback to plain text
        }
        console.error("Server error:", errorData);
        alert(errorData.message || "Failed to send message. Try again later.");
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
