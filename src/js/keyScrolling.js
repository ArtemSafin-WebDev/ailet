import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function KeyScrolling() {
    const blocks = Array.from(document.querySelectorAll('.js-key-scrolling-block'));
    const debug = false;

    if (debug) console.log('Blocks count', blocks.length);

    let positions = [];

    const calculatePositions = () => {
        let positions = [window.innerHeight / 2.4, window.innerHeight * 1.5];

        blocks.forEach(block => {
            const blockPos = block.getBoundingClientRect().top + window.scrollY;

            if (debug) console.log('Position for block', block, blockPos);

            positions.push(blockPos);
            // if (block.classList.contains('how-it-works')) {
            //     const items = Array.from(block.querySelectorAll('.how-it-works__item'));
            //     const itemsPositions = items.map((item, itemIndex) => blockPos + itemIndex * window.innerHeight * 1.5);
            //     if (debug) console.log('Item positions', itemsPositions)
            //     positions = positions.concat(itemsPositions);

            // } else {
            //     positions.push(blockPos);
            // }
        });

        return positions.map(pos => Math.ceil(pos));
    };

    positions = calculatePositions();

    const scrollDown = () => {
        const nextSections = positions.filter(pos => pos > Math.ceil(window.scrollY) + 2);
        if (debug) console.log('Next sections', nextSections);
        if (nextSections.length) {
            const nextSection = nextSections[0];
            if (debug) console.log('Next section', nextSection);

            const speed = 0.002;
            const distance = Math.abs(nextSection - window.scrollY);

            const time = speed * distance;

            console.log('Time', time)

            gsap.to(window, { duration: speed * distance, ease: 'none', scrollTo: nextSection });
        } else {
            console.warn('No next section present', window.scrollY, positions);
        }
    };

    const scrollUp = () => {
        const prevSections = positions.filter(pos => pos < Math.floor(window.scrollY) - 2);
        if (debug) console.log('Prev sections', prevSections);

        if (prevSections.length) {
            const prevSection = prevSections[prevSections.length - 1];
            if (debug) console.log('Prev section', prevSection);

            const speed = 0.002;
            const distance = Math.abs(prevSection - window.scrollY);

            gsap.to(window, { duration: speed * distance, ease: 'none', scrollTo: prevSection });
        } else {
            if (debug) console.warn('No prev section present', window.scrollY, positions);
        }
    };

    console.log('Positions', positions);
    document.addEventListener('keydown', function(event) {
        if (event.key === 'PageDown' || event.key === 'ArrowDown' || event.key === ' ') {
            event.preventDefault();
            if (debug) console.log('PageDown Pressed');

            scrollDown();
        }

        if (event.key === 'PageUp' || event.key === 'ArrowUp') {
            event.preventDefault();
            if (debug) console.log('PageUp Pressed');
            scrollUp();
        }
    });

    // window.addEventListener('resize', () => {
    //     positions = calculatePositions();
    // });
}
