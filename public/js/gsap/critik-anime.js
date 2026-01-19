window.initCritikAnime = function () {
    initOnce("critikAnime", () => {
        if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
        gsap.registerPlugin(ScrollTrigger);

        // Hero entrance
        gsap.fromTo(".ca-hero .project-left > *",
            { y: 26, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power3.out" }
        );

        gsap.fromTo(".ca-hero .project-image",
            { scale: 0.92, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 }
        );

        // Pin flow section
        const pin = document.querySelector("#ca-flow .ca-flow-pin");
        const steps = gsap.utils.toArray("#ca-flow [data-ca-step]");
        const panels = gsap.utils.toArray("#ca-flow [data-ca-panel]");

        if (pin && steps.length && panels.length) {
            function activate(key){
                steps.forEach(s => s.classList.remove("active"));
                panels.forEach(p => p.classList.remove("active"));
                document.querySelector(`#ca-flow [data-ca-step="${key}"]`)?.classList.add("active");
                document.querySelector(`#ca-flow [data-ca-panel="${key}"]`)?.classList.add("active");
            }

            // progress-based switch
            gsap.timeline({
                scrollTrigger: {
                    trigger: pin,
                    start: "top top",
                    end: "+=900",
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const p = self.progress;
                        if (p < 0.33) activate("api");
                        else if (p < 0.66) activate("front");
                        else activate("avatar");
                    }
                }
            }).to({}, { duration: 1 });
        }

        // Feature cards stagger
        gsap.utils.toArray("[data-ca-stagger]").forEach(block => {
            gsap.fromTo(block.querySelectorAll(".ca-card"),
                { y: 26, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: { trigger: block, start: "top 80%" }
                }
            );
        });

        // Sections reveal
        gsap.utils.toArray(".ca-section .ca-h2, .ca-flow-title").forEach(el => {
            gsap.fromTo(el,
                { y: 18, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 85%" }
                }
            );
        });
    });
};
