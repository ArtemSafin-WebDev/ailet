import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

// import { lockScroll, unlockScroll } from "./scrollBlocker";




export default function Menu() {
    const menuBtn = document.querySelector('.page-header__menu-link');

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.setProperty('--sb-width', scrollbarWidth + "px");

    console.log('Scrollbar width', scrollbarWidth)

    const menu = document.querySelector('.menu');
    let menuOpen = false;

    const openMenu = () => {
        menuOpen = true;
        document.body.classList.add('menu-shown');
        // lockScroll(menu);

        disableBodyScroll(menu, {
            reserveScrollBarGap: true,
        })
        const event = new CustomEvent('menuopen');

        document.dispatchEvent(event);
    }

    const closeMenu = () => {
        menuOpen = false;
        document.body.classList.remove('menu-shown');
        // unlockScroll()
        clearAllBodyScrollLocks();

        const event = new CustomEvent('menuclose');

        document.dispatchEvent(event);
    }
    if (menu && menuBtn) {
        console.log('Menu code')
        menuBtn.addEventListener('click', event => {
            event.preventDefault();

            if (!menuOpen) {
               openMenu()
            } else {
              closeMenu();
            }
        });
    }


    document.addEventListener('anchorclick', () => {
        if (menuOpen) {
            closeMenu();
        }
    });


    const formOpenBtns = Array.from(document.querySelectorAll('.js-form-open'));
    const formMenu = document.querySelector('.contact-form');
    const formCloseBtns = Array.from(document.querySelectorAll('.js-form-close'));

    let formMenuOpen = false;

    const openFormMenu = () => {
        document.body.classList.add('contact-form-shown');
        formMenuOpen = true;
        // lockScroll(formMenu);

        disableBodyScroll(formMenu, {
            reserveScrollBarGap: true,
        })

        const event = new CustomEvent('formopen');

        document.dispatchEvent(event);
    }
    const closeFormMenu = () => {
        document.body.classList.remove('contact-form-shown');
        formMenuOpen = false;
        // unlockScroll()

        clearAllBodyScrollLocks();

        const event = new CustomEvent('formclose');

        document.dispatchEvent(event);
    }


    formOpenBtns.forEach(element => {
        element.addEventListener('click', event => {
            event.preventDefault();

            if (!formMenuOpen) {
                if (menuOpen) {
                    closeMenu();
                }

                openFormMenu();
            }
        })
    })
    formCloseBtns.forEach(element => {
        element.addEventListener('click', event => {
            event.preventDefault();

            if (formMenuOpen) {
                closeFormMenu();
            }
        })
    })
}
