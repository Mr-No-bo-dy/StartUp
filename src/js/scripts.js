document.addEventListener('DOMContentLoaded', function() {
    // Nav-Menu & Hamburger
    const hamburger = document.querySelector('.hamburger'),
        nav = document.querySelector('.nav'),
        nav_links = document.querySelectorAll('.nav a');
    hamburger.onclick = navToggle;
    nav_links.forEach(link => {
        link.onclick = navToggle;
    })
    function navToggle() {
        hamburger.classList.toggle('hamburger_open');
        nav.classList.toggle('nav_mobile');
    
        if (window.matchMedia('(max-width: 500px)').matches) {
            document.body.classList.toggle('over_hidden');
        } else {
            document.body.classList.remove('over_hidden');
        }
    
        if (hamburger.classList.contains('hamburger_open')) {
            window.addEventListener('resize', bodyOverToggle);
        } else {
            window.removeEventListener('resize', bodyOverToggle);
        }
        function bodyOverToggle() {
            if (window.matchMedia('(min-width: 500px)').matches) {
                document.body.classList.remove('over_hidden');
            } else {
                if (hamburger.classList.contains('hamburger_open')) {
                    document.body.classList.add('over_hidden');
                }
            }
        }
    }

});
