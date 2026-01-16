// assets/js/gsap/timeline.js
window.initTimeline = function () {

    const steps = document.querySelectorAll("[data-step]");
    const descs = document.querySelectorAll("[data-desc]");
    const progress = document.querySelector(".timeline-line-progress");

    if (!steps.length || !descs.length || !progress) return;

    gsap.timeline({
        scrollTrigger: {
            trigger: ".timeline-pin",
            start: "top+=120 top",
            end: "+=200%",
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    }).to({}, {
        onUpdate: self => {
            const p = self.progress;

            steps.forEach(s => s.classList.remove("active"));
            descs.forEach(d => d.classList.remove("active"));

            if (p < 0.33) activate("objectif");
            else if (p < 0.66) activate("but");
            else activate("lycee");
        }
    });

    function activate(key) {
        document.querySelector(`[data-step="${key}"]`)?.classList.add("active");
        document.querySelector(`[data-desc="${key}"]`)?.classList.add("active");
    }

    gsap.to(progress, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".timeline-pin",
            start: "top+=120 top",
            end: "+=200%",
            scrub: true
        }
    });
};
