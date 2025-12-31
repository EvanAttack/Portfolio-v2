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
})();


const steps = document.querySelectorAll('[data-step]');
const descs = document.querySelectorAll('[data-desc]');

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




