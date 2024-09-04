document.addEventListener('DOMContentLoaded', function () {
    // Nav-Menu & Hamburger
    const hamburger = document.querySelector('.hamburger'),
        nav = document.querySelector('.nav'),
        nav_links = document.querySelectorAll('.nav a');
    hamburger.onclick = navToggle;
    nav_links.forEach(function (link) {
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

    // Show/Hide Nav menu
    const header = document.querySelector('#header .header_line');
    let lastScroll = 0;
    document.addEventListener('scroll', function () {
        let scroll = window.scrollY;
        if (scroll > lastScroll) {
            header.style.top = '-100%';
        } else {
            header.style.top = 0;
        }
        lastScroll = scroll;
    });

    // Smooth scroll to certain block on same page
    document.querySelectorAll('.header_menu a').forEach(function (link) {
        link.addEventListener('click', function (ev) {
            ev.preventDefault();
            const toBlock = document.querySelector(link.getAttribute('href'));
            toBlock.scrollIntoView({behavior: 'smooth'});
        });
    });
    // document.querySelectorAll('.header_menu a').forEach(function (link) {
    //     link.addEventListener('click', function (ev) {
    //         ev.preventDefault();
    //         const targetElement = document.querySelector(this.getAttribute('href'));
    //         const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    //         window.scrollTo({
    //             top: targetPosition,
    //             behavior: 'smooth'
    //         });
    //     });
    // });

    // Parallax on backgrounds
    const blocks = document.querySelectorAll('.bg_parallax');
    blocks.forEach(function (block) {
        function parallax(ev) {
            let moveX = (((ev.pageX - window.scrollX) / window.innerWidth) - 0.5) * 70,
                moveY = (((ev.pageY - window.scrollY) / window.innerHeight) - 0.5) * 20;
            block.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
        }
        block.addEventListener('mousemove', parallax);
        if (!block) block.removeEventListener('mousemove', parallax);
    });

    // Phone check through RegEx
    const tel = document.querySelector('#tel'),
        signBtn = document.querySelector('#signBtn'),
        phoneRegEx1 = /^(\+\d{1,3}[-\s]?)?(\(?\d{3}\)?[-\s]?)\d{3}[-\s]?\d{2}[-\s]?\d{2}$/g,
        phoneRegEx2 = /^(\+\d{1,3}[-\s]?)?(\(?\d{3}\)?[-\s]?)\d{2}[-\s]?\d{3}[-\s]?\d{2}$/g,
        phoneRegEx3 = /^(\+\d{1,3}[-\s]?)?(\(?\d{3}\)?[-\s]?)\d{2}[-\s]?\d{2}[-\s]?\d{3}$/g;
    let errorTel = document.querySelector('#errorTel');
    let signErrors = [];
    signErrors['tel'] = true;
    tel.oninput = function () {
        let string = tel.value.replace(/[^+0-9\(\)\-\s]/g, '');
        tel.value = string;
        if (string.length >= 10) {
            if ((string.includes('(') && !string.includes(')')) || (!string.includes('(') && string.includes(')'))) {
                signErrors['tel'] = true;
                signBtn.setAttribute('disabled', '');
                errorTel.innerHTML = 'Неправильно введений номер';
            } else if (phoneRegEx1.test(string) || phoneRegEx2.test(string) || phoneRegEx3.test(string)) {
                signErrors['tel'] = false;
                errorTel.innerHTML = '';
            } else {
                if (phoneRegEx1.test(string) || phoneRegEx2.test(string) || phoneRegEx3.test(string)) {
                    signErrors['tel'] = false;
                    errorTel.innerHTML = '';
                } else {
                    signErrors['tel'] = true;
                    signBtn.setAttribute('disabled', '');
                    errorTel.innerHTML = 'Неправильно введений номер';
                }
            }
        } else {
            signErrors['tel'] = true;
            signBtn.setAttribute('disabled', '');
        }
        // console.log(signErrors['tel'], signErrors['email']);
        if (!signErrors['tel'] && !signErrors['email']) {
            signBtn.removeAttribute('disabled');
        }
    }

    // Email check through RegEx
    const emails = document.querySelectorAll('.email'),
        emailRegEx = /^([a-z][a-z0-9._-]+[a-z])(@[a-z][a-z0-9_-]+)(\.[a-z]+)(\.[a-z]+)?$/gi;
    signErrors['email'] = true;
    emails.forEach(function (email) {
        const errorEmail = email.nextElementSibling;
        email.oninput = function () {
            let string = email.value;
            if (string.length >= 10) {
                if (emailRegEx.test(string)) {
                    signErrors['email'] = false;
                    errorEmail.innerHTML = '';
                } else {
                    if (emailRegEx.test(string)) {
                        signErrors['email'] = false;
                        errorEmail.innerHTML = '';
                    } else {
                        signErrors['email'] = true;
                        signBtn.setAttribute('disabled', '');
                        errorEmail.innerHTML = 'Такої ел. адреси не існує';
                    }
                }
            } else {
                signErrors['email'] = true;
                signBtn.setAttribute('disabled', '');
            }
            // console.log(signErrors['tel'], signErrors['email']);
            if (!signErrors['tel'] && !signErrors['email']) {
                signBtn.removeAttribute('disabled');
            }
        }
    });

    // Sign popup
    const popup = document.querySelector('#sign_popup'),
        closeBtn = popup.querySelector('#closeBtn');
    function showPopup() {
        popup.classList.remove('hidden');
        document.body.classList.add('over_hidden');

        // Close popup
        function closePopup() {
            popup.classList.add('hidden');
            document.body.classList.remove('over_hidden');
            signErrors['tel'] = false;
            signErrors['email'] = false;
        }
        popup.addEventListener('click', function (ev) {
            if (ev.target === popup) closePopup();
        });
        document.addEventListener("keydown", function (ev) {
            if (ev.key === "Escape") closePopup();
        });
        closeBtn.onclick = closePopup;
    }
    document.querySelector('#getStarted').addEventListener('click', showPopup);

    // triple click focus
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

});
