let myLibrary = [];

function Book(name, author, pages, isReaded) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isReaded = isReaded;
}

function addBookToLibrary(name, author, pages, isReaded) {
    const book = new Book(name, author, pages, isReaded);
    book.id = crypto.randomUUID();
    myLibrary.push(book);
}


addBookToLibrary("Prince William", "By Garner, Valerie", 145, true);
addBookToLibrary("The Missing Person", "Grumbach, Doris", 50, false);
addBookToLibrary("Goat Brothers", "Colton, Larry", 223, false);
addBookToLibrary("Shadow Song", "Kay, Terry", 63, false);
console.table(myLibrary);

// table selector
let table = document.querySelector("table");

// display all books
function displayBooks(library) {
    for(let i = 0; i <= library.length - 1; i++) {
        let book = document.createElement('tr');

        let bookId = document.createElement('td');
        bookId.textContent = library[i].id;
        book.appendChild(bookId);

        let bookName = document.createElement('td');
        bookName.textContent = library[i].name;
        book.appendChild(bookName);

        let bookAuthor = document.createElement('td');
        bookAuthor.textContent = library[i].author;
        book.appendChild(bookAuthor);
        
        let bookPages = document.createElement('td');
        bookPages.textContent = library[i].pages;
        book.appendChild(bookPages);

        let bookIsReaded = document.createElement('td');
        bookIsReaded.textContent = library[i].isReaded;
        book.appendChild(bookIsReaded);

        table.appendChild(book);
    }
}

displayBooks(myLibrary);