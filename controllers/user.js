var User = require('../models/user.js'),
    _ = require('underscore');

var UserController = {
  users: require('../data/users'),

  /**
   * Get all users.
   *
   * @returns {*}
   */
  getAll: function () {
    return this.users;
  },

  /**
   * Add a new user.
   * @param string username
   * @param string fullname
   * @returns {*}
   */
  addUser: function (username, fullname) {
    this.users.push(new User(this.users.length + 1, username, fullname));
    return this.users[this.users.length - 1]
  },

  /**
   * Get a single user by its username.
   *
   * @param username
   * @returns {*}
   */
  getOne: function (username) {
    return _.find(this.users, function (user) {
      return user.username === username;
    });
  }
};

module.exports = UserController;