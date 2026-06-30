// Primero ejecutamos el modo oscuro para que se aplique inmediatamente
(function() {
    // Toggle Modo Oscuro - primero para que se cargue rápido
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Actualizar el ícono inicial
        const updateThemeIcon = () => {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                if (document.body.classList.contains('dark-mode')) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        };
        updateThemeIcon();

        // Toggle
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            updateThemeIcon();
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
})();

// Animación del logo al cargar la página
window.addEventListener('load', function() {
    const logos = document.querySelectorAll('.logo');
    logos.forEach(logo => {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            logo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1)';
        }, 100);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Marcar el enlace activo en la navegación
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href');
            if (currentPath.includes(linkPath) && linkPath !== '#') {
                link.classList.add('active');
            } else if (currentPath === '/' || currentPath === '/index.html') {
                if (linkPath === 'index.html' || linkPath === './index.html') {
                    link.classList.add('active');
                }
            }
        });
    }
    setActiveNavLink();

    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Cambiar header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        }
    });

    // Lightbox para galería
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg && lightboxClose) {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const src = this.getAttribute('data-src');
                if (src) {
                    lightboxImg.src = src;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        lightboxClose.addEventListener('click', function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Manejar pago PSE
    function handlePSEPayment(e) {
        e.preventDefault();
        const loading = document.getElementById('pseLoading');
        if (loading) {
            loading.classList.add('active');
            setTimeout(function() {
                window.location.href = 'https://oficinavirtual.tns.co/ServiciosPublicos/Accesar';
            }, 2000);
        } else {
            window.location.href = 'https://oficinavirtual.tns.co/ServiciosPublicos/Accesar';
        }
    }

    // Menú móvil
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        // Función para alternar el menú
        function toggleMenu() {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        }

        // Función para cerrar el menú
        function closeMenu() {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }

        // Toggle del menú al hacer clic en el botón
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                closeMenu();
            }
        });
    }
});