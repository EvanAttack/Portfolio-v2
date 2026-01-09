/**
 * inertia.js
 * Effet \"inertia\" / micro-interactions sur la grille .mwg_effect000
 * - Si InertiaPlugin (Club GreenSock) est présent, on l'utilise.
 * - Sinon fallback : animations GSAP classiques pour simuler l'effet.
 *
 * Inclusion : <script src="{{ asset('js/inertia.js') }}"></script>
 * Note : InertiaPlugin est un plugin payant/privé. Ne pas l'appeler côté client avec un token.
 */

(function () {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP non trouvé — inertia.js ne sera pas exécuté.');
        return;
    }

    const hasInertia = !!(gsap && gsap.plugins && gsap.plugins.inertia);

    document.addEventListener('DOMContentLoaded', () => {
        let oldX = 0, oldY = 0, deltaX = 0, deltaY = 0;
        const root = document.querySelector('.mwg_effect000');
        if (!root) return;

        root.addEventListener('mousemove', (e) => {
            deltaX = e.clientX - oldX;
            deltaY = e.clientY - oldY;
            oldX = e.clientX;
            oldY = e.clientY;
        });

        const medias = root.querySelectorAll('.media');
        medias.forEach(el => {
            el.addEventListener('mouseenter', () => {
                const image = el.querySelector('img');
                if (!image) return;

                if (hasInertia) {
                    // si InertiaPlugin dispo (Club GreenSock) — sinon passe au fallback
                    const tl = gsap.timeline({ onComplete: () => tl.kill && tl.kill() });
                    tl.to(image, {
                        inertia: {
                            x: { velocity: deltaX * 30, end: 0 },
                            y: { velocity: deltaY * 30, end: 0 }
                        }
                    });
                    tl.fromTo(image, { rotate: 0 }, { duration: 0.4, rotate: (Math.random() - 0.5) * 30, yoyo: true, repeat: 1, ease: 'power1.inOut' }, '<');
                } else {
                    // fallback simple : translation puis retour
                    gsap.to(image, { x: deltaX * 0.6, y: deltaY * 0.6, duration: 0.6, ease: 'power2.out' });
                    gsap.fromTo(image, { rotate: 0 }, { duration: 0.3, rotate: (Math.random() - 0.5) * 12, yoyo: true, repeat: 1, ease: 'power1.inOut' });
                    gsap.to(image, { x: 0, y: 0, duration: 0.8, delay: 0.25, ease: 'power3.out' });
                }
            });

            // Optional : reset on mouseleave to ensure clean state
            el.addEventListener('mouseleave', () => {
                const image = el.querySelector('img');
                if (!image) return;
                gsap.to(image, { x: 0, y: 0, rotate: 0, duration: 0.5, ease: 'power2.out' });
            });
        });
    });

const skills = document.querySelectorAll(".skill")
const desc = document.getElementById("skill-desc")

skills.forEach(skill => {
    skill.addEventListener("mouseenter", () => {
        desc.textContent = skill.dataset.desc
        gsap.fromTo(desc, {opacity:0,y:10}, {opacity:1,y:0,duration:.3})
    })
})
})();
