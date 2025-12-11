// Obtener elementos del DOM
const floatingButton = document.getElementById('floatingButton');
const contactModal = document.getElementById('contactModal');
const closeModal = document.getElementById('closeModal');
const saveContactButton = document.getElementById('saveContact');

// Abrir modal al hacer clic en el botón flotante
floatingButton.addEventListener('click', (event) => {
    event.preventDefault(); // Evita que se abra el enlace de Instagram
    contactModal.style.display = 'flex';
});

// Cerrar modal al hacer clic en la "X"
closeModal.addEventListener('click', () => {
    contactModal.style.display = 'none';
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === contactModal) {
        contactModal.style.display = 'none';
    }
});

// Guardar contacto (simulación)
saveContactButton.addEventListener('click', () => {
    const contactInfo = {
        phone: '+593 992478574',
        email: 'serenalb89@gmail.com',
    };
    alert('Contacto guardado:\n' + JSON.stringify(contactInfo, null, 2));
});