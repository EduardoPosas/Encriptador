const madeBy = document.querySelector('.created span');

const userInput = document.querySelector('.user-input textarea');
const encryptedTextOutput = document.querySelector('.encrypted-text');

const noDataElements = document.querySelector('.no-message');
const encryptedContent = document.querySelector('.encrypted-content');

const encryptBtn = document.querySelector('[data-encrypt]');
const decryptBtn = document.querySelector('[data-decrypt]');
const copyBtn = document.querySelector('[data-copy]');

const encryptionWords = {
    e: 'enter',
    i: 'imes',
    a: 'ai',
    o: 'ober',
    u: 'ufat'
};

window.addEventListener('DOMContentLoaded', () => {
    let actualYear = new Date().getFullYear();
    madeBy.textContent = `Desarrollado por Alexander Posas ${actualYear}`;
});

eventListeners();
function eventListeners() {
    encryptBtn.addEventListener('click', handleEncrypt);
    decryptBtn.addEventListener('click', handleDecrypt);
    copyBtn.addEventListener('click', handleCopy);
}

function validateInput(userText) {

    const pattern = new RegExp("^[a-z\u00f1\\\s]+$"); // Just lowercase and blank spaces. accept ñ

    if (userText === '') {
        return {
            isValid: false,
            data: 'Ingrese un texto para codificar o decodificar'
        };
    }
    if (!pattern.test(userText)) {
        return {
            isValid: false,
            data: 'El texto solo debe contener letras minúsculas y sin acentos'
        };
    }

    return {
        isValid: true,
        data: userText
    };
}

function handleEncrypt() {

    let { isValid, data } = validateInput(userInput.value);

    if (!isValid) {
        showAlert(data);
        encryptedContent.classList.add('hide');
        encryptedContent.classList.remove('show');
        noDataElements.classList.add('show');
        noDataElements.classList.remove('hide');
        return;
    }

    // Encryption Logic
    let encodedText = data;
    for (let [key, value] of Object.entries(encryptionWords)) {
        if (encodedText.includes(key)) {
            encodedText = encodedText.replaceAll(key, value);
        }
    }

    console.log(encodedText);

    // Replace data with a regex option
    // let encyptedValue = data
    //     .replace(/e/gi, "enter")
    //     .replace(/i/gi, "imes")
    //     .replace(/a/gi, "ai")
    //     .replace(/o/gi, "ober")
    //     .replace(/u/gi, "ufat");

    // console.log(encyptedValue);

    noDataElements.classList.remove('show');
    noDataElements.classList.add('hide');
    encryptedContent.classList.remove('hide');
    encryptedContent.classList.add('show');

    encryptedTextOutput.textContent = encodedText;
    userInput.value = '';
}

function handleDecrypt() {
    const { isValid, data } = validateInput(userInput.value);

    if (!isValid) {
        showAlert(data);
        encryptedContent.classList.add('hide');
        encryptedContent.classList.remove('show');
        noDataElements.classList.add('show');
        noDataElements.classList.remove('hide');
        return;
    }

    // Decrypt Logic
    let decodedText = data;
    for (let [key, value] of Object.entries(encryptionWords)) {
        if (decodedText.includes(value)) {
            decodedText = decodedText.replaceAll(value, key);
        }
    }

    console.log(decodedText);

    // let decryptedValue = data
    //     .replace(/enter/gi, "e")
    //     .replace(/imes/gi, "i")
    //     .replace(/ai/gi, "a")
    //     .replace(/ober/gi, "o")
    //     .replace(/ufat/gi, "u");

    // console.log(decryptedValue);

    noDataElements.classList.remove('show');
    noDataElements.classList.add('hide');
    encryptedContent.classList.remove('hide');
    encryptedContent.classList.add('show');

    encryptedTextOutput.textContent = decodedText;
    userInput.value = '';
}

function handleCopy() {
    const valueToCopy = encryptedTextOutput.innerText;
    navigator.clipboard.writeText(valueToCopy);
    navigator.clipboard
        .readText()
        .then(toast);
}

function showAlert(msg) {
    const alertExists = document.querySelector('.alert');
    if (alertExists) {
        alertExists.remove();
    }

    const alert = document.createElement('P');
    alert.classList.add('alert');
    alert.textContent = msg;

    document.querySelector('.encrypter-content').insertBefore(alert, document.querySelector('.user-input'));

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function toast() {
    const toastExist = document.querySelector('.toast');
    if (toastExist) {
        toastExist.remove();
    }
    const toast = document.createElement('P');
    toast.textContent = 'Texto copiado';
    toast.classList.add('toast');

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
} 
