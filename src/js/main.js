import polyfills from './polyfills';
import detectTouch from './detectTouch';
import HomepageAnimations from './homepageAnimations';
import Accordions from './accordions';
import Clients from './clients';
import Menu from './menu';
import AnchorLinks from './anchorLinks';
import CustomSelects from './customSelects';
import Validation from './validation';
import ContactMap from './map';
import KeyScrolling from './keyScrolling';
import VideoController from './videoControllet';
import Cookies from './cookies';



document.addEventListener('DOMContentLoaded', function() {

    Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
        get: function(){
            return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
        }
    })
   
    polyfills();
    detectTouch();
    HomepageAnimations();
    Accordions();
    Clients();
    Menu();
    AnchorLinks();
    CustomSelects();
    Validation();
    ContactMap();
    VideoController();
    Cookies();
   
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300);
    KeyScrolling();
});
