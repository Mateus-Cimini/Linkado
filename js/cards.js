import { clearTags, getTags, initTags } from "./tags.js";
import { renderSectionButtons, sections, updateSectionSelect } from "./section.js";

// Array de cards
export let arrayCards = JSON.parse(localStorage.getItem("cards")) || [];

let cardsToShow;

function setCardsToShow() {
  const width = window.innerWidth;

  if (width < 768) {
    cardsToShow = 3;
  } else if (width < 992) {
    cardsToShow = 4;
  } else {
    cardsToShow = 6;
  }
}

setCardsToShow();
renderCards();

$(window).on('resize', function() {
  setCardsToShow();
  renderCards();
});

// FUNÇÃO DE RENDERIZAÇÃO
export function renderCards(filterSection = "All") {
  const containerCards = $('#cardsContainer');
  containerCards.empty();

  const cardsToRender = filterSection === 'All'
    ? arrayCards
    : arrayCards.filter(card => card.section === filterSection);

  const visibleCards = cardsToRender.slice(0, cardsToShow);

  visibleCards.forEach(card => {
    const cardEl = $(createCardHTML(card)).hide();
    containerCards.append(cardEl);
    cardEl.fadeIn(400);
    attCounter();
  });

  if (cardsToRender.length > cardsToShow) {
    $('#readMore').show();
  } else {
    $('#readMore').hide();
  }
  
  $(document).off('click', '#btnLoadMore').on('click', '#btnLoadMore', function() {
    cardsToShow += 3;
    renderCards();
  })
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
          <div class="star d-flex justify-content-end ${card.favorite ? 'active' : ''}">
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
    const data = JSON.stringify(localStorage, null, 2); // formata com indentação
    const blob = new Blob([data], { type: 'application/json' }); // cria um blob(arquivo temporario na memmoria do navegador)
    const url = URL.createObjectURL(blob); // cria um link temporario
    
    const fileName = prompt("Digite o nome do arquivo:", "backup_localStorage");
    if (!fileName) return;
  
    const a = document.createElement('a'); // cria um <a> dinamico js
    a.href = url; // define o href para o arquivo
    a.download = `${fileName}.json`; // define o nome do arquivo
    a.click(); // clica automaticamente gerando o download

    URL.revokeObjectURL(url) // remove da memoria o link temporario

    location.reload();
    console.log('salvando backup')
  });
}

// importa o backup
function importBackup() {
  $(document).off('click', '#btnImport').on('click', '#btnImport', function() { 

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);

          localStorage.clear();
          for (const key in data) {
            localStorage.setItem(key, data[key]);
          }

          alert('Backup importado com sucesso!')
          location.reload();
        } catch (err) {
           alert("Erro ao importar o arquivo: " + err.message)
        }
      };

      reader.readAsText(file);
    };

    input.click(); // abre o seletor de arquivo
    console.log('importando backup');
    attCounter();
  });
}

// limpa localStorage
function clearStorage() {
  $(document).on('click', '#btnClear', function() {
    alert('Você apagou tudo')
    localStorage.clear();
    location.reload();
    console.log('apaga tudo');
    attCounter();
  });
}


// INICIALIZAÇÃO DE EVENTOS
export function initCards() {
  $(document).on('click', '.deleteCard', function() {

    const card = $(this).closest('.card');
    const cardId = Number($(this).data('id'))
    card.fadeOut(400, function() {
      card.remove();
      deleteCard(cardId);
      attCounter();
    });
  });

  $(document).on('click', '.editCard', function() {
    editCard(Number($(this).data('id')));
  });

  $(document).on('click', '.star', function(e) {
    e.stopPropagation();
    $(this).toggleClass("active");

    const cardId = Number($(this).closest('.card').find('.editCard').data('id'));
    if (!cardId) return;

    const cardIndex = arrayCards.findIndex(c => c.id === cardId);
    if (cardIndex === -1) return;

    arrayCards[cardIndex].favorite = !arrayCards[cardIndex].favorite;

    localStorage.setItem('cards', JSON.stringify(arrayCards));
    attCounter();
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

// iNFO HOME

export function attCounter() {
  const totalCards = arrayCards;
  const totalSections = JSON.parse(localStorage.getItem('sections')) || [];
  const totalFavorite = arrayCards.filter(card => card.favorite);
  document.getElementById('numberPlaylist').textContent = totalSections.length;
  document.getElementById('numberCards').textContent = totalCards.length;
  document.getElementById('numberFavorite').textContent = totalFavorite.length;
  updateBadge();
}

// BADGE
function updateBadge() {
  const totalCards = arrayCards.length;
  const totalSections = JSON.parse(localStorage.getItem('sections'))?.length || 0;
  const totalFavorite = arrayCards.filter(card => card.favorite).length;

  const phrases = [
    `${totalCards} cards foram adicionados`,
    `${totalFavorite} favoritos estão ativos`,
    `${totalSections} playlists disponíveis`,
    `Você adicionou ${totalCards} links`,
    `Keep going! Já são ${totalCards} cards!`  
  ];
  
  const badge = document.querySelector('.custom-badge');
  const randomIndex = Math.floor(Math.random() * phrases.length);
  badge.innerHTML = `<i class="bi bi-stars"></i> ${phrases[randomIndex]}`;
}

$(document).ready(() => {
  updateBadge();
});



// Inicialização
$(document).ready(() => {
  renderSectionButtons();
  renderCards('All');
  initTags();
  exportBackup();
  importBackup();
  clearStorage();
  attCounter();
});

