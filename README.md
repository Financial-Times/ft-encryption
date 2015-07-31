# Ft-Encryption
a handy wrapper around node's `crypto` service

## usage

````
 const Encryption = require('ft-encryption');
 let encryption = new Encryption('aes192', 'secret');

 let str = encryption.encrypt({key: 'value'});
 let obj = encryption.decrypt(str); // {key: 'value'}
````

supports all algorythms, tha node's `crypto` supports