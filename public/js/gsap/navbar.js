window.initNavbar = function () {
    initOnce("navbar", () => {

        const navbar = document.querySelector(".main-navbar");
        if (!navbar) return;

        gsap.fromTo(
            navbar,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );

        gsap.fromTo(
            ".nav-links li",
            { y: -10, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                delay: 0.3,
                duration: 0.6
            }
        );

        const panel = document.getElementById("projectsPanel");
        const toggle = document.getElementById("projectsToggle");

        if (!panel || !toggle) return;

        let isOpen = false;
        let lastScrollY = window.scrollY;

        gsap.set(panel, {
            scaleY: 0,
            opacity: 0,
            transformOrigin: "top",
            pointerEvents: "none"
        });

        function openPanel() {
            isOpen = true;
            gsap.to(panel, {
                scaleY: 1,
                opacity: 1,
                pointerEvents: "auto",
                duration: 0.35,
                ease: "power3.inOut"
            });
        }

        function closePanel() {
            isOpen = false;
            gsap.to(panel, {
                scaleY: 0,
                opacity: 0,
                pointerEvents: "none",
                duration: 0.25,
                ease: "power2.inOut"
            });
        }

        toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            isOpen ? closePanel() : openPanel();
        });

        document.addEventListener("click", (e) => {
            if (!isOpen) return;
            if (panel.contains(e.target) || toggle.contains(e.target)) return;
            closePanel();
        });

        panel.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closePanel);
        });

        window.addEventListener("scroll", () => {
            if (!isOpen) return;
            if (Math.abs(window.scrollY - lastScrollY) > 5) closePanel();
            lastScrollY = window.scrollY;
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && isOpen) closePanel();
        });
    });
};
