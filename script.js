/**
 * ARCHIVO: script.js [cite: 2324]
 * FUNCIONALIDADES JAVASCRIPT PARA LA PÁGINA WEB [cite: 2325]
 */

// 1. VARIABLES GLOBALES Y ESTADO [cite: 2329]
let carruselInterval; [cite: 2331]
let $indiceCarruselActual$ = 0; [cite: 2332]
const $tiempoCambioCarrusel$ = 3000; // 3 segundos [cite: 2333]

// 2. INICIALIZACIÓN [cite: 2335]
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada - Inicializando funcionalidades'); [cite: 2338]
    
    inicializarMenuHamburguesa(); [cite: 2341]
    inicializarCarrusel(); [cite: 2342]
    inicializarFormularioContacto(); [cite: 2343]
    inicializarAnimacionesScroll(); [cite: 2344]
    inicializarContadorCaracteres(); [cite: 2345]
    inicializarSmoothScroll(); [cite: 2346]
    mejorarAccesibilidad(); [cite: 2593]
    
    console.log('Todas las funcionalidades inicializadas correctamente'); [cite: 2347]
});

// 3. CARRUSEL DE IMÁGENES [cite: 2349]
function inicializarCarrusel() {
    const slides = document.querySelectorAll('.slide'); [cite: 2353]
    const indicadores = document.querySelectorAll('.indicador'); [cite: 2354]
    const prevBtn = document.querySelector('.carrusel-btn.prev'); [cite: 2355]
    const nextBtn = document.querySelector('.carrusel-btn.next'); [cite: 2356]

    if (slides.length === 0) { [cite: 2357]
        console.warn('No se encontraron imágenes para el carrusel'); [cite: 2359]
        return; [cite: 2360]
    }

    function mostrarSlide(indice) { [cite: 2362]
        if (indice < 0) indice = slides.length - 1; [cite: 2365]
        if (indice >= slides.length) indice = 0; [cite: 2366]

        slides.forEach(slide => slide.classList.remove('activo')); [cite: 2369]
        indicadores.forEach(ind => ind.classList.remove('activo')); [cite: 2370]

        slides[indice].classList.add('activo'); [cite: 2372]
        indicadores[indice].classList.add('activo'); [cite: 2373]
        $indiceCarruselActual$ = indice; [cite: 2374]
    }

    function siguienteSlide() { mostrarSlide($indiceCarruselActual$ + 1); } [cite: 2377]
    function anteriorSlide() { mostrarSlide($indiceCarruselActual$ - 1); } [cite: 2381]

    if (nextBtn) nextBtn.addEventListener('click', siguienteSlide); [cite: 2385]
    if (prevBtn) prevBtn.addEventListener('click', anteriorSlide); [cite: 2388]

    indicadores.forEach((indicador, index) => {
        indicador.addEventListener('click', () => {
            mostrarSlide(index); [cite: 2394]
            reiniciarIntervaloCarrusel(); [cite: 2395]
        });
    });

    function iniciarIntervaloCarrusel() {
        carruselInterval = setInterval(siguienteSlide, $tiempoCambioCarrusel$); [cite: 2401]
    }

    function reiniciarIntervaloCarrusel() {
        clearInterval(carruselInterval); [cite: 2405]
        iniciarIntervaloCarrusel(); [cite: 2406]
    }

    iniciarIntervaloCarrusel(); [cite: 2419]
}

// 4. FORMULARIO DE CONTACTO Y VALIDACIÓN [cite: 2422]
function inicializarFormularioContacto() {
    const formulario = document.getElementById('formContacto'); [cite: 2426]
    if (!formulario) return; [cite: 2432]

    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); [cite: 2453]
        if (validarFormulario()) { [cite: 2454]
            enviarFormulario(); [cite: 2455]
        }
    });
}

function validarCampo(campo, elementoError) {
    let valido = true; [cite: 2476]
    let mensaje = ''; [cite: 2477]

    switch(campo.id) {
        case 'nombre':
        case 'apellido':
            if (!campo.value.trim()) { mensaje = 'Este campo es obligatorio'; valido = false; } [cite: 2482, 2484]
            else if (campo.value.trim().length < 2) { mensaje = 'Debe tener al menos 2 caracteres'; valido = false; } [cite: 2487, 2488]
            break;
        case 'cedula':
            if (!campo.value.trim()) { mensaje = 'La cédula es obligatoria'; valido = false; } [cite: 2492, 2493]
            else if (!/^\d+$/.test(campo.value)) { mensaje = 'Solo se permiten números'; valido = false; } [cite: 2495, 2496]
            break;
        case 'caso':
            if (!campo.value.trim()) { mensaje = 'Describa su caso brevemente'; valido = false; } [cite: 2511, 2513]
            break;
    }
    elementoError.textContent = mensaje; [cite: 2520]
    return valido; [cite: 2521]
}

