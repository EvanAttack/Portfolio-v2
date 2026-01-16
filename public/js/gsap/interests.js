// assets/js/gsap/interests.js
window.initInterests = function () {
    gsap.utils.toArray(".interest-card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%"
            },
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power3.out"
        });
    });
};
