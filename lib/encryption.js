'use strict';

const crypto = require('crypto');

/**
 * creates an instance of encrypton service
 * @param {String} algorithm
 * @param {String} key
 * @return {Object} instance
 */
const Encryption = function(algorithm, key) {
  this.algorithm = algorithm;
  this.key = key;
};

/**
 * @param  {Object} object
 * @return {String} encrypted concatenated string
 */
Encryption.prototype.encrypt = function (obj) {
  let str = JSON.stringify(obj);
  let cipher = crypto.createCipher(this.algorithm, this.key);
  let data = cipher.update(str, 'utf8', 'base64');
  data += cipher.final('base64');
  return data;
};

/**
 * @param  {String} encrypted concatenated string
 * @return {Object} object
 */
Encryption.prototype.decrypt = function (encrypted) {
  let cipher = crypto.createDecipher(this.algorithm, this.key);
  let result = null;
  try {
    let str = cipher.update(encrypted, 'base64', 'utf8');
    str += cipher.final('utf8');
    result = JSON.parse(str);
  } catch (error) {
    logger.warn('Error decrypting string', {encrypted: encrypted, error: error});
  } finally {
    return result;
  }
};

module.exports = Encryption;