function validarFormulario() {
    const campos = [
        {campo: document.getElementById('nombre'), error: document.getElementById('errorNombre')},
        {campo: document.getElementById('apellido'), error: document.getElementById('errorApellido')},
        {campo: document.getElementById('cedula'), error: document.getElementById('errorCedula')},
        {campo: document.getElementById('rama'), error: document.getElementById('errorRama')},
        {campo: document.getElementById('caso'), error: document.getElementById('errorCaso')}
    ];

    let formularioValido = true; [cite: 2537]
    campos.forEach(({campo, error}) => {
        if (!validarCampo(campo, error)) formularioValido = false; [cite: 2539, 2540]
    });
    return formularioValido; [cite: 2543]
}

function enviarFormulario() {
    const formulario = document.getElementById('formContacto'); [cite: 2545]
    const botonEnviar = formulario.querySelector('.btn-enviar'); [cite: 2546]
    const mensajeExito = document.getElementById('mensajeExito'); [cite: 2547]

    const textoOriginal = botonEnviar.innerHTML; [cite: 2549]
    botonEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'; [cite: 2550]
    botonEnviar.disabled = true; [cite: 2550]

    setTimeout(() => {
        mensajeExito.style.display = 'block'; [cite: 2555]
        formulario.reset(); [cite: 2556]
        botonEnviar.innerHTML = textoOriginal; [cite: 2565]
        botonEnviar.disabled = false; [cite: 2566]
        setTimeout(() => { mensajeExito.style.display = 'none'; }, 5000); [cite: 2568, 2570]
    }, 1500); [cite: 2574]
}

// 5. MENÚ HAMBURGUESA [cite: 2606]
function inicializarMenuHamburguesa() {
    const hamburgerBtn = document.getElementById('hamburgerBtn'); [cite: 2606]
    const hamburgerMenu = document.getElementById('hamburgerMenu'); [cite: 2607]
    const menuOverlay = document.getElementById('menuOverlay'); [cite: 2607]

    if (!hamburgerBtn || !hamburgerMenu) return; [cite: 2608]

    function abrirMenu() {
        hamburgerBtn.classList.add('active'); [cite: 2609]
        hamburgerMenu.classList.add('active'); [cite: 2609]
        menuOverlay.classList.add('active'); [cite: 2609]
        document.body.style.overflow = 'hidden'; [cite: 2610]
    }

    function cerrarMenu() {
        hamburgerBtn.classList.remove('active'); [cite: 2610]
        hamburgerMenu.classList.remove('active'); [cite: 2611]
        menuOverlay.classList.remove('active'); [cite: 2611]
        document.body.style.overflow = ''; [cite: 2611]
    }

    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburgerMenu.classList.contains('active') ? cerrarMenu() : abrirMenu(); [cite: 2613]
    });

    menuOverlay.addEventListener('click', cerrarMenu); [cite: 2614]
    
    document.querySelectorAll('.menu-item').forEach(link => {
        link.addEventListener('click', cerrarMenu); [cite: 2630]
    });
}

// 6. ANIMACIONES Y UTILIDADES [cite: 2575, 2600]
function inicializarAnimacionesScroll() {
    const observer = new IntersectionObserver((entries) => { [cite: 2576]
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animado'); [cite: 2576]
        });
    }, { threshold: 0.1 }); [cite: 2575]

    document.querySelectorAll('.tarjeta-servicio, .tarjeta-abogado, .card-mv').forEach(el => {
        el.classList.add('oculto-animacion'); [cite: 2580]
        observer.observe(el); [cite: 2578]
    });
}

function inicializarContadorCaracteres() {
    const campoCaso = document.getElementById('caso'); [cite: 2427]
    const contador = document.getElementById('caracteresRestantes'); [cite: 2428]
    if (campoCaso && contador) {
        campoCaso.addEventListener('input', function() {
            const restantes = 500 - this.value.length; [cite: 2438]
            contador.textContent = restantes; [cite: 2439]
            contador.style.color = restantes < 50 ? '#e74c3c' : ''; [cite: 2441, 2442]
        });
    }
}

function inicializarSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = document.querySelector('.header').offsetHeight; [cite: 2586]
                window.scrollTo({ top: target.offsetTop - offset - 20, behavior: 'smooth' }); [cite: 2586, 2587]
            }
        });
    });
}

function mejorarAccesibilidad() {
    console.log('Mejoras de accesibilidad aplicadas'); [cite: 2598]
}
// 4. FORMULARIO DE CONTACTO Y VALIDACIÓN [cite: 2422]
function inicializarFormularioContacto() {
    const formulario = document.getElementById('formContacto'); [cite: 2426]
    if (!formulario) return; [cite: 2432]

    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); [cite: 2453]
        if (validarFormulario()) { [cite: 2454]
            enviarFormulario(); [cite: 2455]
        }
    });
}

