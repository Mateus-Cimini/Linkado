let tags = [];

export function initTags() {
  // input tags card
  const input = document.getElementById("tagsInput");
  const addBtn = document.getElementById("addTagBtn");
  const container = document.getElementById("tagsContainer");
  const error = document.getElementById("tagsError");

  function addTag() {
    const value = input.value.trim();
    if (!value || value.length > 12 || tags.length >= 3) {
      error.style.display = "block";
      return;
    }

    tags.push(value);
    renderTags();
    input.value = "";
    error.style.display = "none";
  }

  function renderTags() {
    container.innerHTML = "";
    tags.forEach((tag, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "badge bg-primary me-1";
      btn.textContent = tag;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
 
        const editMode = document.getElementById('addLink').dataset.editMode === 'true';
        if (!editMode) {
          tags.splice(index, 1);
          renderTags();
        }
      });
      container.appendChild(btn);
    });
  }

  // eventos de tag
  addBtn.addEventListener("click", addTag);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  });
}

export function getTags() {
  return[...tags];
}

export function clearTags() {
  tags = [];
  document.getElementById('tagsContainer').innerHTML = "";
}
