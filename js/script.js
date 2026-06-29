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
        // Si el overlay no existe, redirigir directamente
        window.location.href = 'https://oficinavirtual.tns.co/ServiciosPublicos/Accesar';
    }
}

// Menú móvil
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    // Agregar estilos CSS para el menú móvil
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 90px;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, var(--azul-oscuro) 0%, var(--azul-primario) 100%);
                flex-direction: column;
                padding: 2rem;
                gap: 1.5rem;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
            }
            .nav-links.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            .nav-links a {
                font-size: 1.1rem;
                padding: 0.5rem 0;
            }
            .mobile-menu {
                display: block !important;
                cursor: pointer;
                font-size: 1.8rem;
            }
        }
    `;
    document.head.appendChild(style);

    // Toggle del menú
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// Toggle Modo Oscuro
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    // Verificar preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        
        if (document.body.classList.contains('dark-mode')) {
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
            localStorage.setItem('theme', 'dark');
        } else {
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
            localStorage.setItem('theme', 'light');
        }
    });
}
