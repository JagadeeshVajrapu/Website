document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled-nav');
        } else {
            navbar.classList.remove('scrolled-nav');
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            // Toggle icon or text if needed
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing if you want animation only once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .zoom-in');
    animatedElements.forEach(el => observer.observe(el));

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');

    if (stats.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const value = parseInt(target.getAttribute('data-target'));
                    const duration = 2000; // ms
                    const stepTime = Math.abs(Math.floor(duration / value));
                    let current = 0;

                    const timer = setInterval(() => {
                        current += 1;
                        target.innerText = current + (target.getAttribute('data-suffix') || '');
                        if (current >= value) {
                            clearInterval(timer);
                            target.innerText = value + (target.getAttribute('data-suffix') || '');
                        }
                    }, stepTime < 10 ? 10 : stepTime); // Min 10ms

                    statsObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => statsObserver.observe(stat));
    }

    // Hero Text Typing Effect (Simple)
    const heroText = document.getElementById('hero-text-dynamic');
    if (heroText) {
        const texts = ["Digital Solutions", "Innovative Software", "Web Design", "App Development"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                heroText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                heroText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    // Cursor Halo Effect
    const halo = document.createElement('div');
    halo.classList.add('cursor-halo');
    document.body.appendChild(halo);

    // Initial Hide (until mouse moves)
    halo.style.opacity = '0';

    window.addEventListener('mousemove', (e) => {
        halo.style.opacity = '1';
        halo.style.left = `${e.clientX}px`;
        halo.style.top = `${e.clientY}px`;

        // Update Spotlight Variables
        document.querySelectorAll('.spotlight-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        // Update 3D Tilt
        document.querySelectorAll('.tilt-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Check if mouse is near/over the card to apply effect
            if (e.clientX >= rect.left - 50 && e.clientX <= rect.right + 50 &&
                e.clientY >= rect.top - 50 && e.clientY <= rect.bottom + 50) {

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Calculate rotation (max 10 degrees)
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            } else {
                card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
            }
        });
    });

    // Reset Tilt on Mouse Leave
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        });
    });

    // Add search and replace for classes to apply new effects
    const serviceCards = document.querySelectorAll('.hover-lift');
    serviceCards.forEach(card => {
        card.classList.add('spotlight-card');
        card.classList.add('tilt-card');

        // Add overlay el manually if not present
        if (!card.querySelector('.spotlight-overlay')) {
            const overlay = document.createElement('div');
            overlay.classList.add('spotlight-overlay');
            card.appendChild(overlay);
        }
    });

    // Add hover effect to interactive elements for cursor
    const hoverSelectors = 'a, button, input, select, textarea, .cursor-pointer, .hover-lift';
    const interactiveElements = document.querySelectorAll(hoverSelectors);

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => halo.classList.add('hovered'));
        el.addEventListener('mouseleave', () => halo.classList.remove('hovered'));
    });

    /* ----------------------------- */
    /* Global Odiyamma visual injections */
    /* ----------------------------- */
    function createBubbles(count = 8) {
        const container = document.createElement('div');
        container.className = 'ody-bubbles';
        for (let i = 0; i < count; i++) {
            const b = document.createElement('div');
            b.className = 'bubble';
            const size = Math.floor(Math.random() * 180) + 40;
            b.style.width = `${size}px`;
            b.style.height = `${size}px`;
            b.style.left = Math.random() * 100 + 'vw';
            b.style.top = Math.random() * 100 + 'vh';
            b.style.background = `linear-gradient(45deg, rgba(255,222,89,${0.08 + Math.random()*0.08}), rgba(255,0,127,${0.06 + Math.random()*0.06}))`;
            b.style.animationDuration = `${8 + Math.random() * 12}s`;
            container.appendChild(b);
        }
        document.body.appendChild(container);
    }

    createBubbles(10);

    /* Runner animation removed — moving element disabled per user request */

    /* Per-page special enhancements */
    const path = window.location.pathname.toLowerCase();

    // Careers Page: job animations, badges, CTA pulse
    if (path.includes('careers.html') || path.endsWith('/careers') ) {
        // Add a subtle celebration character near top
        const hero = document.querySelector('header') || document.querySelector('.careers-hero') || document.body;
        const svg = document.createElement('div');
        svg.innerHTML = `
            <svg width="140" height="140" viewBox="0 0 120 120" style="position:absolute;right:12px;top:12px;z-index:5;pointer-events:none;opacity:.95;" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="g1" x1="0" x2="1"><stop offset="0" stop-color="#ffde59"/><stop offset="1" stop-color="#ff007f"/></linearGradient>
                </defs>
                <circle cx="40" cy="40" r="28" fill="url(#g1)" />
                <g transform="translate(12,12)">
                    <circle cx="20" cy="16" r="6" fill="#fff" opacity=".9" />
                    <path d="M6 36c6 6 20 6 26 0" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"/>
                </g>
            </svg>
        `;
        hero.appendChild(svg);

        // Enhance job cards
        const jobs = document.querySelectorAll('.job-card, .jobs-grid .p-8, .careers-grid .job-card');
        if (jobs.length === 0) {
            // If site uses generic service-card-like markup, try to target .hover-lift blocks inside careers
            document.querySelectorAll('section, article').forEach(sec => {
                if (sec.innerText && sec.innerText.toLowerCase().includes('careers')) {
                    sec.querySelectorAll('.hover-lift').forEach(el => el.classList.add('job-card'));
                }
            });
        }

        document.querySelectorAll('.job-card').forEach(card => {
            // add badge if missing
            if (!card.querySelector('.job-badge')) {
                const b = document.createElement('div');
                b.className = 'job-badge';
                b.textContent = 'Hiring';
                card.prepend(b);
            }

            // ripple origin on mousemove
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--ripple-x', `${x}px`);
                card.style.setProperty('--ripple-y', `${y}px`);
            });

            // small bounce on hover
            card.addEventListener('mouseenter', () => {
                card.animate([
                    { transform: 'translateY(0) scale(1)' },
                    { transform: 'translateY(-6px) scale(1.01)' },
                    { transform: 'translateY(0) scale(1)' }
                ], { duration: 520, easing: 'cubic-bezier(.2,.9,.2,1)' });
            });
        });

        // Pulse Join CTA if exists
        const join = document.querySelector('.join-cta, .btn-bubble[href*="careers"], a[href*="careers"]');
        if (join) join.classList.add('pulse');
    }

    // Services Page: alternate card colors and icons morph
    if (path.includes('services.html') || path.endsWith('/services')) {
        const serviceCards = document.querySelectorAll('#services .spotlight-card, #services .hover-lift, .service-card, .spotlight-card');
        serviceCards.forEach((card, idx) => {
            const n = (idx % 3) + 1;
            card.classList.add('service-card', `ody-${n}`);
            // add title underline wrapper if not present
            const h = card.querySelector('h3, h2, .service-title');
            if (h && !h.classList.contains('service-title')) h.classList.add('service-title');
            // tiny icon morph on hover
            const icon = card.querySelector('i, svg, img');
            if (icon) icon.classList.add('svc-icon');
        });
    }

    // Contact Page: inject bubbles near form and style map wrapper
    if (path.includes('contact.html') || path.endsWith('/contact')) {
        // add floating emojis nearby
        const emojis = ['🥰','🤝','📮','📞','✨'];
        const form = document.querySelector('form') || document.querySelector('.contact-form') || document.body;
        const wrap = document.createElement('div');
        wrap.style.position = 'absolute';
        wrap.style.right = '6%';
        wrap.style.top = '18%';
        wrap.style.zIndex = '4';
        emojis.forEach((em,i) => {
            const s = document.createElement('div');
            s.textContent = em;
            s.style.fontSize = `${18 + i*6}px`;
            s.style.opacity = '0.9';
            s.style.margin = '6px';
            s.className = 'sticker-float';
            s.style.animationDuration = `${4 + i*1.5}s`;
            wrap.appendChild(s);
        });
        form.appendChild(wrap);

        // map container styling if map iframe exists
        const iframe = document.querySelector('iframe[src*="google.com/maps"], iframe[src*="openstreetmap"], .map');
        if (iframe) {
            const container = document.createElement('div');
            container.className = 'map-ody-wrap';
            iframe.parentNode.insertBefore(container, iframe);
            container.appendChild(iframe);
        }
    }
});
