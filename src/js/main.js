import polyfills from './polyfills';
import detectTouch from './detectTouch';
import HomepageAnimations from './homepageAnimations';
import Accordions from './accordions';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    HomepageAnimations();
    Accordions();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300)
})
