// assets/js/gsap/about.js
window.initAbout = function () {

    const section = document.querySelector(".about-section");
    if (!section) return;

    gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=600",
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    })
        .to(".about-title span", {
            opacity: 1,
            y: 0,
            stagger: 0.15
        })
        .to(".about-line", {
            width: "120px"
        }, "-=0.3")
        .to(".about-text", {
            opacity: 1,
            y: 0
        }, "-=0.2");
};
