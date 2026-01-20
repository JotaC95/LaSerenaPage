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
            contactModal.classList.add('show');
        });
    }

    if (closeModal && contactModal) {
        closeModal.addEventListener('click', () => {
            contactModal.style.display = 'none';
            contactModal.classList.remove('show');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.style.display = 'none';
            contactModal.classList.remove('show');
        }
    });

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
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
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Scroll Progress Bar
    const scrollProgress = document.getElementById("scrollProgress");
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
        });
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
        heroTitle.textContent = greeting;
    }

    // Dynamic Ingredients (Drift & Fade)
    const ingredients = ['🍓', '🍃', '🍫', '✨', '🍒', '🍋', '🍪', '🍨', '🧁', '🥐'];
    const container = document.getElementById('ingredients-container');
    const particleCount = window.innerWidth < 768 ? 6 : 15;

    if (container) {
        for (let i = 0; i < particleCount; i++) {
            const el = document.createElement('div');
            el.classList.add('parallax-element');
            const randomEmoji = ingredients[Math.floor(Math.random() * ingredients.length)];
            const span = document.createElement('span');
            span.textContent = randomEmoji;
            el.appendChild(span);

            const size = 0.8 + Math.random() * 1.5;
            el.style.fontSize = `${size}rem`;
            container.appendChild(el);

            setTimeout(() => {
                floatCycle(el);
            }, i * 1500);
        }
    }

    function floatCycle(el) {
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        el.style.transition = 'none';
        el.style.left = `${startX}px`;
        el.style.top = `${startY}px`;
        el.style.opacity = '0';
        void el.offsetWidth;

        const endX = Math.random() * window.innerWidth;
        const endY = Math.random() * window.innerHeight;

        requestAnimationFrame(() => {
            el.style.transition = 'top 20s linear, left 20s linear, opacity 3s ease-in-out';
            el.style.left = `${endX}px`;
            el.style.top = `${endY}px`;
            el.style.opacity = '0.6';
        });

        setTimeout(() => {
            el.style.opacity = '0';
        }, 17000);

        setTimeout(() => {
            floatCycle(el);
        }, 20000);
    }

    // Interactive Sprinkles (Global)
    document.addEventListener('click', (e) => {
        // Optional: Trigger only if not specific elements
        createSprinkles(e.clientX, e.clientY);
    });

    // Custom Cursor Logic
    const cursor = document.querySelector('.cursor-dot');
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (Math.random() > 0.9) createSugarParticle(e.clientX, e.clientY);
    });

    function animateCursor() {
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

    document.querySelectorAll('a, button, .social-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor && cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('active'));
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

    // Contact Form Logic
    const contactFormEl = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const saveContactButton = document.getElementById('saveContact');

    if (saveContactButton) {
        saveContactButton.addEventListener('click', () => {
            const info = 'info@laserena.com';
            navigator.clipboard.writeText(info).then(() => alert('Email copiado: ' + info));
        });
    }

    if (contactFormEl && formFeedback) {
        contactFormEl.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('nameInput').value.trim();
            const email = document.getElementById('emailInput').value.trim();
            const message = document.getElementById('messageInput').value.trim();

            if (!name || !email || !message) {
                showFeedback('Por favor completa todos los campos.', 'error');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showFeedback('Email inválido.', 'error');
                return;
            }

            const btn = contactFormEl.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                showFeedback(`¡Gracias ${name}! Hemos recibido tu mensaje.`, 'success');
                contactFormEl.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                    formFeedback.className = 'form-feedback';
                }, 5000);
            }, 1500);
        });
    }

    function showFeedback(message, type) {
        if (formFeedback) {
            formFeedback.textContent = message;
            formFeedback.className = `form-feedback ${type}`;
            formFeedback.style.display = 'block';
        }
    }

    // --- PHASE 20 LOGIC Integration ---

    // 1. Sommelier Logic
    const moodBtns = document.querySelectorAll('.mood-btn');
    const sommelierResult = document.getElementById('sommelier-result');

    const recommendations = {
        'cozy': { name: "Latte de Vainilla & Croissant", text: "El abrazo cálido que necesitas." },
        'party': { name: "Caja de Macarons", text: "¡Colores y sabor para celebrar!" },
        'love': { name: "Red Velvet Cupcake", text: "Pasión dulce en cada bocado." }
    };

    if (moodBtns.length > 0 && sommelierResult) {
        moodBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const mood = btn.getAttribute('data-mood');
                const rec = recommendations[mood];

                if (rec) {
                    sommelierResult.innerHTML = `
                        <div class="recommendation-card" style="animation: fadeUp 0.5s ease;">
                            <h4 style="margin: 10px 0; font-size: 1.5em; color: var(--primary-color);">${rec.name}</h4>
                            <p style="margin-bottom: 15px;">${rec.text}</p>
                            <a href="#social-hub" class="btn" style="padding: 8px 20px; font-size: 0.9em;">Lo quiero</a>
                        </div>
                    `;
                    // Force visibility
                    sommelierResult.classList.remove('hidden');
                    sommelierResult.classList.add('show');
                    sommelierResult.style.display = 'block';
                    sommelierResult.style.opacity = '1';
                }
            });
        });
    }

    // 2. 3D Tilt Effect
    const cards = document.querySelectorAll('.social-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // 3. Chef's Secret
    const logoImg = document.querySelector('header .logo img') || document.querySelector('header img');
    if (logoImg) {
        logoImg.addEventListener('dblclick', () => {
            const socialHub = document.getElementById('social-hub');
            if (socialHub) {
                socialHub.scrollIntoView({ behavior: 'smooth' });
                cards.forEach(card => card.classList.add('highlight-active'));

                const rect = socialHub.getBoundingClientRect();
                for (let i = 0; i < 30; i++) {
                    setTimeout(() => {
                        createSugarParticle(
                            rect.left + Math.random() * rect.width,
                            rect.top + window.scrollY + Math.random() * rect.height
                        );
                    }, i * 50);
                }
                setTimeout(() => cards.forEach(c => c.classList.remove('highlight-active')), 3000);
            }
        });
    }

}); // END DOMContentLoaded

// Helper Functions
function createSprinkles(x, y) {
    const colors = ['#c0595c', '#d4af37', '#ffffff', '#5d4037'];
    const count = 12;
    for (let i = 0; i < count; i++) {
        const sprinkle = document.createElement('div');
        sprinkle.classList.add('sprinkle');
        document.body.appendChild(sprinkle);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const tx = (Math.random() - 0.5) * 100;
        const ty = (Math.random() - 0.5) * 100 + 50;
        const rot = Math.random() * 360;
        sprinkle.style.backgroundColor = color;
        sprinkle.style.left = `${x}px`;
        sprinkle.style.top = `${y}px`;
        sprinkle.style.setProperty('--tx', `${tx}px`);
        sprinkle.style.setProperty('--ty', `${ty}px`);
        sprinkle.style.setProperty('--rot', `${rot}deg`);
        setTimeout(() => sprinkle.remove(), 1000);
    }
}

function createSugarParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('sugar-particle');
    document.body.appendChild(particle);
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    const destX = (Math.random() - 0.5) * 50;
    const destY = Math.random() * 50;
    particle.style.setProperty('--mx', `${destX}px`);
    particle.style.setProperty('--my', `${destY}px`);
    setTimeout(() => particle.remove(), 1000);
}