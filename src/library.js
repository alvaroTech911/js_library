class Library{
  constructor(books){
    this.books = []
  }
}

const myLibrary = new Library();

class Book {
  constructor(
    title,
    author,
    numberOfPages = Math.floor(Math.random() * 600) + 150,
    publishDate = new Date()
  ){
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.publishDate = publishDate;
  }
}

const authors = ['Ernest Hemingway', 'Jules Verne', 'Stephen King', 'John Connolly', 'Stephen King'];
const titles = ['The old man and the sea', 'Dick Sand a captain at fifteen', 'The Shinning', 'The white road', 'It']
const date1 = new Date(1425, 1, 1);
const date2 = new Date(2018, 1, 1);
function rDate(start, end){
  return new Date(+ start + Math.random() * (end - start))
}

for(let i = 0; i < authors.length; i++){
  const randomNumOfPages = Math.floor(Math.random() * 600) + 150;
  const randomDate = rDate(date1, date2);
  let aBook = new Book(titles[i], authors[i], randomNumOfPages, rDate(date1, date2));
  myLibrary.books.push(aBook);
}

Library.prototype.getAllBooks = () => {
  console.log(myLibrary.books);
}

Library.prototype.addBook = (title, author, numberOfPages, publishDate) => {
  const newBook = new Book(title, author, numberOfPages, publishDate);
  const bookExists = myLibrary.books.find(book => newBook.title === book.title);
  if(bookExists){
    console.log('Sorry, that book already exists');
  } else{
    myLibrary.books.push(newBook);
    console.log(myLibary.books);
  }
}

Library.prototype.removeBookByTitle = title => {
  title = title.trim();
  const titleIndex = myLibrary.books.findIndex(book => book.title === title);
  if(titleIndex > -1){
    myLibrary.books.splice(titleIndex, 1);
    console.log(myLibrary.books);
  } else {
    console.log('Book doesn\'t exist');
  }
}

Library.prototype.removeBookByAuthor = author => {
  title = title.trim();
  const authIndex = myLibrary.books.findIndex(book => book.author === author);
  if(authIndex > -1){
    myLibrary.books.splice(authIndex, 1);
    console.log(myLibrary.books);
  } else {
    console.log('Author doesn\'t exist');
  }
}

Library.prototype.getRandomBook = () => {
  const randomIndex = Math.floor(Math.random() * myLibrary.books.length);
  console.log(myLibrary.books[randomIndex]);
}

Library.prototype.getBookByTitle = title => {
  title = title.trim();
  const titleIndex = myLibrary.books.findIndex(book => book.title === title);
  if(titleIndex > -1){
    console.log(myLibrary.books[titleIndex])
  } else{
    console.log('Book doesn\'t exist');
  }
}

Library.prototype.getBooksByAuthor = author => {
  author = author.trim();
  const matchedBooks = myLibrary.books.filter(book => book.author === author);
  if(matchedBooks.length === 0){
    console.log('Author doesn\'t exist');
  } else{
    console.log(matchedBooks);
  }
}

Library.prototype.getAuthors = () => {
  let allBooks = {};
  myLibrary.books.forEach(book => {
    Object.keys(book).forEach(key => {
      allAuthors[key] = allAuthors[key] || {};
      allAuthors[key][book[key]] = (allAuthors[key][book[key]]) + 1;
    })
  })
  console.log(Object.keys(allBooks.author));
}

Library.prototype.getRandomAuthorName = () => {
  const randomIndex = Math.floor(Math.random() * myLibrary.books.length)
  console.log(myLibrary.books[randomIndex].author);
}

export default myLibrary
