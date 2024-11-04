console.log("Magic Notes App Loaded");
document.addEventListener("DOMContentLoaded", showNotes);

// Function to add a note
function addNote() {
  const addTxt = document.getElementById("addTxt");
  let notes = getNotesFromLocalStorage();

  notes.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notes));

  addTxt.value = ""; // Clear textarea after adding note
  showNotes();
}

// Function to retrieve notes from local storage
function getNotesFromLocalStorage() {
  let notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : [];
}

// Function to show notes from local storage
function showNotes() {
  const notes = getNotesFromLocalStorage();
  const notesContainer = document.getElementById("notes");
  notesContainer.innerHTML = notes.length
    ? notes.map((note, index) => createNoteHTML(note, index)).join("")
    : `Nothing to show. Add notes, please!`;
}

// Function to generate HTML for each note
function createNoteHTML(noteText, index) {
  return `
    <div class="noteCard my-2 mx-2" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Note ${index + 1}</h5>
        <p class="card-text">${noteText}</p>
        <button onclick="deleteNote(${index})" class="btn btn-primary">Delete Note</button>
      </div>
    </div>`;
}

// Function to delete a note
function deleteNote(index) {
  let notes = getNotesFromLocalStorage();
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

// Function to search notes based on input
function searchNotes() {
  const searchTxt = document.getElementById("searchTxt").value.toLowerCase();
  const noteCards = document.getElementsByClassName("noteCard");

  Array.from(noteCards).forEach((card) => {
    const cardText = card.querySelector(".card-text").innerText.toLowerCase();
    card.style.display = cardText.includes(searchTxt) ? "block" : "none";
  });
}
