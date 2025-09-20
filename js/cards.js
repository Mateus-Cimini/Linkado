// Inicia
export function initCards() {

// funcionalidade de favorito
   $(document).on('click', '.card', function() {
     $(this).find('.star').toggleClass("active")
   });

  let arrayCards = [];

  // (read) cria os cards com base no array
  function renderCards() {
    let containerCards = $('#cardsContainer');
    containerCards.empty();

    arrayCards.forEach(card => {
      const cardHTML = `
        <div class="col-12 col-sm-6 col-lg-4">
          <div class="card">
            <a href="${card.link}" target="_blank">
              <img class="cardImg" src="${card.thumb || 'https://placehold.co/300x200'}" alt="imagem de exemplo">
            </a>
            <div class="card-body">
              <div class=" star d-flex justify-content-end :">
                <i class="bi bi-star-fill"></i>
              </div>
              <button class="btn tag-btn">tag1</button>
              <button class="btn tag-btn">tag2</button>
              <button class="btn tag-btn">tag3</button>
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
              <small class="text-body-secondary text-green"><time datetime="">00/00/0000 as 00:00</time></small>
            </div>
          </div>
        </div>
      `;
      containerCards.append(cardHTML);
    });
  }

  // (create) salva os dados do form em um objeto e adiciona ao array
 
  const form = document.getElementById('formLink');
  form.addEventListener('formValidated', (e) => {
    if (!e.detail.isValid) return;


    let formData = $(form).serializeArray();
    let card = {};
    formData.forEach(item => card[item.name] = item.value);

    arrayCards.push(card); // adiciona ao array
    renderCards();         // renderiza os cards

    form.reset();
    $('#tagsContainer').empty();
    form.classList.remove('was-validated');
  });
}
