// Mobile menu toggle
const navToggle = document.querySelector('.mobile-nav-toggle');
const navMenu = document.querySelector('.main-nav ul');
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    // Close mobile menu on link click
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Contact form feedback
const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');
if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        formStatus.textContent = 'Sending...';
        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                formStatus.textContent = 'Thank you! Your message has been sent.';
                contactForm.reset();
            } else {
                response.json().then(data => {
                    formStatus.textContent = data.errors ? data.errors.map(e => e.message).join(', ') : 'Oops! There was a problem.';
                });
            }
        }).catch(() => {
            formStatus.textContent = 'Oops! There was a problem.';
        });
    });
}

// Product gallery modal
const gallery = document.querySelector('.product-gallery');
if (gallery) {
    gallery.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            const src = e.target.src;
            const alt = e.target.alt;
            let modal = document.getElementById('img-modal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'img-modal';
                modal.style.position = 'fixed';
                modal.style.top = 0;
                modal.style.left = 0;
                modal.style.width = '100vw';
                modal.style.height = '100vh';
                modal.style.background = 'rgba(0,0,0,0.8)';
                modal.style.display = 'flex';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';
                modal.style.zIndex = 1000;
                modal.innerHTML = '<img style="max-width:90vw;max-height:80vh;border-radius:10px;box-shadow:0 4px 24px #000;" alt=""><span style="position:absolute;top:30px;right:40px;font-size:2.5rem;color:#fff;cursor:pointer;">&times;</span>';
                document.body.appendChild(modal);
            }
            modal.querySelector('img').src = src;
            modal.querySelector('img').alt = alt;
            modal.style.display = 'flex';
            modal.querySelector('span').onclick = () => { modal.style.display = 'none'; };
            modal.onclick = (ev) => { if (ev.target === modal) modal.style.display = 'none'; };
        }
    });
}
