document.addEventListener('DOMContentLoaded', () => {
    
    // CONFIG: Replace this URL with your actual Render URL after deploying the backend
    const API_URL = "https://your-backend-service.onrender.com"; 

    // --- 1. Skill Progress Animation ---
    const skillSection = document.querySelector('#soft-skills');
    const progressLines = document.querySelectorAll('.progress-line span');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressLines.forEach(line => {
                    const width = line.parentElement.getAttribute('data-width');
                    line.style.width = width;
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (skillSection) skillObserver.observe(skillSection);

    // --- 2. Contact Form Logic ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = "Transmitting...";
            submitBtn.disabled = true;

            const formData = {
                name: document.getElementById('formName').value,
                email: document.getElementById('formEmail').value,
                phone: document.getElementById('formPhone').value,
                message: document.getElementById('formMessage').value
            };

            try {
                // CHANGED: Use the API_URL variable instead of localhost
                const response = await fetch(`${API_URL}/send`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert("✅ Success! Your message has been sent.");
                    contactForm.reset();
                } else {
                    throw new Error("Server rejected request");
                }
            } catch (err) {
                console.error("Connection Error:", err);
                alert("❌ Could not connect to the server. Please try again later.");
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// --- 3. Preloader (Cleaned up duplicates) ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        setTimeout(() => {
            preloader.classList.add('loader-hidden');
        }, 1000);
    }
});