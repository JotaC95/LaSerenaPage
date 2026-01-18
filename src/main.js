// Obtener elementos del DOM
const floatingButton = document.getElementById('floatingButton');
const contactModal = document.getElementById('contactModal');
const closeModal = document.getElementById('closeModal');
const saveContactButton = document.getElementById('saveContact');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const productGrid = document.getElementById('productGrid');

// Datos de Productos (Fase 2: Dinámico)
const products = [
    {
        title: "Pastel de Chocolate",
        desc: "Delicioso pastel con un toque de cacao premium.",
        img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Cupcakes Temáticos",
        desc: "Pequeñas delicias personalizadas para endulzar tu día.",
        img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcf8?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Galletas Artesanales",
        desc: "Hechas con amor y los mejores ingredientes naturales.",
        img: "https://images.unsplash.com/photo-1499636138143-bd649043ea52?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Cheesecake de Frutos Rojos",
        desc: "Suave y cremoso con una base crujiente.",
        img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop"
    }
];

// Renderizar Productos
if (productGrid) {
    productGrid.innerHTML = products.map((product, index) => `
        <div class="product-item hidden stagger-delay-${(index % 3) + 1}">
            <img src="${product.img}" alt="${product.title}" loading="lazy" />
            <h3>${product.title}</h3>
            <p>${product.desc}</p>
        </div>
    `).join('');
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