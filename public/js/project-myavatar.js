window.initNavbar = function () {

    const panel = document.getElementById("projectsPanel");
    const toggle = document.getElementById("projectsToggle");

    if (!panel || !toggle) return;

    // 🔐 PROTECTION ANTI DOUBLE INIT
    if (toggle.dataset.bound === "true") return;
    toggle.dataset.bound = "true";

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

    let isOpen = false;
    let lastScrollY = window.scrollY;

    gsap.set(panel, { scaleY: 0, opacity: 0, pointerEvents: "none" });

    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        isOpen = !isOpen;

        gsap.to(panel, {
            scaleY: isOpen ? 1 : 0,
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
            duration: 0.35,
            ease: "power3.inOut"
        });
    });

    function closePanel() {
        gsap.to(panel, {
            scaleY: 0,
            opacity: 0,
            pointerEvents: "none",
            duration: 0.25,
            ease: "power2.inOut"
        });
        isOpen = false;
    }

    document.addEventListener("click", (e) => {
        if (!isOpen) return;
        if (panel.contains(e.target) || toggle.contains(e.target)) return;
        closePanel();
    });

    window.addEventListener("scroll", () => {
        if (!isOpen) return;
        if (Math.abs(window.scrollY - lastScrollY) > 5) closePanel();
        lastScrollY = window.scrollY;
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen) closePanel();
    });
};
