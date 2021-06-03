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

// show alert
UI.prototype.showAlert = function (message, className) {
  const div           = document.createElement('div');        // create the div
  const containerElem = document.querySelector('.container'); // Get parent
  const form          = document.querySelector('#book-form'); // Get form
  div.className       = `alert ${className}`;                 // add class name
  div.appendChild(document.createTextNode(message));          // append text node
  containerElem.insertBefore(div, form);                      // insert before form
  // Timer for the alert
  setTimeout(function () {
    div.remove();
  }, 3000);
}

// delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();    // tr
  }
};

/*
** Event listeners
*/
// Event listener for adding books
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

  // Instantiate UI
  const ui = new UI();

  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Validate
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    ui.addBookToList(book);                               // Add book to the UI
    ui.showAlert('Book succesfully added!', `success`);   // Show alert
    ui.clearFields();                                     // Clear input fields
  }
  event.preventDefault();
});

// Event listener for removing books
const bookList = document.getElementById('book-list');    // tbody
bookList.addEventListener('click', function (event) {
  const ui = new UI();                        // Instantiate UI
  ui.deleteBook(event.target);                // delete the book
  ui.showAlert('Book removed!', 'success');   // show notification
  event.preventDefault();
});