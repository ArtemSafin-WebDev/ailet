import polyfills from './polyfills';
import detectTouch from './detectTouch';
import HomepageAnimations from './homepageAnimations';
import Accordions from './accordions';
import Clients from './clients';
import Menu from './menu';
import AnchorLinks from './anchorLinks';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    HomepageAnimations();
    Accordions();
    Clients();
    Menu();
    AnchorLinks();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300)
})
