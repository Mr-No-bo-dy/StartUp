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
    document.querySelectorAll('.name').forEach(function (name) {
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

    // Sign up popup
    function showSighUpPopup() {
        const signUpPopUp = document.querySelector('#signUpPopUp');
        signUpPopUp.classList.remove('hidden');
        signUpPopUp.addEventListener('click', function (ev) {
            if (ev.target === signUpPopUp) closeSighUpPopup();
        });
        document.addEventListener('keydown', function (ev) {
            if (ev.key === 'Escape') closeSighUpPopup();
        });
        document.querySelector('#cancelBtn').onclick = closeSighUpPopup;
    }
    function closeSighUpPopup() {
        signUpPopUp.classList.add('hidden');
        signErrors['email'] = false;
    }
    document.querySelector('#showConfirmBtn').addEventListener('click', showSighUpPopup);

    // Sign up
    document.querySelector('#signUpBtn').addEventListener('click', function() {
        const signUpBtn = document.querySelector('#signUpBtn');
        const name = signUpBtn.closest('form').querySelector('[name="name"]'),
            email = signUpBtn.closest('form').querySelector('[name="email"]'),
            tel = signUpBtn.closest('form').querySelector('[name="tel"]'),
            subject = signUpBtn.closest('form').querySelector('[name="subject"]'),
            message = signUpBtn.closest('form').querySelector('[name="message"]');
        let userData = {
            'name': name.value,
            'email': email.value,
            'tel': tel ? tel.value : '',
            'subject': subject ? subject.value : '',
            'message': message ? message.value : '',
        };
        localStorage.setItem('user', JSON.stringify(userData));
        closeSighUpPopup();
    });

    // Fill registered user's data into message form
    function fillUserData () {
        if (localStorage.getItem('user') !== null) {
            const signUpForm = document.querySelector('#signUpForm');
            let user = JSON.parse(localStorage.getItem('user'));
            signUpForm.querySelector('[name="name"]').value = user.name;
            signUpForm.querySelector('[name="email"]').value = user.email;
            signUpForm.querySelector('[name="tel"]').value = user.tel;
            document.querySelector('#showConfirmBtn').removeAttribute('disabled');
        }
    }
    fillUserData();

    // Sign in popup
    function showSignInPopup() {
        const signInPopUp = document.querySelector('#signInPopUp');
        signInPopUp.classList.remove('hidden');
        document.body.classList.add('over_hidden');
        signInPopUp.addEventListener('click', function (ev) {
            if (ev.target === signInPopUp) closeSignInPopup();
        });
        document.addEventListener('keydown', function (ev) {
            if (ev.key === 'Escape') closeSignInPopup();
        });
        signInPopUp.querySelector('#closeBtn').onclick = closeSignInPopup;
    }
        // Close popup
    function closeSignInPopup() {
        signInPopUp.classList.add('hidden');
        document.body.classList.remove('over_hidden');
        signErrors['tel'] = false;
        signErrors['email'] = false;
        signErrors['name'] = false;
    }
    document.querySelector('#getStarted').addEventListener('click', showSignInPopup);

    // Sign in
    const welcomeText = document.querySelector('#home .welcome').innerText;
    document.querySelector('#signInBtn').addEventListener('click', function() {
        const signInBtn = document.querySelector('#signInBtn'),
            registeredUser = JSON.parse(localStorage.getItem('user')),
            name = signInBtn.closest('form').querySelector('[name="name"]'),
            email = signInBtn.closest('form').querySelector('[name="email"]'),
            loggingUser = {
            'name': name.value,
            'email': email.value,
        };
        if (registeredUser && loggingUser.email === registeredUser.email && 
            loggingUser.name === registeredUser.name) {
            // fillUserData();
            closeSignInPopup();
            name.value = null;
            email.value = null;
            document.querySelector('#home .welcome').innerText = welcomeText + `, ${loggingUser.name}`;
        } else {
            document.querySelector('#credentialError').innerText = 'Username or Email is incorrect';
        }
    });
});