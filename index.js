import printTime from './modules/currentDate.js';
import Books from './modules/classBooks.js';
import navigation from './modules/navigation.js';

const list = document.querySelector('ul');
const form = document.querySelector('form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const modalContainer = document.querySelector('.modal-container');

const books = new Books();

const checkIfEmpty = () => {
  if (books.bookList.length !== 0) {
    list.style.display = 'block';
  } else {
    list.style.display = 'none';
  }
};

const addToLocalStorage = (books) => {
  localStorage.setItem('books', JSON.stringify(books));
};

const appendBooksToList = () => {
  list.innerHTML = '';
  books.bookList.forEach((book, index) => {
    const li = document.createElement('li');

    if (index % 2 === 1) {
      li.classList = 'bg-white';
    }

    li.innerHTML = `
    <p>"<span>${book.title}</span>" </p>
    <p>by ${book.author}</p>
    <button class="remove">Remove</button>
    `;
    list.appendChild(li);
  });
};

const updateDomAndLocalStorage = () => {
  appendBooksToList();
  localStorage.clear();
  addToLocalStorage(books);
  checkIfEmpty();
};

const removeBook = () => {
  const removeButtons = document.getElementsByClassName('remove');
  for (let i = 0; i < removeButtons.length; i += 1) {
    const button = removeButtons[i];
    button.addEventListener('click', (event) => {
      const element = event.target.parentElement.firstElementChild.firstElementChild.innerText;
      books.removeBooksFromList(element);
      updateDomAndLocalStorage();
      removeBook();
    });
  }
};

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const getFromLocalStorage = () => {
  if (localStorage.length !== 0) {
    const booksFromLocStg = JSON.parse(localStorage.getItem('books'));
    booksFromLocStg.bookList.forEach((book) => {
      books.bookList.push(book);
    });
    updateDomAndLocalStorage();
    removeBook();
  }
};

getFromLocalStorage();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newBook = new Book(title.value, author.value);
  title.value = '';
  author.value = '';
  books.addNewBook(newBook);
  updateDomAndLocalStorage();
  modalContainer.style.display = 'flex';
  setTimeout(() => {
    modalContainer.style.display = 'none';
  }, 2000);
  removeBook();
});

navigation();

setInterval(printTime, 1000);