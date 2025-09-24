export let sections = JSON.parse(localStorage.getItem("sections")) || [];

function saveSections() {
  localStorage.setItem("sections", JSON.stringify(sections));
}


// função de gerar na tela o botao de seção
export function renderSectionButtons() {
  const container = $('#dynamicSections');
  container.empty();

  sections.forEach(section => {
    const btnHTML = `
      <div class="col-12 col-md-4 col-lg-3">
        <div class="btn-group w-100 role="group">
         <button class="btn tab-btn btn-outline-primary flex-grow d-flex justify-content-center">${section}</button>
         <button class="deleteSection btn btn-outline-danger" data-section="${section}">
          <i class="bi bi-trash"></i>
         </button>
       </div> 
      </div>
    `;
    container.append(btnHTML)
});
}

// Adiciona uma nova seção ao array
$('#btnAddSection').on('click', function() {
  let newSection = $('#inputAddSection').val().trim();
  if(newSection && !sections.includes(newSection)) {
    sections.push(newSection);
    saveSections(); // salvando no localStorage
    $("#inputAddSection").val('');
    updateSectionSelect();
    renderSectionButtons()
  }
});

// função do botao de apagar section
$(document).on('click', '.deleteSection', function() {
  const sectionName = $(this).data('section');
  sections = sections.filter(sec => sec !== sectionName);
  saveSections();
  renderSectionButtons();
  updateSectionSelect();
});

// Atualiza o select de seções no modal de link
export function updateSectionSelect() {
  let select = $('#inputSection');
  select.empty();
  select.append(`<option disabled value="">Escolha entre as seções abaixo</option>`);
  sections.forEach(section => {
    select.append(`<option value="${section}">${section}</option>`);
  });
}

// Atualiza o select sempre que o modal de link for aberto
$('#addLink').on('show.bs.modal', function () {
  updateSectionSelect();
});

// faz a seçao selecionada criar borda e no futuro mudar conteudo
  $(document).on('click', '.tab-btn', function() {
    $('.tab-btn').removeClass('active'); // remove a classe active de todos botoes
    $(this).addClass('active'); // adiciona clasee active no botao clicado
})

// inicializa a interface com as seções salvas no localStorage
renderSectionButtons();
updateSectionSelect();


