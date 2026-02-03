let myLibrary = [];

// book object
function Book(name, author, pages, isReaded) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isReaded = isReaded;
}

// add book function
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

    for(let i = 0; i <= library.length - 1; i++) {
        const row = `
            <tr>
                <td>${library[i].id}</td>
                <td>${library[i].name}</td>
                <td>${library[i].author}</td>
                <td>${library[i].pages}</td>
                <td>${library[i].isReaded}</td>
                <td><button data-id=${library[i].id} class="button remove-button">Remove</button></td>
                <td><button data-id=${library[i].id} class="button readed-button">change status</button></td>
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
    addBookToLibrary(formData.get("name"), formData.get("author"), Number(formData.get("pages")), JSON.parse(formData.get("read")));
    console.table(myLibrary);
    displayBooks(myLibrary);
    dialog.close();
})


// remove book from library
table.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-button")) {
        const index = myLibrary.findIndex((element) => element.id == e.target.dataset.id);
        myLibrary.splice(index, 1);
        displayBooks(myLibrary);
        console.table(myLibrary);
    }
})

// change book status
table.addEventListener("click", (e) => {
    if (e.target.classList.contains("readed-button")) {
        const index = myLibrary.findIndex((element) => element.id == e.target.dataset.id);
        if (myLibrary[index].isReaded === true) {
            myLibrary[index].isReaded = false;
        } else {
            myLibrary[index].isReaded = true;
        }
        displayBooks(myLibrary);
        console.table(myLibrary);
    }
})