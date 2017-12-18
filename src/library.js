import Book from './book';

import arrBooks from './arrBooks';

let Library;
let counter;

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

Library.prototype.getAllBooks = () => {
  return myLibrary.books;
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
    return true;
  }
};

Library.prototype.addBooks = (arr) => {
  let counter = 0;
  for(let i = 0; i < arr.length; i++){
    let book = Object.values(arr[i]);
    myLibrary.addBook(...book);
  }
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
  const deletedBooksArr = myLibrary.books.filter(book => book.author.toLowerCase() === author.toLowerCase());
  myLibrary.books = filteredArr;
  console.log(myLibrary.books);
  return deletedBooksArr;
};

Library.prototype.getRandomBook = () => {
  const randomIndex = Math.floor(Math.random() * myLibrary.books.length);
  return myLibrary.books[randomIndex];
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
  myLibrary.books.forEach(book => {
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

Library.prototype.search = (title, author, numOfPages, pubDate) => {
  var searchArr = []
  myLibrary.books.forEach((book, i) => {
    if(
      book.title.toLowerCase().indexOf(title) !== -1 &&
      book.author.toLowerCase().indexOf(author) !== -1 &&
      book.numberOfPages > numOfPages
    ){
      searchArr.push(myLibrary.books[i]);
    }
  })
  return searchArr;
}

export default myLibrary;
