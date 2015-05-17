module.exports = function Link(id, title, url, author, votes) {
  this.id = id;
  this.title = title;
  this.url = url;
  this.author = author;
  this.date = new Date();
  this.votes = votes ? votes : 0;
};