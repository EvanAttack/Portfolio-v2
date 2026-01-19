// assets/js/gsap/gsap-init.js
(function () {

    if (typeof gsap === "undefined") {
        console.warn("GSAP non chargé");
        return;
    }

    gsap.registerPlugin(ScrollTrigger, Flip);

    document.addEventListener("DOMContentLoaded", () => {

        window.initHero?.();
        window.initAbout?.();
        window.initInterests?.();
        window.initTimeline?.();
        window.initSkills?.();
        window.initRepos?.();
        window.initNavbar?.();
        window.initContact?.();
        window.initCarousel?.();

        ScrollTrigger.refresh();
    });

})();
