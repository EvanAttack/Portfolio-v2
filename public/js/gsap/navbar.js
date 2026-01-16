window.initNavbar = function () {
    gsap.from(".main-navbar", {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".nav-links li", {
        y: -10,
        opacity: 0,
        stagger: 0.1,
        delay: 0.3
    });
};
