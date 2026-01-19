window.initGallery = function () {
    initOnce("gallery", () => {

        if (typeof gsap === "undefined" || typeof Flip === "undefined") return;

        gsap.registerPlugin(Flip);

        const root = document.querySelector(".ndi-gallery");
        if (!root) return;

        const modal = root.querySelector(".modal");
        const modalContent = root.querySelector(".modal .content");
        const modalOverlay = root.querySelector(".modal .overlay");
        const boxes = gsap.utils.toArray(root.querySelectorAll(".boxes-container .box"));
        const boxesContent = gsap.utils.toArray(root.querySelectorAll(".box-content"));

        let activeIndex = undefined;

        boxesContent.forEach((boxContent, i) => {
            boxContent.addEventListener("click", () => {
                // CLOSE
                if (activeIndex !== undefined) {
                    const state = Flip.getState(boxContent);

                    boxes[activeIndex].appendChild(boxContent);
                    activeIndex = undefined;

                    gsap.to([modal, modalOverlay], {
                        autoAlpha: 0,
                        duration: 0.35,
                        ease: "power1.inOut"
                    });

                    Flip.from(state, {
                        duration: 0.7,
                        ease: "power1.inOut",
                        absolute: true,
                        onComplete: () => gsap.set(boxContent, { zIndex: "auto" })
                    });

                    gsap.set(boxContent, { zIndex: 1002 });
                }
                // OPEN
                else {
                    const state = Flip.getState(boxContent);

                    modalContent.appendChild(boxContent);
                    activeIndex = i;

                    gsap.set(modal, { autoAlpha: 1 });

                    Flip.from(state, {
                        duration: 0.7,
                        ease: "power1.inOut",
                        absolute: true
                    });

                    gsap.to(modalOverlay, { autoAlpha: 0.65, duration: 0.35 });
                }
            });
        });

        // ✅ clic overlay pour fermer (optionnel mais mieux)
        modalOverlay.addEventListener("click", () => {
            if (activeIndex === undefined) return;
            const boxContent = modalContent.querySelector(".box-content");
            if (!boxContent) return;

            const state = Flip.getState(boxContent);
            boxes[activeIndex].appendChild(boxContent);
            activeIndex = undefined;

            gsap.to([modal, modalOverlay], { autoAlpha: 0, duration: 0.35, ease: "power1.inOut" });
            Flip.from(state, { duration: 0.7, ease: "power1.inOut", absolute: true });
        });

        // ✅ ESC pour fermer
        document.addEventListener("keydown", (e) => {
            if (e.key !== "Escape" || activeIndex === undefined) return;
            modalOverlay.click();
        });
    });
};
