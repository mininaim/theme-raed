import BasePage from './base-page';

class ProductsList extends BasePage {
    onReady() {
        salla.infiniteScroll.initiate('.products-container', '.product-entry');
    }

    registerEvents() {
        salla.document.event.onChange('#productFilter', event => {
            var regex = new RegExp("([?;&])by[^&;]*[;&]?");
            let url = window.location.href.replace(regex, "$1").replace(/&$/, '');
            url += (url.includes('?') ? "&" : "?") + (event.target.value ? "by=" + event.target.value : '');

            window.location.href = url.replace(/&$|\?$/, '');
        });

        app.onClick('.grid-trigger', event => {
            event.preventDefault();
            let type = event.target.dataset.type;//list|grid

            app.toggle('.grid-trigger', 'bg-border-color text-primary', 'text-gray-400', e => e.dataset.type === type)
                .toggle('.products-container', 'list md:grid-cols-1', 'md:grid-cols-auto-fill', () => type === 'list');
            app.anime('.product-entry', {duration: 1200, translateY: [20, 0]});
        });
    }
}

new ProductsList;