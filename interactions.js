document.addEventListener('DOMContentLoaded', () => {

    /* --- Loader Logic --- */
    const loader = document.getElementById('ody-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500); // Show for 1.5 seconds
    }

    // Decorative floating emojis removed to avoid visual overlap and missing-image artifacts

    // Image fallback handler: restore Odiyamma Bunty placeholder if an image fails to load
    (function addImageFallbacks() {
        const fallback = 'images/odiyamma/feature_cards.png';
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function onError() {
                if (img.dataset.fallbackApplied) return;
                img.dataset.fallbackApplied = '1';
                img.src = fallback;
                img.classList.add('missing-img');
                img.style.objectFit = 'cover';
                img.removeEventListener('error', onError);
            });
        });
    })();

    /* --- Custom Cursor & Trails --- */
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor', 'default');

    // SVG Arrow for Default State
    cursor.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="cursor-svg">
            <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="white" stroke="black" stroke-width="2" stroke-linejoin="round"/>
        </svg>
    `;

    document.body.appendChild(cursor);

    let trailDots = [];
    const trailLimit = 12;

    // Initialize cursor movement
    document.addEventListener('mousemove', (e) => {
        // Move main cursor
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        // Create trailing dot
        createTrailDot(e.clientX, e.clientY);
    });

    function createTrailDot(x, y) {
        const dot = document.createElement('div');
        dot.classList.add('cursor-trail');
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        document.body.appendChild(dot);
        trailDots.push(dot);

        // Remove old dots
        if (trailDots.length > trailLimit) {
            const oldDot = trailDots.shift();
            oldDot.remove();
        }

        // Fade out animation
        setTimeout(() => {
            dot.style.opacity = '0';
            dot.style.transform = 'translate(-50%, -50%) scale(0.2)';
            setTimeout(() => {
                dot.remove();
                // Clean up array if just in case
                const index = trailDots.indexOf(dot);
                if (index > -1) {
                    trailDots.splice(index, 1);
                }
            }, 300);
        }, 50);
    }

    /* --- Hover Interactions (Morphing) --- */

    // Bubble Morph (Links & Buttons)
    const morphElements = document.querySelectorAll('a, button, .btn-bubble, .hover-lift');

    morphElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.remove('default');
            cursor.classList.add('bubble');
            cursor.innerHTML = ''; // Remove arrow SVG
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('bubble');
            cursor.classList.add('default');
            // Restore arrow SVG
            cursor.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="cursor-svg">
                    <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="white" stroke="black" stroke-width="2" stroke-linejoin="round"/>
                </svg>
            `;
        });
    });

    // Special Emoji/Blob Interactions
    const funElements = document.querySelectorAll('.tilt-card img, .bg-odiyamma');

    funElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.remove('default', 'bubble');
            cursor.classList.add('blob'); // Liquid effect
            cursor.innerHTML = '';
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('blob');
            cursor.classList.add('default');
            cursor.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="cursor-svg">
                    <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="white" stroke="black" stroke-width="2" stroke-linejoin="round"/>
                </svg>
            `;
        });
    });

    // Click Effect (Pop)
    document.addEventListener('click', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
    });

    /* --- Existing Logic (Preserved) --- */

    // 3D Tilt Effect
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Spotlight/Glow Effect
    const spotlightCards = document.querySelectorAll('.spotlight-card');

    spotlightCards.forEach(card => {
        // Create overlay if it doesn't exist
        if (!card.querySelector('.spotlight-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'spotlight-overlay';
            card.appendChild(overlay);
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Click Ripple Effect
    const rippleElements = document.querySelectorAll('.btn-ripple');

    rippleElements.forEach(btn => {
        btn.addEventListener('click', function (e) {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            setTimeout(() => {
                ripple.remove();
            }, 600); // Duration matches CSS animation
        });
    });

    /* ----------------------------- */
    /* Contact form focus animations */
    /* ----------------------------- */
    const contactInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, input, textarea');
    contactInputs.forEach(inp => {
        inp.addEventListener('focus', () => {
            inp.classList.add('input-glow');
        });
        inp.addEventListener('blur', () => {
            inp.classList.remove('input-glow');
        });
    });

    // Button bubble pop animation for .btn-bubble elements on click
    document.querySelectorAll('.btn-bubble').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.position = 'absolute';
            ripple.style.width = ripple.style.height = '20px';
            ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.6) 10%, transparent 11%)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.transition = 'transform .45s ease, opacity .45s ease';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = 2;
            btn.style.position = 'relative';
            btn.appendChild(ripple);
            requestAnimationFrame(() => {
                ripple.style.transform = 'translate(-50%, -50%) scale(8)';
                ripple.style.opacity = '0';
            });
            setTimeout(() => ripple.remove(), 500);
        });
    });
});
