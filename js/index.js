const form = document.getElementById('contactForm');
const sentMessage = document.getElementById('sent-message');
const submitBtn = document.getElementById('submitBtn');

if (!form || !sentMessage || !submitBtn) {
    console.error('Form elements are missing.');
} else {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const accessKey = form.querySelector('input[name="access_key"]')?.value?.trim();
        if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
            alert('Access key غير صالح أو فارغ.');
            return;
        }

        const formData = new FormData(form);
        formData.set('access_key', accessKey);

        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'جارٍ الإرسال...';
        submitBtn.disabled = true;
        form.classList.add('is-loading');
        sentMessage.classList.remove('show');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                form.classList.add('is-sent');
                sentMessage.classList.add('show');
                form.reset();
            } else {
                alert('حدث خطأ أثناء الإرسال: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            alert('حدث خطأ في الشبكة. حاول مرة أخرى.');
            console.error(error);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.classList.remove('is-loading');
        }
    });
}

let message = document.getElementById("massgee");

message.innerHTML = "تم الإرسال بنجاح من ALGO Technology";