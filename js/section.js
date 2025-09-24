export let sections = [];


// função de gerar na tela o botao de seção
export function renderSectionButtons() {
  const container = $('#dynamicSections');
  container.empty();

  sections.forEach(section => {
    const btnHTML = `
      <div class="col-12 col-md-4 col-lg-2">
        <button class="btn tab-btn w-100 d-flex justify-content-center">${section}</button>
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
    $("#inputAddSection").val('');
    updateSectionSelect();
    renderSectionButtons()
  }
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


