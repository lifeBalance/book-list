// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI constructor
function UI() {}

// add book to the UI
UI.prototype.addBookToList = function(book) {
  const listElem = document.getElementById('book-list');  // tbody
  const rowElem = document.createElement('tr');           // trow
  rowElem.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
  listElem.appendChild(rowElem);
  console.log(rowElem);
};

// clear the input fields
UI.prototype.clearFields = function() {
  const titleElem   = document.getElementById('title');
  const authorElem  = document.getElementById('author');
  const isbnElem    = document.getElementById('isbn');
  titleElem.value   = '';
  authorElem.value  = '';
  isbnElem.value    = '';
}

// Event listeners
const bookForm = document.getElementById('book-form');
bookForm.addEventListener('submit', function (event) {
  // Get form elements
  const titleElem   = document.getElementById('title');
  const authorElem  = document.getElementById('author');
  const isbnElem    = document.getElementById('isbn');

  // Get form values
  const title   = titleElem.value;
  const author  = authorElem.value;
  const isbn    = isbnElem.value;

  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();
  ui.addBookToList(book);    // Add book to the UI
  ui.clearFields();          // Clear input fields

  // add book to list
  event.preventDefault();
});