document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const sentMessage = document.getElementById("sent-message");
    const submitButton = document.getElementById("submitBtn");

    if (!form || !sentMessage || !submitButton) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const originalText = submitButton.textContent;
        const formData = new FormData(form);

        if (!formData.get("access_key")) {
            formData.append("access_key", "185dc037-194e-4c11-88a9-e3d519ebc7c9");
        }

        submitButton.disabled = true;
        submitButton.textContent = "جارٍ الإرسال...";

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                sentMessage.classList.add("show");
                form.reset();
            } else {
                alert("حدث خطأ أثناء الإرسال: " + (data.message || "Unknown error"));
            }
        } catch (error) {
            alert("حدث خطأ في الشبكة. حاول مرة أخرى.");
            console.error(error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
});


let message = document.getElementById("massgee");

message.innerHTML = "تم الإرسال بنجاح من ALGO Technology";