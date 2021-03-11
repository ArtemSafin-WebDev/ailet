
export default function Cookies() {
    const cookiesBtns = Array.from(document.querySelectorAll('.cookies__allow'));

    cookiesBtns.forEach(function(btn) {
        if (btn) {
            btn.addEventListener('click', function(event) {
                event.preventDefault();
                document.body.classList.add('cookies-panel-hidden');
                sessionStorage.setItem('cookiesAccepted', 1);
            });
        }
    });
    
    if (sessionStorage.getItem('cookiesAccepted') == 1) {
        document.body.classList.add('cookies-panel-hidden');
    }
    
}


