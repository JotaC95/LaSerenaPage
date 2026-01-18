// Obtener elementos del DOM
const floatingButton = document.getElementById('floatingButton');
const contactModal = document.getElementById('contactModal');
const closeModal = document.getElementById('closeModal');
const saveContactButton = document.getElementById('saveContact');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Custom Glaze Cursor & Sugar Trail
const cursor = document.querySelector('.cursor-dot');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Cursor Movement (Smooth Follow)
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Create Sugar Particle
    if (Math.random() > 0.8) { // Only sometimes to avoid lag
        createSugarParticle(e.clientX, e.clientY);
    }
});

function animateCursor() {
    // Lerp for smooth cursor
    const dt = 0.2;
    cursorX += (mouseX - cursorX) * dt;
    cursorY += (mouseY - cursorY) * dt;

    if (cursor) {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    }

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Sugar Particle Creator
function createSugarParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('sugar-particle');
    document.body.appendChild(particle);

    const size = Math.random() * 6 + 2; // Random size
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    // Random direction
    const destX = (Math.random() - 0.5) * 50;
    const destY = Math.random() * 50; // Fall down

    particle.style.setProperty('--mx', `${destX}px`);
    particle.style.setProperty('--my', `${destY}px`);

    // Remove after animation
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Hover States for Cursor
document.querySelectorAll('a, button, .social-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Scroll Progress Bar
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// Scroll Animations (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Animate once
        }
    });
}, observerOptions);

// Observe all hidden elements
document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

// Mobile Menu Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Optional: Change icon to X when open
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Abrir modal al hacer clic en el botón flotante
if (floatingButton) {
    floatingButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default if it's a link (it was in the old code, now it's a div but good practice)
        contactModal.classList.add('show');
    });
}

// Cerrar modal al hacer clic en la "X"
if (closeModal) {
    closeModal.addEventListener('click', () => {
        contactModal.classList.remove('show');
    });
}

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === contactModal) {
        contactModal.classList.remove('show');
    }
});

// Guardar contacto (simulación)
if (saveContactButton) {
    saveContactButton.addEventListener('click', () => {
        const contactInfo = {
            phone: '+593 992478574',
            email: 'info@laserena.com',
        };
        // In a real app this might download a vCard or Copy to clipboard
        navigator.clipboard.writeText(`${contactInfo.email}`).then(() => {
            alert('Email copiado al portapapeles: ' + contactInfo.email);
        }).catch(err => {
            alert('Contacto:\n' + JSON.stringify(contactInfo, null, 2));
        });
    });
}

// Contact Form Validation & Simulation
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic Validation
        const name = document.getElementById('nameInput').value.trim();
        const email = document.getElementById('emailInput').value.trim();
        const message = document.getElementById('messageInput').value.trim();

        if (!name || !email || !message) {
            showFeedback('Por favor completa todos los campos.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showFeedback('Por favor ingresa un email válido.', 'error');
            return;
        }

        // Simulate Sending...
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            showFeedback(`¡Gracias ${name}! Hemos recibido tu mensaje.`, 'success');
            contactForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;

            // Hide message after 5 seconds
            setTimeout(() => {
                formFeedback.style.display = 'none';
                formFeedback.className = 'form-feedback';
            }, 5000);
        }, 1500);
    });
}

function showFeedback(message, type) {
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback ${type}`;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}