import './jquery.min.js';
import './bootstrap.bundle.min.js';
import './splide.min.js';

function navItemActive() {
    const pagePath = window.location.pathname;
    let currentPage = pagePath.substring(
        pagePath.lastIndexOf('/') + 1,
        pagePath.lastIndexOf('.')
    )

    if(currentPage === 'index' || currentPage === "/dist/") {
        currentPage = 'home';
    }

    $('.nav-link').each((idx,navLink) => {
        if($(navLink).text() === currentPage) {
            $(navLink).closest('.nav-item').addClass('current-page');
        }
    })
}

$('form').on('submit', e => {
    e.preventDefault();
    $('form').trigger('reset');
})

function splideHandler() {
    if($('.splide').length > 0) {
        console.log($('.splide'));
        const splide = new Splide('.splide', {
            autoplay: true,
            type: 'loop',
            focus: 'center',
            autoWidth: true
        }).mount();
        
        splide.on('moved', function(){
            const activeSlide = $('.splide__slide.is-visible');
            const activeTitle = $(activeSlide).attr('data-title');
            const activeText = $(activeSlide).attr('data-text');
            const labelTitle = $('.splide-label').find('h5');
            const labelText = $('.splide-label').find('p');
        
            labelTitle.text(activeTitle);
            labelText.text(activeText);
            
        })
    } else {
        console.log('no splide');
        return;
    }
}



navItemActive();
splideHandler();