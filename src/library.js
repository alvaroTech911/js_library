import Book from './book';

import arrBooks from './arrBooks';

let Library;
let counter;

(function(){
  let instance;
  Library = function(){
    if(instance){
      console.log('Library already exists');
      return instance
    }
    instance = this;
    this.books = [];
  }
})();

let myLibrary = new Library();

Library.prototype.getAllBooks = function() {
  return this.books;
};

Library.prototype.addBook = function(title, author, pages, date) {
  const newBook = new Book(title, author, pages, date);
  const bookExists = this.books.find(book => newBook.title === book.title);
  if(bookExists){
    console.log('Sorry, that book already exists');
    return false;
  }else if(newBook.title === undefined || newBook.author === undefined){
    console.log('You need to provide an author and a book title')
    return false;
  } else{
    this.books.push(newBook);
    return true;
  }
};

Library.prototype.addBooks = function(arr) {
  let counter = 0;
  for(let i = 0; i < arr.length; i++){
    let book = Object.values(arr[i]);
    this.addBook(...book);
  }
};

myLibrary.addBooks(arrBooks);

Library.prototype.removeBookByTitle = function(title) {
  title = title.trim();
  const titleIndex = this.books.findIndex(book => book.title === title);
  if(titleIndex > -1){
    this.books.splice(titleIndex, 1);
    console.log(this.books);
  } else {
    console.log('Book doesn\'t exist');
  }
};

Library.prototype.removeBookByAuthor = function(author) {
  author = author.trim();
  const filteredArr = this.books.filter(book => book.author.toLowerCase() !== author.toLowerCase());
  const deletedBooksArr = this.books.filter(book => book.author.toLowerCase() === author.toLowerCase());
  this.books = filteredArr;
  console.log(myLibrary.books);
  return deletedBooksArr;
};

Library.prototype.getRandomBook = function() {
  const randomIndex = Math.floor(Math.random() * this.books.length);
  return this.books[randomIndex];
};

Library.prototype.getBookByTitle = function(title) {
  title = title.trim();
  const titleIndex = this.books.findIndex(book => book.title.toLowerCase() === title.toLowerCase());
  if(titleIndex > -1){
    console.log(this.books[titleIndex]);
  } else{
    console.log('Book doesn\'t exist');
  }
};

Library.prototype.getBooksByAuthor = function(author) {
  author = author.trim();
  const matchedBooks = this.books.filter(book => book.author === author);
  if(matchedBooks.length === 0){
    console.log('Author doesn\'t exist');
  } else{
    console.log(matchedBooks);
  }
};

Library.prototype.getAuthors = function() {
  let allAuthors = {};
  this.books.forEach(book => {
    Object.keys(book).forEach(key => {
      allAuthors[key] = allAuthors[key] || {};
      allAuthors[key][book[key]] = (allAuthors[key][book[key]]) + 1;
    })
  })
  return Object.keys(allAuthors.author);
};

Library.prototype.getRandomAuthorName = function() {
  const randomIndex = Math.floor(Math.random() * this.books.length);
  console.log(this.books[randomIndex].author);
};

Library.prototype.search = function(title, author, numOfPages, pubDate) {
  var searchArr = []
  this.books.forEach((book, i) => {
    if(
      book.title.toLowerCase().indexOf(title) !== -1 &&
      book.author.toLowerCase().indexOf(author) !== -1 &&
      book.numberOfPages > numOfPages
    ){
      searchArr.push(this.books[i]);
    }
  })
  return searchArr;
}

export default Library;
