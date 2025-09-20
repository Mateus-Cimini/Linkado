export function initFormValidation() {
  "use strict";
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      event.stopPropagation();

      const isValid = form.checkValidity();
      form.classList.add('was-validated');

      // dispara um evento personalizado para o card.js
      const validationEvent = new CustomEvent('formValidated', { detail: { isValid } }); // corrigido aqui
      form.dispatchEvent(validationEvent);
    }, false);
  });
}


