import Library from './library';
import Book from './book';
import $ from './jquery-3.2.1.min';

window.Library = Library;
window.Book = Book;

$(function(){

  var $faBars = $('.fa-bars');
  var $tabPanel = $('.tab-panel');
  var $tabs = $('.tabs');
  var $contentContainer = $('.content-container');
  var $getAllBooks = $('#get-all-books');
  var $getRandomBook = $('#get-random-book');
  var $addBookForm = $('#add-book form');

  $faBars.on('click', function(){
    $tabPanel.slideToggle();
  })

  function renderAllBooks(){
    var bookArr = Library.getAllBooks();
    $getAllBooks.empty();
    for(var i = 0; i < bookArr.length; i++){
      $getAllBooks.append(
        '<div class="book-card">'+
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

  renderAllBooks();

  $tabs.on('click', displayPanel)

  function displayPanel(){
    var selectedTab = $(this).data('panel');
    $tabPanel.find('.tabs').removeClass('tab-active');
    $(this).addClass('tab-active');
    $contentContainer.find('.col-sm-12').css('display', 'none');
    $contentContainer.find(`#${selectedTab}`).css('display', 'block');
    $faBars.trigger('click');

    displayPanelSelected(selectedTab);
  };

  function displayPanelSelected(sTab){
    switch(sTab){
      case 'get-all-books':
        return renderAllBooks();
      case 'get-random-book':
        return renderRandomBook();
      case 'add-book':
        return addBookForm();
      default:
        return null;
    }
  };

  function renderRandomBook(){
    var randomBook = Library.getRandomBook();
    $getRandomBook.empty().append(
      '<div class="book-card">'+
        '<h2>' + randomBook.title + '</h2>'+
        '<h3>' + randomBook.author + '</h3>'+
        '<h4> Pages:' + randomBook.numberOfPages + '</h4>'+
        '<h5> Published:' + randomBook.publishDate + '</h5>' +
        '<div class="book-icon-holder">'+
          '<img src="http://wfarm4.dataknet.com/static/resources/icons/set112/3c4e918c.png">'+
        '</div>'+
      '</div>'
    )
  };

  function addBookForm(){
    $addBookForm.on('submit', function(e){
      e.preventDefault();
      var $inputs = $('#add-book from :input');
      var vals = {};
      $.each($addBookForm.serializeArray(), function(i, field){
        vals[field.name] = field.value;
      })
      Library.addBook(vals.title, vals.author, vals.numOfPages, vals.publishDate);
      $(this).trigger('reset');
    })
  };
});
