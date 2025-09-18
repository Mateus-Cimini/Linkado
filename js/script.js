

// Desabilitando o envio do form se houver campos inválidos
(() => {
  "use strict"

  // Busca todos os forms que vamos aplicar a validação personalizada
  const forms = document.querySelectorAll('.needs-validation')

  // Loop para impedir o envio se inválido
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


// input tags card

const input = document.getElementById('tagsInput');
const addBtn = document.getElementById('addTagBtn');
const container = document.getElementById('tagsContainer');
const error = document.getElementById('tagsError');

let tags = [];

function addTag() {
  const value = input.value.trim();
  if (!value || value.length > 12 || tags.length >= 3) {
    error.style.display = 'block';
    return;
  }
  tags.push(value);
  renderTags();
  input.value = '';
  error.style.display = 'none';
}

addBtn.addEventListener('click', addTag);
input.addEventListener('keydown', (e) => { if(e.key === 'Enter') addTag() });

function renderTags() {
  container.innerHTML = '';
  tags.forEach((tag, index) => {
    const span = document.createElement('span');
    span.className = 'badge bg-primary me-1';
    span.textContent = tag;
    span.addEventListener('click', () => {
      tags.splice(index, 1);
      renderTags();
    });
    container.appendChild(span);
  });
}

