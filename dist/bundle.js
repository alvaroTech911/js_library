/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _library = __webpack_require__(1);

var _library2 = _interopRequireDefault(_library);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Library = _library2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Library = function Library(books) {
  _classCallCheck(this, Library);

  this.books = [];
};

var myLibrary = new Library();

var Book = function Book(title, author) {
  var numberOfPages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.floor(Math.random() * 600) + 150;
  var publishDate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Date();

  _classCallCheck(this, Book);

  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.publishDate = publishDate;
};

var authors = ['Ernest Hemingway', 'Jules Verne', 'Stephen King', 'John Connolly', 'Stephen King'];
var titles = ['The old man and the sea', 'Dick Sand a captain at fifteen', 'The Shinning', 'The white road', 'It'];
var date1 = new Date(1425, 1, 1);
var date2 = new Date(2018, 1, 1);
function rDate(start, end) {
  return new Date(+start + Math.random() * (end - start));
}

for (var i = 0; i < authors.length; i++) {
  var randomNumOfPages = Math.floor(Math.random() * 600) + 150;
  var randomDate = rDate(date1, date2);
  var aBook = new Book(titles[i], authors[i], randomNumOfPages, rDate(date1, date2));
  myLibrary.books.push(aBook);
}

Library.prototype.getAllBooks = function () {
  console.log(myLibrary.books);
};

Library.prototype.addBook = function (title, author, numberOfPages, publishDate) {
  var newBook = new Book(title, author, numberOfPages, publishDate);
  var bookExists = myLibrary.books.find(function (book) {
    return newBook.title === book.title;
  });
  if (bookExists) {
    console.log('Sorry, that book already exists');
  } else {
    myLibrary.books.push(newBook);
    console.log(myLibary.books);
  }
};

Library.prototype.removeBookByTitle = function (title) {
  title = title.trim();
  var titleIndex = myLibrary.books.findIndex(function (book) {
    return book.title === title;
  });
  if (titleIndex > -1) {
    myLibrary.books.splice(titleIndex, 1);
    console.log(myLibrary.books);
  } else {
    console.log('Book doesn\'t exist');
  }
};

Library.prototype.removeBookByAuthor = function (author) {
  title = title.trim();
  var authIndex = myLibrary.books.findIndex(function (book) {
    return book.author === author;
  });
  if (authIndex > -1) {
    myLibrary.books.splice(authIndex, 1);
    console.log(myLibrary.books);
  } else {
    console.log('Author doesn\'t exist');
  }
};

Library.prototype.getRandomBook = function () {
  var randomIndex = Math.floor(Math.random() * myLibrary.books.length);
  console.log(myLibrary.books[randomIndex]);
};

Library.prototype.getBookByTitle = function (title) {
  title = title.trim();
  var titleIndex = myLibrary.books.findIndex(function (book) {
    return book.title === title;
  });
  if (titleIndex > -1) {
    console.log(myLibrary.books[titleIndex]);
  } else {
    console.log('Book doesn\'t exist');
  }
};

Library.prototype.getBooksByAuthor = function (author) {
  author = author.trim();
  var matchedBooks = myLibrary.books.filter(function (book) {
    return book.author === author;
  });
  if (matchedBooks.length === 0) {
    console.log('Author doesn\'t exist');
  } else {
    console.log(matchedBooks);
  }
};

Library.prototype.getAuthors = function () {
  var allBooks = {};
  myLibrary.books.forEach(function (book) {
    Object.keys(book).forEach(function (key) {
      allAuthors[key] = allAuthors[key] || {};
      allAuthors[key][book[key]] = allAuthors[key][book[key]] + 1;
    });
  });
  console.log(Object.keys(allBooks.author));
};

Library.prototype.getRandomAuthorName = function () {
  var randomIndex = Math.floor(Math.random() * myLibrary.books.length);
  console.log(myLibrary.books[randomIndex].author);
};

exports.default = myLibrary;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map