const Name = document.getElementById('nome');
const Email = document.getElementById('email');
const green = '#4CAF50';
const red = '#F44336';

function validateName() {
    if (checkIfEmpty(Name)) return;
    if (!checkIfOnlyLetters(Name)) return;
    return true;
}

function validateEmail() {
    if (checkIfEmpty(email)) return;
    if (!containsCharacters(email, 5)) return;
    return true;
}

function checkIfEmpty(field) {
    if (isEmpty(field.value.trim())) {
       setInvalid(field, `${field.name} Não deve estar vazio`);
    return true;
    } else {
        setValid(field);
    return false;
    }
}

  function isEmpty(value) {
    if (value === '') return true;
    return false;
}

function setInvalid(field, message) {
    field.className = 'invalid';
    field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.style.color = red;
}

function setValid(field) {
    field.className = 'valid';
    field.nextElementSibling.innerHTML = '';
}

function checkIfOnlyLetters(field) {
    if (/^[a-zA-Z ]+$/.test(field.value)) {
        setValid(field);
    return true;
    } else {
        setInvalid(field, `${field.name} Deve conter apenas letras`);
    return false;
    }
}

function containsCharacters(field, code) {
    let regEx;
    switch (code) {
      case 1:
        // letras
        regEx = /(?=.*[a-zA-Z])/;
        return matchWithRegEx(regEx, field, 'Deve conter pelos menos uma letra.');
      case 2:
        // Email pattern
        regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return matchWithRegEx(regEx, field, 'Deve ser um email válido');
      default:
        return false;
    }
}

function matchWithRegEx(regEx, field, message) {
    if (field.value.match(regEx)) {
      setValid(field);
      return true;
    } else {
      setInvalid(field, message);
      return false;
    }
}