let bcrypt = require('bcrypt')

let hash_password_checker = (input_text,salt_round_number)=>{
    bcrypt.genSalt(salt_round_number, function(err, salt) { 
        bcrypt.hash(input_text, salt, function(err, hash) {
            bcrypt.compare(input_text, hash, function(err, result) {
                console.log("Result => ",result);
            });
        })

    });
 }


module.exports =hash_password_checker()