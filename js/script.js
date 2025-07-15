// ===== FUNCIONALIDAD DE DESCARGA PDF CORREGIDA =====
function downloadPDF() {
    // Mostrar indicador de carga
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        Generando PDF...
    `;
    document.body.appendChild(loadingOverlay);

    // Configuración corregida para html2pdf
    const element = document.getElementById('main-content');
    
    // Configuración mejorada para evitar errores de CORS
    const opt = {
        margin: [15, 15, 15, 15],
        filename: 'CORRESUR_ERP+IA_Propuesta_Ejecutiva.pdf',
        image: { 
            type: 'jpeg', 
            quality: 0.95 
        },
        html2canvas: { 
            scale: 1.5,
            useCORS: true,
            allowTaint: true,
            foreignObjectRendering: true,
            backgroundColor: '#ffffff',
            logging: false,
            letterRendering: true,
            removeContainer: true,
            imageTimeout: 15000,
            onclone: function(clonedDoc) {
                // Manejar imágenes problemáticas en el documento clonado
                const images = clonedDoc.querySelectorAll('img');
                images.forEach(img => {
                    // Agregar crossorigin attribute
                    img.crossOrigin = 'anonymous';
                    
                    // Si la imagen causa problemas, la reemplazamos con un placeholder
                    img.onerror = function() {
                        console.log('Imagen problemática detectada, usando placeholder');
                        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMGEzYzUyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNPUlJFU1VSIEVSUCtJQTwvdGV4dD48L3N2Zz4=';
                        this.style.objectFit = 'cover';
                    };
                });
                
                // Optimizar estilos para PDF
                const style = clonedDoc.createElement('style');
                style.innerHTML = `
                    @media print {
                        .nav-menu { display: none !important; }
                        .scroll-indicator { display: none !important; }
                        .loading-overlay { display: none !important; }
                        body { background: white !important; }
                        .section { page-break-inside: avoid; }
                        .milestone-item { page-break-inside: avoid; }
                        .use-case-card { page-break-inside: avoid; }
                        .spec-card { page-break-inside: avoid; }
                        .goal-card { page-break-inside: avoid; }
                        .overview-card { page-break-inside: avoid; }
                        h2 { page-break-after: avoid; }
                        h3 { page-break-after: avoid; }
                        h4 { page-break-after: avoid; }
                    }
                `;
                clonedDoc.head.appendChild(style);
            }
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
        },
        pagebreak: { 
            mode: ['avoid-all', 'css'],
            before: ['#milestones', '#use-cases', '#specs'],
            after: ['.footer-cta'],
            avoid: ['.milestone-item', '.use-case-card', '.spec-card', '.goal-card']
        }
    };

    // Temporalmente ocultar elementos que pueden causar problemas
    const problematicElements = document.querySelectorAll('.nav-menu, .scroll-indicator');
    problematicElements.forEach(el => {
        el.style.display = 'none';
    });

    // Generar PDF con manejo de errores mejorado
    html2pdf().set(opt).from(element).save()
        .then(() => {
            // Restaurar elementos ocultos
            problematicElements.forEach(el => {
                el.style.display = '';
            });
            
            // Remover indicador de carga
            if (document.body.contains(loadingOverlay)) {
                document.body.removeChild(loadingOverlay);
            }
            
            // Mostrar notificación de éxito
            showNotification('✅ PDF descargado exitosamente', 'success');
            
            // Tracking del evento
            trackEvent('PDF', 'download_success', 'propuesta_ejecutiva');
        })
        .catch((error) => {
            // Restaurar elementos ocultos
            problematicElements.forEach(el => {
                el.style.display = '';
            });
            
            // Remover indicador de carga
            if (document.body.contains(loadingOverlay)) {
                document.body.removeChild(loadingOverlay);
            }
            
            console.error('Error generating PDF:', error);
            
            // Intentar método alternativo con configuración más simple
            downloadPDFAlternative();
        });
}

// Método alternativo más simple para generar PDF
function downloadPDFAlternative() {
    console.log('Intentando método alternativo de generación PDF...');
    
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        Generando PDF (método alternativo)...
    `;
    document.body.appendChild(loadingOverlay);

    // Configuración más simple y compatible
    const element = document.getElementById('main-content');
    const opt = {
        margin: 10,
        filename: 'CORRESUR_ERP+IA_Propuesta_Ejecutiva.pdf',
        image: { type: 'jpeg', quality: 0.8 },
        html2canvas: { 
            scale: 1,
            useCORS: false,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            ignoreElements: function(element) {
                // Ignorar elementos problemáticos
                return element.classList.contains('nav-menu') || 
                       element.classList.contains('scroll-indicator') ||
                       element.classList.contains('loading-overlay') ||
                       element.tagName === 'IMG';
            }
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save()
        .then(() => {
            if (document.body.contains(loadingOverlay)) {
                document.body.removeChild(loadingOverlay);
            }
            showNotification('✅ PDF descargado exitosamente (sin imágenes)', 'success');
            trackEvent('PDF', 'download_alternative_success', 'propuesta_ejecutiva');
        })
        .catch((error) => {
            if (document.body.contains(loadingOverlay)) {
                document.body.removeChild(loadingOverlay);
            }
            console.error('Error en método alternativo:', error);
            showNotification('❌ Error al generar PDF. Intente usar el navegador en modo incógnito.', 'error');
            trackEvent('PDF', 'download_error', 'propuesta_ejecutiva');
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
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ===== FUNCIONALIDAD ORIGINAL MEJORADA =====

// Smooth scroll indicator con optimización de rendimiento
let scrollTicking = false;
function updateScrollIndicator() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height);
    const indicator = document.getElementById('scrollIndicator');
    if (indicator) {
        indicator.style.transform = `scaleX(${scrolled})`;
    }
    scrollTicking = false;
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        requestAnimationFrame(updateScrollIndicator);
        scrollTicking = true;
    }
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Inicialización mejorada cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si html2pdf está disponible
    if (typeof html2pdf === 'undefined') {
        console.warn('html2pdf no está disponible. Cargando...');
        loadHTML2PDF();
    }

    // Observe all sections for animations
    document.querySelectorAll('.section, .overview-hero, .goals-section, .specifications-section, .use-cases-section, .milestones-section, .guarantee-section').forEach((el) => {
        observer.observe(el);
    });

    // Add click tracking for analytics
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            const section = e.target.getAttribute('href')?.replace('#', '') || 'unknown';
            console.log(`Navigation to section: ${section}`);
            trackEvent('Navigation', 'click', section);
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

    // Add parallax effect to header (solo en desktop)
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.corresur-header');
            if (header) {
                header.style.transform = `translateY(${scrolled * 0.05}px)`;
            }
        });
    }

    // Add typewriter effect to main title
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Console branding con colores actualizados de CORRESUR
    console.log('%c🚀 CORRESUR ERP+IA', 'color: #0a3c52; font-size: 24px; font-weight: bold;');
    console.log('%c💡 Desarrollado por IN-ADVANCED', 'color: #ffa94d; font-size: 16px;');
    console.log('%c🔧 Tecnologías: HTML5, CSS3, JavaScript ES6+', 'color: #4a9bb5; font-size: 12px;');
});

