// importa funções do arquivo tags.js
// clearTags -> limpa as tags criadas
// getTags -> retorna as tags atuais
import { clearTags, getTags } from "./tags.js";
import { sections, updateSectionSelect } from "./section.js";

// Inicializaçao da função principal
export function initCards() {



// funcionalidade de favorito
   $(document).on('click', '.card', function() {
     $(this).find('.star').toggleClass("active")
   });


  // array de cards
  let arrayCards = [];

  // função de renderizar cards na tela (READ)
  function renderCards() {
    let containerCards = $('#cardsContainer');
     containerCards.empty(); // limpa os cards atuais antes de renderizar de novo

     // percorre todos os objetos dentro do arrayCards e cria o HTML de cada card
    arrayCards.forEach(card => {
      const cardHTML = `
        <div class="col-12 col-sm-6 col-lg-4">
          <div class="card">
            <a href="${card.link}" target="_blank">
              <img class="cardImg" src="${card.thumb || 'https://placehold.co/318x187'}" alt="imagem de exemplo">
            </a>
            <div class="card-body">
              <div class=" star d-flex justify-content-end :">
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
                <button type="button" class="btn"><i class="bi bi-trash"></i></button>
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
  
  // função de pegar id do video
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



  // salva os dados do form em um objeto e adiciona ao array (CREATE)
 
  const form = document.getElementById('formLink');
  form.addEventListener('formValidated', (e) => {
    if (!e.detail.isValid) return;


    let formData = $(form).serializeArray();
    let card = {};
    formData.forEach(item => card[item.name] = item.value);

    // adiciona a data e hora no card
    card.date = new Date().toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

  
    // gera thumb
    if (!card.thumb && card.link) {
      const idVideo = getVideoId(card.link);
      if (idVideo) card.thumb = `https://img.youtube.com/vi/${idVideo}/hqdefault.jpg`
    }


     // pega as tags criadas pelo usuário
    card.tags = getTags();
    clearTags(); // limpa as tags para o próximo card

    card.section = $('#inputSection').val(); // pega as seções selecionadas como array
    
    arrayCards.push(card); // adiciona ao array
    renderCards();         // renderiza os cards

    // limpa o form e reseta o estado visual
    form.reset();
    $('#tagsContainer').empty();
    form.classList.remove('was-validated');
  });
}
