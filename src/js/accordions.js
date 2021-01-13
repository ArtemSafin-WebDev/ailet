import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOBILE_WIDTH } from './constants';

export default function Accordions() {
    const accordions = Array.from(document.querySelectorAll('.solutions__accordion'));
    const images = Array.from(document.querySelectorAll('.solutions__image'));

    accordions.forEach((accordion, activeIndex) => {
        accordion.addEventListener('click', event => {
            event.preventDefault();
            const content = accordion.querySelector('.solutions__accordion-content');

            images.forEach(image => image.classList.remove('active'));

            if (images[activeIndex]) {
                images[activeIndex].classList.add('active');
            }

            accordions.forEach(otherAccordion => {
                if (otherAccordion !== accordion && otherAccordion.classList.contains('active')) {
                    const content = otherAccordion.querySelector('.solutions__accordion-content');
                    otherAccordion.classList.remove('active');
                    gsap.to(content, {
                        height: 0,
                        duration: 0.4,
                        onComplete: () => ScrollTrigger.refresh()
                    });
                }
            });

            if (accordion.classList.contains('active')) {
                accordion.classList.remove('active');
                gsap.to(content, {
                    height: 0,
                    duration: 0.4,
                    onComplete: () => ScrollTrigger.refresh()
                });
            } else {
                accordion.classList.add('active');
                gsap.to(content, {
                    height: 'auto',
                    duration: 0.4,
                    onComplete: () => ScrollTrigger.refresh()
                });
            }
        });
    });

    const mediaQueryList = window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`);

    function screenTest(e) {
        if (e.matches) {
            accordions.forEach(otherAccordion => {
                if (otherAccordion.classList.contains('active')) {
                    const content = otherAccordion.querySelector('.solutions__accordion-content');
                    otherAccordion.classList.remove('active');
                    gsap.set(content, {
                        height: 0
                    });
                }
            });

            ScrollTrigger.refresh();
        } else {
            if (accordions.length) {
                accordions[0].classList.add('active');
                images[0].classList.add('active');
                const content = accordions[0].querySelector('.solutions__accordion-content');

                gsap.set(content, {
                    height: 'auto'
                });

                ScrollTrigger.refresh();
            }
        }
    }

    mediaQueryList.addListener(screenTest);


    screenTest(mediaQueryList);
}