// Función para cargar html2pdf si no está disponible
function loadHTML2PDF() {
    return new Promise((resolve, reject) => {
        if (typeof html2pdf !== 'undefined') {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = () => {
            console.log('html2pdf cargado exitosamente');
            resolve();
        };
        script.onerror = () => {
            console.error('Error cargando html2pdf');
            reject(new Error('No se pudo cargar html2pdf'));
        };
        document.head.appendChild(script);
    });
}

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

// ===== ANALYTICS Y TRACKING =====
function trackEvent(category, action, label = '') {
    console.log(`Event: ${category} - ${action} - ${label}`);
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Google Analytics Universal
    if (typeof ga !== 'undefined') {
        ga('send', 'event', category, action, label);
    }
}

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Página cargada en: ${Math.round(loadTime)}ms`);
    trackEvent('Performance', 'page_load_time', `${Math.round(loadTime)}ms`);
});

// Error handling mejorado
window.addEventListener('error', (e) => {
    console.error('Error detectado:', e.error);
    trackEvent('Error', 'javascript_error', e.message);
});

// Manejo de promesas rechazadas
window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise rejizada:', e.reason);
    trackEvent('Error', 'unhandled_promise_rejection', e.reason.toString());
});

console.log('🎉 CORRESUR ERP+IA Script cargado completamente con funcionalidad PDF corregida');
