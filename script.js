document.addEventListener('DOMContentLoaded', () => {
    inicializarMenu();
    inicializarCarrusel();
    inicializarContador();
});

function inicializarMenu() {
    const btn = document.getElementById('hamburgerBtn');
    const menu = document.getElementById('hamburgerMenu');
    const overlay = document.getElementById('menuOverlay');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('active');
            overlay.classList.toggle('active');
        });
        overlay.addEventListener('click', () => {
            menu.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
}

function inicializarCarrusel() {
    const slides = document.querySelectorAll('.slide');
    let actual = 0;

    if (slides.length > 0) {
        setInterval(() => {
            slides[actual].classList.remove('activo');
            actual = (actual + 1) % slides.length;
            slides[actual].classList.add('activo');
        }, 3000);
    }
}

function inicializarContador() {
    const textarea = document.getElementById('caso');
    const display = document.getElementById('caracteresRestantes');
    if (textarea && display) {
        textarea.addEventListener('input', () => {
            display.textContent = 500 - textarea.value.length;
        });
    }
}