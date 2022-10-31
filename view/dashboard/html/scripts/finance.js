
let MESSAGEREGEX = /message=/;
let cookie = document.cookie.split(';')
let cookieData = getCookie(cookie,MESSAGEREGEX)
if(cookieData){
    let message = cookieData.cookie;
    document.cookie = 'message=none'
    function showMessage(message) {
        if(message != 'none'){
            console.log("Input Message ",message);
            document.getElementById('message').innerHTML = message;
            document.getElementById('message').hidden = false;
        }
    }
    
    setTimeout(showMessage(message),800)
}




const myRe = 'https://docs.google.com/spreadsheets/d/[A-Za-z0-9-_]+/edit\\?usp=sharing';
// const inputLink = 'https://docs.google.com/spreadsheets/d/10O3Ij8jv4E_k4Kxl6nCqScvVEadVeZlCCfWZeqzolQ8/edit?usp=sharing'
// document.getElementById('upload').addEventListener('click',()=>{
//     console.log('Clicked');
//     let txt = document.getElementById('fileLink').value;
//     console.log(txt);
//     console.log(txt.match(myRe)[0]);
//     if(txt.match(myRe)[0]){
//         let name = document.getElementById('filename').value;
//         let range = document.getElementById('range').value;
//         fetch('http://localhost:3000/finance',{
//             method:"POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body:JSON.stringify({name:filename.value,link:txt,range:range}) 
//         })
        
//     }else{
//         console.log("Error Link is not Valid!!");
//     }
// })





