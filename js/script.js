// ===== FUNCIONALIDAD DE DESCARGA PDF =====
function downloadPDF() {
    // Mostrar indicador de carga
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        Generando PDF...
    `;
    document.body.appendChild(loadingOverlay);

    // Configuración para html2pdf
    const element = document.getElementById('main-content');
    const opt = {
        margin: [10, 10, 10, 10],
        filename: 'CORRESUR_ERP+IA_Propuesta_Ejecutiva.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        },
        pagebreak: { 
            mode: ['avoid-all', 'css', 'legacy'],
            before: '.milestones-section, .use-cases-section'
        }
    };

    // Generar PDF
    html2pdf().set(opt).from(element).save().then(() => {
        // Remover indicador de carga
        document.body.removeChild(loadingOverlay);
        
        // Mostrar notificación de éxito
        showNotification('✅ PDF descargado exitosamente', 'success');
    }).catch((error) => {
        // Remover indicador de carga
        document.body.removeChild(loadingOverlay);
        
        // Mostrar notificación de error
        showNotification('❌ Error al generar PDF', 'error');
        console.error('Error generating PDF:', error);
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#52b788' : '#e74c3c'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        transform: translateX(100%);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== FUNCIONALIDAD ORIGINAL =====

// Smooth scroll indicator
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height);
    document.getElementById('scrollIndicator').style.transform = `scaleX(${scrolled})`;
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Observe all sections when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Observe all sections for animations
    document.querySelectorAll('.section, .overview-hero, .goals-section, .specifications-section, .use-cases-section, .milestones-section, .guarantee-section').forEach((el) => {
        observer.observe(el);
    });

    // Add click tracking for analytics
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            const section = e.target.getAttribute('href').replace('#', '');
            console.log(`Navigation to section: ${section}`);
        });
    });

    // Smooth scrolling for navigation links
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

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // Add parallax effect to header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.corresur-header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.overview-card, .goal-card, .spec-card, .use-case-card, .guarantee-item, .cta-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add typewriter effect to main title
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typewriter effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Add floating animation to badges
    const badges = document.querySelectorAll('.badge');
    badges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.2}s`;
    });

    // Console branding con colores actualizados de CORRESUR
    console.log('%c🚀 CORRESUR ERP+IA', 'color: #0a3c52; font-size: 24px; font-weight: bold;');
    console.log('%c💡 Desarrollado por IN-ADVANCED', 'color: #ffa94d; font-size: 16px;');
    console.log('%c🔧 Tecnologías: HTML5, CSS3, JavaScript ES6+', 'color: #4a9bb5; font-size: 12px;');
});

// Add performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Página cargada en: ${Math.round(loadTime)}ms`);
});

// Add error handling
window.addEventListener('error', (e) => {
    console.error('Error detectado:', e.error);
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Reset animations on resize
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.transition = 'none';
        setTimeout(() => {
            section.style.transition = '';
        }, 100);
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const sections = document.querySelectorAll('section[id]');
        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom > 100;
        });
        
        if (currentSection) {
            const currentIndex = Array.from(sections).indexOf(currentSection);
            let nextIndex;
            
            if (e.key === 'ArrowDown') {
                nextIndex = Math.min(currentIndex + 1, sections.length - 1);
            } else {
                nextIndex = Math.max(currentIndex - 1, 0);
            }
            
            sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Shortcut para descargar PDF (Ctrl+P o Cmd+P)
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        downloadPDF();
    }
});

// Add dynamic title updates based on visible section
const updatePageTitle = () => {
    const sections = document.querySelectorAll('section[id]');
    const currentSection = Array.from(sections).find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
    });
    
    if (currentSection) {
        const sectionTitle = currentSection.querySelector('h2');
        if (sectionTitle) {
            document.title = `${sectionTitle.textContent} - CORRESUR ERP+IA`;
        }
    }
};

window.addEventListener('scroll', updatePageTitle);

