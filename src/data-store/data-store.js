const forEach = require('lodash').forEach;
const isUndefined = require('lodash').isUndefined;

const messageHandlers = require('./message-handlers');
const models = require('../models');

const makeMessageEventWithSubtype = function makeMessageEventWithSubtype(subtype, delim) {
  return ['message', subtype].join(delim || '::');
};
/**
 *
 * @param {Object} opts
 * @param {string=} opts.logLevel The log level for the logger.
 * @constructor
 */
function SlackDataStore(opts) {
  const store = this;
  forEach(messageHandlers, (handler, event) => {
    store.registerMessageHandler(event, handler);
  });
}

/**
 * @type {Object}
 * @private
 */
SlackDataStore.prototype._messageHandlers = {};

/**
 * Sets a handler to save RTM event data to the data-store.
 * @param {string} event
 * @param {function} handler
 */
SlackDataStore.prototype.registerMessageHandler = function registerMessageHandler(event, handler) {
  this._messageHandlers[event] = handler;
};

/**
 * Clears the data store and re-sets it to the required starting state.
 */
SlackDataStore.prototype.clear = function clear() {

};
// ###############################################
// Getters
// ###############################################
/**
 * Returns the User object matching the supplied id.
 * @param {string} userId
 * @returns {Object}
 */
SlackDataStore.prototype.getUserById = function getUserById(userId) {
};

/**
 * Returns the User object matching the supplied name.
 * @param {string} name
 * @returns {Object}
 */
SlackDataStore.prototype.getUserByName = function getUserByName(name) {
};

/**
 * Returns the User object matching the supplied email.
 * @param {string} email
 * @returns {Object}
 */
SlackDataStore.prototype.getUserByEmail = function getUserByEmail(email) {
};

/**
 * Returns the User object matching the supplied bot ID.
 * @param {string} botId
 * @returns {Object}
 */
SlackDataStore.prototype.getUserByBotId = function getUserByBotId(botId) {
};

/**
 * Returns the Channel object matching the supplied id.
 * @param channelId
 * @returns {Object}
 */
SlackDataStore.prototype.getChannelById = function getChannelById(channelId) {
};

/**
 * Returns the Channel object matching the supplied name.
 * @param name
 * @returns {Object}
 */
SlackDataStore.prototype.getChannelByName = function getChannelByName(name) {
};

/**
 * Returns the Group object matching the supplied id.
 * @param groupId
 * @returns {Object}
 */
SlackDataStore.prototype.getGroupById = function getGroupById(groupId) {
};

/**
 * Returns the Group object matching the supplied name.
 * @param name
 * @returns {Object}
 */
SlackDataStore.prototype.getGroupByName = function getGroupByName(name) {

};

/**
 * Returns the DM object matching the supplied id.
 * @param dmId
 * @returns {Object}
 */
SlackDataStore.prototype.getDMById = function getDMById(dmId) {

};

/**
 * Returns the DM object between the registered user and the user with the supplied name.
 * @param name
 * @return {Object}
 */
SlackDataStore.prototype.getDMByName = function getDMByName(name) {
};

/**
 * Returns the bot object matching the supplied id.
 * @param botId
 * @returns {Object}
 */
SlackDataStore.prototype.getBotById = function getBotById(botId) {
};

/**
 * Returns the bot object matching the supplied name.
 * @param {string} name
 * @returns {Object}
 */
SlackDataStore.prototype.getBotByName = function getBotByName(name) {
};

/**
 * Returns the bot object matching the supplied user ID.
 * @param userId
 * @returns {Object}
 */
SlackDataStore.prototype.getBotByUserId = function getBotByUserId(userId) {
};

/**
 * Returns the bot object matching the supplied name.
 * @param {string} name
 * @returns {Object}
 */
SlackDataStore.prototype.getTeamById = function getTeamById(name) {
};

/**
 * Returns the unread count for all objects: channels, groups etc.
 */
SlackDataStore.prototype.getUnreadCount = function getUnreadCount() {
};

// ###############################################
// Setters
// ###############################################

/**
 * Stores a channel object in the data store.
 * @param {Object} channel
 */
SlackDataStore.prototype.setChannel = function setChannel(channel) {
};

/**
 *
 * @param {Object} group
 */
SlackDataStore.prototype.setGroup = function setGroup(group) {
};

/**
 *
 * @param {Object} dm
 */
SlackDataStore.prototype.setDM = function setDM(dm) {
};

/**
 *
 * @param {Object} user
 */
SlackDataStore.prototype.setUser = function setUser(user) {
};

/**
 *
 * @param {Object} bot
 */
SlackDataStore.prototype.setBot = function setBot(bot) {
};

/**
 * @param {Object} team
 */
