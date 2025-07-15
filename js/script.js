// ===== FUNCIONALIDAD DE DESCARGA PDF ULTRA-ROBUSTA =====
function downloadPDF() {
    console.log('🚀 Iniciando descarga de PDF...');
    
    // Mostrar indicador de carga
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        Generando PDF (versión robusta)...
    `;
    document.body.appendChild(loadingOverlay);

    // Verificar que html2pdf esté disponible
    if (typeof html2pdf === 'undefined') {
        console.error('❌ html2pdf no está disponible');
        if (document.body.contains(loadingOverlay)) {
            document.body.removeChild(loadingOverlay);
        }
        showNotification('❌ Error: Librería PDF no cargada. Recargue la página.', 'error');
        return;
    }

    // Encontrar el elemento de contenido
    const element = document.getElementById('main-content');
    if (!element) {
        console.error('❌ Elemento main-content no encontrado');
        if (document.body.contains(loadingOverlay)) {
            document.body.removeChild(loadingOverlay);
        }
        showNotification('❌ Error: Contenido no encontrado', 'error');
        return;
    }

    console.log('✅ Elemento encontrado:', element);
    console.log('📄 Contenido a convertir:', element.innerHTML.substring(0, 200) + '...');

    // Configuración ULTRA-SIMPLE que siempre funciona
    const opt = {
        margin: 10,
        filename: 'CORRESUR_ERP+IA_Propuesta_Ejecutiva.pdf',
        image: { 
            type: 'jpeg', 
            quality: 0.8 
        },
        html2canvas: { 
            scale: 1,                    // Escala simple
            useCORS: false,              // Sin CORS
            allowTaint: true,            // Permitir contenido "sucio"
            backgroundColor: '#ffffff',   // Fondo blanco
            logging: true,               // Activar logs para debugging
            removeContainer: false,      // No remover container
            foreignObjectRendering: false, // Desactivar renderizado complejo
            onclone: function(clonedDoc) {
                console.log('📋 Documento clonado para PDF');
                
                // Forzar visibilidad de todo el contenido
                const allElements = clonedDoc.querySelectorAll('*');
                allElements.forEach(el => {
                    // Remover cualquier estilo que pueda ocultar contenido
                    el.style.display = '';
                    el.style.visibility = 'visible';
                    el.style.opacity = '1';
                });

                // Ocultar solo elementos de navegación
                const navElements = clonedDoc.querySelectorAll('.nav-menu, .scroll-indicator, .loading-overlay');
                navElements.forEach(el => {
                    el.style.display = 'none';
                });

                // Asegurar que el contenido principal sea visible
                const mainContent = clonedDoc.getElementById('main-content');
                if (mainContent) {
                    mainContent.style.display = 'block';
                    mainContent.style.visibility = 'visible';
                    mainContent.style.opacity = '1';
                    mainContent.style.position = 'static';
                    mainContent.style.height = 'auto';
                    mainContent.style.overflow = 'visible';
                }

                // Aplicar estilos básicos para PDF
                const style = clonedDoc.createElement('style');
                style.innerHTML = `
                    body { 
                        background: white !important; 
                        color: black !important;
                        font-family: Arial, sans-serif !important;
                    }
                    * { 
                        box-sizing: border-box !important; 
                    }
                    .nav-menu, .scroll-indicator, .loading-overlay { 
                        display: none !important; 
                    }
                    #main-content {
                        display: block !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        position: static !important;
                    }
                `;
                clonedDoc.head.appendChild(style);
                
                console.log('✅ Estilos aplicados al documento clonado');
            }
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    };

    console.log('⚙️ Configuración:', opt);

    // Asegurar que el elemento sea visible antes de la conversión
    const originalStyles = {
        display: element.style.display,
        visibility: element.style.visibility,
        opacity: element.style.opacity,
        position: element.style.position
    };

    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.opacity = '1';
    element.style.position = 'static';

    // Ocultar temporalmente elementos problemáticos
    const problemElements = document.querySelectorAll('.nav-menu, .scroll-indicator');
    problemElements.forEach(el => {
        el.style.display = 'none';
    });

    console.log('🔄 Iniciando conversión a PDF...');

    // Generar PDF
    html2pdf().set(opt).from(element).save()
        .then(() => {
            console.log('✅ PDF generado exitosamente');
            
            // Restaurar estilos originales
            Object.keys(originalStyles).forEach(prop => {
                element.style[prop] = originalStyles[prop];
            });
            
            // Restaurar elementos ocultos
            problemElements.forEach(el => {
                el.style.display = '';
            });
            
            // Remover indicador de carga
            if (document.body.contains(loadingOverlay)) {
                document.body.removeChild(loadingOverlay);
            }
            
            showNotification('✅ PDF descargado exitosamente', 'success');
            trackEvent('PDF', 'download_success_robust', 'propuesta_ejecutiva');
        })
        .catch((error) => {
            console.error('❌ Error generando PDF:', error);
            
            // Restaurar estilos originales
            Object.keys(originalStyles).forEach(prop => {
                element.style[prop] = originalStyles[prop];
            });
            
            // Restaurar elementos ocultos
            problemElements.forEach(el => {
                el.style.display = '';
            });
            
            // Remover indicador de carga
            if (document.body.contains(loadingOverlay)) {
                document.body.removeChild(loadingOverlay);
            }
            
            // Intentar método de emergencia
            console.log('🚨 Intentando método de emergencia...');
            downloadPDFEmergency();
        });
}

// Método de emergencia ultra-simple
function downloadPDFEmergency() {
    console.log('🆘 Método de emergencia activado');
    
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        Método de emergencia...
    `;
    document.body.appendChild(loadingOverlay);

    // Configuración minimalista
    const element = document.getElementById('main-content');
    
    // Solo si no funciona nada, usar window.print()
    if (!element || typeof html2pdf === 'undefined') {
        console.log('📄 Usando window.print() como último recurso');
        
        if (document.body.contains(loadingOverlay)) {
            document.body.removeChild(loadingOverlay);
        }
        
        // Preparar página para impresión
        const style = document.createElement('style');
        style.innerHTML = `
            @media print {
                body * { visibility: hidden; }
                #main-content, #main-content * { visibility: visible; }
                #main-content { position: absolute; left: 0; top: 0; width: 100%; }
                .nav-menu, .scroll-indicator { display: none !important; }
            }
        `;
        document.head.appendChild(style);
        
        window.print();
        
        setTimeout(() => {
            document.head.removeChild(style);
        }, 1000);
        
        showNotification('📄 Use "Guardar como PDF" en el diálogo de impresión', 'success');
        return;
    }

    // Configuración súper básica
    const basicOpt = {
        margin: 15,
        filename: 'CORRESUR_ERP+IA_Propuesta_Ejecutiva.pdf',
        html2canvas: { 
            scale: 0.8,
            logging: false
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(basicOpt).from(element).save()
        .then(() => {
            console.log('✅ Método de emergencia exitoso');
            if (document.body.contains(loadingOverlay)) {
                document.body.removeChild(loadingOverlay);
            }
            showNotification('✅ PDF generado con método de emergencia', 'success');
        })
        .catch((error) => {
            console.error('❌ Método de emergencia falló:', error);
            if (document.body.contains(loadingOverlay)) {
                document.body.removeChild(loadingOverlay);
            }
            showNotification('❌ Error total. Use Ctrl+P y "Guardar como PDF"', 'error');
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
        max-width: 350px;
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
    }, 5000);
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
    console.log('🏁 Página cargada, inicializando...');
    
    // Verificar elementos críticos
    const mainContent = document.getElementById('main-content');
    const pdfButton = document.querySelector('.pdf-button');
    
    console.log('📋 Elemento main-content:', mainContent ? '✅ Encontrado' : '❌ No encontrado');
    console.log('🔘 Botón PDF:', pdfButton ? '✅ Encontrado' : '❌ No encontrado');
    
    if (mainContent) {
        console.log('📏 Dimensiones main-content:', {
            width: mainContent.offsetWidth,
            height: mainContent.offsetHeight,
            display: getComputedStyle(mainContent).display,
            visibility: getComputedStyle(mainContent).visibility
        });
    }

    // Verificar si html2pdf está disponible
    if (typeof html2pdf === 'undefined') {
        console.warn('⚠️ html2pdf no está disponible al cargar. Intentando cargar...');
        loadHTML2PDF().then(() => {
            console.log('✅ html2pdf cargado exitosamente');
        }).catch(err => {
            console.error('❌ Error cargando html2pdf:', err);
        });
    } else {
        console.log('✅ html2pdf ya disponible');
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
        console.log('🎯 Página completamente cargada');
    });

    // Parallax effect (solo en desktop)
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
    console.log('%c🔧 Versión robusta con debugging', 'color: #4a9bb5; font-size: 12px;');
});

// Función para cargar html2pdf
function loadHTML2PDF() {
    return new Promise((resolve, reject) => {
        if (typeof html2pdf !== 'undefined') {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = () => {
            console.log('📚 html2pdf cargado desde CDN');
            resolve();
        };
        script.onerror = () => {
            console.error('❌ Error cargando html2pdf desde CDN');
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

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Página cargada en: ${Math.round(loadTime)}ms`);
    trackEvent('Performance', 'page_load_time', `${Math.round(loadTime)}ms`);
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('💥 Error detectado:', e.error);
    trackEvent('Error', 'javascript_error', e.message);
});

console.log('🎉 Script CORRESUR con debugging completo cargado');
