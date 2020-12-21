import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MOBILE_WIDTH, SMALL_TABLET, TABLET_WIDTH } from './constants';
import { debounce } from 'lodash';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function HomepageAnimations() {
    const sideScreen = document.querySelector('.side-screen');
    const mainContent = document.querySelector('.page-content');
    const sideScreenInner = document.querySelector('.side-screen-inner');
    const shape = document.querySelector('.intro__shape-image');
    const intro = document.querySelector('.intro');
    const pageHeader = document.querySelector('.page-header');
    const pageHeaderRightCol = document.querySelector('.page-header__right-col');

    const logo = document.querySelector('.page-header__logo-image:not(.page-header__logo-image--white)');
    const logoWhite = document.querySelector('.page-header__logo-image--white');

    if (sideScreen && mainContent && sideScreenInner) {
        console.log('Main screen animation');

        if (window.matchMedia(`(max-width: ${SMALL_TABLET}px)`).matches) {
            const timeline = gsap.timeline();

            window.addEventListener('load', () => {
                timeline.to(sideScreen, {
                    duration: 0.6,
                    delay: 0.6,
                    ease: 'power2.easeOut',
                    xPercent: -100,
                    onComplete: () => {
                        document.documentElement.classList.add('scroll-allowed');
                    }
                });
            });
        } else {
            gsap.set(intro, {
                xPercent: 100
            });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    start: 'top top',

                    end: () => `+=${intro.offsetHeight}`,
                    scrub: 1,
                    trigger: intro,
                    pin: intro,
                    pinSpacing: true
                }
            });

            timeline
                .to(intro, {
                    xPercent: 0,
                    duration: 1
                })
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

            gsap.set(logo, {
                autoAlpha: 0
            });
            gsap.set(logoWhite, {
                autoAlpha: 1
            });

            gsap.set(pageHeaderRightCol, {
                autoAlpha: 0
            });

            const headerTl = gsap.timeline({
                scrollTrigger: {
                    start: 'top top',
                    end: '+=100%',
                    scrub: 1,
                    trigger: intro,
                    pin: pageHeader,
                    pinSpacing: false
                }
            });

            headerTl
                .to(
                    logoWhite,
                    {
                        autoAlpha: 0,
                        duration: 0.2
                    },
                    0.3
                )
                .to(
                    logo,
                    {
                        autoAlpha: 1,
                        duration: 0.2
                    },
                    0.3
                )
                .to(
                    pageHeaderRightCol,
                    {
                        autoAlpha: 1,
                        duration: 0.2
                    },
                    0
                );

            window.addEventListener('load', () => {
                document.documentElement.classList.add('scroll-allowed');
            });
        }

        // gsap.to(window, {duration: 2, scrollTo: {y: window.innerHeight * 0.27, autoKill: false}, ease: "none"});
    }

    const questions = Array.from(document.querySelectorAll('.questions__item'));

    if (questions.length && !window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches) {
        const container = document.querySelector('.questions__items');
        const timeline = gsap.timeline({
            scrollTrigger: {
                start: 'top bottom',
                end: 'bottom top',
                markers: false,
                scrub: 1,
                trigger: container
            }
        });

        questions.forEach((question, questionIndex) => {
            const isEven = questionIndex % 2 == 0;

            if (isEven) {
                timeline.to(
                    question,
                    {
                        xPercent: 15,
                        ease: 'none'
                    },
                    0
                );
            } else {
                timeline.to(
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

    const howItWorks = document.querySelector('.how-it-works');
    const howItWorksItems = Array.from(document.querySelectorAll('.how-it-works__item'));
    const howItWorksContainer = document.querySelector('.how-it-works__items');

    if (howItWorksItems.length) {
        const maxHeight = Math.max(
            ...howItWorksItems.map(item => {
                const height = item.offsetHeight;
                console.log(item, height);
                return height;
            })
        );
        howItWorksItems.forEach(item => {
            gsap.set(item, {
                position: 'absolute',
                left: 0,
                top: '50%',
                yPercent: -50,
                autoAlpha: 0
            });
        });

        gsap.set(howItWorksItems[0], {
            autoAlpha: 1
        });

        console.log('Max height', maxHeight);

        gsap.set(howItWorksContainer, {
            height: maxHeight
        });

        let timeline = null;

        if (!window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches) {
            timeline = gsap.timeline({
                scrollTrigger: {
                    start: 'bottom bottom',
                    end: '+=100%',
                    scrub: 1,
                    trigger: howItWorksContainer,
                    pin: true,
                    pinSpacing: true,
                    snap: window.matchMedia(`(max-width: ${TABLET_WIDTH}px)`).matches ? null : 'labels'
                }
            });
        } else {
            timeline = gsap.timeline({
                scrollTrigger: {
                    start: 'top top',
                    end: '+=100%',
                    scrub: 1,
                    trigger: howItWorksContainer,
                    pin: true,
                    pinSpacing: true,
                    snap: window.matchMedia(`(max-width: ${TABLET_WIDTH}px)`).matches ? null : 'labels'
                }
            });
        }

       

        const firstTextBlock = howItWorksItems[0].querySelector('.how-it-works__item-text-block');

        const secondPhoneImage = howItWorksItems[1].querySelector('.how-it-works__item-image--phone');
        const secondTextBlock = howItWorksItems[1].querySelector('.how-it-works__item-text-block');

        const thirdPhoneImage = howItWorksItems[2].querySelector('.how-it-works__item-image--phone');
        const thirdTextBlock = howItWorksItems[2].querySelector('.how-it-works__item-text-block');

        if (!window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches) {
            timeline
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
        } else {
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
        }

        window.addEventListener(
            'resize',
            debounce(() => {
                const maxHeight = Math.max(
                    ...howItWorksItems.map(item => {
                        const height = item.offsetHeight;
                        console.log(item, height);
                        return height;
                    })
                );

                gsap.set(howItWorksContainer, {
                    height: maxHeight
                });
            }, 300)
        );
    }
}
