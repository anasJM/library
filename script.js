// library's class
class Library {
    #books = [];

    get books() {
        return this.#books;
    }

    addBookToLibrary(book) {
        this.#books.push(book);
    }
}



// book's class
class Book {
    #id;
    #name;
    #author;
    #pages;
    #isReaded;

    // Book constructor
    constructor(name, author, pages, isReaded) {
        this.#id = crypto.randomUUID();
        this.#name = name;
        this.#author = author;
        this.#pages = pages;
        this.#isReaded = isReaded;
    }
    //getters
    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get author() {
        return this.#author;
    }

    get pages() {
        return this.#pages;
    }

    get isReaded() {
        return this.#isReaded;
    }

    // setters
    set name(name) {
        this.#name = name;
    }

    set author(author) {
        this.#author = author;
    }

    set pages(pages) {
        this.#pages = pages;
    }

    set isReaded(isReaded) {
        this.#isReaded = isReaded;
    }

}

// library intance
const myLibrary = new Library();

// books instances
const book1 = new Book("Prince William", "By Garner, Valerie", 145, true);
const book2 = new Book("Goat Brothers", "Colton, Larry", 223, false);
const book3 = new Book("Shadow Song", "Kay, Terry", 63, false);

// adding books to 
myLibrary.addBookToLibrary(book1);
myLibrary.addBookToLibrary(book2);
myLibrary.addBookToLibrary(book3);

// table selector
let table = document.querySelector("table");

// display all books
function displayBooks(myLibrary) {
    table.innerHTML = `
    <tr>
        <th>#id</th>
        <th>Name</th>
        <th>author</th>
        <th>pages</th>
        <th>readed?</th>
        <th></th>
        <th></th>
    </tr>
    `;

    for(let i = 0; i <= myLibrary.books.length - 1; i++) {
        const row = `
            <tr>
                <td>${myLibrary.books[i].id}</td>
                <td>${myLibrary.books[i].name}</td>
                <td>${myLibrary.books[i].author}</td>
                <td>${myLibrary.books[i].pages}</td>
                <td>${myLibrary.books[i].isReaded}</td>
                <td><button data-id=${myLibrary.books[i].id} class="button remove-button">Remove</button></td>
                <td><button data-id=${myLibrary.books[i].id} class="button readed-button">change status</button></td>
            </tr>
        `;

        table.innerHTML += row;
    }
}

displayBooks(myLibrary);



// dialog selector
const dialog = document.querySelector("dialog");

// add book button
const addButton = document.getElementById("addButton");

const closeButton = document.getElementById("closeButton");

// show the dialog
addButton.addEventListener("click", () => {
    dialog.showModal();
});

// close the dialog
closeButton.addEventListener("click", () => {
    dialog.close();
});


// get the form data and add the book to library
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const book = new Book(formData.get("name"), formData.get("author"), Number(formData.get("pages")), JSON.parse(formData.get("read")));
    myLibrary.addBookToLibrary(book);
    console.table(myLibrary);
    displayBooks(myLibrary);
    dialog.close();
})


// remove book from library
table.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-button")) {
        const index = myLibrary.books.findIndex((element) => element.id == e.target.dataset.id);
        myLibrary.books.splice(index, 1);
        displayBooks(myLibrary);
        console.table(myLibrary);
    }
})

// change book status
table.addEventListener("click", (e) => {
    if (e.target.classList.contains("readed-button")) {
        const index = myLibrary.books.findIndex((element) => element.id == e.target.dataset.id);
        if (myLibrary.books[index].isReaded === true) {
            myLibrary.books[index].isReaded = false;
        } else {
            myLibrary.books[index].isReaded = true;
        }
        displayBooks(myLibrary);
        console.table(myLibrary);
    }
})