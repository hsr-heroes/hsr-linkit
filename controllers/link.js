var Link = require('../models/link'),
    userController = require('../controllers/user'),
    _ = require('underscore');

var LinkController = {
  links   : [],
  defaults: require('../data/links'),
  init    : function () {
    _.each(this.defaults, function (link) {
      this.addLink(link.title, link.url, link.author, link.votes);
    }, this)
  },

  /**
   * Get all links.
   *
   * @returns {*}
   */
  getAll: function () {
    return _.sortBy(this.links, function (link) {
      return -link.votes;
    })
  },

  /**
   * Add a single link.
   *
   * @param string title
   * @param string url
   * @param string author
   * @returns {*}
   */
  addLink: function (title, url, author, votes) {
    if (author === undefined) {
      return false;
    }

    var link = new Link(this.links.length + 1, title, url, author, votes)
    this.links.push(link);

    return link;
  },

  /**
   * Update a single link.
   * @param int id
   * @param object data
   * @returns {*}
   */
  updateLink: function (id, data) {
    var link = this.getOne(id);

    if (id === undefined) {
      return false;
    }

    _.extend(link, _.pick(data, 'title', 'url', 'author'));

    return link;
  },

  /**
   * Remove a single link.
   * @param id
   */
  removeLink: function (id) {
    this.links = _.without(this.links, _.findWhere(this.links, {id: id}));
  },

  upvoteLink: function (id) {
    var link = this.getOne(id);

    if (link === undefined) {
      return false;
    }

    link.votes++;

    return link;
  },

  downvoteLink: function (id) {
    var link = this.getOne(id);

    if (link === undefined) {
      return false;
    }

    link.votes--;

    return link;
  },

  getOne: function (id) {
    return _.find(this.links, function (link) {
      return link.id == id;
    })
  },

  isAuthor: function (id, username) {
    return username !== undefined && this.getOne(id).author == username;
  }
};

module.exports = LinkController;