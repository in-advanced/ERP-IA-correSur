// ===== FUNCIONALIDAD DE DESCARGA PDF MEJORADA =====
function downloadPDF() {
    // Mostrar indicador de carga
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        Generando PDF profesional...
    `;
    document.body.appendChild(loadingOverlay);

    // Preparar el contenido para PDF (aplicar estilos especiales)
    prepareContentForPDF();

    const element = document.getElementById('main-content');
    
    // Configuración optimizada para evitar cortes feos
    const opt = {
        margin: [8, 8, 8, 8], // Márgenes más pequeños
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
            height: null, // Permite altura automática
            width: null,  // Permite ancho automático
            onclone: function(clonedDoc) {
                // Agregar estilos específicos para PDF
                const style = clonedDoc.createElement('style');
                style.innerHTML = `
                    /* ESTILOS ESPECÍFICOS PARA PDF */
                    
                    /* Ocultar elementos de navegación */
                    .nav-menu, .scroll-indicator, .loading-overlay { 
                        display: none !important; 
                    }
                    
                    /* Evitar cortes en secciones principales */
                    .overview-hero, .goals-section, .specifications-section,
                    .use-cases-section, .milestones-section, .guarantee-section,
                    .footer-cta {
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                        margin-bottom: 30px !important;
                    }
                    
                    /* Evitar cortes en cards individuales */
                    .overview-card, .goal-card, .spec-card, .use-case-card,
                    .milestone-item, .guarantee-item, .cta-item {
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                        margin-bottom: 15px !important;
                    }
                    
                    /* Control de títulos */
                    h1, h2, h3, h4, h5 {
                        page-break-after: avoid !important;
                        break-after: avoid !important;
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                    }
                    
                    /* Mantener grupos juntos */
                    .goals-grid, .specs-grid, .use-case-grid, 
                    .overview-grid, .guarantee-grid, .cta-grid {
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                    }
                    
                    /* Timeline de milestones */
                    .milestone-timeline {
                        page-break-inside: auto !important;
                    }
                    
                    /* Forzar nueva página para secciones importantes */
                    .use-cases-section {
                        page-break-before: always !important;
                        break-before: page !important;
                    }
                    
                    .milestones-section {
                        page-break-before: always !important;
                        break-before: page !important;
                    }
                    
                    /* Ajustar espaciado para PDF */
                    body {
                        background: white !important;
                        font-size: 14px !important;
                        line-height: 1.4 !important;
                    }
                    
                    .container {
                        max-width: none !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    
                    /* Reducir espacios excesivos */
                    .corresur-header {
                        margin-bottom: 20px !important;
                    }
                    
                    .section {
                        margin-bottom: 25px !important;
                    }
                    
                    /* Mejorar legibilidad en PDF */
                    p, li {
                        font-size: 13px !important;
                        line-height: 1.5 !important;
                    }
                    
                    /* Headers más compactos */
                    .header-content {
                        padding: 20px !important;
                    }
                    
                    .main-title {
                        font-size: 2.2rem !important;
                        margin-bottom: 10px !important;
                    }
                    
                    .project-subtitle {
                        font-size: 1rem !important;
                        margin-bottom: 15px !important;
                    }
                    
                    /* Badges más pequeños */
                    .badge {
                        font-size: 0.75rem !important;
                        padding: 6px 12px !important;
                        margin: 3px !important;
                    }
                    
                    /* Grid más compacto */
                    .overview-grid, .goals-grid, .specs-grid, .use-case-grid {
                        gap: 15px !important;
                        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
                    }
                    
                    /* Cards más compactas */
                    .overview-card, .goal-card, .spec-card, .use-case-card {
                        padding: 15px !important;
                        margin: 8px 0 !important;
                    }
                    
                    /* Timeline más compacto */
                    .milestone-item {
                        padding: 15px !important;
                        margin-bottom: 15px !important;
                    }
                    
                    /* Garantías en grid compacto */
                    .guarantee-grid {
                        grid-template-columns: repeat(3, 1fr) !important;
                        gap: 10px !important;
                    }
                    
                    .guarantee-item {
                        padding: 12px !important;
                    }
                    
                    .guarantee-item .number {
                        font-size: 1.8rem !important;
                        margin-bottom: 5px !important;
                    }
                    
                    /* Footer CTA más compacto */
                    .footer-cta {
                        padding: 25px !important;
                    }
                    
                    .cta-grid {
                        grid-template-columns: repeat(3, 1fr) !important;
                        gap: 12px !important;
                    }
                    
                    .cta-item {
                        padding: 12px !important;
                        font-size: 0.85rem !important;
                    }
                    
                    /* Optimizar imágenes */
                    img {
                        max-width: 100% !important;
                        height: auto !important;
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                    }
                    
                    .responsive-banner {
                        height: 150px !important;
                        object-fit: cover !important;
                    }
                    
                    /* Asegurar que el contenido fluya mejor */
                    * {
                        box-sizing: border-box !important;
                    }
                `;
                clonedDoc.head.appendChild(style);
                
                // Manejar imágenes problemáticas
                const images = clonedDoc.querySelectorAll('img');
                images.forEach(img => {
                    img.crossOrigin = 'anonymous';
                    img.onerror = function() {
                        console.log('Imagen problemática detectada, usando placeholder');
                        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMGEzYzUyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNPUlJFU1VSIEVSUCtJQTwvdGV4dD48L3N2Zz4=';
                        this.style.objectFit = 'cover';
                        this.style.height = '150px';
                    };
                });
            }
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true,
            userUnit: 1.0
        },
        pagebreak: { 
            mode: ['avoid-all', 'css'],
            avoid: [
                '.overview-card', '.goal-card', '.spec-card', '.use-case-card',
                '.milestone-item', '.guarantee-item', '.cta-item',
                '.overview-hero', '.goals-section', '.specifications-section',
                'h1', 'h2', 'h3', 'h4', 'h5'
            ]
        }
    };

    // Temporalmente ocultar elementos que pueden causar problemas
    const problematicElements = document.querySelectorAll('.nav-menu, .scroll-indicator');
    problematicElements.forEach(el => {
        el.style.display = 'none';
    });

    // Generar PDF
    html2pdf().set(opt).from(element).save()
        .then(() => {
            // Restaurar elementos y estilos
            restoreOriginalContent();
            problematicElements.forEach(el => {
                el.style.display = '';
            });
            
            if (document.body.contains(loadingOverlay)) {
                document.body.removeChild(loadingOverlay);
            }
            
            showNotification('✅ PDF profesional descargado exitosamente', 'success');
            trackEvent('PDF', 'download_success_improved', 'propuesta_ejecutiva');
        })
        .catch((error) => {
            restoreOriginalContent();
            problematicElements.forEach(el => {
                el.style.display = '';
            });
            
            if (document.body.contains(loadingOverlay)) {
                document.body.removeChild(loadingOverlay);
            }
            
            console.error('Error generating PDF:', error);
            downloadPDFAlternative();
        });
}

// Función para preparar el contenido antes de generar PDF
function prepareContentForPDF() {
    const style = document.createElement('style');
    style.id = 'pdf-preparation-styles';
    style.innerHTML = `
        /* Estilos temporales para mejorar el PDF */
        @media print {
            .nav-menu, .scroll-indicator, .loading-overlay { 
                display: none !important; 
            }
            
            body {
                background: white !important;
            }
            
            .section, .overview-hero, .goals-section, .specifications-section,
            .use-cases-section, .milestones-section, .guarantee-section {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            
            .overview-card, .goal-card, .spec-card, .use-case-card,
            .milestone-item, .guarantee-item, .cta-item {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            
            h1, h2, h3, h4, h5 {
                page-break-after: avoid;
                break-after: avoid;
            }
        }
    `;
    document.head.appendChild(style);
}

// Función para restaurar el contenido original
function restoreOriginalContent() {
    const tempStyle = document.getElementById('pdf-preparation-styles');
    if (tempStyle) {
        tempStyle.remove();
    }
}

// Método alternativo más simple
function downloadPDFAlternative() {
    console.log('Intentando método alternativo...');
    
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        Generando PDF (método simple)...
    `;
    document.body.appendChild(loadingOverlay);

    const element = document.getElementById('main-content');
    const opt = {
        margin: 15,
        filename: 'CORRESUR_ERP+IA_Propuesta_Ejecutiva.pdf',
        image: { type: 'jpeg', quality: 0.8 },
        html2canvas: { 
            scale: 1,
            useCORS: false,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            ignoreElements: function(element) {
                return element.classList.contains('nav-menu') || 
                       element.classList.contains('scroll-indicator') ||
                       element.classList.contains('loading-overlay');
            }
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save()
        .then(() => {
            if (document.body.contains(loadingOverlay)) {
                document.body.removeChild(loadingOverlay);
            }
            showNotification('✅ PDF descargado (versión simple)', 'success');
            trackEvent('PDF', 'download_alternative_success', 'propuesta_ejecutiva');
        })
        .catch((error) => {
            if (document.body.contains(loadingOverlay)) {
                document.body.removeChild(loadingOverlay);
            }
            console.error('Error en método alternativo:', error);
            showNotification('❌ Error al generar PDF. Pruebe en navegador Chrome o Firefox.', 'error');
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
        max-width: 320px;
        font-size: 14px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ===== RESTO DEL CÓDIGO ORIGINAL =====

// Smooth scroll indicator optimizado
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

// Inicialización cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si html2pdf está disponible
    if (typeof html2pdf === 'undefined') {
        console.warn('html2pdf no está disponible. Cargando...');
        loadHTML2PDF();
    }

    // Observe sections for animations
    document.querySelectorAll('.section, .overview-hero, .goals-section, .specifications-section, .use-cases-section, .milestones-section, .guarantee-section').forEach((el) => {
        observer.observe(el);
    });

    // Navigation tracking
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            const section = e.target.getAttribute('href')?.replace('#', '') || 'unknown';
            console.log(`Navigation to section: ${section}`);
            trackEvent('Navigation', 'click', section);
        });
    });

    // Smooth scrolling
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

    // Loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // Parallax effect (only on desktop)
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.corresur-header');
            if (header) {
                header.style.transform = `translateY(${scrolled * 0.05}px)`;
            }
        });
    }

    // Typewriter effect
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

    // Console branding
    console.log('%c🚀 CORRESUR ERP+IA', 'color: #0a3c52; font-size: 24px; font-weight: bold;');
    console.log('%c💡 Desarrollado por IN-ADVANCED', 'color: #ffa94d; font-size: 16px;');
    console.log('%c🔧 PDF con control de page breaks mejorado', 'color: #4a9bb5; font-size: 12px;');
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

// Keyboard navigation
document.addEventListener('keydown', (e) => {
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
    
    // PDF shortcut
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        downloadPDF();
    }
});

// Dynamic title updates
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

// Analytics y tracking
function trackEvent(category, action, label = '') {
    console.log(`Event: ${category} - ${action} - ${label}`);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    if (typeof ga !== 'undefined') {
        ga('send', 'event', category, action, label);
    }
}

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Página cargada en: ${Math.round(loadTime)}ms`);
    trackEvent('Performance', 'page_load_time', `${Math.round(loadTime)}ms`);
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Error detectado:', e.error);
    trackEvent('Error', 'javascript_error', e.message);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise rechazada:', e.reason);
    trackEvent('Error', 'unhandled_promise_rejection', e.reason.toString());
});

console.log('🎉 CORRESUR ERP+IA Script con control profesional de page breaks cargado');
