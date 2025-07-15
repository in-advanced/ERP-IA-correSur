// ===== PDF CONTINUO SIN CORTES DE PÁGINA =====
function downloadPDF() {
    console.log('🚀 Generando PDF continuo...');
    
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        Generando PDF continuo (sin cortes)...
    `;
    document.body.appendChild(loadingOverlay);

    // Verificar disponibilidad
    if (typeof html2pdf === 'undefined') {
        console.error('❌ html2pdf no disponible');
        if (document.body.contains(loadingOverlay)) {
            document.body.removeChild(loadingOverlay);
        }
        showNotification('❌ Error: Librería PDF no cargada', 'error');
        return;
    }

    const element = document.getElementById('main-content');
    if (!element) {
        console.error('❌ Contenido no encontrado');
        if (document.body.contains(loadingOverlay)) {
            document.body.removeChild(loadingOverlay);
        }
        showNotification('❌ Error: Contenido no encontrado', 'error');
        return;
    }

    // Medir el contenido para crear una página única
    const contentHeight = element.scrollHeight;
    const contentWidth = element.scrollWidth;
    
    console.log(`📏 Dimensiones del contenido: ${contentWidth}x${contentHeight}px`);

    // Configuración para PDF CONTINUO (página única muy larga)
    const opt = {
        margin: 5, // Márgenes mínimos
        filename: 'CORRESUR_ERP+IA_Propuesta_Continua.pdf',
        image: { 
            type: 'jpeg', 
            quality: 0.9 
        },
        html2canvas: { 
            scale: 1.2,
            useCORS: false,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: true,
            height: contentHeight + 100, // Altura completa del contenido + margen
            width: contentWidth,
            scrollX: 0,
            scrollY: 0,
            onclone: function(clonedDoc) {
                console.log('📋 Preparando documento continuo...');
                
                // Aplicar estilos para PDF continuo
                const style = clonedDoc.createElement('style');
                style.innerHTML = `
                    /* ESTILOS PARA PDF CONTINUO */
                    
                    body { 
                        background: white !important; 
                        color: black !important;
                        font-family: Arial, sans-serif !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        overflow: visible !important;
                    }
                    
                    /* Ocultar elementos de navegación */
                    .nav-menu, .scroll-indicator, .loading-overlay { 
                        display: none !important; 
                    }
                    
                    /* Contenedor principal sin restricciones */
                    #main-content {
                        display: block !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        position: static !important;
                        width: 100% !important;
                        height: auto !important;
                        overflow: visible !important;
                        page-break-inside: auto !important;
                        break-inside: auto !important;
                    }
                    
                    /* ELIMINAR TODOS LOS CORTES DE PÁGINA */
                    *, *::before, *::after {
                        page-break-inside: auto !important;
                        break-inside: auto !important;
                        page-break-before: auto !important;
                        break-before: auto !important;
                        page-break-after: auto !important;
                        break-after: auto !important;
                    }
                    
                    /* Asegurar flujo continuo */
                    .overview-hero, .goals-section, .specifications-section,
                    .use-cases-section, .milestones-section, .guarantee-section,
                    .footer-cta {
                        page-break-inside: auto !important;
                        break-inside: auto !important;
                        margin-bottom: 20px !important;
                        display: block !important;
                    }
                    
                    /* Cards sin restricciones */
                    .overview-card, .goal-card, .spec-card, .use-case-card,
                    .milestone-item, .guarantee-item, .cta-item {
                        page-break-inside: auto !important;
                        break-inside: auto !important;
                        margin-bottom: 10px !important;
                    }
                    
                    /* Headers sin cortes */
                    h1, h2, h3, h4, h5, h6 {
                        page-break-inside: auto !important;
                        break-inside: auto !important;
                        page-break-after: auto !important;
                        break-after: auto !important;
                    }
                    
                    /* Optimización para contenido continuo */
                    .container {
                        max-width: none !important;
                        padding: 10px !important;
                        margin: 0 !important;
                    }
                    
                    /* Header más compacto */
                    .corresur-header {
                        margin-bottom: 15px !important;
                    }
                    
                    .header-content {
                        padding: 15px !important;
                    }
                    
                    .main-title {
                        font-size: 2rem !important;
                        margin-bottom: 8px !important;
                    }
                    
                    .project-subtitle {
                        font-size: 0.9rem !important;
                        margin-bottom: 10px !important;
                    }
                    
                    .badge {
                        font-size: 0.7rem !important;
                        padding: 4px 8px !important;
                        margin: 2px !important;
                    }
                    
                    /* Secciones más compactas */
                    .section {
                        margin-bottom: 15px !important;
                        padding: 15px !important;
                    }
                    
                    /* Grids más compactos */
                    .overview-grid, .goals-grid, .specs-grid, .use-case-grid {
                        gap: 10px !important;
                        margin-top: 15px !important;
                    }
                    
                    /* Cards más compactas */
                    .overview-card, .goal-card, .spec-card, .use-case-card {
                        padding: 12px !important;
                        margin: 5px 0 !important;
                    }
                    
                    /* Timeline más compacto */
                    .milestone-item {
                        padding: 12px !important;
                        margin-bottom: 10px !important;
                    }
                    
                    /* Garantías más compactas */
                    .guarantee-grid {
                        grid-template-columns: repeat(6, 1fr) !important;
                        gap: 8px !important;
                    }
                    
                    .guarantee-item {
                        padding: 8px !important;
                    }
                    
                    .guarantee-item .number {
                        font-size: 1.5rem !important;
                        margin-bottom: 3px !important;
                    }
                    
                    /* Footer CTA compacto */
                    .footer-cta {
                        padding: 15px !important;
                    }
                    
                    .cta-grid {
                        grid-template-columns: repeat(6, 1fr) !important;
                        gap: 8px !important;
                    }
                    
                    .cta-item {
                        padding: 8px !important;
                        font-size: 0.75rem !important;
                    }
                    
                    /* Texto más compacto */
                    p, li {
                        font-size: 11px !important;
                        line-height: 1.3 !important;
                        margin: 3px 0 !important;
                    }
                    
                    h2 {
                        font-size: 1.3rem !important;
                        margin: 10px 0 8px 0 !important;
                    }
                    
                    h3 {
                        font-size: 1.1rem !important;
                        margin: 8px 0 5px 0 !important;
                    }
                    
                    h4 {
                        font-size: 1rem !important;
                        margin: 5px 0 3px 0 !important;
                    }
                    
                    /* Imagen del banner más pequeña */
                    .responsive-banner {
                        height: 120px !important;
                        object-fit: cover !important;
                    }
                    
                    /* Sin breaks en ningún lado */
                    * {
                        orphans: 1000 !important;
                        widows: 1000 !important;
                    }
                `;
                clonedDoc.head.appendChild(style);
                
                // Forzar visibilidad de todo
                const allElements = clonedDoc.querySelectorAll('*');
                allElements.forEach(el => {
                    el.style.pageBreakInside = 'auto';
                    el.style.breakInside = 'auto';
                });

                console.log('✅ Estilos continuos aplicados');
            }
        },
        jsPDF: { 
            unit: 'px',
            format: [contentWidth + 50, contentHeight + 100], // Formato personalizado basado en contenido
            orientation: 'portrait',
            compress: true
        }
    };

    console.log('⚙️ Configuración PDF continuo:', opt);

    // Preparar elemento
    const originalStyles = {
        display: element.style.display,
        visibility: element.style.visibility,
        opacity: element.style.opacity,
        position: element.style.position,
        overflow: element.style.overflow
    };

    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.opacity = '1';
    element.style.position = 'static';
    element.style.overflow = 'visible';

    // Ocultar elementos problemáticos
    const problemElements = document.querySelectorAll('.nav-menu, .scroll-indicator');
    problemElements.forEach(el => {
        el.style.display = 'none';
    });

    console.log('🔄 Iniciando conversión continua...');

    // Generar PDF continuo
    html2pdf().set(opt).from(element).save()
        .then(() => {
            console.log('✅ PDF continuo generado exitosamente');
            
            // Restaurar estilos
            Object.keys(originalStyles).forEach(prop => {
                element.style[prop] = originalStyles[prop];
            });
            
            problemElements.forEach(el => {
                el.style.display = '';
            });
            
            if (document.body.contains(loadingOverlay)) {
                document.body.removeChild(loadingOverlay);
            }
            
            showNotification('✅ PDF continuo descargado (sin cortes de página)', 'success');
            trackEvent('PDF', 'download_continuous_success', 'propuesta_continua');
        })
        .catch((error) => {
            console.error('❌ Error generando PDF continuo:', error);
            
            // Restaurar estilos
            Object.keys(originalStyles).forEach(prop => {
                element.style[prop] = originalStyles[prop];
            });
            
            problemElements.forEach(el => {
                el.style.display = '';
            });
            
            if (document.body.contains(loadingOverlay)) {
                document.body.removeChild(loadingOverlay);
            }
            
            // Intentar método alternativo
            console.log('🚨 Intentando método de impresión directa...');
            downloadPrintVersion();
        });
}

// Método alternativo: Preparar para impresión directa
function downloadPrintVersion() {
    console.log('🖨️ Preparando versión para impresión...');
    
    const notification = showNotification('📄 Preparando para impresión. Use "Guardar como PDF" y seleccione "Más configuraciones" > "Diseño: Sin márgenes"', 'success');
    
    // Crear estilos para impresión continua
    const printStyle = document.createElement('style');
    printStyle.id = 'continuous-print-style';
    printStyle.innerHTML = `
        @media print {
            @page {
                size: A4;
                margin: 0;
            }
            
            body {
                background: white !important;
                color: black !important;
                margin: 0 !important;
                padding: 10px !important;
                font-size: 10px !important;
                line-height: 1.2 !important;
            }
            
            /* Ocultar navegación */
            .nav-menu, .scroll-indicator, .loading-overlay {
                display: none !important;
            }
            
            /* Mostrar solo contenido principal */
            body * {
                visibility: hidden !important;
            }
            
            #main-content, #main-content * {
                visibility: visible !important;
            }
            
            #main-content {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                height: auto !important;
                overflow: visible !important;
            }
            
            /* Eliminar todos los cortes */
            * {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                page-break-before: auto !important;
                break-before: auto !important;
                page-break-after: auto !important;
                break-after: auto !important;
            }
            
            /* Contenido más compacto */
            .corresur-header {
                margin-bottom: 10px !important;
            }
            
            .section {
                margin-bottom: 8px !important;
                padding: 8px !important;
            }
            
            h1, h2, h3, h4, h5, h6 {
                margin: 5px 0 3px 0 !important;
                font-size: 12px !important;
            }
            
            p, li {
                margin: 2px 0 !important;
                font-size: 9px !important;
                line-height: 1.1 !important;
            }
            
            .overview-grid, .goals-grid, .specs-grid, .use-case-grid {
                display: block !important;
            }
            
            .overview-card, .goal-card, .spec-card, .use-case-card {
                display: block !important;
                margin: 3px 0 !important;
                padding: 5px !important;
                border: 1px solid #ccc !important;
            }
            
            .responsive-banner {
                height: 50px !important;
            }
            
            .badge {
                font-size: 6px !important;
                padding: 2px 4px !important;
            }
        }
    `;
    document.head.appendChild(printStyle);
    
    // Esperar un momento y abrir diálogo de impresión
    setTimeout(() => {
        window.print();
        
        // Limpiar después de 3 segundos
        setTimeout(() => {
            const styleElement = document.getElementById('continuous-print-style');
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
        }, 3000);
    }, 500);
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
        max-width: 400px;
        font-size: 14px;
        line-height: 1.4;
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
    }, 6000);
    
    return notification;
}

// ===== RESTO DEL CÓDIGO ORIGINAL =====

// Smooth scroll indicator
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

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏁 Página cargada para PDF continuo...');
    
    // Verificaciones
    const mainContent = document.getElementById('main-content');
    const pdfButton = document.querySelector('.pdf-button');
    
    console.log('📋 main-content:', mainContent ? '✅' : '❌');
    console.log('🔘 botón PDF:', pdfButton ? '✅' : '❌');
    
    if (mainContent) {
        console.log('📏 Contenido:', {
            width: mainContent.offsetWidth,
            height: mainContent.offsetHeight,
            scrollWidth: mainContent.scrollWidth,
            scrollHeight: mainContent.scrollHeight
        });
    }

    // Cargar html2pdf si es necesario
    if (typeof html2pdf === 'undefined') {
        console.warn('⚠️ Cargando html2pdf...');
        loadHTML2PDF().then(() => {
            console.log('✅ html2pdf listo para PDF continuo');
        }).catch(err => {
            console.error('❌ Error:', err);
        });
    } else {
        console.log('✅ html2pdf disponible para PDF continuo');
    }

    // Observar secciones
    document.querySelectorAll('.section, .overview-hero, .goals-section, .specifications-section, .use-cases-section, .milestones-section, .guarantee-section').forEach((el) => {
        observer.observe(el);
    });

    // Navegación suave
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

    // Animación de carga
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
        console.log('🎯 Página lista para PDF continuo');
    });

    // Efecto parallax (solo desktop)
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.corresur-header');
            if (header) {
                header.style.transform = `translateY(${scrolled * 0.05}px)`;
            }
        });
    }

    // Efecto typewriter
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
    console.log('%c📄 PDF Continuo sin cortes de página', 'color: #4a9bb5; font-size: 12px;');
});

// Cargar html2pdf
function loadHTML2PDF() {
    return new Promise((resolve, reject) => {
        if (typeof html2pdf !== 'undefined') {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = () => {
            console.log('📚 html2pdf cargado');
            resolve();
        };
        script.onerror = () => {
            console.error('❌ Error cargando html2pdf');
            reject(new Error('No se pudo cargar html2pdf'));
        };
        document.head.appendChild(script);
    });
}

// Navegación por teclado
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
    
    // Shortcut PDF
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        downloadPDF();
    }
});

// Analytics
function trackEvent(category, action, label = '') {
    console.log(`📊 Event: ${category} - ${action} - ${label}`);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Performance
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Cargado en: ${Math.round(loadTime)}ms`);
});

console.log('🎉 Script PDF Continuo cargado - Sin cortes de página');
