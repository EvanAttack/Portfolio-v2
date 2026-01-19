// assets/js/gsap/gsap-init.js
(function () {

    if (typeof gsap === "undefined") {
        console.warn("GSAP non chargé");
        return;
    }


    window.initOnce = function (key, fn) {
        window.__gsapFlags = window.__gsapFlags || {};

        if (window.__gsapFlags[key]) return;

        window.__gsapFlags[key] = true;
        fn();
    };

    gsap.registerPlugin(ScrollTrigger, Flip);

    function initAllGSAP() {
        window.initHero?.();
        window.initAbout?.();
        window.initInterests?.();
        window.initTimeline?.();
        window.initSkills?.();
        window.initRepos?.();
        window.initNavbar?.();
        window.initContact?.();
        window.initCarousel?.();
        window.initReposAnimation?.();

        ScrollTrigger.refresh();
    }

    document.addEventListener("turbo:load", initAllGSAP);

    document.addEventListener("turbo:before-cache", () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
        gsap.globalTimeline.clear();

        // 🔥 reset inline styles GSAP
        document.querySelectorAll("[style]").forEach(el => {
            el.removeAttribute("style");
        });

        // reset flags
        window.__navbarInitialized = false;
        window.__gsapFlags = {};

    });

})();
