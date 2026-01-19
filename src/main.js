// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle (Dark Chocolate Mode)
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.getAttribute('data-theme') === 'dark';
            if (isDark) {
                body.setAttribute('data-theme', 'light');
                themeToggle.innerHTML = '<i class="fa-solid fa-cookie-bite"></i>';
            } else {
                body.setAttribute('data-theme', 'dark');
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            }
        });
    }

    // 2. Email Toggle Logic
    const emailToggleBtn = document.getElementById('emailToggleBtn');
    const contactForm = document.getElementById('contactForm');

    if (emailToggleBtn && contactForm) {
        emailToggleBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent jump
            contactForm.classList.toggle('hidden');
            if (contactForm.classList.contains('hidden')) {
                emailToggleBtn.textContent = 'Mostrar formulario de email';
            } else {
                emailToggleBtn.textContent = 'Ocultar formulario';
            }
        });
    }

    // 3. Floating Action & Modals
    const floatingButton = document.getElementById('floatingButton');
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.getElementById('closeModal');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (floatingButton && contactModal) {
        floatingButton.addEventListener('click', () => {
            contactModal.style.display = 'flex';
        });
    }

    if (closeModal && contactModal) {
        closeModal.addEventListener('click', () => {
            contactModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.style.display = 'none';
        }
    });

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Scroll Progress Bar
    window.onscroll = function () {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        let progressBar = document.getElementById("scrollProgress");
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    };

    // Interactive Sprinkles on Click
    document.addEventListener('click', (e) => {
        // Skip if clicking interactive elements to avoid confusion, or let it happen for fun? Let's do it everywhere.
        createSprinkles(e.clientX, e.clientY);
    });

    function createSprinkles(x, y) {
        const colors = ['#c0595c', '#d4af37', '#ffffff', '#5d4037']; // Brand colors
        const count = 12;

        for (let i = 0; i < count; i++) {
            const sprinkle = document.createElement('div');
            sprinkle.classList.add('sprinkle');
            document.body.appendChild(sprinkle);

            // Random properties
            const color = colors[Math.floor(Math.random() * colors.length)];
            const tx = (Math.random() - 0.5) * 100; // spread x
            const ty = (Math.random() - 0.5) * 100 + 50; // fall down a bit
            const rot = Math.random() * 360;

            sprinkle.style.backgroundColor = color;
            sprinkle.style.left = `${x}px`;
            sprinkle.style.top = `${y}px`;
            sprinkle.style.setProperty('--tx', `${tx}px`);
            sprinkle.style.setProperty('--ty', `${ty}px`);
            sprinkle.style.setProperty('--rot', `${rot}deg`);

            // Cleanup
            setTimeout(() => {
                sprinkle.remove();
            }, 1000);
        }
    }

    // Smart Greeting
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) {
        const hour = new Date().getHours();
        let greeting = "¡Bienvenidos a La Serena!";

        if (hour >= 5 && hour < 12) {
            greeting = "Tu dosis diaria de magia.";
        } else if (hour >= 12 && hour < 19) {
            greeting = "El postre que te mereces.";
        } else {
            greeting = "Un final dulce para hoy.";
        }

        // Only override if not already typed (or reset it)
        heroTitle.textContent = greeting;
        // Re-trigger typewriter by removing/adding class might be needed if it was CSS only, but let's just set text.
    }

    // Dynamic Ingredients (Drift & Fade)
    const ingredients = ['🍓', '🍃', '🍫', '✨', '🍒', '🍋', '🍪', '🍨', '🧁', '🥐']; // More variety
    const container = document.getElementById('ingredients-container');
    const particleCount = 15; // More particles

    if (container) {
        for (let i = 0; i < particleCount; i++) {
            const el = document.createElement('div');
            el.classList.add('parallax-element');

            // Random Content
            const randomEmoji = ingredients[Math.floor(Math.random() * ingredients.length)];
            const span = document.createElement('span');
            span.textContent = randomEmoji;
            el.appendChild(span);

            // Random Size (Smaller & Varied)
            const size = 0.8 + Math.random() * 1.5; // Between 0.8rem and 2.3rem
            el.style.fontSize = `${size}rem`;

            container.appendChild(el);

            // Start Cycle with random delay
            setTimeout(() => {
                floatCycle(el);
            }, i * 1500);
        }
    }

    function floatCycle(el) {
        // 1. Pick random start position
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        // 2. Teleport (Hidden)
        el.style.transition = 'none';
        el.style.left = `${startX}px`;
        el.style.top = `${startY}px`;
        el.style.opacity = '0';

        void el.offsetWidth; // Force Reflow

        // 3. Pick random end position
        const endX = Math.random() * window.innerWidth;
        const endY = Math.random() * window.innerHeight;

        // 4. Move & Fade In
        requestAnimationFrame(() => {
            el.style.transition = 'top 20s linear, left 20s linear, opacity 3s ease-in-out';
            el.style.left = `${endX}px`;
            el.style.top = `${endY}px`;
            el.style.opacity = '0.6';
        });

        // 5. Fade out before end
        setTimeout(() => {
            el.style.opacity = '0';
        }, 17000); // Fade out at 17s

        // 6. Loop
        setTimeout(() => {
            floatCycle(el);
        }, 20000); // Restart at 20s
    }
});

// Custom Cursor Logic (Outside scope if needed, or inside)
const cursor = document.querySelector('.cursor-dot');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Cursor Movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Sugar Particles
    if (Math.random() > 0.9) {
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