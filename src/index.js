import $ from './jquery-3.2.1.min';

import Library from './library';

Library.prototype.init = function(){
  this.$faBars = $('.fa-bars');
  this.$tabs = $('.tabs');
  this.$tabPanel = $('.tab-panel');
  this.$contentContainer = $('.content-container');
  this.$getAllBooks = $('#get-all-books');
  this.$getRandomBook = $('#get-random-book');
  this.$addBookForm = $('#add-book form');
  this.$addMoreBookForms =$('.addMoreBookForms');
  this.$addBookFormContainer = $('#add-book .form-container');
  this.$searchBtn = $('#search form');
  this.$booksFound = $('.books-found');
  this.$removeFromAuthorForm = $('#remove-by-author form');
  this.$booksDeleted = $('.books-deleted');
  this.$removeFromTitleForm = $('#remove-by-title form');

  this.eventBinder();
};

Library.prototype.eventBinder = function(){
  this.renderAllBooks();

  //actions
  this.$faBars.on('click', $.proxy(this.slideToggleNav, this));
  this.$tabs.on('click', $.proxy(this.displayPanel, this));
  this.$addMoreBookForms.on('click', $.proxy(this.renderAddForm, this));
  this.$searchBtn.on('submit', $.proxy(this.renderSearchedBooks, this));
  this.$removeFromAuthorForm.on('submit', $.proxy(this.removeByAuthor, this))
  this.$removeFromTitleForm.on('submit', $.proxy(this.removeByTitle, this))
};

Library.prototype.slideToggleNav = function(){
  this.$tabPanel.slideToggle();
};

Library.prototype.renderAllBooks = function(){
  var bookArr = this.getAllBooks();
  this.$getAllBooks.empty();
  for(var i = 0; i < bookArr.length; i++){
    this.$getAllBooks.append(
      '<div class="book-card" data-id="' + bookArr[i].id + '">'+
        '<h2>' + bookArr[i].title + '</h2>'+
        '<h3>' + bookArr[i].author + '</h3>'+
        '<h4> Pages:' + bookArr[i].numberOfPages + '</h4>'+
        '<h5> Published:' + bookArr[i].publishDate + '</h5>' +
        '<div class="book-icon-holder">'+
          '<img src="http://wfarm4.dataknet.com/static/resources/icons/set112/3c4e918c.png">'+
        '</div>'+
      '</div>'
    )
  }
}

Library.prototype.displayPanel = function(e){
  var elem = e.target
  var selectedTab = $(elem).parent().data('panel');
  this.$tabPanel.find('.tabs').removeClass('tab-active');
  $(elem).parent().addClass('tab-active');
  this.$contentContainer.find('.col-sm-12').css('display', 'none');
  this.$contentContainer.find(`#${selectedTab}`).css('display', 'block');
  this.$faBars.trigger('click');

  this.displayPanelSelected(selectedTab);
}

Library.prototype.displayPanelSelected = function(sTab){
  switch(sTab){
    case 'get-all-books':
      return this.renderAllBooks();
    case 'get-random-book':
      return this.renderRandomBook();
    case 'add-book':
      return this.addBookForm();
    case 'search':
      return this.renderSearchedBooks();
    default:
      return null;
  }
}

Library.prototype.renderRandomBook = function(){
  var randomBook = this.getRandomBook();
  this.$getRandomBook.empty().append(
    '<div class="book-card" data-id="' + randomBook.id + '">'+
      '<h2>' + randomBook.title + '</h2>'+
      '<h3>' + randomBook.author + '</h3>'+
      '<h4> Pages:' + randomBook.numberOfPages + '</h4>'+
      '<h5> Published:' + randomBook.publishDate + '</h5>' +
      '<div class="book-icon-holder">'+
        '<img src="http://wfarm4.dataknet.com/static/resources/icons/set112/3c4e918c.png">'+
      '</div>'+
    '</div>'
  )
}

