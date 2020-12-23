document.addEventListener('DOMContentLoaded', () => {
    const contactFormForm = document.querySelector('#contact-form');
    const contactForm = document.querySelector('.contact-form')
    if (contactFormForm && contactForm) {
        contactFormForm.addEventListener('submit', event => {
            event.preventDefault();
            if ($(contactForm).parsley().isValid()) {
                contactForm.classList.add('success');
                setTimeout(function() {
                    contactForm.classList.remove('success');
                }, 5000);
            }
        })
    }
})