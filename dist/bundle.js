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

var _console;

var _book = __webpack_require__(2);

var _book2 = _interopRequireDefault(_book);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var counter = 0; //variable used to count how many books have been added to my library successfuly

var Library = void 0;

(function () {
  var instance = void 0;
  Library = function Library(books) {
    if (instance) {
      console.log('Library already exists');
      return instance;
    }
    instance = this;
    this.books = [];
  };
})();

var myLibrary = new Library();

var date1 = new Date(1425, 1, 1);
var date2 = new Date(2018, 1, 1);
function rDate(start, end) {
  return new Date(+start + Math.random() * (end - start));
}

var arrBooks = [new _book2.default('The old man and the sea', 'Ernest Hemingway', 340, rDate(date1, date2)), new _book2.default('Dick Sand a captain at fifteen', 'Jules Verne'), new _book2.default('The Shining', 'Stephen King', 440), new _book2.default('The white road', 'John Connolly', 340, rDate(date1, date2)), new _book2.default('It', 'Stephen King', 340, rDate(date1, date2))];

Library.prototype.getAllBooks = function () {
  console.log(myLibrary.books);
};

Library.prototype.addBook = function (newBook) {
  var bookExists = myLibrary.books.find(function (book) {
    return newBook.title === book.title;
  });
  if (bookExists) {
    // debugger;
    console.log('Sorry, that book already exists');
    return false;
  } else if (newBook.title === undefined || newBook.author === undefined) {
    console.log('You need to provide an author and a book title');
    return false;
  } else {
    myLibrary.books.push(newBook);
    console.log(myLibrary.books);
    return true;
  }
};

Library.prototype.addBooks = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    myLibrary.addBook(arr[i]);
  }
  counter = counter + myLibrary.books.length;
  console.log('Books successfully added ' + myLibrary.books.length);
};

console.log(myLibrary.addBooks(arrBooks));

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
  author = author.trim();
  var filteredArr = myLibrary.books.filter(function (book) {
    return book.author.toLowerCase() !== author.toLowerCase();
  });
  console.log(filteredArr);
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


var obj = {
  title: 'a title here',
  author: 'stuff',
  pages: 3,
  publishDate: 'things'
};

(_console = console).log.apply(_console, _toConsumableArray(obj));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Book = function Book(title, author) {
  var numberOfPages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.floor(Math.random() * 600) + 150;
  var publishDate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Date();

  _classCallCheck(this, Book);

  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.publishDate = publishDate;
};

exports.default = Book;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map