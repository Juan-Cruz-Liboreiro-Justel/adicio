document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTOS DEL DOM ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-btn');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileContent = document.getElementById('mobile-content');
    const mobileNavList = document.getElementById('mobile-nav-list');
    
    const toggleMobileServicios = document.getElementById('toggle-mobile-servicios');
    const mobileServiciosMenu = document.getElementById('mobile-servicios-menu');

    // --- FUNCIONES DE ABRIR Y CERRAR ---
    function openMobileMenu() {
        mobileOverlay.classList.add('active');
        // Esto evita que puedas hacer scroll en la página de fondo mientras el menú está abierto
        document.body.style.overflow = 'hidden'; 
    }

    function closeMobileMenu() {
        mobileOverlay.classList.remove('active');
        // Devuelve el scroll a la normalidad
        document.body.style.overflow = ''; 
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);

    // --- CERRAR AL TOCAR EL FONDO ---
    // Si haces clic en cualquier parte blanca de la pantalla que no sea un link, se cierra.
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay || e.target === mobileContent || e.target === mobileNavList) {
                closeMobileMenu();
            }
        });
    }

    // --- ACORDEÓN DE SERVICIOS (MÓVIL) ---
    if (toggleMobileServicios) {
        toggleMobileServicios.addEventListener('click', () => {
            mobileServiciosMenu.classList.toggle('active');
            
            // Animar rotación de la flechita
            const icon = toggleMobileServicios.querySelector('.icon-transition');
            if (mobileServiciosMenu.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    }

    // --- LÓGICA DEL CARRUSEL HERO ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    if (slides.length > 0) {
        // Función para cambiar de slide
        function goToSlide(index) {
            // Remover clase active de todos
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Asegurarse de que el índice esté dentro de los límites
            currentSlide = (index + totalSlides) % totalSlides;

            // Añadir clase active al actual
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        // Siguiente y Anterior
        function nextSlide() { goToSlide(currentSlide + 1); }
        function prevSlide() { goToSlide(currentSlide - 1); }

        // Eventos de botones
        if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
        if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

        // Eventos de los puntitos
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
        });

        // Autoplay
        function startInterval() {
            slideInterval = setInterval(nextSlide, 6000); // Cambia cada 6 segundos
        }

        // Reiniciar autoplay si el usuario hace clic manualmente
        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        // Iniciar el carrusel
        startInterval();
    }
});