document.addEventListener('DOMContentLoaded', function () {
    // Nav-Menu & Hamburger
    document.querySelector('.hamburger').onclick = navToggle;
    document.querySelectorAll('.nav a').forEach(function (link) {
        link.onclick = navToggle;
    })
    function navToggle() {
        const hamburger = document.querySelector('.hamburger');
        hamburger.classList.toggle('hamburger_open');
        document.querySelector('.nav').classList.toggle('nav_mobile');
        document.querySelector('.header_line').classList.toggle('header_bgc_tr');

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

    // Show/Hide Nav menu
    let lastScroll = 0;
    function toggleHeader() {
        const header = document.querySelector('#header .header_line');
        let scroll = window.scrollY;
        if (scroll > lastScroll) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        lastScroll = scroll;
    
        // Change header's background-color
        if (window.scrollY > header.offsetHeight) {
            header.classList.add('header_bgc');
        } else {
            header.classList.remove('header_bgc');
        }        
    }
    window.addEventListener('scroll', toggleHeader);
    window.addEventListener('touchmove', toggleHeader);

    // Smooth scroll to certain block on same page
    document.querySelectorAll('.header_menu a').forEach(function (link) {
        link.addEventListener('click', function (ev) {
            ev.preventDefault();
            const toBlock = document.querySelector(link.getAttribute('href'));
            toBlock.scrollIntoView({behavior: 'smooth'});
        });
    });
    document.querySelector('#getInTouchBtn').addEventListener('click', function (ev) {
        ev.preventDefault();
        document.querySelector('#contacts').scrollIntoView({behavior: 'smooth'});
    });

    // Parallax on backgrounds
    document.querySelectorAll('.bg_parallax').forEach(function (block) {
        function parallax(ev) {
            let moveX = (((ev.pageX - window.scrollX) / window.innerWidth) - 0.5) * 80,
                moveY = (((ev.pageY - window.scrollY) / window.innerHeight) - 0.5) * 30;
            block.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
        }
        block.addEventListener('mousemove', parallax);
        if (!block) block.removeEventListener('mousemove', parallax);
    });

    // Triple click trick
    let clickCount = 0, clickTimerID = null;
    document.querySelector('.triple_click').addEventListener('click', function () {
        const hackedElems = document.querySelectorAll('.hacked');
        clickCount++;
        clearTimeout(clickTimerID);
        if (clickCount === 3) {
            let originalTexts = [];
            hackedElems.forEach(function (elem, index) {
                originalTexts[index] = elem.innerHTML;
                elem.innerHTML = 'Triple click!';
                elem.classList.add('red');
            });
            setTimeout(function () {
                hackedElems.forEach(function (elem, index) {
                    elem.innerHTML = originalTexts[index];
                    elem.classList.remove('red');
                });
            }, 3000);
            clickCount = 0;
        }
        clickTimerID = setTimeout(function () {
            clickCount = 0;
        }, 500);
    });

    // Fold/Unfold posts' full text
    const texts = document.querySelectorAll('#blog .text');
    let fullTexts = [];
    texts.forEach(function(text, index) {
        if (text.innerText.length > 150) {
            fullTexts[index] = text.innerText;
            text.innerText = text.innerText.slice(0, 145) + ' ...';
            text.setAttribute('data_is_full', 'false');
        }
    });
    function toggleText(ev) {
        ev.preventDefault();
        const btn = ev.currentTarget,
            index = btn.getAttribute('data_index'),
            text = texts[index],
            isFull = text.getAttribute('data_is_full') === 'true';

        if (!isFull) {
            text.innerText = fullTexts[index];
            btn.innerText = 'Show less';
            text.setAttribute('data_is_full', 'true');
        } else {
            text.innerText = fullTexts[index].slice(0, 145) + ' ...';
            btn.innerText = 'Read more';
            text.setAttribute('data_is_full', 'false');
        }
    }
    document.querySelectorAll('#blog .readMore').forEach(function(btn, index) {
        btn.setAttribute('data_index', index);
        btn.addEventListener('click', toggleText);
    });

    // Smooth appearance of content while scrolling down page
    function appearBlock() {    // Smooth appearance of blocks
        document.querySelectorAll('.hiddenBlock').forEach(function(block) {
            if (window.scrollY >= (block.offsetTop - window.innerHeight * 0.33)) {
                block.classList.add('appearBlock')
            // } else {
            //     block.classList.remove('appearBlock')
            }
        });
    }
    window.addEventListener('scroll', appearBlock);
    window.addEventListener('wheel', appearBlock);
    window.addEventListener('touchmove', appearBlock);
    function appearChild() {    // Smooth appearance of blocks' main content
        document.querySelectorAll('.hiddenChild').forEach(function(block) {
            if (window.scrollY >= (block.offsetTop - window.innerHeight * 0.5)) {
                block.classList.add('appearChild')
            // } else {
            //     block.classList.remove('appearChild')
            }
        });
    }
    window.addEventListener('scroll', appearChild);
    window.addEventListener('wheel', appearChild);
    window.addEventListener('touchmove', appearChild);    

});
