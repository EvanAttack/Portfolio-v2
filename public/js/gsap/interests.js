window.initInterests = function () {
    initOnce("interets", () => {

        const cards = gsap.utils.toArray(".interest-card");
        if (!cards.length) return;

        gsap.set(cards, {opacity: 0, y: 40});

        ScrollTrigger.batch(cards, {
            start: "top 85%",
            onEnter: batch =>
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.12,
                    duration: 0.6,
                    ease: "power3.out"
                }),
            onLeaveBack: batch =>
                gsap.to(batch, {
                    opacity: 0,
                    y: 40,
                    stagger: 0.08,
                    duration: 0.4
                })
        });
    })
};