// Add copy to clipboard functionality for contact info
const addCopyFunctionality = () => {
    const contactElements = document.querySelectorAll('[data-copy]');
    contactElements.forEach(element => {
        element.addEventListener('click', () => {
            navigator.clipboard.writeText(element.dataset.copy);
            showNotification('¡Copiado al portapapeles!', 'success');
        });
    });
};

// Initialize copy functionality when DOM is ready
document.addEventListener('DOMContentLoaded', addCopyFunctionality);

// ===== MEJORAS ADICIONALES =====

// Print optimizations for PDF
window.addEventListener('beforeprint', () => {
    // Optimizar para impresión
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// Auto-save scroll position
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
});

// ===== FUNCIONES ADICIONALES PARA MEJORAR UX =====

// Función para detectar si el usuario está en móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Función para manejar la navegación móvil
function handleMobileNavigation() {
    if (isMobile()) {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.style.position = 'relative';
            navMenu.style.top = 'auto';
            navMenu.style.right = 'auto';
        }
    }
}

// Detectar cambios de orientación en móviles
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        handleMobileNavigation();
    }, 100);
});

// Función para lazy loading de imágenes
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Función para optimizar el rendimiento del scroll
let ticking = false;
function updateScrollIndicator() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height);
    const indicator = document.getElementById('scrollIndicator');
    if (indicator) {
        indicator.style.transform = `scaleX(${scrolled})`;
    }
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollIndicator);
        ticking = true;
    }
}

// Optimizar el scroll listener
window.addEventListener('scroll', () => {
    requestTick();
    ticking = false;
});

// Función para prefetch de recursos importantes
function prefetchResources() {
    // Prefetch de la librería PDF si no está cargada
    if (!window.html2pdf) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        document.head.appendChild(link);
    }
}

// Función para manejar la visibilidad de la página
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Página oculta - pausar animaciones innecesarias
        console.log('Página oculta - optimizando rendimiento');
    } else {
        // Página visible - reanudar funcionalidad completa
        console.log('Página visible - funcionalidad completa activa');
    }
});

// Función para detectar y manejar conexiones lentas
function handleSlowConnection() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        if (connection.downlink < 1.5) {
            console.log('Conexión lenta detectada - optimizando recursos');
            // Reducir calidad de animaciones para conexiones lentas
            document.body.classList.add('slow-connection');
        }
    }
}

// Inicializar funciones de optimización
document.addEventListener('DOMContentLoaded', () => {
    handleMobileNavigation();
    lazyLoadImages();
    prefetchResources();
    handleSlowConnection();
});

// ===== SERVICE WORKER PARA CACHE (OPCIONAL) =====

// Función para registrar service worker si está disponible
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registrado exitosamente:', registration);
            })
            .catch(error => {
                console.log('Error al registrar Service Worker:', error);
            });
    }
}

// Llamar al registro del service worker cuando la página esté cargada
window.addEventListener('load', registerServiceWorker);

// ===== ANALYTICS Y TRACKING =====

// Función para tracking de eventos personalizado
function trackEvent(category, action, label = '') {
    console.log(`Event: ${category} - ${action} - ${label}`);
    // Aquí se puede integrar con Google Analytics, Mixpanel, etc.
    
    // Ejemplo para Google Analytics (gtag)
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Tracking de interacciones importantes
document.addEventListener('DOMContentLoaded', () => {
    // Track PDF downloads
    const pdfButton = document.querySelector('.pdf-button');
    if (pdfButton) {
        pdfButton.addEventListener('click', () => {
            trackEvent('PDF', 'download', 'propuesta_ejecutiva');
        });
    }
    
    // Track navigation clicks
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            const section = e.target.getAttribute('href').replace('#', '');
            trackEvent('Navigation', 'click', section);
        });
    });
    
    // Track time spent on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackEvent('Engagement', 'time_on_page', `${timeSpent}_seconds`);
    });
});

console.log('🎉 CORRESUR ERP+IA Script cargado completamente con funcionalidad PDF y colores corporativos optimizados');