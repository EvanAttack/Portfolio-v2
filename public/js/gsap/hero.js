// assets/js/gsap/hero.js
window.initHero = function () {
    const h1 = document.querySelector(".hero h1");
    const others = document.querySelectorAll(".hero p, .hero .btn");

    if (h1) {
        gsap.from(h1, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    }

    if (others.length) {
        gsap.from(others, {
            y: 16,
            opacity: 0,
            stagger: 0.08,
            delay: 0.2,
            duration: 0.7
        });
    }
};
