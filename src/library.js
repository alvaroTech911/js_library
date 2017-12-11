import Book from './book';

let counter = 0; //variable used to count how many books have been added to my library successfuly

let Library;

(function(){
  let instance;
  Library = function(books){
    if(instance){
      console.log('Library already exists');
      return instance
    }
    instance = this;
    this.books = [];
  }
})();

let myLibrary = new Library();

const date1 = new Date(1425, 1, 1);
const date2 = new Date(2018, 1, 1);
function rDate(start, end){
  return new Date(+ start + Math.random() * (end - start));
};

const arrBooks = [
  new Book('The old man and the sea', 'Ernest Hemingway', 340, rDate(date1, date2)),
  new Book('Dick Sand a captain at fifteen', 'Jules Verne'),
  new Book('Dick Sand a captain at fifteen', 'Jules Verne'),
  new Book('The Shining', 'Stephen King', 440),
  new Book('The white road', 'John Connolly', 340, rDate(date1, date2)),
  new Book('It', 'Stephen King', 340, rDate(date1, date2)),
];

Library.prototype.getAllBooks = () => {
  console.log(myLibrary.books);
};

Library.prototype.addBook = (title, author, pages, date) => {
  const newBook = new Book(title, author, pages, date);
  const bookExists = myLibrary.books.find(book => newBook.title === book.title);
  if(bookExists){
    console.log('Sorry, that book already exists');
    return false;
  }else if(newBook.title === undefined || newBook.author === undefined){
    console.log('You need to provide an author and a book title')
    return false;
  } else{
    myLibrary.books.push(newBook);
    console.log(myLibrary.books);
    return true;
  }
};

Library.prototype.addBooks = (arr) => {
  let counter = 0;
  console.log(`I had these many books before adding the array ${counter}`);
  for(let i = 0; i < arr.length; i++){
    let book = Object.values(arr[i]);
    myLibrary.addBook(...book);
    (myLibrary.addBook(...book) ? counter ++ : counter);
  }
  console.log(`Books successfully added ${counter}`);
};

myLibrary.addBooks(arrBooks);

Library.prototype.removeBookByTitle = title => {
  title = title.trim();
  const titleIndex = myLibrary.books.findIndex(book => book.title === title);
  if(titleIndex > -1){
    myLibrary.books.splice(titleIndex, 1);
    console.log(myLibrary.books);
  } else {
    console.log('Book doesn\'t exist');
  }
};

Library.prototype.removeBookByAuthor = author => {
  author = author.trim();
  const filteredArr = myLibrary.books.filter(book => book.author.toLowerCase() !== author.toLowerCase());
  myLibrary.books = filterredArr;
  console.log(myLibrary.books);
};

Library.prototype.getRandomBook = () => {
  const randomIndex = Math.floor(Math.random() * myLibrary.books.length);
  console.log(myLibrary.books[randomIndex]);
};

Library.prototype.getBookByTitle = title => {
  title = title.trim();
  const titleIndex = myLibrary.books.findIndex(book => book.title.toLowerCase() === title.toLowerCase());
  if(titleIndex > -1){
    console.log(myLibrary.books[titleIndex]);
  } else{
    console.log('Book doesn\'t exist');
  }
};

Library.prototype.getBooksByAuthor = author => {
  author = author.trim();
  const matchedBooks = myLibrary.books.filter(book => book.author === author);
  if(matchedBooks.length === 0){
    console.log('Author doesn\'t exist');
  } else{
    console.log(matchedBooks);
  }
};

Library.prototype.getAuthors = () => {
  let allAuthors = {};
  this.books.forEach(book => {
    Object.keys(book).forEach(key => {
      allAuthors[key] = allAuthors[key] || {};
      allAuthors[key][book[key]] = (allAuthors[key][book[key]]) + 1;
    })
  })
  console.log(Object.keys(allAuthors.author));
};

Library.prototype.getRandomAuthorName = () => {
  const randomIndex = Math.floor(Math.random() * myLibrary.books.length);
  console.log(myLibrary.books[randomIndex].author);
};

export default myLibrary;
