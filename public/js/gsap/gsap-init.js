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
        globalThis.initHero?.();
        globalThis.initAbout?.();
        globalThis.initInterests?.();
        globalThis.initTimeline?.();
        globalThis.initSkills?.();
        globalThis.initRepos?.();
        globalThis.initNavbar?.();
        globalThis.initContact?.();
        globalThis.initCarousel?.();
        globalThis.initReposAnimation?.();
        globalThis.initGallery?.() ;
        globalThis.initMyAvatarMask?.();

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
