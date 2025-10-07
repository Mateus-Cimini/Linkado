import { renderCards } from "./cards.js";
import { attCounter } from "./cards.js";

export let sections = JSON.parse(localStorage.getItem("sections")) || [];

function saveSections() {
  localStorage.setItem("sections", JSON.stringify(sections));
}

// Função de gerar na tela o botão de seção
export function renderSectionButtons() {
  const container = $('#dynamicSections');
  container.empty();

  // botões dinâmicos das seções
  sections.forEach(section => {
    const btnHTML = $(`
      <div class="col-12 col-md-4 col-lg-3">
        <div class="btn-group w-100" role="group">
          <button class="btn tab-btn btn-outline-primary flex-grow d-flex justify-content-center" data-section="${section}">${section}</button>
          <button class="deleteSection btn btn-outline-danger" data-section="${section}">
            <i class="bi bi-trash"></i>
          </button>
        </div> 
      </div>
    `).hide();
    container.append(btnHTML)
    btnHTML.fadeIn(700);
  });
}

// Adiciona uma nova seção ao array
$('#btnAddSection').on('click', function() {
  let newSection = $('#inputAddSection').val().trim();
  if (newSection && !sections.includes(newSection)) {
    sections.push(newSection);
    saveSections();
    $("#inputAddSection").val('');
    updateSectionSelect();
    renderSectionButtons();
    attCounter();
  }
});

// Função do botão de apagar seção
$(document).on('click', '.deleteSection', function() {
  const sectionName = $(this).data('section');
  const sectionEl = $(this).closest('.col-12');
  sectionEl.fadeOut(400, function() {
    sections = sections.filter(sec => sec !== sectionName);
    saveSections();
    renderSectionButtons();
    updateSectionSelect();
    attCounter();
  });
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

// Faz a seção selecionada criar borda e filtrar cards
$(document).on('click', '.tab-btn', function() {
  $('.tab-btn').removeClass('active');
  $(this).addClass('active');

  const selectedSection = $(this).data('section');
  renderCards(selectedSection);
});

// Inicializa interface
renderSectionButtons();
updateSectionSelect();

