function TokenGetter(tokenName,cookiesString) {
    let temp = cookiesString.split('=')
    for(let i =0 ; i <temp.length ; i++){
        if(temp[i] == tokenName){
                return temp[i+1];
        }
    }
}

module.exports = TokenGetter