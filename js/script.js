import './jquery.min.js';
import './bootstrap.bundle.min.js';
import './splide.min.js';



function navItemActive() {
    const pagePath = window.location.pathname;
    let currentPage = pagePath.substring(
        pagePath.lastIndexOf('/') + 1,
        pagePath.lastIndexOf('.')
    )

    if(currentPage === '/' || currentPage === 'index' || currentPage === "/dist/") {
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
        
        splideProjects.on('move', function(){
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
    } else if($('.splide[data-idx="warehouse-services"]').length > 0) {
        const splideWarehouse = new Splide('.splide[data-idx="warehouse-services"]', {
            autoplay: true,
            type: 'loop',
        }).mount();
        
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

                const sorted = sortItems.filter((idx,item) => {
                    return $(item).find(`.${sortCondition}`).length > 0;
                }) 

                const itemsToAppend = sorted.length > 0 ? sorted : sortItems
                itemsToAppend.appendTo('.sort-content')
            } 
        })
    } else {
        return;
    }
}

function tabs() {
    if($('.tab-container')){
        const tabContainer = $('.tab-container');
        const tabsRow = tabContainer.find('.tabs-row');
        const tabs = tabsRow.find('.tab');
        const contentsRow = tabContainer.find('.contents-row');
        const contents = contentsRow.find('.tab-content');

        contents.each((idx,content) => {
            $(content).hide()
            if($(content).hasClass('active')){
                $(content).fadeIn();
            }
        })

        tabsRow.on('click', (e) => {
            const target = e.target;
            const clickedTab = $(target).closest('.tab');
            if(!clickedTab.hasClass('active')){
                const tabIndex = clickedTab.attr('data-idx');

                tabs.each((idx,tab) => {
                    $(tab).removeClass('active');
                })
                $(clickedTab).addClass('active');


                contents.each((idx,content) => {
                    const contentIndex = $(content).attr('data-idx');
                    $(content).removeClass('active');
                    $(content).fadeOut().hide();
                    if(contentIndex === tabIndex){
                        $(content).addClass('active');
                        $(content).fadeIn();
                    }
                })
            }

        })
    }
}

function counters() {
    let counterElements;

    document.addEventListener('DOMContentLoaded', () => {
        counterElements = $('.count').map((i, el) => {
            // console.log(el, el.offsetTop);
            return {
                elementTop: el.offsetTop,
                element: el, 
                isStarted: false
            }
        });

        checkCounters();
    })

    document.addEventListener('scroll', checkCounters)

    function checkCounters() {
        // console.log('checking counters');
        if(counterElements.toArray().every(el => el.isStarted)){
            //when all counters are started - remove the scroll event listener
            document.removeEventListener('scroll', checkCounters);
        } 

        let currentScroll = window.scrollY + window.innerHeight;
        // console.log('cur scroll: ', currentScroll);
        counterElements.each((i, counterElement) => {
            if (!counterElement.isStarted && (currentScroll - 50) > counterElement.elementTop) { 
                // console.log('start element', counterElement.element);
                counterElement.isStarted = true;

                $(counterElement.element).prop('Counter',0).animate({
                    Counter: $(counterElement.element).text()
                }, {
                    duration: 2500,
                    easing: 'swing',
                    step: function (now) {
                        $(counterElement.element).text(Math.ceil(now));
                    }
                });
            }
        })
    }
}

navItemActive();
splideHandler();
sort();
tabs();
counters();