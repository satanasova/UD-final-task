import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

function navItemActive() {
    const pagePath = window.location.pathname;
    let currentPage = pagePath.substring(
        pagePath.indexOf('/') + 1,
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