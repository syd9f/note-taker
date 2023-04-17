// select page elements
const savedNotes = document.getElementById('saved-notes');
const saveButton = document.getElementById('save-btn');

// get saved notes from db
const getNotes = async () => {
  const result = await fetch('/api/db', {
    method: 'GET',
  });
  const json = await result.json();
  return json;
};

// render notes to page
const renderNotes = (note) => {
    const cardEl = document.createElement('div');
    const cardBodyEl = document.createElement('div');
    const cardBodyTitle = document.createElement('div');
  
    cardEl.classList.add('card', 'p-5');
    cardBodyEl.classList.add('card-body', 'p-5');
    cardBodyTitle.classList.add('card-header', 'card-title', 'link');
  
    cardBodyTitle.innerHTML = `<a href=${note.url}>${note.note}</a>`;
    cardBodyEl.innerText = note.definition;
    savedNotes.appendChild(cardBodyTitle);
    savedNotes.appendChild(cardBodyEl);
};
  
// starts functions when button is clicked
const buttonHandler = () =>
    getNotes().then((response) => response.forEach((note) => renderNotes(note)));

// event listener on save button
saveButton.addEventListener('click', buttonHandler);

