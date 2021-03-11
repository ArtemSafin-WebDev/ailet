import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TABLET_WIDTH } from './constants';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function HomepageAnimations() {
    const sideScreen = document.querySelector('.side-screen');

    const sideScreenInner = document.querySelector('.side-screen-inner');
    const shape = document.querySelector('.intro__shape-image');
    const intro = document.querySelector('.intro');
    const pageHeader = document.querySelector('.page-header');
    const pageHeaderRightCol = document.querySelector('.page-header__right-col');
    const questionsContainer = document.querySelector('.questions__items');
    const questions = Array.from(document.querySelectorAll('.questions__item'));
    const howItWorksItems = Array.from(document.querySelectorAll('.how-it-works__item'));
    const howItWorksContainer = document.querySelector('.how-it-works__items');
    const firstTextBlock = howItWorksItems[0].querySelector('.how-it-works__item-text-block');
    const secondPhoneImage = howItWorksItems[1].querySelector('.how-it-works__item-image--phone');
    const secondTextBlock = howItWorksItems[1].querySelector('.how-it-works__item-text-block');
    const thirdPhoneImage = howItWorksItems[2].querySelector('.how-it-works__item-image--phone');
    const benefits = document.querySelector('.why-ailet__benefits');
    const columns = Array.from(document.querySelectorAll('.why-ailet__benefits-col'));
    const logo = document.querySelector('.page-header__logo-image:not(.page-header__logo-image--white)');
    const logoWhite = document.querySelector('.page-header__logo-image--white');
    const clientsSlidersContainer = document.querySelector('.clients__sliders');
    const clientsSliders = Array.from(document.querySelectorAll('.clients__slider'));
    const mainVideo = document.querySelector('.side-screen-inner__video-container video');
    ScrollTrigger.saveStyles(
        '.page-header, .side-screen, .side-screen-inner, .questions__items, .questions__item, .intro, .intro__shape-image, .page-header__right-col, .page-header__logo-image:not(.page-header__logo-image--white), .page-header__logo-image--white, .why-ailet__benefits, .why-ailet__benefits-col, .clients__sliders, .clients__slider'
    );

    ScrollTrigger.matchMedia({
        '(min-width: 1025px)': function() {
            intro.classList.add('remove-transform');

            const timeline = gsap.timeline({
               
                scrollTrigger: {
                    start: 'top top',
                    refreshPriority: 15,
                    end: '+=150%',
                    scrub: 1,
                    trigger: intro,
                    pin: intro,
                    pinSpacing: true,
                    onEnterBack: () => {
                        mainVideo.play();
                    },
                    onLeave: () => {
                        mainVideo.pause();
                    },
                }
            });

            timeline
                .fromTo(
                    intro,
                    { xPercent: 100 },
                    {
                        xPercent: 0,
                        duration: 1
                    }
                )
                .to(
                    sideScreen,
                    {
                        xPercent: -100,
                        duration: 1
                    },
                    0
                )
                .to(
                    sideScreenInner,
                    {
                        xPercent: 50,
                        duration: 1
                    },
                    0
                )
                .from(
                    shape,
                    {
                        xPercent: 60,
                        duration: 0.5
                    },
                    0.5
                );

            const headerTl = gsap.timeline({
                scrollTrigger: {
                    start: 'top top',
                    end: '+=150%',
                    scrub: 1,
                    trigger: intro,
                    pin: pageHeader,
                    pinSpacing: false,
                    refreshPriority: 15
                }
            });

            headerTl
                .fromTo(
                    logoWhite,
                    {
                        autoAlpha: 1
                    },
                    {
                        autoAlpha: 0,
                        duration: 0.2
                    },
                    0.3
                )
                .fromTo(
                    logo,
                    {
                        autoAlpha: 0
                    },
                    {
                        autoAlpha: 1,
                        duration: 0.2
                    },
                    0.3
                )
                .fromTo(
                    pageHeaderRightCol,
                    {
                        autoAlpha: 0
                    },
                    {
                        autoAlpha: 1,
                        duration: 0.1
                    },
                    0
                );

            return function() {
                timeline.kill();
                headerTl.kill();

                intro.classList.remove('remove-transform');
            };
        },

        '(min-width: 641px)': function() {
            const firstVideo = howItWorksItems[0].querySelector('video');
            let firstItemTimer = null;
            const tl1 = gsap.timeline({
                scrollTrigger: {
                    start: 'top bottom-=20%',
                    end: 'bottom bottom-=20%',
                    trigger: howItWorksItems[0],
                    toggleActions: 'play reverse play reverse',
                    markers: false,
                    onEnter: () => {
                        if (firstItemTimer) {
                            clearTimeout(firstItemTimer);
                            firstItemTimer = null;
                        }
                        firstVideo.play();
                    },
                    onEnterBack: () => {
                        if (firstItemTimer) {
                            clearTimeout(firstItemTimer);
                            firstItemTimer = null;
                        }
                        firstVideo.play();
                    },
                    onLeave: () => {
                        firstItemTimer = setTimeout(() => {
                            firstVideo.pause();
                        }, 1000);
                    },
                    onLeaveBack: () => {
                        firstItemTimer = setTimeout(() => {
                            firstVideo.pause();
                        }, 1000);
                    }
                }
            });

            tl1.fromTo(
                howItWorksItems[0],
                { autoAlpha: 0 },
                {
                    autoAlpha: 1,
                    duration: 1
                }
            );

            const secondVideo = howItWorksItems[1].querySelector('video');
            let secondItemTimer = null;
            const tl2 = gsap.timeline({
                scrollTrigger: {
                    start: 'top bottom-=20%',
                    end: 'bottom bottom-=20%',
                    trigger: howItWorksItems[1],
                    toggleActions: 'play reverse play reverse',
                    markers: false,
                    onEnter: () => {
                        if (secondItemTimer) {
                            clearTimeout(secondItemTimer);
                            secondItemTimer = null;
                        }
                        secondVideo.play();
                    },
                    onEnterBack: () => {
                        if (secondItemTimer) {
                            clearTimeout(secondItemTimer);
                            secondItemTimer = null;
                        }
                        secondVideo.play();
                    },
                    onLeave: () => {
                        secondItemTimer = setTimeout(() => {
                            secondVideo.pause();
                        }, 1000);
                    },
                    onLeaveBack: () => {
                        secondItemTimer = setTimeout(() => {
                            secondVideo.pause();
                        }, 1000);
                    }
                }
            });

            tl2.fromTo(
                howItWorksItems[1],
                { autoAlpha: 0 },
                {
                    autoAlpha: 1,
                    duration: 1
                }
            )
                .from(
                    secondPhoneImage,
                    {
                        duration: 1,
                        yPercent: 30
                    },
                    '<'
                )
                .from(
                    secondTextBlock,
                    {
                        duration: 1,
                        yPercent: 100
                    },
                    '<'
                );

            const thirdVideo = howItWorksItems[2].querySelector('video');
            let thirdItemTimer = null;

            const tl3 = gsap.timeline({
                scrollTrigger: {
                    start: 'top bottom-=20%',
                    end: 'bottom center',
                    trigger: howItWorksItems[2],
                    toggleActions: 'play reverse play reverse',
                    markers: false,
                    onEnter: () => {
                        if (thirdItemTimer) {
                            clearTimeout(thirdItemTimer);
                            thirdItemTimer = null;
                        }
                        thirdVideo.play();
                    },
                    onEnterBack: () => {
                        if (thirdItemTimer) {
                            clearTimeout(thirdItemTimer);
                            thirdItemTimer = null;
                        }
                        thirdVideo.play();
                    },
                    onLeave: () => {
                        thirdItemTimer = setTimeout(() => {
                            thirdVideo.pause();
                        }, 1000);
                    },
                    onLeaveBack: () => {
                        thirdItemTimer = setTimeout(() => {
                            thirdVideo.pause();
                        }, 1000);
                    }
                }
            });

            tl3.fromTo(
                howItWorksItems[2],
                { autoAlpha: 0 },
                {
                    autoAlpha: 1,
                    duration: 1
                }
            ).from(
                thirdPhoneImage,
                {
                    duration: 1,
                    yPercent: 30
                },
                '<'
            );

            if (columns[0]) {
                gsap.to(columns[0], {
                    y: 100,

                    scrollTrigger: {
                        scrub: 1,
                        trigger: benefits,
                        start: 'top center',
                        end: 'bottom top',
                        refreshPriority: 8
                    }
                });
            }
            if (columns[1]) {
                gsap.to(columns[1], {
                    y: -70,

                    scrollTrigger: {
                        scrub: 1,
                        trigger: benefits,
                        start: 'top center',
                        end: 'bottom top',
                        refreshPriority: 8
                    }
                });
            }

            clientsSliders.forEach((element, elementIndex) => {
                gsap.to(element, {
                    x: elementIndex % 2 == 0 ? -300 : 300,
                    scrollTrigger: {
                        trigger: clientsSlidersContainer,
                        scrub: 1,
                        start: 'top bottom',
                        end: 'bottom top',
                        refreshPriority: 6
                    }
                });
            });
        },

        '(max-width: 640px)': function() {
            const firstVideo = howItWorksItems[0].querySelector('video');
            let firstItemTimer = null;
            const tl1 = gsap.timeline({
                scrollTrigger: {
                    start: 'top bottom',
                    end: 'bottom center',
                    trigger: howItWorksItems[0],
                    toggleActions: 'play reverse play reverse',
                    markers: false,
                    onEnter: () => {
                        if (firstItemTimer) {
                            clearTimeout(firstItemTimer);
                            firstItemTimer = null;
                        }
                        firstVideo.play();
                    },
                    onEnterBack: () => {
                        if (firstItemTimer) {
                            clearTimeout(firstItemTimer);
                            firstItemTimer = null;
                        }
                        firstVideo.play();
                    },
                    onLeave: () => {
                        firstItemTimer = setTimeout(() => {
                            firstVideo.pause();
                        }, 1000);
                    },
                    onLeaveBack: () => {
                        firstItemTimer = setTimeout(() => {
                            firstVideo.pause();
                        }, 1000);
                    }
                }
            });

            tl1.fromTo(
                howItWorksItems[0],
                { autoAlpha: 0 },
                {
                    autoAlpha: 1,
                    duration: 1
                }
            );

            const secondVideo = howItWorksItems[1].querySelector('video');
            let secondItemTimer = null;
            const tl2 = gsap.timeline({
                scrollTrigger: {
                    start: 'top center',
                    end: 'bottom center',
                    trigger: howItWorksItems[1],
                    toggleActions: 'play reverse play reverse',
                    markers: false,
                    onEnter: () => {
                        if (secondItemTimer) {
                            clearTimeout(secondItemTimer);
                            secondItemTimer = null;
                        }
                        secondVideo.play();
                    },
                    onEnterBack: () => {
                        if (secondItemTimer) {
                            clearTimeout(secondItemTimer);
                            secondItemTimer = null;
                        }
                        secondVideo.play();
                    },
                    onLeave: () => {
                        secondItemTimer = setTimeout(() => {
                            secondVideo.pause();
                        }, 1000);
                    },
                    onLeaveBack: () => {
                        secondItemTimer = setTimeout(() => {
                            secondVideo.pause();
                        }, 1000);
                    }
                }
            });

            tl2.fromTo(
                howItWorksItems[1],
                { autoAlpha: 0 },
                {
                    autoAlpha: 1,
                    duration: 1
                }
            )
                .from(
                    secondPhoneImage,
                    {
                        duration: 1,
                        yPercent: 15
                    },
                    '<'
                )
                .from(
                    secondTextBlock,
                    {
                        duration: 1,
                        yPercent: 50
                    },
                    '<'
                );

            const thirdVideo = howItWorksItems[2].querySelector('video');
            let thirdItemTimer = null;

            const tl3 = gsap.timeline({
                scrollTrigger: {
                    start: 'top center',
                    end: 'bottom center',
                    trigger: howItWorksItems[2],
                    toggleActions: 'play reverse play reverse',
                    markers: false,
                    onEnter: () => {
                        if (thirdItemTimer) {
                            clearTimeout(thirdItemTimer);
                            thirdItemTimer = null;
                        }
                        thirdVideo.play();
                    },
                    onEnterBack: () => {
                        if (thirdItemTimer) {
                            clearTimeout(thirdItemTimer);
                            thirdItemTimer = null;
                        }
                        thirdVideo.play();
                    },
                    onLeave: () => {
                        thirdItemTimer = setTimeout(() => {
                            thirdVideo.pause();
                        }, 1000);
                    },
                    onLeaveBack: () => {
                        thirdItemTimer = setTimeout(() => {
                            thirdVideo.pause();
                        }, 1000);
                    }
                }
            });

            tl3.fromTo(
                howItWorksItems[2],
                { autoAlpha: 0 },
                {
                    autoAlpha: 1,
                    duration: 1
                }
            ).from(
                thirdPhoneImage,
                {
                    duration: 1,
                    yPercent: 15
                },
                '<'
            );
        },

        all: function() {
            const questionsTimeline = gsap.timeline({
                scrollTrigger: {
                    start: 'top bottom',
                    end: 'bottom top',
                    markers: false,
                    scrub: 1,
                    trigger: questionsContainer,
                    refreshPriority: 12
                }
            });

            questions.forEach((question, questionIndex) => {
                const isEven = questionIndex % 2 == 0;

                if (isEven) {
                    questionsTimeline.to(
                        question,
                        {
                            xPercent: 15,
                            ease: 'none'
                        },
                        0
                    );
                } else {
                    questionsTimeline.to(
                        question,
                        {
                            xPercent: -15,
                            ease: 'none'
                        },
                        0
                    );
                }
            });
        }
    });

    const loadHandler = () => {
        if (window.matchMedia(`(max-width: ${TABLET_WIDTH}px)`).matches) {
            const timeline = gsap.timeline();
            timeline.to(sideScreen, {
                duration: 0.6,
                delay: 0.6,
                ease: 'power2.easeOut',
                xPercent: -100,
                onComplete: () => {
                    document.documentElement.classList.add('scroll-allowed');
                    document.body.classList.add('intro-animation-finished');
                }
            });
        } else {
            document.documentElement.classList.add('scroll-allowed');
            setTimeout(() => {
                gsap.to(window, {
                    duration: 2,
                    ease: 'power2.out',
                    scrollTo: {
                        y: window.innerHeight / 2.4,
                        autoKill: true
                    },
                    onComplete: () => {
                        document.body.classList.add('logo-shown');
                        document.body.classList.add('intro-animation-finished');
                    },
                    onInterrupt: () => {
                        document.body.classList.add('logo-shown');
                        document.body.classList.add('intro-animation-finished');
                    }
                });
            }, 1600);
        }
    };

    window.addEventListener('load', loadHandler);
}
