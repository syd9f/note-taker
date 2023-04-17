// select page elements
const savedNotes = document.getElementById('saved-notes');
const saveButton = document.getElementById('save-btn');
const newNoteTitle = document.getElementById('note-name');
const newNoteText = document.getElementById('note-text');

// Helper function that accepts a `note` object, sends a POST request and returns the result
const saveNote = (note) =>
  // Fetch accepts a URL and an options object where you can declare the HTTP method, the request body, and any headers.
  fetch('/api/db', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Successful POST request:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error in POST request:', error);
    });

// Listen for when the note is saved
saveButton.addEventListener('click', (e) => {
  e.preventDefault();

  // Create a new note object from the input values
  const newNote = {
    title: newNoteTitle.value.trim(),
    body: newNoteText.value.trim(),
  };

  // Call our postReview method to make a POST request with our `newReview` object.
  saveNote(newNote)
    .then((data) => alert(`Note saved! Note Title: ${data.body.title}`))
    .catch((err) => console.error(err));
});


// post a new note
  
  // update a note

// get saved notes from db
// const getNotes = async () => {
//   const result = await fetch('/api/db', {
//     method: 'GET',
//   });
//   const json = await result.json();
//   return json;
// };

// render notes to page
// const renderNotes = (note) => {
    // const cardEl = document.createElement('div');
    // const cardBodyEl = document.createElement('div');
    // const cardBodyTitle = document.createElement('div');
  
    // cardEl.classList.add('card', 'p-5');
    // cardBodyEl.classList.add('card-body', 'p-5');
    // cardBodyTitle.classList.add('card-header', 'card-title', 'link');
  
    // cardBodyTitle.innerHTML = `<a href=${note.url}>${note.note}</a>`;
    // cardBodyEl.innerText = note.definition;
    // savedNotes.appendChild(cardBodyTitle);
    // savedNotes.appendChild(cardBodyEl);
// };
  
// starts functions when button is clicked
// const buttonHandler = () =>
//     getNotes().then((response) => response.forEach((note) => renderNotes(note)));

// // event listener on save button
// saveButton.addEventListener('click', buttonHandler);

