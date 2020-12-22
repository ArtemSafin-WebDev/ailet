import { Swiper, Autoplay, Navigation } from 'swiper';

Swiper.use([Autoplay, Navigation]);

export default function Clients() {
    const elements = Array.from(document.querySelectorAll('.js-clients-slider'));

    elements.forEach((element, elementIndex) => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 45,
            watchOverflow: true,
            centeredSlides: true,
            loop: true,
            loopedSlides: 5,
            speed: 3500,
            allowTouchMove: false,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: elementIndex % 2 == 0 ? true : false
            },
            breakpoints: {
                1024: {
                    spaceBetween: 60
                },
                1400: {
                    spaceBetween: 85
                }
            }
        });
    });
}
