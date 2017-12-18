import $ from './jquery-3.2.1.min';
import Library from './library';

window.Library = Library;

$(function(){

  var $faBars = $('.fa-bars');
  var $tabPanel = $('.tab-panel');
  var $tabs = $('.tabs');
  var $contentContainer = $('.content-container');
  var $getAllBooks = $('#get-all-books');
  var $getRandomBook = $('#get-random-book');
  var $addBookForm = $('#add-book form');
  var $addMoreBookForms =$('.addMoreBookForms');
  var $addBookFormContainer = $('#add-book .form-container');
  var $searchBtn = $('#search form');
  var $booksFound = $('.books-found');
  var $removeFromAuthorForm = $('#remove-by-author form');
  var $booksDeleted = $('.books-deleted');

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
      case 'search':
        return renderSearchedBooks();
      case 'remove-by-author':
        return removeByAuthor();
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

  $addMoreBookForms.on('click', renderAddForm);

  function renderAddForm(){
    var formsCounter = $('form div').last().data('div') + 1;
    $addBookFormContainer.append(
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
    addBookForm()
  }

  function addBookForm(){
    var arrBooks = [];
    var randomNumOfPages = Math.floo(Math.random() * 600) + 250
    $('.form-container div').each(function(i, value){
      $('form').on('submit', function(e){
        e.preventDefault();
        var $inputs = $('#input-' + (i + 1) + ' :input');
        var values = {};
        $inputs.each(function(){
    			values[this.name] = $(this).val();
    		});
        if(!value.numOfPages){
          value.numOfPages = randomNumOfPages
        } else if(!value.publishDate){
          value.publishDate = new Date()
        }
        arrBooks.push(values);
        console.log(arrBooks);
    		Library.addBooks(arrBooks);
      })
    })
  };

  function renderSearchedBooks(){
    $searchBtn.on('submit', function(e){
      e.preventDefault();
      console.log('working');
      var $searchInput = $('#search :input');
      var searchVals = {};
      $searchInput.each(function(){
        searchVals[this.name] = $(this).val();
      });
      var booksFound = Library.search(searchVals.title, searchVals.author, searchVals.pages);
      $booksFound.empty();
      for(var i = 0; i < booksFound.length; i++){
        $booksFound.append(
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
      $searchBtn.trigger('reset');
    });
  };

  function removeByAuthor(){
    $removeFromAuthorForm.on('submit', function(e){
      e.preventDefault();
      var $input = $('#remove-by-author :input');
      var vals = {};
      $input.each(function(){
        vals[this.name] = $(this).val();
      });
      var booksDeleted = Library.removeBookByAuthor(vals.author);
      if(booksDeleted < 1){
        $booksDeleted.empty()
          .append(
            '<h3>No books from this author were found</h3>'
          )
      } else{
        $booksDeleted.empty()
        $.each(booksDeleted, function(i, book){
          $booksDeleted.append(
            '<h2>Books removed:</h2>'+
            '<h3>' + book.title + '</h3>'
          );
        });
      }
      $(this).trigger('reset');
    })
  }
});
