import Book from './book';

const date1 = new Date(1425, 1, 1);
const date2 = new Date(2018, 1, 1);
function rDate(start, end){
  return new Date(+ start + Math.random() * (end - start));
};

const arrBooks = [
  new Book('The old man and the sea', 'Ernest Hemingway', 340, rDate(date1, date2)),
  new Book('Dick Sand a captain at fifteen', 'Jules Verne'),
  new Book('The Shining', 'Stephen King', 440),
  new Book('The white road', 'John Connolly', 340, rDate(date1, date2)),
  new Book('It', 'Stephen King', 340, rDate(date1, date2)),
  new Book('Wizards first rule', 'Terry Goodkind', 400),
  new Book('Mister Monday', 'Garth Nix'),
  new Book('Name of the wind', 'Patrick Rothfus', 746),
  new Book('Impossile odds', 'Dave Dunkin', 355, new Date(2011, 4, 6)),
  new Book('Game of thrones', 'George R. R. Martin', 900),
  new Book('Hitchikers guide to the galaxy', 'Douglas Adams', rDate(date1, date2)),
  new Book('A hundred thousand kingdoms', 'N. K. Jemisin', 210, rDate(date1, date2)),
  new Book('Harry Potter: and the sourcerer stone', 'J. K. Rowling', 500, new Date(2000, 9, 12)),
  new Book('Sword of Shanara', 'Terry Brooks', 255)
];

export default arrBooks