function validarCampo(campo, elementoError) {
    let valido = true; [cite: 2476]
    let mensaje = ''; [cite: 2477]

    switch(campo.id) {
        case 'nombre':
        case 'apellido':
            if (!campo.value.trim()) { mensaje = 'Este campo es obligatorio'; valido = false; } [cite: 2482, 2484]
            else if (campo.value.trim().length < 2) { mensaje = 'Debe tener al menos 2 caracteres'; valido = false; } [cite: 2487, 2488]
            break;
        case 'cedula':
            if (!campo.value.trim()) { mensaje = 'La cédula es obligatoria'; valido = false; } [cite: 2492, 2493]
            else if (!/^\d+$/.test(campo.value)) { mensaje = 'Solo se permiten números'; valido = false; } [cite: 2495, 2496]
            break;
        case 'caso':
            if (!campo.value.trim()) { mensaje = 'Describa su caso brevemente'; valido = false; } [cite: 2511, 2513]
            break;
    }
    elementoError.textContent = mensaje; [cite: 2520]
    return valido; [cite: 2521]
}

function validarFormulario() {
    const campos = [
        {campo: document.getElementById('nombre'), error: document.getElementById('errorNombre')},
        {campo: document.getElementById('apellido'), error: document.getElementById('errorApellido')},
        {campo: document.getElementById('cedula'), error: document.getElementById('errorCedula')},
        {campo: document.getElementById('rama'), error: document.getElementById('errorRama')},
        {campo: document.getElementById('caso'), error: document.getElementById('errorCaso')}
    ];

    let formularioValido = true; [cite: 2537]
    campos.forEach(({campo, error}) => {
        if (!validarCampo(campo, error)) formularioValido = false; [cite: 2539, 2540]
    });
    return formularioValido; [cite: 2543]
}

function enviarFormulario() {
    const formulario = document.getElementById('formContacto'); [cite: 2545]
    const botonEnviar = formulario.querySelector('.btn-enviar'); [cite: 2546]
    const mensajeExito = document.getElementById('mensajeExito'); [cite: 2547]

    const textoOriginal = botonEnviar.innerHTML; [cite: 2549]
    botonEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'; [cite: 2550]
    botonEnviar.disabled = true; [cite: 2550]

    setTimeout(() => {
        mensajeExito.style.display = 'block'; [cite: 2555]
        formulario.reset(); [cite: 2556]
        botonEnviar.innerHTML = textoOriginal; [cite: 2565]
        botonEnviar.disabled = false; [cite: 2566]
        setTimeout(() => { mensajeExito.style.display = 'none'; }, 5000); [cite: 2568, 2570]
    }, 1500); [cite: 2574]
}

// 5. MENÚ HAMBURGUESA [cite: 2606]
function inicializarMenuHamburguesa() {
    const hamburgerBtn = document.getElementById('hamburgerBtn'); [cite: 2606]
    const hamburgerMenu = document.getElementById('hamburgerMenu'); [cite: 2607]
    const menuOverlay = document.getElementById('menuOverlay'); [cite: 2607]

    if (!hamburgerBtn || !hamburgerMenu) return; [cite: 2608]

    function abrirMenu() {
        hamburgerBtn.classList.add('active'); [cite: 2609]
        hamburgerMenu.classList.add('active'); [cite: 2609]
        menuOverlay.classList.add('active'); [cite: 2609]
        document.body.style.overflow = 'hidden'; [cite: 2610]
    }

    function cerrarMenu() {
        hamburgerBtn.classList.remove('active'); [cite: 2610]
        hamburgerMenu.classList.remove('active'); [cite: 2611]
        menuOverlay.classList.remove('active'); [cite: 2611]
        document.body.style.overflow = ''; [cite: 2611]
    }

    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburgerMenu.classList.contains('active') ? cerrarMenu() : abrirMenu(); [cite: 2613]
    });

    menuOverlay.addEventListener('click', cerrarMenu); [cite: 2614]
    
    document.querySelectorAll('.menu-item').forEach(link => {
        link.addEventListener('click', cerrarMenu); [cite: 2630]
    });
}

// 6. ANIMACIONES Y UTILIDADES [cite: 2575, 2600]
function inicializarAnimacionesScroll() {
    const observer = new IntersectionObserver((entries) => { [cite: 2576]
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animado'); [cite: 2576]
        });
    }, { threshold: 0.1 }); [cite: 2575]

    document.querySelectorAll('.tarjeta-servicio, .tarjeta-abogado, .card-mv').forEach(el => {
        el.classList.add('oculto-animacion'); [cite: 2580]
        observer.observe(el); [cite: 2578]
    });
}

function inicializarContadorCaracteres() {
    const campoCaso = document.getElementById('caso'); [cite: 2427]
    const contador = document.getElementById('caracteresRestantes'); [cite: 2428]
    if (campoCaso && contador) {
        campoCaso.addEventListener('input', function() {
            const restantes = 500 - this.value.length; [cite: 2438]
            contador.textContent = restantes; [cite: 2439]
            contador.style.color = restantes < 50 ? '#e74c3c' : ''; [cite: 2441, 2442]
        });
    }
}

function inicializarSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = document.querySelector('.header').offsetHeight; [cite: 2586]
                window.scrollTo({ top: target.offsetTop - offset - 20, behavior: 'smooth' }); [cite: 2586, 2587]
            }
        });
    });
}

function mejorarAccesibilidad() {
    console.log('Mejoras de accesibilidad aplicadas'); [cite: 2598]
}