SlackDataStore.prototype.setTeam = function setTeam(team) {
};

// ###############################################
// Upserts
// ###############################################

/** @param channel */
SlackDataStore.prototype.upsertChannel = function upsertChannel(channel) {

};

/** @param group */
SlackDataStore.prototype.upsertGroup = function upsertGroup(group) {

};

/** @param dm */
SlackDataStore.prototype.upsertDM = function upsertDM(dm) {

};

/** @param user */
SlackDataStore.prototype.upsertUser = function upsertUser(user) {

};

/** @param bot */
SlackDataStore.prototype.upsertBot = function upsertBot(bot) {

};

/** @param team */
SlackDataStore.prototype.upsertTeam = function upsertTeam(team) {

};

// ###############################################
// Deletion methods
// ###############################################

SlackDataStore.prototype.removeChannel = function removeChannel(channelId) {
};

SlackDataStore.prototype.removeGroup = function removeGroup(groupId) {
};

SlackDataStore.prototype.removeDM = function removeDM(dmId) {
};

SlackDataStore.prototype.removeUser = function removeUser(userId) {
};

SlackDataStore.prototype.removeBot = function removeBot(botId) {
};

SlackDataStore.prototype.removeTeam = function removeTeam(teamId) {
};
// ###############################################
// Helpers
// ###############################################
/**
 *
 * @param id
 * @param obj
 */
SlackDataStore.prototype.upsertChannelGroupOrDMById = function upsertChannelGroupOrDMById(id, obj) {
  const firstChar = id.substring(0, 1);

  if (firstChar === 'C') {
    this.upsertChannel(obj);
  } else if (firstChar === 'G') {
    this.upsertGroup(obj);
  } else if (firstChar === 'D') {
    this.upsertDM(obj);
  }
};

/**
 * Returns the channel, group or DM object matching the supplied Id.
 * @param objId
 * @returns {Object}
 */
SlackDataStore.prototype.getChannelGroupOrDMById = function getChannelGroupOrDMById(objId) {
  let ret;
  const firstChar = objId.substring(0, 1);

  if (firstChar === 'C') {
    ret = this.getChannelById(objId);
  } else if (firstChar === 'G') {
    ret = this.getGroupById(objId);
  } else if (firstChar === 'D') {
    ret = this.getDMById(objId);
  }

  return ret;
};

/**
 * Returns the channel or group object matching name, finding by channel, then group then DM.
 * @param objId
 * @returns {Object}
 */
SlackDataStore.prototype.getChannelOrGroupByName = function getChannelOrGroupByName(name) {
  const channel = this.getChannelByName(name);
  return channel || this.getGroupByName(name);
};

// ###############################################
// Web API response handlers
// ###############################################
/**
 * Caches an {@link https://api.slack.com/methods/rtm.start|rtm.start} response to the datastore.
 * @param {Object} data
 */
SlackDataStore.prototype.cacheRtmStart = function cacheRtmStart(data) {
  this.clear();
  const store = this;
  forEach(data.users || [], user => {
    store.setUser(new models.User(user));
  });
  forEach(data.channels || [], channel => {
    store.setChannel(new models.Channel(channel));
  });
  forEach(data.ims || [], dm => {
    store.setDM(new models.DM(dm));
  });
  forEach(data.groups || [], group => {
    store.setGroup(new models.Group(group));
  });
  forEach(data.bots || [], bot => {
    // Bots don't have a separate type currently, so treat them as simple objects
    store.setBot(bot);
  });

  this.getUserById(data.self.id).update(data.self);
  this.setTeam(data.team);
};

// ###############################################
// RTM Message handlers
// ###############################################

/**
 *
 * @param {string} activeUserId
 * @param {string} activeTeamId
 * @param {string} messageType
 * @param {Object} message
 */
SlackDataStore.prototype.handleRtmMessage = function handleRtmMessage(
  activeUserId, activeTeamId, messageType, message) {
  let handler;
  if (messageType === 'message' && !isUndefined(message.subtype)) {
    handler = this._messageHandlers[makeMessageEventWithSubtype(message.subtype)];

    // If there's a custom handler for the message subtype, use that, otherwise default to adding
    // the message to the base channel history
    handler = handler || this._messageHandlers[
      makeMessageEventWithSubtype('rtm_client_add_message')];
  } else {
    handler = this._messageHandlers[messageType];
  }

  if (!isUndefined(handler)) {
    try {
      // Some handlers require the active user / team id, so support providing it as needed
      if (handler.length === 4) {
        handler(activeUserId, activeTeamId, this, message);
      } else {
        handler(this, message);
      }
    } catch (err) {
      throw err;
    }
  }
};

module.exports = SlackDataStore;
