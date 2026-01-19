

window.initReposAnimation = function () {
    initOnce("git", () => {


        const reposSection = document.querySelector('#repos');
        const repoCards = gsap.utils.toArray('#reposGrid .repo-card');

        if (!reposSection || repoCards.length === 0) return;

        gsap.set(repoCards, {opacity: 0, y: 40});

        gsap.timeline({
            scrollTrigger: {
                trigger: reposSection,
                start: 'top top',
                end: '+=1200',
                pin: true,
                scrub: true,
                anticipatePin: 1
            }
        })
            .to(repoCards, {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out'
            })
            .to(repoCards, {
                scale: 1.02,
                stagger: 0.08,
                duration: 0.5
            });
    })
};
