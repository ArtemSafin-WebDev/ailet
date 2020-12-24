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

    ScrollTrigger.saveStyles(
        '.page-header, .side-screen, .side-screen-inner, .questions__items, .questions__item, .intro, .intro__shape-image, .page-header__right-col, .page-header__logo-image:not(.page-header__logo-image--white), .page-header__logo-image--white, .how-it-works__item, .how-it-works__items, .how-it-works__item-text-block, .how-it-works__item-image--phone, .why-ailet__benefits, .why-ailet__benefits-col, .clients__sliders, .clients__slider'
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
                    pinSpacing: true
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

            const loadHandler = () => {
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
                        },
                        onInterrupt: () => {
                           
                            document.body.classList.add('logo-shown');
                        }
                    });
                }, 400);
            };

            window.addEventListener('load', loadHandler);

            return function() {
                timeline.kill();
                headerTl.kill();
                window.removeEventListener('load', loadHandler);
                intro.classList.remove('remove-transform');
            };
        },

        '(max-width: 1024px)': function() {
            const timeline = gsap.timeline();

            const loadHandler = () => {
                timeline.to(sideScreen, {
                    duration: 0.6,
                    delay: 0.6,
                    ease: 'power2.easeOut',
                    xPercent: -100,
                    onComplete: () => {
                        document.documentElement.classList.add('scroll-allowed');
                    }
                });
            };

            if (document.body.classList.contains('loaded')) {
              
                loadHandler();
            }

            window.addEventListener('load', loadHandler);

            return function() {
                timeline.kill();
                window.removeEventListener('load', loadHandler);
            };
        },

        '(min-width: 641px)': function() {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    start: 'bottom bottom',
                    end: '+=300%',
                    scrub: 1,
                    trigger: howItWorksContainer,
                    pin: true,
                    pinSpacing: true, 
                    snap: window.matchMedia(`(max-width: ${TABLET_WIDTH}px)`).matches ? null : 'labels',
                    refreshPriority: 10
                }
            });

            timeline
                .addLabel('firstStep', 0)
                .to(howItWorksItems[0], {
                    autoAlpha: 0,
                    duration: 1
                })
                .to(
                    firstTextBlock,
                    {
                        duration: 1,
                        yPercent: -100
                    },
                    '<'
                )
                .to(howItWorksItems[1], {
                    autoAlpha: 1,
                    duration: 1
                })
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
                )
                .addLabel('secondStep', '>')
                .to(howItWorksItems[1], {
                    autoAlpha: 0,
                    duration: 1
                })
                .to(
                    secondTextBlock,
                    {
                        duration: 1,
                        yPercent: -100
                    },
                    '<'
                )
                .to(howItWorksItems[2], {
                    autoAlpha: 1,
                    duration: 1
                })
                .from(
                    thirdPhoneImage,
                    {
                        duration: 1,
                        yPercent: 30
                    },
                    '<'
                )
                .addLabel('thirdStep', '>');

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
            const timeline = gsap.timeline({
                scrollTrigger: {
                    start: 'top top',
                    end: '+=100%',
                    scrub: 1,
                    trigger: howItWorksContainer,
                    pin: true,
                    pinSpacing: true,
                    refreshPriority: 10,
                    snap: window.matchMedia(`(max-width: ${TABLET_WIDTH}px)`).matches ? null : 'labels'
                }
            });

            timeline
                .to(howItWorksItems[0], {
                    autoAlpha: 0,
                    duration: 1
                })

                .to(howItWorksItems[1], {
                    autoAlpha: 1,
                    duration: 1
                })

                .addLabel('secondStep', '>')
                .to(howItWorksItems[1], {
                    autoAlpha: 0,
                    duration: 1
                })

                .to(howItWorksItems[2], {
                    autoAlpha: 1,
                    duration: 1
                })

                .addLabel('thirdStep', '>');
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

    

    
}
