export default function ContactMap() {
    const layerLinks = Array.from(document.querySelectorAll('a[data-toggle-map-layer]'));

    layerLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();

            const layerName = link.getAttribute('data-toggle-map-layer');

            console.log('Searching', link, `[data-map-layer="${layerName}"]`)

            const layer = document.querySelector(`[data-map-layer="${layerName}"]`);

            if (layer) {
                layer.classList.add('active');
                link.classList.add('active')
            } else {
                console.warn('No layer found');
                return;
            }
        });
    });


    document.addEventListener('click', event => {
        if (event.target.matches('[data-toggle-map-layer]') || event.target.closest('[data-toggle-map-layer]')) {
            return;
        } else {
            console.log('Removing activity from layers')
            const layers = Array.from(document.querySelectorAll('[data-map-layer]'));

            layers.forEach(layer => layer.classList.remove('active'));
            layerLinks.forEach(link => link.classList.remove('active'))
        }
    })
}
