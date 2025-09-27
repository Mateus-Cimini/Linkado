import { clearTags, getTags, initTags } from "./tags.js";
import { renderSectionButtons, sections, updateSectionSelect } from "./section.js";

// Array de cards no nível do módulo
export let arrayCards = JSON.parse(localStorage.getItem("cards")) || [];

// Função de renderizar cards (exportável)
export function renderCards(filterSection = "All") {
  let containerCards = $('#cardsContainer');
  containerCards.empty();
  
  // if para identificar o filter
  let cardsToRender = filterSection === 'All'
    ? arrayCards
    : arrayCards.filter(card => card.section === filterSection);

  // funçao que percorre todos os objetos do arrayCards e cria o html de cada card
  cardsToRender.forEach(card => {
    const cardHTML = `
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card">
          <a href="${card.link}" target="_blank">
            <img class="cardImg" src="${card.thumb || 'https://placehold.co/318x187'}" alt="imagem de exemplo">
          </a>
          <div class="card-body">
            <div class=" star d-flex justify-content-end ">
              <i class="bi bi-star-fill"></i>
            </div>
            ${card.tags ? card.tags.map(tag => `<button class="btn tag-btn">${tag}</button>`).join('') : ''}
            <a href="${card.link}" target="_blank">
              <h5 class="card-title">${card.title}</h5>
            </a>
            <p class="card-text">${card.description}</p>
          </div> 
          <div class="card-footer d-flex justify-content-between">
            <div class="card-icons-footer">
              <button type="button" class="btn deleteCard" data-id="${card.id}"><i class="bi bi-trash"></i></button>
              <button type="button" class="btn"><i class="bi bi-pencil"></i></button> 
            </div>
            <small class="text-body-secondary text-green"><time datetime="">${card.date}</time></small>
          </div>
        </div>
      </div>
    `;
    containerCards.append(cardHTML);
  });
}

// Função para inicializar eventos do form, botões e favoritos
export function initCards() {

  // Excluir card
  $(document).on('click', '.deleteCard', function() {
    const id = Number($(this).data('id'));
    arrayCards = arrayCards.filter(card => card.id !== id);
    localStorage.setItem("cards", JSON.stringify(arrayCards));
    renderCards();
  });

  // Favorito
  $(document).on('click', '.star', function(e) {
    e.stopPropagation();
    $(this).toggleClass("active");
  });

  // Salvar card do form
  const form = document.getElementById('formLink');
  form.addEventListener('formValidated', (e) => {
    if (!e.detail.isValid) return;

    let formData = $(form).serializeArray();
    let card = {};
    formData.forEach(item => card[item.name] = item.value);

    // data e hora
    card.date = new Date().toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    card.id = Date.now(); // adiciona um id unico a cada card


    // gera thumb
    if (!card.thumb && card.link) {
      const idVideo = getVideoId(card.link);
      if (idVideo) card.thumb = `https://img.youtube.com/vi/${idVideo}/hqdefault.jpg`;
    }

    // pega as tags criadas pelo usuario
    card.tags = getTags();
    clearTags(); // limps as tags para o proximo card

    card.section = $('#inputSection').val(); // pega as seçoes selecionadas como array
    
    arrayCards.push(card); // adiciona ao array
    localStorage.setItem("cards", JSON.stringify(arrayCards)); // salva no localStorage
    renderCards(); // renderiza cards

    // limpa o form e reseta o estado visual
    form.reset();
    $('#tagsContainer').empty();
    form.classList.remove('was-validated');
  });
}

// Função auxiliar para pegar ID de vídeo do YouTube
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

$(document).ready(function() {
  renderSectionButtons();
  renderCards('All')
  initTags()
})
