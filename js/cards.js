// Inicia
export function initCards() {

  let arrayCards = [];

  // (read) cria os cards com base no array
  function renderCards() {
    let containerCards = $('#linkCards');
    containerCards.empty();

    arrayCards.forEach(card => {
      const cardHTML = `
        <div class="col-12 col-sm-6 col-lg-4">
          <div class="card">
            <img src="${card.thumb || 'https://placehold.co/300x200'}" alt="imagem de exemplo" class="card-img-top">
            <div class="card-img-overlay d-flex justify-content-end active">
              <i class="bi bi-star-fill"></i>
            </div>
            <div class="card-body">
              <button class="btn tag-btn">tag1</button>
              <button class="btn tag-btn">tag2</button>
              <button class="btn tag-btn">tag3</button>
              <h5 class="card-title">${card.title}</h5>
              <p class="card-text">${card.description}</p>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <div class="card-icons-footer">
                <button type="button" class="btn"><i class="bi bi-trash"></i></button>
                <button type="button" class="btn"><i class="bi bi-pencil"></i></button> 
              </div>
              <small class="text-body-secondary text-green">
                <time datetime="">17/09/2025 as 04:21</time>
              </small>
            </div>
          </div>
        </div>
      `;
      containerCards.append(cardHTML);
    });
  }

  // (create) salva os dados do form em um objeto e adiciona ao array
  $('#formLink').submit(function(e) {
    e.preventDefault();

    let formData = $(this).serializeArray();
    let card = {};

    formData.forEach(item => {
      card[item.name] = item.value; // cria o objeto
    });

    arrayCards.push(card); // adiciona ao array
    renderCards();         // renderiza os cards
  });
}

