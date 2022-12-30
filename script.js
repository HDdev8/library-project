const myLibrary = [];

const addBook = document.querySelector("#add-book");
const overlayDiv = document.querySelector("#overlay-div");
const form = document.querySelector("#my-form");
const list = document.querySelector("#form-list");
const titleField = document.querySelector(`input[id="title-field"]`);
const authorField = document.querySelector(`input[id="author-field"]`);
const pagesField = document.querySelector(`input[id="pages-field"]`);
const readField = document.querySelector(`input[name="read-field"]`);
const radioButtons = document.querySelectorAll(`input[type="radio"]`);
const yesField = document.querySelector(`input[id="yes"]`);
const noField = document.querySelector(`input[id="no"]`);
const submit = document.querySelector("#add-to-library");

const titleFieldError = document.querySelector(
  `input[id='title-field'] + span.error`
);
const authorFieldError = document.querySelector(
  `input[id='author-field'] + span.error`
);
const readFieldError = document.querySelector(
  `li[class="radio-item"] ~ span[class="error"]`
);

/* I don't use this */
let libraryCounter = 0;

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.id = `${libraryCounter++}`;
}

const addBookToLibrary = function () {
  myLibrary.push(newBook);
};

const addCardToPage = function () {
  let fragment = document.createDocumentFragment();
  let container = document.querySelector("#list-container");
  let card = document.createElement("li");
  card.classList.add("card");
  let header = document.createElement("header");
  let title = document.createElement("p");
  title.classList.add("book-title");
  title.textContent = this.title;
  let author = document.createElement("p");
  author.classList.add("author");
  author.textContent = `by ${this.author}`;
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  let pages = document.createElement("p");
  pages.classList.add("pages");
  pages.textContent = `${this.pages} pages`;
  let readStatus = document.createElement("p");
  readStatus.classList.add("read-status");
  /* readStatus.textContent based on the book's values */
  let statusPara = function () {
    return this.haveRead === "yes" ? "Have Read" : "Have Not Read";
  };
  readStatus.textContent = statusPara();
  let buttonCover = document.createElement("div");
  buttonCover.classList.add("button-cover");
  let toggleButton = document.createElement("div");
  toggleButton.classList.add("button");
  toggleButton.classList.add("r");
  toggleButton.classList.add("button-1");
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("checkbox");
  let knobs = document.createElement("div");
  knobs.classList.add("knobs");
  let layer = document.createElement("div");
  layer.classList.add("layer");
  let removeButton = document.createElement("button");
  removeButton.classList.add("remove");
  removeButton.setAttribute("type", "button");
  removeButton.textContent = "Remove";
  /* Toggles read status according to answer provided on form entry */
  function initialToggle() {
    if (readStatus.textContent === "Have Read") {
      checkbox.checked = true;
    } else if (readStatus.textContent === "Have Not Read") {
      checkbox.checked = false;
    }
  }
  initialToggle();
  toggleButton.appendChild(layer);
  toggleButton.insertBefore(knobs, layer);
  toggleButton.insertBefore(checkbox, knobs);
  buttonCover.appendChild(toggleButton);
  cardBody.appendChild(buttonCover);
  cardBody.insertBefore(readStatus, buttonCover);
  cardBody.insertBefore(removeButton, cardBody.lastChild.nextSibling);
  card.appendChild(cardBody);
  card.insertBefore(header, cardBody);
  header.appendChild(author);
  header.insertBefore(title, author);
  header.insertBefore(pages, header.lastChild.nextSibling);
  fragment.appendChild(card);
  container.appendChild(fragment);
};

/* Change read status on book and on card by toggling */
const updateToggle = function () {
  let checkboxes = document.querySelectorAll(".checkbox");
  let readStatuses = document.querySelectorAll(".read-status");
  for (let i = 0; i < readStatuses.length; i++) {
    if (
      readStatuses[i].textContent === "Have Not Read" &&
      checkboxes[i].checked
    ) {
      readStatuses[i].textContent = "Have Read";
      myLibrary[i].haveRead = "yes";
    } else if (
      readStatuses[i].textContent === "Have Read" &&
      !checkboxes[i].checked
    ) {
      readStatuses[i].textContent = "Have Not Read";
      myLibrary[i].haveRead = "no";
    }
  }
};

