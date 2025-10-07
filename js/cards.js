import { clearTags, getTags, initTags } from "./tags.js";
import { renderSectionButtons, sections, updateSectionSelect } from "./section.js";

// Array de cards
export let arrayCards = JSON.parse(localStorage.getItem("cards")) || [];

// FUNÇÃO DE RENDERIZAÇÃO
export function renderCards(filterSection = "All") {
  const containerCards = $('#cardsContainer');
  containerCards.empty();

  const cardsToRender = filterSection === 'All'
    ? arrayCards
    : arrayCards.filter(card => card.section === filterSection);

  cardsToRender.forEach(card => containerCards.append(createCardHTML(card)));
}

// FUNÇÕES AUXILIARES
function createCardHTML(card) {
  return `
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="card">
        <a href="${card.link}" target="_blank">
          <img class="cardImg" src="${card.thumb || 'https://placehold.co/318x187'}" alt="imagem de exemplo">
        </a>
        <div class="card-body">
          <div class="star d-flex justify-content-end">
            <i class="bi bi-star-fill"></i>
          </div>
          ${Array.isArray(card.tags) ? card.tags.map(tag => `<button class="btn tag-btn">${tag}</button>`).join('') : ''}
          <a href="${card.link}" target="_blank">
            <h5 class="card-title">${card.title}</h5>
          </a>
          <p class="card-text">${card.description}</p>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <div class="card-icons-footer">
            <button type="button" class="btn deleteCard" data-id="${card.id}"><i class="bi bi-trash"></i></button>
            <button type="button" class="btn editCard" data-id="${card.id}"><i class="bi bi-pencil"></i></button>
          </div>
          <small class="text-body-secondary text-green"><time datetime="">${card.date}</time></small>
        </div>
      </div>
    </div>
  `;
}

function getVideoId(link) {
  try {
    if (link.includes("youtu.be/")) {
      return link.split("youtu.be/")[1].split("?")[0];  
    } else {
      const url = new URL(link);
      return url.searchParams.get('v');
    }
  } catch {
    return null;
  }
}

// FUNÇÕES DE MANIPULAÇÃO
function saveCard(card) {
  arrayCards.push(card);
  localStorage.setItem("cards", JSON.stringify(arrayCards));
}

function deleteCard(id) {
  arrayCards = arrayCards.filter(card => card.id !== id);
  localStorage.setItem("cards", JSON.stringify(arrayCards));
  renderCards();
}

function editCard(id) {
  const card = arrayCards.find(c => c.id === id);
  if (!card) return;

  const modalEl = document.getElementById('addLink');
  let modal = bootstrap.Modal.getInstance(modalEl);
  if (!modal) modal = new bootstrap.Modal(modalEl);

  updateSectionSelect();
  $('#inputSection').val(card.section);
  $('#inputTitle').val(card.title);
  $('#inputDescription').val(card.description);
  $('#inputLink').val(card.link);
  $('#inputThumb').val(card.thumb || '');

  const container = document.getElementById('tagsContainer');
  container.innerHTML = '';
  const tagsArray = Array.isArray(card.tags) ? card.tags : [];
  tagsArray.forEach(tag => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn tag-btn';
    btn.textContent = tag;
    container.appendChild(btn);
  });

  modalEl.dataset.editMode = true;
  modalEl.dataset.editId = id;

  modal.show();

  modalEl.addEventListener('hidden.bs.modal', () => {
    modalEl.removeAttribute('data-edit-mode');
    modalEl.removeAttribute('data-edit-id');
    $('#formLink').trigger('reset');
    $('#tagsContainer').empty();
  }, { once: true });
}

// FUNÇÕES DE GERENCIALEMTO GERAL


// gera backup
function exportBackup() {
  $(document).on('click', '#btnExport', function() {
    location.reload();
    console.log('salvando backup')
  });
}

// importa o backup
function importBackup() {
  $(document).on('click', '#btnImport', function() {
    location.reload();
    console.log('importando backup');
  });
}

// limpa localStorage
function clearStorage() {
  $(document).on('click', '#btnClear', function() {
    localStorage.clear();
    location.reload();
    console.log('apaga tudo');
  });
}


// INICIALIZAÇÃO DE EVENTOS
export function initCards() {
  $(document).on('click', '.deleteCard', function() {
    deleteCard(Number($(this).data('id')));
  });

  $(document).on('click', '.editCard', function() {
    editCard(Number($(this).data('id')));
  });

  $(document).on('click', '.star', function(e) {
    e.stopPropagation();
    $(this).toggleClass("active");
  });

  const form = document.getElementById('formLink');
  form.addEventListener('formValidated', e => {
    if (!e.detail.isValid) return;

    const formData = $(form).serializeArray();
    let card = {};
    formData.forEach(item => card[item.name] = item.value);

    card.date = new Date().toLocaleString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });

    card.section = $('#inputSection').val();
    card.tags = getTags() || []; // garante que tags seja um array

    if (!card.thumb && card.link) {
      const idVideo = getVideoId(card.link);
      if (idVideo) card.thumb = `https://img.youtube.com/vi/${idVideo}/hqdefault.jpg`;
    }
     
    const modalEl = document.getElementById('addLink');
    const editId = modalEl.dataset.editId;
    if (editId) {
      const index = arrayCards.findIndex(c => c.id == editId);
      if (index !== -1) arrayCards[index] = { ...arrayCards[index], ...card };
      form.removeAttribute('data-edit-id');
    } else {
      card.id = Date.now();
      saveCard(card);
      clearTags();
    }

    form.reset();
    $('#tagsContainer').empty();
    renderCards();
  });
}

// Inicialização
$(document).ready(() => {
  renderSectionButtons();
  renderCards('All');
  initTags();
  exportBackup();
  importBackup();
  clearStorage();
});

