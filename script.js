document.addEventListener('DOMContentLoaded', () => {
    const API_URL = "https://bibek-backend-1.onrender.com"; 

    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            const formData = {
                name: document.getElementById('formName').value,
                email: document.getElementById('formEmail').value,
                phone: document.getElementById('formPhone').value,
                message: document.getElementById('formMessage').value
            };

            try {
                const response = await fetch(`${API_URL}/send`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert("✅ Message Sent!");
                    contactForm.reset();
                } else {
                    throw new Error("Failed");
                }
            } catch (err) {
                alert("❌ Connection Error. Try again.");
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
