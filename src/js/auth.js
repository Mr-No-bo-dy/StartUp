// Authentication
document.addEventListener('DOMContentLoaded', function() {
    // Phone check through RegEx
    const phoneRegEx1 = /^(\+\d{1,3}[-\s]?)?(\(?\d{3}\)?[-\s]?)\d{3}[-\s]?\d{2}[-\s]?\d{2}$/g,
        phoneRegEx2 = /^(\+\d{1,3}[-\s]?)?(\(?\d{3}\)?[-\s]?)\d{2}[-\s]?\d{3}[-\s]?\d{2}$/g,
        phoneRegEx3 = /^(\+\d{1,3}[-\s]?)?(\(?\d{3}\)?[-\s]?)\d{2}[-\s]?\d{2}[-\s]?\d{3}$/g;
    let signErrors = [];
    signErrors['tel'] = false;
    document.querySelector('#tel').oninput = function () {
        const tel = document.querySelector('#tel');
        let errorTel = tel.nextElementSibling,
            disabledBtn = tel.closest('form').querySelector('.disabledBtn'),
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
        // result
            if (!signErrors['tel'] && !signErrors['email'] && !signErrors['name']) {
            disabledBtn.removeAttribute('disabled');
        } else {
            disabledBtn.setAttribute('disabled', '');
        }
    }

    // Email check through RegEx
    const emailRegEx = /^([a-z][a-z0-9._-]+)(@[a-z][a-z0-9_-]+)(\.[a-z][a-z]+)(\.[a-z][a-z]+)?$/gi;
    signErrors['email'] = true;
    [...document.querySelectorAll('.email')].forEach(function (email) {
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
            // result
            if (!signErrors['tel'] && !signErrors['email'] && !signErrors['name']) {
                disabledBtn.removeAttribute('disabled');
            } else {
                disabledBtn.setAttribute('disabled', '');
            }
        }
    });

    // Name check through RegEx
    const nameRegEx = /[a-z0-9 ]+$/gi;
    signErrors['name'] = true;
    [...document.querySelectorAll('.name')].forEach(function (name) {
        name.oninput = function () {
            const disabledBtn = name.closest('form').querySelector('.disabledBtn');
            let errorName = name.nextElementSibling,
                string = name.value;
            if (string.length >= 8 && string.length < 24) {
                if (nameRegEx.test(string)) {
                    signErrors['name'] = false;
                    errorName.innerHTML = '';
                } else {    // controll check
                    if (nameRegEx.test(string)) {
                        signErrors['name'] = false;
                        errorName.innerHTML = '';
                    } else {
                        signErrors['name'] = true;
                        errorName.innerHTML = 'Name must be AlphaNumeric, 8-24 letters';
                    }
                }
            } else {
                signErrors['name'] = true;
                errorName.innerHTML = 'Name must be AlphaNumeric, 8-24 letters';
            }
            // result
            if (!signErrors['tel'] && !signErrors['email'] && !signErrors['name']) {
                disabledBtn.removeAttribute('disabled');
            } else {
                disabledBtn.setAttribute('disabled', '');
            }
        }
    });

    // Show popup
    function showPopup(selector) {
        const popup = document.querySelector(selector);
        popup.classList.remove('hidden');
        document.body.classList.add('over_hidden');
        // Close popup events
        popup.addEventListener('click', function (ev) {
            if (ev.target === popup) closePopup(selector);
        });
        document.addEventListener('keydown', function (ev) {
            if (ev.key === 'Escape') closePopup(selector);
        });
        popup.querySelector('.closeBtn').onclick = function () {
            closePopup(selector);
        };
    }
    // Close popup
    function closePopup(selector) {
        document.querySelector('#signInForm').reset();
        const popup = document.querySelector(selector);
        popup.classList.add('hidden');
        document.body.classList.remove('over_hidden');
        signErrors['email'] = false;
        signErrors['name'] = false;
    }

    // Save & show user's data to confirmation
    const confirmBtn = document.querySelector('#showConfirmBtn');
    let signUpData = {};
    function showSignUpData() {
        const form = confirmBtn.closest('form');
        signUpData.name = form.querySelector('[name="name"]').value;
        signUpData.email = form.querySelector('[name="email"]').value;
        signUpData.tel = form.querySelector('[name="tel"]').value;
        signUpData.subject = form.querySelector('[name="subject"]').value;
        signUpData.message = form.querySelector('[name="message"]').value;
        form.querySelector('.message_data .name b').innerText = signUpData.name;
        form.querySelector('.message_data .email b').innerText = signUpData.email;
        form.querySelector('.message_data .tel b').innerText = signUpData.tel;
        form.querySelector('.message_data .subject b').innerText = signUpData.subject;
        form.querySelector('.message_data .message b').innerText = signUpData.message;
    }
    confirmBtn.addEventListener('click', showSignUpData);
    confirmBtn.addEventListener('click', function (){
        showPopup('#signUpPopUp');
    });

    // Sign up
    document.querySelector('#signUpBtn').addEventListener('click', function() {
        localStorage.setItem('user', JSON.stringify(signUpData));
        closePopup('#signUpPopUp');
        signUpData = {};
    });

    // Fill registered user's data into message form
    const welcomeText = document.querySelector('#home .welcome').innerText;
    function fillUserData () {
        if (localStorage.getItem('loggedUser') !== null) {
            const signUpForm = document.querySelector('#signUpForm');
            let user = JSON.parse(localStorage.getItem('user'));
            signUpForm.querySelector('[name="name"]').value = user.name;
            signUpForm.querySelector('[name="email"]').value = user.email;
            signUpForm.querySelector('[name="tel"]').value = user.tel;
            signUpForm.querySelector('[name="subject"]').value = user.subject;
            signUpForm.querySelector('[name="message"]').value = user.message;
            confirmBtn.removeAttribute('disabled');
        }
    }
    fillUserData();

    // Sign in
    document.querySelector('#getStarted').addEventListener('click', function (){
        showPopup('#signInPopUp');
    });
    document.querySelector('#signInBtn').addEventListener('click', function() {
        const signInBtn = document.querySelector('#signInBtn'),
            registeredUser = JSON.parse(localStorage.getItem('user')),
            name = signInBtn.closest('form').querySelector('[name="name"]'),
            email = signInBtn.closest('form').querySelector('[name="email"]'),
            loggingUser = {
                'name': name.value,
                'email': email.value,
                'date': Date.now(),
            };
        if (registeredUser && loggingUser.email === registeredUser.email && 
            loggingUser.name === registeredUser.name) {
            localStorage.setItem('loggedUser', JSON.stringify(loggingUser));
            fillUserData();
            closePopup('#signInPopUp');
            document.querySelector('#home .welcome').innerText = `${welcomeText}, ${registeredUser.name}`;
        } else {
            document.querySelector('#credentialError').innerText = 'Username or Email is incorrect';
        }
    });
    // Session imitation (1 hour):
    if (localStorage.getItem('loggedUser') && Date.now() < (JSON.parse(localStorage.getItem('loggedUser')).date + 60 * 60 * 1000)) {
        document.querySelector('#home .welcome').innerText = `${welcomeText}, ${JSON.parse(localStorage.getItem('loggedUser')).name}`;
    } else {
        localStorage.removeItem('loggedUser');
    }
});