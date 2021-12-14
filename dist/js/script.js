import './jquery.min.js';
import './bootstrap.bundle.min.js';

function navItemActive() {
    const pagePath = window.location.pathname;
    let currentPage = pagePath.substring(
        pagePath.lastIndexOf('/') + 1,
        pagePath.lastIndexOf('.')
    )

    if(currentPage === 'index') {
        currentPage = 'home';
    }

    $('.nav-link').each((idx,navLink) => {
        if($(navLink).text() === currentPage) {
            $(navLink).closest('.nav-item').addClass('current-page');
        }
    })
}

navItemActive()