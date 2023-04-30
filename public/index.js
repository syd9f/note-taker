// select page elements
const savedNotes = document.getElementById('saved-notes');
const saveButton = document.getElementById('save-btn');
const newNoteTitle = document.getElementById('note-name');
const newNoteText = document.getElementById('note-text');

// disable save button on page load
saveButton.style.display = "none";

// show save button if input is added to title and body of note
if (newNoteTitle.value + newNoteText.value != "") {
  saveButton.style.display = "visible";
};

// create element for displaying saved note titles
const createNote = (note) => {
  // create card for note link
  cardEl = document.createElement('div');
  cardEl.classList.add('card');

  // TO DO: create delete button for card
  
  // create note title header
  const noteTitle = document.createElement('h4');
  noteTitle.innerHTML = `${note.title} </br>`;

  // append header and body to card
  cardEl.appendChild(noteTitle);

  // append card to notes container in DOM
  savedNotes.appendChild(cardEl);
};

// Get existing notes from the server
const getNotes = () =>
  fetch('api/db', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => {
    console.error('Error getting notes:', error);
});

// Helper function for saving a new note to the page
const saveNote = (note) =>
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
      createNote(note);
    })
    .catch((error) => {
      console.error('Error in POST request:', error);
    });

// When the page loads, get all the saved notes
getNotes().then((data) => data.forEach((note) => createNote(note)));

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