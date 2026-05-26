/**
 * APEX WALL CARE - CLIENT SIDE INTERACTIVE LOGIC
 * Pure Vanilla JavaScript implementation of premium site features
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Mobile Navigation & Sticky Header
       ========================================================================== */
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        highlightActiveSection();
    });

    // Toggle Mobile Menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close Menu on Nav Link click (including dropdown links)
    const allNavLinks = navMenu.querySelectorAll('a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.classList.contains('dropdown-toggle')) {
                e.preventDefault();
                // Toggle active class on parent dropdown container on mobile click
                const parent = link.closest('.nav-item-dropdown');
                if (parent) {
                    parent.classList.toggle('active');
                }
                return; // Do not close menu or navigate
            }
            menuToggle.classList.remove('open');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Active link highlighting on scroll (top-level hash links only — not dropdown toggles)
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;
        const sections = document.querySelectorAll('section[id]');
        let currentSectionId = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const isDropdownToggle = link.classList.contains('dropdown-toggle');
            const href = link.getAttribute('href') || '';
            const matchesSection = currentSectionId && href === `#${currentSectionId}`;
            link.classList.toggle('active', !isDropdownToggle && matchesSection);
        });
    }

    highlightActiveSection();

    /* Hide floating CTAs when contact section is visible (avoids overlap on mobile) */
    const contactSectionEl = document.getElementById('contact');
    const floatingActionsEl = document.querySelector('.floating-actions');
    if (contactSectionEl && floatingActionsEl) {
        const floatingHideObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                floatingActionsEl.classList.toggle('floating-actions--hidden', entry.isIntersecting);
            });
        }, {
            threshold: 0.12,
            rootMargin: '-10% 0px -15% 0px'
        });
        floatingHideObserver.observe(contactSectionEl);
    }

    /* ==========================================================================
       2. Scroll Reveal Animations (IntersectionObserver)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // If it's a stats section, trigger the counter
                if (entry.target.querySelector('.stat-number')) {
                    const number = entry.target.querySelector('.stat-number');
                    animateCounter(number);
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       3. Statistics Counter Animation
       ========================================================================== */
    function animateCounter(counterElement) {
        const target = parseInt(counterElement.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        let current = 0;
        
        // Add suffix character if needed (e.g. %)
        const isPercent = counterElement.parentElement.innerText.includes('%') || counterElement.parentElement.innerText.includes('Satisfaits');
        const isPlus = counterElement.parentElement.innerText.includes('Réalisés') || counterElement.parentElement.innerText.includes('Étoiles');

        const timer = setInterval(() => {
            current += Math.ceil(target / (duration / stepTime));
            if (current >= target) {
                clearInterval(timer);
                counterElement.innerText = target + (isPercent ? '%' : '') + (isPlus ? '+' : '');
            } else {
                counterElement.innerText = current + (isPercent ? '%' : '') + (isPlus ? '+' : '');
            }
        }, stepTime);
    }

    // Trigger stats if visible on page load immediately
    document.querySelectorAll('.stat-item').forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            const number = item.querySelector('.stat-number');
            animateCounter(number);
        }
    });

    /* ==========================================================================
       4. Interactive Before/After Image Slider
       ========================================================================== */
    const comparisonSlider = document.querySelector('.slider-comparison-container');
    if (comparisonSlider) {
        const sliderHandle = comparisonSlider.querySelector('.slider-handle');
        const resizeWrapper = comparisonSlider.querySelector('.resize-image-wrapper');
        
        let isSliding = false;

        const slide = (x) => {
            const rect = comparisonSlider.getBoundingClientRect();
            let position = ((x - rect.left) / rect.width) * 100;
            
            if (position < 0) position = 0;
            if (position > 100) position = 100;
            
            sliderHandle.style.left = `${position}%`;
            resizeWrapper.style.width = `${position}%`;
        };

        // Mouse Events
        comparisonSlider.addEventListener('mousedown', () => isSliding = true);
        window.addEventListener('mouseup', () => isSliding = false);
        comparisonSlider.addEventListener('mousemove', (e) => {
            if (!isSliding) return;
            slide(e.clientX);
        });

        // Touch Events (Mobile)
        comparisonSlider.addEventListener('touchstart', () => isSliding = true);
        window.addEventListener('touchend', () => isSliding = false);
        comparisonSlider.addEventListener('touchmove', (e) => {
            if (!isSliding) return;
            slide(e.touches[0].clientX);
        });
    }

    /* ==========================================================================
       5. Filterable Masonry Gallery
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    function updateRealisationMeta() {
        const countEl = document.getElementById('realisation-count');
        const emptyEl = document.getElementById('realisation-empty');
        if (!countEl) return;

        const masonry = document.getElementById('realisation-masonry');
        if (!masonry) return;

        const items = masonry.querySelectorAll('.gallery-item');
        let visible = 0;
        items.forEach(item => {
            if (item.style.display !== 'none') visible++;
        });
        countEl.textContent = visible;
        if (emptyEl) emptyEl.classList.toggle('is-visible', visible === 0);
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active classes
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });

            setTimeout(updateRealisationMeta, 320);
        });
    });

    if (document.getElementById('realisation-count')) {
        updateRealisationMeta();
    }

    /* ==========================================================================
       6. Lightbox Preview Modal
       ========================================================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightbox && lightboxClose) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxPrev = document.getElementById('lightbox-prev');
        const lightboxNext = document.getElementById('lightbox-next');
        const galleryCards = document.querySelectorAll('.gallery-card');

        let activeImagesList = [];
        let currentImageIndex = 0;

        // Open Lightbox
        galleryCards.forEach(card => {
            card.addEventListener('click', () => {
                // Find all currently visible gallery images
                activeImagesList = Array.from(galleryItems)
                    .filter(item => item.style.display !== 'none')
                    .map(item => item.querySelector('.gallery-card'));

                currentImageIndex = activeImagesList.indexOf(card);
                updateLightboxContent();

                lightbox.style.display = 'flex';
                setTimeout(() => lightbox.classList.add('open'), 50);
                document.body.style.overflow = 'hidden';
            });
        });

        function updateLightboxContent() {
            const currentCard = activeImagesList[currentImageIndex];
            if (currentCard) {
                const img = currentCard.querySelector('.gallery-img');
                const parentItem = currentCard.closest('.gallery-item');
                const fallbackSrc = parentItem ? parentItem.getAttribute('data-image') : null;
                const cat = currentCard.querySelector('.gallery-cat').innerText;
                const title = currentCard.querySelector('.gallery-title').innerText;

                if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                } else if (fallbackSrc) {
                    lightboxImg.src = fallbackSrc;
                    lightboxImg.alt = title;
                }
                lightboxCaption.innerHTML = `<strong>${cat}</strong> - ${title}`;
            }
        }

        // Close Lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('open');
            setTimeout(() => lightbox.style.display = 'none', 300);
            document.body.style.overflow = '';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Next & Prev Slide
        const nextSlide = () => {
            currentImageIndex = (currentImageIndex + 1) % activeImagesList.length;
            updateLightboxContent();
        };

        const prevSlide = () => {
            currentImageIndex = (currentImageIndex - 1 + activeImagesList.length) % activeImagesList.length;
            updateLightboxContent();
        };

        lightboxNext.addEventListener('click', nextSlide);
        lightboxPrev.addEventListener('click', prevSlide);

        // Keyboard Navigation support
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });
    } // end lightbox guard

    /* ==========================================================================
       7. Testimonials Carousel Slider
       ========================================================================== */
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    
    let activeTestimonialIndex = 0;
    let autoSlideInterval;

    function showTestimonial(index) {
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        activeTestimonialIndex = index;
    }

    function nextTestimonial() {
        let index = (activeTestimonialIndex + 1) % testimonialSlides.length;
        showTestimonial(index);
    }

    function prevTestimonial() {
        let index = (activeTestimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
        showTestimonial(index);
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextTestimonial();
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevTestimonial();
            resetAutoSlide();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
                resetAutoSlide();
            });
        });

        // Automatic slider
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextTestimonial, 6000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        startAutoSlide();
    }

    /* ==========================================================================
       8. FAQ Accordion
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // Close all active items
            document.querySelectorAll('.faq-item').forEach(el => {
                el.classList.remove('active');
                el.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    /* ==========================================================================
       9. Booking Contact Form Validation & Mock Submission
       ========================================================================== */
    const bookingForm = document.getElementById('booking-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('form-submit-btn');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect Form Values
            const name = document.getElementById('form-name').value.trim();
            const phone = document.getElementById('form-phone').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const service = document.getElementById('form-service').value;
            const message = document.getElementById('form-message').value.trim();

            // Simple validation check
            if (!name || !phone || !email || !service || !message) {
                showFormFeedback('Veuillez remplir tous les champs correctement.', 'error');
                return;
            }

            // Simulate form loading state
            submitBtn.disabled = true;
            submitBtn.querySelector('span').innerText = 'Envoi en cours...';

            setTimeout(() => {
                // Success Mock Response
                showFormFeedback(`Merci ${name} ! Votre demande de devis pour « ${service} » a bien été reçue. Un de nos experts vous contacte dans moins de 15 minutes !`, 'success');
                bookingForm.reset();
                submitBtn.disabled = false;
                submitBtn.querySelector('span').innerText = 'Envoyer la Demande';
                
                // Scroll down slightly to make feedback message fully visible
                formFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1500);
        });
    }

    function showFormFeedback(msg, type) {
        formFeedback.innerText = msg;
        formFeedback.className = `form-feedback ${type}`;
        formFeedback.style.display = 'block';
    }

    // Dynamic Map Embed — uses maps.google.com?output=embed which is permissive about
    // local file:// origins. Falls back to a styled mockup if blocked.
    const mapContainer = document.getElementById('map-container');
    const MAP_EMBED_URL = 'https://maps.google.com/maps?q=SAR+Nettoyage+Occitanie&ll=43.348103,3.234228&z=15&output=embed';
    const MAP_GMAPS_URL = 'https://www.google.com/maps/place/SAR+nettoyage+Occitanie/@43.348103,3.234228,15z';

    function renderMapMockup() {
        mapContainer.innerHTML = `
            <div class="static-map-mockup">
                <div class="map-mockup-bg"></div>
                <div class="map-mockup-overlay">
                    <div class="map-pin-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <h3>SAR Nettoyage</h3>
                    <p>Occitanie, France — 43.348103°N, 3.234228°E<br>Cliquez sur le bouton pour voir notre emplacement sur Google Maps.</p>
                    <a href="${MAP_GMAPS_URL}" target="_blank" rel="noopener" class="btn btn-primary btn-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span>Voir sur Google Maps</span>
                    </a>
                </div>
            </div>
        `;
    }

    if (mapContainer) {
        const iframe = document.createElement('iframe');
        iframe.src = MAP_EMBED_URL;
        iframe.width = '100%';
        iframe.height = '450';
        iframe.style.border = '0';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'no-referrer';
        iframe.title = 'SAR Nettoyage — Carte de localisation';

        // If iframe errors (blocked by browser security over file://), show the mockup
        iframe.onerror = () => renderMapMockup();

        mapContainer.appendChild(iframe);

        // Also detect file:// protocol proactively and show the mockup immediately
        if (window.location.protocol === 'file:') {
            renderMapMockup();
        }
    }

    /* ==========================================================================
       11. Contact Page — Form & Map (contact.html)
       ========================================================================== */
    const contactPageForm = document.getElementById('contact-page-form');
    const contactPageFeedback = document.getElementById('contact-page-feedback');
    const contactPageSubmitBtn = document.getElementById('contact-submit-btn');

    if (contactPageForm) {
        contactPageForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name    = document.getElementById('contact-name').value.trim();
            const phone   = document.getElementById('contact-phone').value.trim();
            const email   = document.getElementById('contact-email').value.trim();
            const service = document.getElementById('contact-service').value;
            const message = document.getElementById('contact-message').value.trim();

            if (!name || !phone || !email || !service || !message) {
                showContactPageFeedback('Veuillez remplir tous les champs correctement.', 'error');
                return;
            }

            contactPageSubmitBtn.disabled = true;
            contactPageSubmitBtn.querySelector('span').innerText = 'Envoi en cours...';

            setTimeout(() => {
                showContactPageFeedback(
                    `Merci ${name} ! Votre demande de devis pour "${service}" a bien été reçue. Nos experts vous contactent dans moins de 15 minutes !`,
                    'success'
                );
                contactPageForm.reset();
                contactPageSubmitBtn.disabled = false;
                contactPageSubmitBtn.querySelector('span').innerText = 'Envoyer la Demande';
                contactPageFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1500);
        });
    }

    function showContactPageFeedback(msg, type) {
        if (!contactPageFeedback) return;
        contactPageFeedback.innerText = msg;
        contactPageFeedback.className = `form-feedback ${type}`;
        contactPageFeedback.style.display = 'block';
    }

    /* ==========================================================================
       12. Page Réalisations — compteur projets (realisation.html)
       Note : filtres galerie, lightbox et slider avant/après réutilisent les sections 4–6.
       ========================================================================== */

    /* ==========================================================================
       13. Blog Page — Search, Filters, Modal & Newsletter (blog.html)
       ========================================================================== */
    const blogSearch = document.getElementById('blog-search');
    const blogFilterBtns = document.querySelectorAll('.blog-filter-btn');
    const blogTagBtns = document.querySelectorAll('.blog-tag');
    const blogPosts = document.querySelectorAll('.blog-post-card');
    const blogCountEl = document.getElementById('blog-count');
    const blogEmpty = document.getElementById('blog-empty');
    const blogModal = document.getElementById('blog-modal');
    const blogNewsletterForm = document.getElementById('blog-newsletter-form');

    let activeBlogFilter = 'all';

    const blogArticles = {
        mold: {
            cat: 'Conseils',
            title: 'Démoussage de toiture à Béziers : éliminer les mousses et lichens sans endommager vos tuiles',
            meta: '<span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 15 Mai 2026</span> · <span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 6 min de lecture</span>',
            body: `<p>L'humidité et le soleil d'Occitanie favorisent la prolifération rapide des mousses, lichens et algues sur les toitures. Si elle n'est pas traitée, la mousse rend les tuiles poreuses et fragiles, provoquant des fissures avec le gel en hiver et entraînant des infiltrations d'eau coûteuses.</p>
                   <p>Chez SAR Nettoyage, nous utilisons des produits certifiés et des techniques en douceur qui éliminent les végétaux nuisibles en profondeur sans abîmer les tuiles de votre toit. Notre étape clé consiste à réaliser un brossage soigné suivi d'un traitement anti-mousse professionnel à action rémanente.</p>
                   <p>Évitez absolument l'utilisation de nettoyeurs haute pression sans contrôle ou de produits chlorés agressifs qui détruisent la protection naturelle de vos tuiles. Préférez un démoussage de toiture professionnel pour un résultat durable et sécurisé.</p>`
        },
        mistakes: {
            cat: 'Entretien',
            title: '5 erreurs à éviter absolument lors du nettoyage de votre toiture',
            meta: '<span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 3 Mai 2026</span> · <span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 5 min de lecture</span>',
            body: `<p><strong>1. Utiliser un nettoyeur haute pression à pleine puissance</strong> — La force excessive peut casser ou fendre vos tuiles et rendre la surface poreuse, favorisant le retour encore plus rapide des mousses.</p>
                   <p><strong>2. Négliger les gouttières pendant le nettoyage</strong> — Accumuler les débris de mousse dans les descentes pluviales provoque des bouchons et des infiltrations d'eau.</p>
                   <p><strong>3. Utiliser de l'eau de Javel pure</strong> — Le chlore corrode les fixations métalliques, blanchit les tuiles et détruit la végétation environnante.</p>
                   <p><strong>4. Intervenir sans équipement de sécurité adapté</strong> — Travailler sur un toit glissant sans harnais ni points d'ancrage est extrêmement dangereux.</p>
                   <p><strong>5. Ignorer le traitement préventif de fin</strong> — Un simple nettoyage sans application d'anti-mousse ou d'hydrofuge ne dure que quelques mois.</p>`
        },
        facade: {
            cat: 'Actualité',
            title: 'Nettoyage de façades en Occitanie : réglementation 2026',
            meta: '<span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 20 Avr 2026</span> · <span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 7 min de lecture</span>',
            body: `<p>En 2026, les exigences en matière d'entretien des façades et de ravalement continuent d'évoluer dans plusieurs communes d'Occitanie. Un nettoyage régulier peut retarder des travaux de réfection coûteux.</p>
                   <p>SAR Nettoyage vous accompagne pour respecter les délais communaux tout en préservant l'intégrité de vos revêtements (enduit, pierre, bardage). Nous adaptons la pression et les produits selon le matériau — jamais de méthode unique pour tous les supports.</p>
                   <p>Contactez-nous pour un audit gratuit de votre façade ou terrasse dans votre ville.</p>`
        },
        smoke: {
            cat: 'Technique',
            title: 'Taches de fumée et nicotine : guide complet de restauration',
            meta: '<span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 12 Avr 2026</span> · <span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 8 min de lecture</span>',
            body: `<p>La nicotine et la suie pénètrent les pores de la peinture, provoquant un jaunissement progressif et des odeurs tenaces. Un simple nettoyage domestique ne suffit souvent pas.</p>
                   <p>Notre protocole combine un dégraissant spécialisé, un rinçage contrôlé et une neutralisation olfactive. Pour les logements après sinistre ou occupation longue durée, nous proposons un traitement complet pièce par pièce.</p>
                   <p>Résultat : murs visuellement rafraîchis et air intérieur nettement amélioré, sans repeindre dans la majorité des cas.</p>`
        },
        water: {
            cat: 'Conseils',
            title: 'Taches d\'humidité sur les murs : causes et solutions durables',
            meta: '<span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 28 Mar 2026</span> · <span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 6 min de lecture</span>',
            body: `<p>Les auréoles brunes signalent souvent une infiltration passée ou une condensation récurrente. Avant de nettoyer, il est essentiel de réparer la source d'eau.</p>
                   <p>Une fois la fuite colmatée et le mur sec, nos techniciens éliminent les traces minérales et salpêtre, puis appliquent un traitement préventif adapté au support.</p>
                   <p>Ne repeignez pas immédiatement après un dégât des eaux : un séchage complet évite la réapparition des taches sous la nouvelle couche.</p>`
        },
        bail: {
            cat: 'Entretien',
            title: 'Fin de bail : checklist pour récupérer votre dépôt de garantie',
            meta: '<span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 15 Mar 2026</span> · <span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 4 min de lecture</span>',
            body: `<p>L'état des murs est l'un des points les plus contestés lors des états des lieux. Traceurs, traces de meubles et salissures dans les angles sont souvent relevés par le propriétaire.</p>
                   <p>Un nettoyage professionnel des murs et plafonds, réalisé avant l'inspection, maximise vos chances de récupérer l'intégralité du dépôt. Nous intervenons rapidement à Béziers et dans un rayon d'environ 30 km.</p>
                   <p>Demandez un devis express — intervention possible sous 48 h selon disponibilité.</p>`
        },
        office: {
            cat: 'Technique',
            title: 'Pourquoi entretenir les murs de vos bureaux chaque trimestre ?',
            meta: '<span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 2 Mar 2026</span> · <span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 5 min de lecture</span>',
            body: `<p>Dans les espaces professionnels, les murs accumulent poussière, traces de doigts et salissures liées au passage. Un entretien trimestriel maintient une image soignée pour vos clients et collaborateurs.</p>
                   <p>Nous intervenons en dehors des heures d'ouverture pour limiter les perturbations. Nos produits sans odeur forte permettent une reprise immédiate de l'activité.</p>
                   <p>Contrats d'entretien sur mesure disponibles pour PME et syndics de copropriété.</p>`
        },
        eco: {
            cat: 'Actualité',
            title: 'Nettoyage écologique : notre engagement pour l\'Occitanie',
            meta: '<span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 18 Fév 2026</span> · <span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 4 min de lecture</span>',
            body: `<p>SAR Nettoyage s'engage à réduire l'impact environnemental de ses interventions : produits biodégradables, dosage précis et limitation des rejets.</p>
                   <p>Nos solutions sont sans danger pour les enfants et les animaux une fois le séchage effectué. C'est un critère essentiel pour les familles et les établissements recevant du public.</p>
                   <p>Choisir un nettoyage écologique, c'est protéger votre intérieur et la planète sans sacrifier l'efficacité.</p>`
        },
        softwash: {
            cat: 'Conseils',
            title: 'Traitement hydrofuge de toiture : la solution ultime contre l\'humidité',
            meta: '<span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 5 Fév 2026</span> · <span class="meta-inline"><svg class="icon-flat" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 6 min de lecture</span>',
            body: `<p>Le traitement hydrofuge de toiture est un imperméabilisant liquide appliqué après le nettoyage. Il bouche les micro-pores des tuiles tout en les laissant respirer. L'eau glisse ainsi sur le toit sans s'infiltrer, emportant les saletés (effet autonettoyant), ce qui ralentit drastiquement la réapparition des mousses.</p>
                   <p>C'est la protection idéale pour garantir la longévité de votre toiture sur 10 ans. Nos équipes appliquent des hydrofuges incolores ou colorés haut de gamme à Béziers et dans tout le département de l'Hérault (34).</p>
                   <p>Contactez SAR Nettoyage pour un diagnostic gratuit de votre toit et un devis personnalisé sous 15 minutes.</p>`
        }
    };

    function applyBlogFilters() {
        if (!blogPosts.length) return;

        const query = blogSearch ? blogSearch.value.trim().toLowerCase() : '';
        let visibleCount = 0;

        blogPosts.forEach(post => {
            const category = post.getAttribute('data-category');
            const searchText = (post.getAttribute('data-search') || '') + ' ' + post.innerText;
            const matchesCategory = activeBlogFilter === 'all' || category === activeBlogFilter;
            const matchesSearch = !query || searchText.toLowerCase().includes(query);
            const isVisible = matchesCategory && matchesSearch;

            post.classList.toggle('is-hidden', !isVisible);
            if (isVisible) visibleCount++;
        });

        if (blogCountEl) {
            blogCountEl.textContent = visibleCount;
        }
        if (blogEmpty) {
            blogEmpty.classList.toggle('is-visible', visibleCount === 0);
        }
    }

    function setBlogFilter(filter) {
        activeBlogFilter = filter;

        blogFilterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
        });
        blogTagBtns.forEach(tag => {
            tag.classList.toggle('active', tag.getAttribute('data-filter') === filter);
        });

        applyBlogFilters();
    }

    if (blogSearch) {
        blogSearch.addEventListener('input', applyBlogFilters);
    }

    blogFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => setBlogFilter(btn.getAttribute('data-filter')));
    });

    blogTagBtns.forEach(tag => {
        tag.addEventListener('click', () => setBlogFilter(tag.getAttribute('data-filter')));
    });

    function openBlogArticle(articleId) {
        const article = blogArticles[articleId];
        if (!article || !blogModal) return;

        document.getElementById('blog-modal-cat').textContent = article.cat;
        document.getElementById('blog-modal-title').textContent = article.title;
        document.getElementById('blog-modal-meta').innerHTML = article.meta;
        document.getElementById('blog-modal-body').innerHTML = article.body;

        blogModal.classList.add('is-open');
        blogModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeBlogModal() {
        if (!blogModal) return;
        blogModal.classList.remove('is-open');
        blogModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.blog-open-article').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openBlogArticle(btn.getAttribute('data-article'));
        });
    });

    document.querySelectorAll('.blog-popular-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openBlogArticle(link.getAttribute('data-article'));
        });
    });

    const blogModalClose = document.getElementById('blog-modal-close');
    if (blogModalClose) {
        blogModalClose.addEventListener('click', closeBlogModal);
    }
    if (blogModal) {
        blogModal.addEventListener('click', (e) => {
            if (e.target === blogModal) closeBlogModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && blogModal.classList.contains('is-open')) {
                closeBlogModal();
            }
        });
    }

    if (blogNewsletterForm) {
        const newsletterFeedback = document.getElementById('blog-newsletter-feedback');
        blogNewsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('blog-newsletter-email').value.trim();
            if (!email) return;

            if (newsletterFeedback) {
                newsletterFeedback.textContent = 'Merci ! Vous êtes inscrit à notre newsletter.';
                newsletterFeedback.className = 'blog-newsletter-feedback success';
            }
            blogNewsletterForm.reset();
        });
    }

    if (blogPosts.length) {
        applyBlogFilters();
    }

    /* ==========================================================================
       14. Pages légales — Sommaire & navigation (conditions.html, confidentialite.html)
       ========================================================================== */
    const legalTocLinks = document.querySelectorAll('#legal-toc-list a');
    const legalSections = document.querySelectorAll('.legal-section[id]');
    const legalTocSelect = document.getElementById('legal-toc-select');

    if (legalTocLinks.length && legalSections.length) {
        legalTocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        const legalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    legalTocLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, {
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        });

        legalSections.forEach(section => legalObserver.observe(section));
    }

    if (legalTocSelect) {
        legalTocSelect.addEventListener('change', () => {
            const target = document.querySelector(legalTocSelect.value);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                legalTocSelect.value = '';
            }
        });
    }

    /* ==========================================================================
       15. Pages Zone — Carte Google Maps (zones/*.html)
       ========================================================================== */
    const zoneMapContainer = document.getElementById('zone-map-container');
    if (zoneMapContainer) {
        const body = document.body;
        const lat = body.getAttribute('data-lat');
        const lng = body.getAttribute('data-lng');
        const city = body.getAttribute('data-city') || 'Occitanie';

        if (window.location.protocol === 'file:') {
            zoneMapContainer.innerHTML = `
                <div class="static-map-mockup" style="min-height:380px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1rem;padding:2rem;text-align:center;background:var(--light-bg);">
                    <p style="color:var(--dark-muted);">Carte interactive — ${city}</p>
                    <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank" rel="noopener" class="btn btn-primary">Voir sur Google Maps</a>
                </div>
            `;
        } else {
            const iframe = document.createElement('iframe');
            iframe.src = `https://maps.google.com/maps?q=${lat},${lng}&z=12&output=embed`;
            iframe.width = '100%';
            iframe.height = '380';
            iframe.style.border = '0';
            iframe.allowFullscreen = true;
            iframe.loading = 'lazy';
            iframe.referrerPolicy = 'no-referrer';
            iframe.title = `SAR Nettoyage — ${city}`;
            zoneMapContainer.appendChild(iframe);
        }
    }

});
