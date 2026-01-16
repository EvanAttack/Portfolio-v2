// assets/js/gsap/skills.js
window.initSkills = function () {
    const section = document.querySelector("#skills");
    const track = document.querySelector(".skills-track");

    if (!section || !track) return;

    const scrollWidth = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    });
};
