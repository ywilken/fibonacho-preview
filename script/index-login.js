/* ============ 
VARIABLES 
============ */

// ===Input===
const inputLoginUsername = document.querySelector(`[data-input="input--login-username"]`);
const inputLoginPassword = document.querySelector(`[data-input="input--login-password"]`);

// ===Form===
const formLoginWindow = document.querySelector(`[data-form="form--login-window"]`);

// ===Error Messages===
const messageNoUsername = document.querySelector(`[data-message="message--no-username"]`);
const messageNoPassword = document.querySelector(`[data-message="message--no-password"]`);
const messageLoginDataIncorrect = document.querySelector(`[data-message="message--login-data-incorrect"]`);


// ===Buttons===
const btnLoginOpen = document.querySelector(`[data-btn="btn--login-open"]`);
const btnLoginClose = document.querySelector(`[data-btn="btn--login-close"]`);
const btnLoginSubmit = document.querySelector(`[data-btn="btn--login-submit"]`);


/* ============ 
EVENT LISTENERS 
============ */
btnLoginOpen.addEventListener('click', (e) => {
    e.preventDefault();
    formLoginWindow.classList.remove('login-hidden');
});

btnLoginClose.addEventListener('click', (e) => {
    e.preventDefault();
    formLoginWindow.classList.add('login-hidden');
});

inputLoginUsername.addEventListener('click', () => {
    messageNoUsername.classList.add('login-error-message-hidden');
});

inputLoginPassword.addEventListener('click', () => {
    messageNoPassword.classList.add('login-error-message-hidden');
});

btnLoginSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(inputLoginPassword.value)
    if(inputLoginPassword.value ==="" || inputLoginPassword.value === "") {
        if(inputLoginUsername.value === "") {
            messageNoUsername.classList.remove('login-error-message-hidden');
        }
        if(inputLoginPassword.value === "") {
            messageNoPassword.classList.remove('login-error-message-hidden');
        }
    } else {
        if(inputLoginUsername.value === "fibonacho" && inputLoginPassword.value === "admin123") {
            location.href="html/grado-4/grado-4-html-generator.html";
        } else if(inputLoginUsername.value !== "fibonacho" || inputLoginPassword.value !== "admin123") {
            messageLoginDataIncorrect.classList.remove('login-error-message-hidden');
        }
    }
});