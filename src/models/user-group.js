/**
 *
 */

const inherits = require('inherits');

const Model = require('./model');

function UserGroup(opts) {
  Model.call(this, 'UserGroup', opts);
}

inherits(UserGroup, Model);

module.exports = UserGroup;
