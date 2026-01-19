window.initMyAvatarMask = function () {
    initOnce("myavatarMask", () => {
        if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
        gsap.registerPlugin(ScrollTrigger);

        const section = document.querySelector("#myavatar-mask");
        const reveal = document.querySelector("#maskReveal");
        if (!section || !reveal) return;

        // état initial (0% reveal)
        gsap.set(reveal, { clipPath: "inset(0 100% 0 0)" });

        gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=700",      // durée du freeze (ajuste si tu veux plus long)
                scrub: true,       // scroll = timeline (reverse OK)
                pin: true,         // freeze
                anticipatePin: 1
            }
        })
            .to({}, { duration: 0.25 })
            .to(reveal, {
                clipPath: "inset(0 0% 0 0)",
                ease: "none"
            });
    });
};
