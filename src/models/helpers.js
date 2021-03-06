const hasKey = require('lodash').has;

// Channel, file, group, DM, user, usergroup
const RECOGNIZED_API_TYPE_PREFIXES = ['C', 'F', 'G', 'D', 'U', 'S'];

/**
 * Tests whether a supplied JSON object represents a Slack API type.
 * @param {Object} obj
 * @returns {boolean}
 */
const isModelObj = function isModelObj(obj) {
  if (hasKey(obj, 'id')) {
    return RECOGNIZED_API_TYPE_PREFIXES.indexOf(obj.id.substr(0, 1)) !== -1;
  }

  return false;
};

/**
 * Returns the model class for the JSON object from the Slack API.
 */
const getModelClass = function getModelClass(obj) {
  let modelClass;
  const apiTypePrefix = obj.id.substr(0, 1);

  if (apiTypePrefix === 'C') {
    modelClass = require('./channel');
  } else if (apiTypePrefix === 'F') {
    modelClass = require('./file');
  } else if (apiTypePrefix === 'D') {
    modelClass = require('./dm');
  } else if (apiTypePrefix === 'U') {
    modelClass = require('./user');
  } else if (apiTypePrefix === 'S') {
    modelClass = require('./user-group');
  } else if (apiTypePrefix === 'G') {
    // The MPDM and Group classes share the same prefix, so do an extra check here
    if (obj.is_mpim) {
      modelClass = require('./mpdm');
    } else if (obj.is_group) {
      modelClass = require('./group');
    }
  }

  return modelClass;
};

module.exports.isModelObj = isModelObj;
module.exports.getModelClass = getModelClass;
