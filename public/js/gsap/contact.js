window.initContact = function () {
    const panel = document.getElementById("contactPanel");
    const overlay = document.getElementById("contactOverlay");
    const openBtn = document.getElementById("contactToggle");
    const closeBtn = document.getElementById("contactClose");

    if (!panel || !overlay || !openBtn) return;

    openBtn.addEventListener("click", () => {
        overlay.style.pointerEvents = "auto";
        gsap.to(overlay, { opacity: 1 });
        gsap.to(panel, { x: 0 });
    });

    const close = () => {
        overlay.style.pointerEvents = "none";
        gsap.to(overlay, { opacity: 0 });
        gsap.to(panel, { x: "100%" });
    };

    overlay.addEventListener("click", close);
    closeBtn?.addEventListener("click", close);
};
