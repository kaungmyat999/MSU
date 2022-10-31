const crypto = require('crypto');


function HashCreator (inputString){
    let secret = process.env.GSECRETKEY
    return crypto.createHmac(process.env.HASHTYPE,secret).update(inputString).digest('hex');
}

module.exports = HashCreator;