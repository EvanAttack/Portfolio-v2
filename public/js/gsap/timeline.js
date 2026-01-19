// assets/js/gsap/timeline.js
window.initTimeline = function () {
    initOnce("timeline", () => {


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

        gsap.from(".timeline-right", {
            opacity: 0,
            y: 40,
            duration: 0.8,
            scrollTrigger: {
                trigger: "#timeline",
                start: "top 70%"
            }
        });
    })
};
