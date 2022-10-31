

function getCookie(inputCookieString,regex){

    for (let i=0 ; i<inputCookieString.length;i++){
        let isTrue = regex.test(inputCookieString[i]);
        if(isTrue){
            let res = inputCookieString[i].split(regex)[1];
            inputCookieString.splice(i,1)
            let leftArr = inputCookieString.join(';')+';'
            return {cookie:res,leftArr};
        }

    }
}
