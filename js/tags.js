let tags = [];

export function initTags() { 
// input tags card
const input = document.getElementById('tagsInput');
const addBtn = document.getElementById('addTagBtn');
const container = document.getElementById('tagsContainer');
const error = document.getElementById('tagsError');

function addTag() {
const value = input.value.trim();
if (!value || value.length > 12 || tags.length >= 3) {
error.style.display = 'block';
return;
}
tags.push(value);
renderTags();
input.value = '';
error.style.display = 'none';
}


function renderTags() {
container.innerHTML = '';
tags.forEach((tag, index) => {
const span = document.createElement('span');
span.className = 'badge bg-primary me-1';
span.textContent = tag;
span.addEventListener('click', () => {
tags.splice(index, 1);
renderTags();
});
container.appendChild(span);
});
}


// eventos de tag
addBtn.addEventListener('click', addTag);
input.addEventListener('keydown', (e) => { if(e.key === 'Enter') addTag() });

}
