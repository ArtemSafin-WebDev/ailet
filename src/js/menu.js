// import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { lockScroll, unlockScroll } from "./scrollBlocker";




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
        lockScroll(menu);
    }

    const closeMenu = () => {
        menuOpen = false;
        document.body.classList.remove('menu-shown');
        unlockScroll()
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
    })
}
