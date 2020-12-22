import Choices from 'choices.js';

export default function CustomSelects() {
    const selects = Array.from(document.querySelectorAll('.js-custom-select'));

    selects.forEach(element => {
        new Choices(element, {
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false,
            position: 'bottom'
        });
    });

   
    
}