Library.prototype.renderAddForm = function(){
  var formsCounter = $('form div').last().data('div') + 1;
  this.$addBookFormContainer.append(
    '<div id="input-' + formsCounter +'" data-div=' + formsCounter + '>'+
      '<label for="title">Title<br>'+
        '<input type="text" name="title">'+
      '</label>'+
      '<label for="author">Author<br>'+
        '<input type="text" name="author">'+
      '</label>'+
      '<label for="title">Pages<br>'+
        '<input type="number" name="numOfPages">'+
      '</label>'+
      '<label for="title">Published<br>'+
        '<input type="date" name="publishDate">'+
      '</label>'+
    '</div>'
  )
  this.addBookForm()
}

Library.prototype.addBookForm = function(){
  var arrBooks = [];
  var randomNumOfPages = Math.floor(Math.random() * 600) + 250;
  var $formContainerDiv = $('.form-container div');
  var $form = $('form');
  $formContainerDiv.each(function(i, value){
    $form.on('submit', function(e){
      e.preventDefault();
      var $inputs = $('#input-' + (i + 1) + ' :input');
      var values = {};
      $inputs.each(function(){
        values[this.name] = $(this).val();
      });
      if(!values.numOfPages){
        values.numOfPages = randomNumOfPages
      } else if(!value.publishDate){
        values.publishDate = new Date()
      }
      arrBooks.push(values);
      aLibrary.addBooks(arrBooks);
    })
  })
}

Library.prototype.renderSearchedBooks = function(e){
  e.preventDefault();
  var $searchInput = $('#search :input');
  var searchVals = {};
  $searchInput.each(function(){
    searchVals[this.name] = $(this).val();
  });
  var booksFound = this.search(searchVals.title, searchVals.author, searchVals.pages);
  this.$booksFound.empty();
  for(var i = 0; i < booksFound.length; i++){
    this.$booksFound.append(
      '<div class="book-card">'+
        '<h2>' + booksFound[i].title + '</h2>'+
        '<h3>' + booksFound[i].author + '</h3>'+
        '<h4> Pages:' + booksFound[i].numberOfPages + '</h4>'+
        '<h5> Published:' + booksFound[i].publishDate + '</h5>' +
        '<div class="book-icon-holder">'+
          '<img src="http://wfarm4.dataknet.com/static/resources/icons/set112/3c4e918c.png">'+
        '</div>'+
      '</div>'
    )
  }
  this.$searchBtn.trigger('reset');
}

Library.prototype.removeByAuthor = function(e){
  e.preventDefault();
  var elem = e.target
  var $input = $('#remove-by-author :input');
  var vals = {};
  $input.each(function(){
    vals[this.name] = $(this).val();
  });
  var booksDeleted = this.removeBookByAuthor(vals.author);
  if(booksDeleted < 1){
    this.$booksDeleted.empty()
      .append(
        '<h3>No books from this author were found</h3>'
      )
  } else{
    this.$booksDeleted.empty();
    var _booksDeleted = this.$booksDeleted;
    $.each(booksDeleted, function(i, book){
      _booksDeleted.append(
        '<h2>Books removed:</h2>'+
        '<h3>' + book.title + '</h3>'
      );
    });
  }
  $(elem).trigger('reset');
}

Library.prototype.removeByTitle = function(e){
  e.preventDefault();
  var elem = e.target;
  var $input = $('#remove-by-title :input');
  var vals = {};
  $input.each(function(){
    vals[this.name] = $(this).val();
  });
  console.log(vals);
  var booksDeleted = this.removeBookByTitle(vals.title);
  console.log(booksDeleted)
  if(booksDeleted === false){
    this.$booksDeleted.empty()
      .append(
        '<h3>No books match this title</h3>'
      );
  } else{
    this.$booksDeleted.empty()
      .append(
        '<h3>Book deleted successfully</h3>'
      );
  }
}

$(function(){

  window.aLibrary = new Library();
  window.aLibrary.init();
});
