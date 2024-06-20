const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    const shelf = document.getElementById('shelf');
    shelf.innerHTML = '';  // Clear the shelf first
    myLibrary.forEach((book, index) => {
        const bookElem = document.createElement('div');
        bookElem.classList.add('book');
        bookElem.innerHTML = `
            <div style="font-weight: 600;">${book.title}</div>
            <div>${book.author}</div>
            <div>${book.pages} pages</div>
            <div>Read: ${book.read ? 'Yes' : 'No'}</div>
            <button onclick="removeBook(${index})">Remove</button>
            <button onclick="toggleRead(${index})">Toggle Read</button>
        `;
        shelf.appendChild(bookElem);
        setTimeout(() => bookElem.classList.add('show'), 10); // Delay to allow DOM insertion before animation
    });
}


function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleRead(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
}

// Adding event listeners to handle form display and submission
document.getElementById('showForm').addEventListener('click', function() {
    document.getElementById('newBookForm').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
});

document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const newBook = new Book(title, author, parseInt(pages, 10), read);
    addBookToLibrary(newBook);
    displayBooks();
    document.getElementById('newBookForm').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});

function loadInitialBooks() {
    addBookToLibrary(new Book('1984', 'George Orwell', 328, true));
    addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 295, false));
    displayBooks();
}



window.onload = loadInitialBooks;
