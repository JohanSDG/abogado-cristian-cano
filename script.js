// ============================================
// 1. VARIABLES GLOBALES Y ESTADO
// ============================================
let carruselInterval;
let indiceCarruselActual = 0; // [cite: 2332]
const tiempoCambioCarrusel = 3000; // 3 segundos [cite: 2333]

// ============================================
// 2. INICIALIZACIÓN PRINCIPAL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada - Inicializando funcionalidades');
    
    // Inicializar todas las funciones [cite: 2341-2346]
    inicializarMenuHamburguesa();
    inicializarCarrusel();
    inicializarFormularioContacto();
    inicializarAnimacionesScroll();
    inicializarContadorCaracteres();
    inicializarSmoothScroll();
    
    console.log('Todas las funcionalidades inicializadas correctamente'); // [cite: 2347]
});

// ============================================
// 3. CARRUSEL DE IMÁGENES [cite: 2352]
// ============================================
function inicializarCarrusel() {
    const slides = document.querySelectorAll('.slide');
    const indicadores = document.querySelectorAll('.indicador');
    const prevBtn = document.querySelector('.carrusel-btn.prev');
    const nextBtn = document.querySelector('.carrusel-btn.next');

    if (slides.length === 0) return; // [cite: 2360]

    function mostrarSlide(indice) {
        if (indice < 0) indice = slides.length - 1; // [cite: 2365]
        if (indice >= slides.length) indice = 0; // [cite: 2366]
        
        slides.forEach(slide => slide.classList.remove('activo')); // [cite: 2369]
        indicadores.forEach(ind => ind.classList.remove('activo')); // [cite: 2370]
        
        slides[indice].classList.add('activo'); // [cite: 2372]
        indicadores[indice].classList.add('activo'); // [cite: 2373]
        indiceCarruselActual = indice;
    }

    function siguienteSlide() { mostrarSlide(indiceCarruselActual + 1); } // [cite: 2377]
    function anteriorSlide() { mostrarSlide(indiceCarruselActual - 1); } // [cite: 2381]

    if (nextBtn) nextBtn.addEventListener('click', () => { siguienteSlide(); reiniciarIntervaloCarrusel(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { anteriorSlide(); reiniciarIntervaloCarrusel(); });

    indicadores.forEach((indicador, index) => {
        indicador.addEventListener('click', () => {
            mostrarSlide(index);
            reiniciarIntervaloCarrusel();
        });
    });

    function iniciarIntervaloCarrusel() {
        carruselInterval = setInterval(siguienteSlide, tiempoCambioCarrusel); // [cite: 2401]
    }

    function reiniciarIntervaloCarrusel() {
        clearInterval(carruselInterval);
        iniciarIntervaloCarrusel();
    }

    iniciarIntervaloCarrusel(); // [cite: 2419]
}

// ============================================
// 4. FORMULARIO DE CONTACTO Y VALIDACIÓN [cite: 2424]
// ============================================
function inicializarFormularioContacto() {
    const formulario = document.getElementById('formContacto');
    if (!formulario) return;

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validarFormulario()) {
            enviarFormulario(); // [cite: 2455]
        }
    });
}

function validarCampo(campo, elementoError) {
    let valido = true;
    let mensaje = '';

    if (!campo.value.trim()) {
        mensaje = 'Este campo es obligatorio'; // [cite: 2483]
        valido = false;
    } else if (campo.id === 'cedula' && !/^\d+$/.test(campo.value)) {
        mensaje = 'Solo se permiten números'; // [cite: 2495]
        valido = false;
    }

    elementoError.textContent = mensaje;
    return valido;
}

function validarFormulario() {
    const campos = [
        {campo: document.getElementById('nombre'), error: document.getElementById('errorNombre')},
        {campo: document.getElementById('cedula'), error: document.getElementById('errorCedula')},
        {campo: document.getElementById('rama'), error: document.getElementById('errorRama')},
        {campo: document.getElementById('caso'), error: document.getElementById('errorCaso')}
    ];

    let formularioValido = true;
    campos.forEach(({campo, error}) => {
        if (!validarCampo(campo, error)) formularioValido = false; // [cite: 2540]
    });
    return formularioValido;
}

function enviarFormulario() {
    const formulario = document.getElementById('formContacto');
    const botonEnviar = formulario.querySelector('.btn-enviar');
    const mensajeExito = document.getElementById('mensajeExito');

    botonEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'; // [cite: 2550]
    botonEnviar.disabled = true;

    setTimeout(() => {
        mensajeExito.style.display = 'block'; // [cite: 2555]
        formulario.reset();
        botonEnviar.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Consulta';
        botonEnviar.disabled = false;
        
        setTimeout(() => { mensajeExito.style.display = 'none'; }, 5000); // [cite: 2570]
    }, 1500);
}

// ============================================
// 5. MENÚ HAMBURGUESA (MÓVIL) [cite: 2606]
// ============================================
function inicializarMenuHamburguesa() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    if (!hamburgerBtn || !hamburgerMenu) return;

    function abrirMenu() {
        hamburgerBtn.classList.add('active');
        hamburgerMenu.classList.add('active'); // [cite: 2609]
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // [cite: 2610]
    }

    function cerrarMenu() {
        hamburgerBtn.classList.remove('active');
        hamburgerMenu.classList.remove('active'); // [cite: 2611]
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburgerMenu.classList.contains('active') ? cerrarMenu() : abrirMenu();
    });

    menuOverlay.addEventListener('click', cerrarMenu);
    
    document.querySelectorAll('.menu-item').forEach(link => {
        link.addEventListener('click', cerrarMenu); // [cite: 2630]
    });
}

// ============================================
// 6. ANIMACIONES Y UTILIDADES
// ============================================
function inicializarAnimacionesScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animado'); // [cite: 2576]
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.tarjeta-servicio, .tarjeta-abogado, .card-mv').forEach(el => {
        el.classList.add('oculto-animacion'); // [cite: 2578]
        observer.observe(el);
    });
}

function inicializarSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const destino = document.querySelector(href);
            if (destino) {
                e.preventDefault();
                const headerAltura = document.querySelector('.header').offsetHeight;
                window.scrollTo({
                    top: destino.offsetTop - headerAltura - 20, // [cite: 2586]
                    behavior: 'smooth'
                });
            }
        });
    });
}

function inicializarContadorCaracteres() {
    const campoCaso = document.getElementById('caso');
    const contador = document.getElementById('caracteresRestantes');
    if (campoCaso && contador) {
        campoCaso.addEventListener('input', function() {
            contador.textContent = 500 - this.value.length; // [cite: 2439]
        });
    }
}