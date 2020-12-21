import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MOBILE_WIDTH } from './constants';

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

        if (window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches) {
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
                    0.1
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
                markers: true,
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
}
