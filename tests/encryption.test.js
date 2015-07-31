'use strict';

const Encryption = require('../lib/encryption');
const assert   = require('assert');

describe('Encryption service', () => {

  let key = 'p@ssword';
  let algorithm = 'aes192';
  let uuid = '01d22d5b-fedd-4118-b174-b4bb7e74dd6c';
  let listid = '55b651764f95b11015c0b355';
  let encryption;

  beforeEach(() => {
    encryption = new Encryption(algorithm, key);
  });

  it('should match encrypted and unencrypted data', () => {
    let str = encryption.encrypt({uuid: uuid, listid: listid});
    let data = encryption.decrypt(str);
    assert.equal(uuid, data.uuid);
    assert.equal(listid, data.listid);
  });

  it('should return null if unable to decrypt', () => {
    let data = encryption.decrypt('not an encrypted string..');
    assert.ok(!data);
  });

});