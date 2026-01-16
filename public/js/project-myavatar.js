gsap.registerPlugin(ScrollTrigger);

// HERO
gsap.from(".hero-content > *", {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".hero-visual img", {
    scale: 0.85,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.2
});

// SECTIONS
gsap.utils.toArray(".project-section").forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

// TECH CARDS
gsap.from(".tech-card", {
    scrollTrigger: {
        trigger: ".tech-cards",
        start: "top 85%",
    },
    y: 30,
    opacity: 0,
    stagger: 0.15,
    duration: 0.6,
    ease: "power2.out"
});

gsap.registerPlugin(ScrollTrigger);

// HERO
gsap.from(".project-badge", {
    y: -20,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out"
});

gsap.from(".project-title", {
    y: 40,
    opacity: 0,
    duration: 0.9,
    delay: 0.2,
    ease: "power3.out"
});

gsap.from(".project-subtitle", {
    y: 20,
    opacity: 0,
    duration: 0.7,
    delay: 0.4,
    ease: "power2.out"
});

// SECTIONS
gsap.utils.toArray("[data-anim]").forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%"
        }
    });
});

// FEATURE CARDS
gsap.from(".feature-card", {
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".features-grid",
        start: "top 75%"
    }
});

// TIMELINE
gsap.from(".timeline-item", {
    opacity: 0,
    x: -40,
    stagger: 0.2,
    duration: 0.7,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".timeline",
        start: "top 75%"
    }
});

// STACK TAGS
gsap.from(".stack span", {
    scale: 0.8,
    opacity: 0,
    stagger: 0.08,
    duration: 0.5,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: ".stack",
        start: "top 80%"
    }
});
