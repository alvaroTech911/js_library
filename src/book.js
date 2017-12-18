import faker from 'faker';

export default class Book{
  constructor(
    title,
    author,
    numberOfPages = Math.floor(Math.random() * 600) + 150,
    publishDate = new Date()
  ){
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.publishDate = new Date(publishDate).toDateString();
    this.id = faker.random.uuid();
  }
}