/* Click "add book" and bring up the form and an overlay */
addBook.addEventListener("click", () => {
  overlayDiv.classList.add("hidden-overlay");
  form.style.visibility = "visible";
  list.style.visibility = "visible";
});

/* Remove overlay when clicking on it */
overlayDiv.addEventListener("click", () => {
  overlayDiv.classList.remove("hidden-overlay");
  list.style.transition = "none";
  form.style.transition = "none";
  form.style.visibility = "hidden";
  list.style.visibility = "hidden";
});

/* Displays message if title field is missing */
const checkTitleValidity = function () {
  if (titleField.validity.valid) {
    titleFieldError.textContent = "";
    titleFieldError.className = "error";
  } else if (!titleField.validity.valid) {
    titleFieldError.textContent = "Please enter a title";
  }
};

/* Displays message if author field is missing */
const checkAuthorValidity = function () {
  if (authorField.validity.valid) {
    authorFieldError.textContent = "";
    authorFieldError.className = "error";
  } else if (!authorField.validity.valid) {
    authorFieldError.textContent = "Please enter an author";
  }
};

/* Displays message if radio button isn't selected */
const checkRadioValidity = function () {
  if (readField.validity.valid) {
    readFieldError.textContent = "";
    readFieldError.className = "error";
  } else if (!readField.validity.valid) {
    readFieldError.textContent = "Please enter an author";
  }
};

/* Remove card from page and book from myLibrary array */
const removeCardFromPage = function (event) {
  let grandparent = event.target.parentElement.parentElement;
  let header = event.target.parentElement.previousSibling;
  let libraryTitle = header.firstChild.textContent;
  myLibrary.filter((book) => {
    if (book.title === libraryTitle) {
      myLibrary.splice(myLibrary.indexOf(book), 1);
    }
    return myLibrary;
  });
  grandparent.remove();
};

/* 1a) Submit form if required fields are entered, 1b) Show form validation message otherwise , 2) add book to library, 3) add card to webpage, 4) set toggle functionality on each card, 5) remove the overlay, 6) remove and reset the form */
submit.addEventListener("click", (e) => {
  e.preventDefault();
  /* Creates new book */
  function createNewBook() {
    let radioFieldFunction = () => {
      if (yesField.checked) {
        return "yes";
      } else if (noField.checked) {
        return "no";
      }
    };
    let radioFieldValue = radioFieldFunction();
    newBook = new Book(
      (title = titleField.value),
      (author = authorField.value),
      (pages = pagesField.value),
      (haveRead = radioFieldValue)
    );
    return newBook;
  }

  titleField.addEventListener("input", () => {
    checkTitleValidity();
  });

  authorField.addEventListener("input", () => {
    checkAuthorValidity();
  });

  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("input", () => {
      checkRadioValidity();
    });
  });

  if (form.checkValidity() === false) {
    if (titleField.value === "") {
      titleFieldError.textContent = "Please enter a title";
      titleFieldError.className = "error active";
    }
    if (authorField.value === "") {
      authorFieldError.textContent = "Please enter an author";
      authorFieldError.className = "error active";
    }
    if (!radioButtons.checked) {
      readFieldError.textContent = "Please select yes or no";
      readFieldError.className = "error active";
    }
    return;
  } else createNewBook();

  addBookToLibrary(newBook);

  addCardToPage(newBook);

  let checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateToggle();
    });
  });

  // Removes card and array item from myLibrary array
  const removeButtons = document.querySelectorAll(".remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      removeCardFromPage(event);
    });
  });

  function resetForm() {
    list.style.transition = "none";
    form.style.transition = "none";
    form.style.visibility = "hidden";
    list.style.visibility = "hidden";
    overlayDiv.classList.remove("hidden-overlay");
    form.reset();
  }
  resetForm();
});
