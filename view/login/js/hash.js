const  md5 = require('md5');

console.log(md5('message'));

const bcrypt = require('bcrypt')
const myPlaintextPassword = 'message'
let hashed_value =[];
bcrypt.genSalt(10, function(err, salt) {
    console.log(salt);
    bcrypt.hash(myPlaintextPassword, salt, (function(err, hash) {
        console.log("Hashed -> ",hash);
        hashed_value.push(hash);
        bcrypt.compare(myPlaintextPassword,hash,(err,result)=>console.log(result))
    }))
    
});
console.log("Outside => ",hashed_value);
