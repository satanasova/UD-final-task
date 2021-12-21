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
    if($('.splide[data-idx="projects"]').length > 0) {
        const splideProjects = new Splide('.splide[data-idx="projects"]', {
            autoplay: true,
            type: 'loop',
            focus: 'center',
            autoWidth: true
        }).mount();
        
        splideProjects.on('moved', function(){
            const activeSlide = $('.splide__slide.is-visible');
            const activeTitle = $(activeSlide).attr('data-title');
            const activeText = $(activeSlide).attr('data-text');
            const labelTitle = $('.splide-label').find('h5');
            const labelText = $('.splide-label').find('p');
        
            labelTitle.text(activeTitle);
            labelText.text(activeText);
            
        })
    } else if($('.splide[data-idx="services"]').length > 0){
        const splideServices = new Splide('.splide[data-idx="services"]', {
            autoplay: true,
            type: 'loop'
        });

        splideServices.on('pagination:mounted', data => {
            data.list.classList.add('splide__pagination--custom');
          
            data.items.forEach(item => {
                item.button.textContent = `${item.page + 1}`;
            });
        });

        splideServices.mount();
    } else {
        return;
    }
}

function sort() {
    if($('.sort')) {
        const sortItems = $('.sort-item').clone()

        $('.sort-btns').on('click', function(e) {
            const target = e.target

            if($(target).hasClass('btn')) {
                $('.sort-content').empty()
                const sortCondition = $(target).attr('data-idx');
                console.log(sortItems);
                const sorted = sortItems.filter((idx,item) => {
                    return $(item).find(`.${sortCondition}`).length > 0;
                }) 
                console.log(sorted);
                const itemsToAppend = sorted.length>0 ? sorted : sortItems
                itemsToAppend.appendTo('.sort-content')
            } 
        })
    } else {
        return;
    }
}


navItemActive();
splideHandler();
sort();