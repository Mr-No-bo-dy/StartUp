document.addEventListener('DOMContentLoaded', function () {
    // Nav-Menu & Hamburger
    const hamburger = document.querySelector('.hamburger');
    hamburger.onclick = navToggle;
    document.querySelectorAll('.nav a').forEach(function (link) {
        link.onclick = navToggle;
    })
    function navToggle() {
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
    const header = document.querySelector('#header .header_line');
    let lastScroll = 0;
    function toggleHeader() {
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
    // window.addEventListener('wheel', toggleHeader);
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

    // Phone check through RegEx
    const tel = document.querySelector('#tel'),
        phoneRegEx1 = /^(\+\d{1,3}[-\s]?)?(\(?\d{3}\)?[-\s]?)\d{3}[-\s]?\d{2}[-\s]?\d{2}$/g,
        phoneRegEx2 = /^(\+\d{1,3}[-\s]?)?(\(?\d{3}\)?[-\s]?)\d{2}[-\s]?\d{3}[-\s]?\d{2}$/g,
        phoneRegEx3 = /^(\+\d{1,3}[-\s]?)?(\(?\d{3}\)?[-\s]?)\d{2}[-\s]?\d{2}[-\s]?\d{3}$/g;
    let errorTel = document.querySelector('#errorTel'),
        signErrors = [];
    signErrors['tel'] = false;
    tel.oninput = function () {
        let disabledBtn = tel.closest('form').querySelector('.disabledBtn'),
            string = tel.value.replace(/[^+0-9\(\)\-\s]/g, '');
        tel.value = string;
        if (string.length > 0) {
            if (string.length >= 10) {
                if ((string.includes('(') && !string.includes(')')) || (!string.includes('(') && string.includes(')'))) {
                    signErrors['tel'] = true;
                    errorTel.innerHTML = 'Wrong number';
                } else if (phoneRegEx1.test(string) || phoneRegEx2.test(string) || phoneRegEx3.test(string)) {
                    signErrors['tel'] = false;
                    errorTel.innerHTML = '';
                } else {    // controll check
                    if (phoneRegEx1.test(string) || phoneRegEx2.test(string) || phoneRegEx3.test(string)) {
                        signErrors['tel'] = false;
                        errorTel.innerHTML = '';
                    } else {
                        signErrors['tel'] = true;
                        errorTel.innerHTML = 'Wrong number';
                    }
                }
            } else {
                signErrors['tel'] = true;
            }
        } else {
            signErrors['tel'] = false;
        }
        if (!signErrors['tel'] && !signErrors['email']) {
            disabledBtn.removeAttribute('disabled');
        } else {
            disabledBtn.setAttribute('disabled', '');
        }
    }

    // Email check through RegEx
    const emailRegEx = /^([a-z][a-z0-9._-]+)(@[a-z][a-z0-9_-]+)(\.[a-z][a-z]+)(\.[a-z][a-z]+)?$/gi;
    signErrors['email'] = true;
    document.querySelectorAll('.email').forEach(function (email) {
        email.oninput = function () {
            const disabledBtn = email.closest('form').querySelector('.disabledBtn');
            let errorEmail = email.nextElementSibling,
                string = email.value;
            if (string.length >= 10) {
                if (emailRegEx.test(string)) {
                    signErrors['email'] = false;
                    errorEmail.innerHTML = '';
                } else {    // controll check
                    if (emailRegEx.test(string)) {
                        signErrors['email'] = false;
                        errorEmail.innerHTML = '';
                    } else {
                        signErrors['email'] = true;
                        errorEmail.innerHTML = 'Such email does NOT exist';
                    }
                }
            } else {
                signErrors['email'] = true;
            }
            if (!signErrors['tel'] && !signErrors['email']) {
                disabledBtn.removeAttribute('disabled');
            } else {
                disabledBtn.setAttribute('disabled', '');
            }
        }
    });

    // Sign popup
    const popup = document.querySelector('#sign_popup');
        // Show popup
    function showPopup() {
        popup.classList.remove('hidden');
        document.body.classList.add('over_hidden');
        popup.addEventListener('click', function (ev) {
            if (ev.target === popup) closePopup();
        });
        document.addEventListener('keydown', function (ev) {
            if (ev.key === 'Escape') closePopup();
        });
        popup.querySelector('#closeBtn').onclick = closePopup;
    }
        // Close popup
    function closePopup() {
        popup.classList.add('hidden');
        document.body.classList.remove('over_hidden');
        signErrors['tel'] = false;
        signErrors['email'] = false;
    }
    document.querySelector('#getStarted').addEventListener('click', showPopup);

    // Registration imitation
    document.querySelectorAll('.contact_form [data-sign]').forEach(function(btn) {
        btn.addEventListener('click', function(ev) {
            ev.preventDefault();    // block sending form
            const name = btn.closest('form').querySelector('[name="name"]'),
                email = btn.closest('form').querySelector('[name="email"]'),
                tel = btn.closest('form').querySelector('[name="tel"]');
            let userData = {
                'name': name.value, 
                'email': email.value, 
                'tel': tel ? tel.value : '',
            };
            localStorage.setItem('user', JSON.stringify(userData));
            name.value = null;
            email.value = null;
            if (tel) tel.value = null;
            if (btn.getAttribute('id') === 'signBtn') {
                closePopup();
            } else {
                closeConfirmPopup();
            }
        });
    })
    // localStorage.removeItem('user');
    // console.log(localStorage.getItem('user'));

    // Triple click trick
    const hackedElems = document.querySelectorAll('.hacked');
    let clickCount = 0, clickTimerID = null;
    document.querySelector('.triple_click').addEventListener('click', function () {
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

    // Confirm sending form
    const form = document.querySelector('#contactForm'),
        confirmPopup = document.querySelector('#sendMsgPopup'),
        showConfirmBtn = form.querySelector('#showConfirmBtn');
    function showConfirmPopup() {
        confirmPopup.classList.remove('hidden');
        confirmPopup.addEventListener('click', function (ev) {
            if (ev.target === confirmPopup) closeConfirmPopup();
        });
        document.addEventListener('keydown', function (ev) {
            if (ev.key === 'Escape') closeConfirmPopup();
        });
        document.querySelector('#cancelBtn').onclick = closeConfirmPopup;
    }
    function closeConfirmPopup() {
        confirmPopup.classList.add('hidden');
        signErrors['email'] = false;
    }
    showConfirmBtn.addEventListener('click', showConfirmPopup);

    // Fill registered user's data into message form
    if (localStorage.getItem('user') !== null) {
        let user = JSON.parse(localStorage.getItem('user'));
        form.querySelector('[name="name"]').value = user.name;
        form.querySelector('[name="email"]').value = user.email;
        showConfirmBtn.removeAttribute('disabled');
        if (user.name) {
            document.querySelector('#home .welcome').innerText += `, ${user.name}`;
        } else {
            document.querySelector('#home .welcome').innerText += `, anonymous`;
        }
    }

    // Smooth appearance of content while scrolling down page
        // Smooth appearance of blocks
    function appearBlock() {
        document.querySelectorAll('.hiddenBlock').forEach(function(block) {
            if (window.scrollY >= (block.offsetTop - window.innerHeight * 0.33)) {
                block.classList.add('appearBlock')
            // } else {
            //     block.classList.remove('appearBlock')
            }
        });
    }
    window.addEventListener('scroll', appearBlock);
    // window.addEventListener('wheel', appearBlock);
    window.addEventListener('touchmove', appearBlock);
        // Smooth appearance of blocks' main content
    function appearChild() {
        document.querySelectorAll('.hiddenChild').forEach(function(block) {
            if (window.scrollY >= (block.offsetTop - window.innerHeight * 0.5)) {
                block.classList.add('appearChild')
            // } else {
            //     block.classList.remove('appearChild')
            }
        });
    }
    window.addEventListener('scroll', appearChild);
    // window.addEventListener('wheel', appearChild);
    window.addEventListener('touchmove', appearChild);

    // Filters of works
    const worksContainer = document.querySelector('.workCards'),
        allWorks = [...document.querySelectorAll('.cardWork')],
        catBtns = document.querySelectorAll('.categories a');
    let activeCategory = localStorage.getItem('filter');
    function showWorks(filtered) {
        worksContainer.innerHTML = '';
        filtered.forEach(function(work) {
            worksContainer.appendChild(work);
        });
    }
    function setWorks(activeCat) {
        let filteredWorks = [];
        if (activeCat) {
            allWorks.forEach(function(work) {
                const categories = work.getAttribute('data-category').split(',');
                if (categories.includes(activeCat)) {
                    filteredWorks.push(work);
                }
            });
        } else {
            filteredWorks = allWorks;
        }
        catBtns.forEach(function(btn) {
            btn.classList.remove('activeCategory');
            if (btn.getAttribute('data-category') === activeCat) {
                btn.classList.add('activeCategory');
            } else if (!activeCat && btn.getAttribute('data-category') === '') {
                btn.classList.add('activeCategory');
            }
        });
        showWorks(filteredWorks);
    }
    if (activeCategory) setWorks(activeCategory);
    catBtns.forEach(function(btn) {
        btn.addEventListener('click', function(ev) {
            ev.preventDefault();
            activeCategory = btn.getAttribute('data-category');
            localStorage.setItem('filter', activeCategory);
            setWorks(activeCategory);
        });
    });

});
