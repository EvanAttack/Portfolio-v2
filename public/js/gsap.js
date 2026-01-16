/**
 * gsap.js
 * Centralise les animations GSAP (ScrollTrigger, apparitions, interactions légères).
 *
 * Inclusion : <script src="{{ asset('js/gsap.js') }}"></script>
 * Assure-toi d'avoir inclus gsap + ScrollTrigger avant ce fichier :
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
 */

(function () {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP non trouvé — gsap.js ne sera pas exécuté.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    function animateHero() {
        const h1 = document.querySelector('.hero h1');
        const other = document.querySelectorAll('.hero p, .hero .btn');

        if (h1) gsap.from(h1, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' });
        if (other.length) gsap.from(other, { y: 16, opacity: 0, duration: 0.7, delay: 0.2, stagger: 0.08 });
    }

    // Timeline reveal
    function animateTimeline() {
        const nodes = gsap.utils.toArray('[data-anim]');
        nodes.forEach((el, i) => {
            gsap.from(el, {
                y: 40, opacity: 0, duration: 0.8, delay: i * 0.12,
                scrollTrigger: { trigger: el, start: 'top 80%' }
            });
        });
    }

    // Cards appear
    function animateCards() {
        if (document.querySelectorAll('#reposGrid .repo-card').length) {
            ScrollTrigger.batch('#reposGrid .repo-card', {
                onEnter: batch => gsap.from(batch, { y: 30, opacity: 0, stagger: 0.06, duration: 0.7 }),
                start: 'top 90%'
            });
        }

        if (document.querySelectorAll('#projectsGrid .repo-card').length) {
            ScrollTrigger.batch('#projectsGrid .repo-card', {
                onEnter: batch => gsap.from(batch, { y: 24, opacity: 0, stagger: 0.06, duration: 0.7 }),
                start: 'top 90%'
            });
        }
    }

    // Color picker & dark toggle (animation feedback)
    function setupAppearanceControls() {
        const colorDots = document.querySelectorAll('.color-dot');
        colorDots.forEach(el => {
            el.addEventListener('click', () => {
                const c = el.dataset.color;
                if (!c) return;
                document.documentElement.style.setProperty('--accent', c);
                gsap.fromTo(el, { scale: 0.9 }, { scale: 1.05, duration: 0.4, ease: 'elastic.out(1,0.7)' });
            });
        });

        const darkToggle = document.getElementById('darkToggle');
        if (darkToggle) {
            darkToggle.addEventListener('change', (e) => {
                if (e.target.checked) document.body.setAttribute('data-theme', 'dark');
                else document.body.setAttribute('data-theme', 'light');
            });
        }
    }

    // Public init
    function init() {
        animateHero();
        animateTimeline();
        animateCards();
        setupAppearanceControls();
    }

    // Launch when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }


const steps = document.querySelectorAll('[data-step]');
const descs = document.querySelectorAll('[data-desc]');
    ScrollTrigger.refresh();


if (steps.length && descs.length) {


    gsap.timeline({
        scrollTrigger: {
            trigger: ".timeline-pin",
            start: "top top",
            end: "+=200%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            onUpdate: self => {
                const p = self.progress;

                steps.forEach(s => s.classList.remove("active"));
                descs.forEach(d => d.classList.remove("active"));

                if (p < 0.33) {
                    activate("objectif");
                } else if (p < 0.66) {
                    activate("but");
                } else {
                    activate("lycee");
                }
            }
        }
    });

    function activate(key) {
        document.querySelector(`[data-step="${key}"]`)?.classList.add("active");
        document.querySelector(`[data-desc="${key}"]`)?.classList.add("active");
    }
}

const progressLine = document.querySelector(".timeline-line-progress");

gsap.to(progressLine, {
    height: "100%",
    ease: "none",
    scrollTrigger: {
        trigger: ".timeline-pin",
        start: "top top",
        end: "+=200%",
        scrub: true
    }
});

gsap.from(".timeline-right", {
    opacity: 0,
    y: 40,
    duration: 0.8,
    scrollTrigger: {
        trigger: "#timeline",
        start: "top 70%"
    }
});



// ===== HORIZONTAL SCROLL SKILLS =====
const skillsSection = document.querySelector('#skills');
const skillsTrack = document.querySelector('.skills-track');

if (skillsSection && skillsTrack) {
    const scrollWidth = skillsTrack.scrollWidth - window.innerWidth;

    gsap.to(skillsTrack, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
            trigger: skillsSection,
            start: 'top top',
            end: () => `+=${skillsTrack.scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
        }
    });
}


gsap.registerPlugin(ScrollTrigger);

window.initReposAnimation = function () {

    const reposSection = document.querySelector('#repos');
    const repoCards = gsap.utils.toArray('#reposGrid .repo-card');

    if (!reposSection || repoCards.length === 0) return;

    gsap.set(repoCards, { opacity: 0, y: 40 });

    gsap.timeline({
        scrollTrigger: {
            trigger: reposSection,
            start: 'top top',
            end: '+=1200',
            pin: true,
            scrub: true,
            anticipatePin: 1
        }
    })
        .to(repoCards, {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out'
        })
        .to(repoCards, {
            scale: 1.02,
            stagger: 0.08,
            duration: 0.5
        });
};

gsap.registerPlugin(Flip);

const container = document.querySelector(".carousel-container");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let isAnimating = false;

    if (container && nextBtn && prevBtn) {

        nextBtn.addEventListener("click", () => move(true));
        prevBtn.addEventListener("click", () => move(false));

        function move(forward) {
            if (isAnimating) return;
            isAnimating = true;

            const cards = gsap.utils.toArray(".project-card", container);
            const state = Flip.getState(cards);

            if (forward) {
                container.append(cards[0]);
            } else {
                container.prepend(cards[cards.length - 1]);
            }

            Flip.from(state, {
                duration: 0.8,
                ease: "power2.inOut",
                absolute: true,
                stagger: 0.05,
                onComplete: () => isAnimating = false
            });
        }

        document.querySelectorAll(".project-card").forEach(card => {
            card.addEventListener("click", () => {
                const slug = card.dataset.slug;
                if (!slug) return;
                window.location.href = `/projects/${slug}`;
            });
        });
    }

document.addEventListener("DOMContentLoaded", () => {

    // Anim navbar
    gsap.from(".main-navbar", {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".nav-links li", {
        y: -10,
        opacity: 0,
        stagger: 0.1,
        delay: 0.3,
        duration: 0.6,
        ease: "power2.out"
    });

    const panel = document.getElementById("projectsPanel");
    const toggle = document.getElementById("projectsToggle");

    if (!panel || !toggle) return;

    let isOpen = false;
    let lastScrollY = window.scrollY;

    // état initial
    gsap.set(panel, { height: 0, opacity: 0 });

    // toggle projets
    toggle.addEventListener("click", (e) => {
        e.stopPropagation();

        isOpen = !isOpen;

        gsap.to(panel, {
            scaleY: isOpen ? 1 : 0,
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
            duration: 0.35,
            ease: "power3.inOut"
        });
    });

    // click ailleurs → close
    document.addEventListener("click", (e) => {
        if (!isOpen) return;
        if (panel.contains(e.target) || toggle.contains(e.target)) return;

        closePanel();
    });

    // click sur un projet → close
    panel.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closePanel);
    });

    // scroll → close
    window.addEventListener("scroll", () => {
        if (!isOpen) return;

        const delta = Math.abs(window.scrollY - lastScrollY);
        if (delta > 5) closePanel();

        lastScrollY = window.scrollY;
    });

    // ESC → close
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen) closePanel();
    });

    function closePanel() {
        gsap.to(panel, {
            scaleY: 0,
            opacity: 0,
            pointerEvents: "none",
            duration: 0.25,
            ease: "power2.inOut"
        });
        isOpen = false;
    }
});



    document.addEventListener("DOMContentLoaded", () => {
        const panel = document.getElementById("contactPanel");
        const overlay = document.getElementById("contactOverlay");
        const openBtn = document.getElementById("contactToggle");
        const closeBtn = document.getElementById("contactClose");

        if (!panel || !overlay || !openBtn) return;

        let isOpen = false;

        function openPanel() {
            isOpen = true;
            overlay.style.pointerEvents = "auto";

            gsap.to(overlay, { opacity: 1, duration: 0.3 });
            gsap.to(panel, {
                x: 0,
                duration: 0.6,
                ease: "power3.out"
            });
        }

        function closePanel() {
            isOpen = false;
            overlay.style.pointerEvents = "none";

            gsap.to(overlay, { opacity: 0, duration: 0.3 });
            gsap.to(panel, {
                x: "100%",
                duration: 0.5,
                ease: "power3.in"
            });
        }

        openBtn.addEventListener("click", openPanel);
        closeBtn.addEventListener("click", closePanel);
        overlay.addEventListener("click", closePanel);

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && isOpen) closePanel();
        });
    });
    gsap.from("#contactPanel .contact-row, #contactPanel .contact-socials a", {
        y: 15,
        opacity: 0,
        stagger: 0.08,
        delay: 0.2,
        duration: 0.5,
        ease: "power2.out"
    });


    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-section",
            start: "top top",
            end: "+=200",          // durée du freeze (ajuste si besoin)
            scrub: true,           // animation liée au scroll (aller/retour)
            pin: false,             // lock la section
            anticipatePin: 1,
        }
    });

// TITRE mot par mot
    tl.to(".about-title span", {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        ease: "power3.out",
    });

// LIGNE
    tl.to(".about-line", {
        width: "120px",
        ease: "power2.out",
    }, "-=0.3");

// TEXTE
    tl.to(".about-text", {
        opacity: 1,
        y: 0,
        ease: "power3.out",
    }, "-=0.2");

    gsap.utils.toArray(".interest-card").forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power3.out"
        });
    });

    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });



})();

