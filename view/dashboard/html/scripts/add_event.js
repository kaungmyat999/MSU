let MESSAGEREGEX = /message=/;
let cookie = document.cookie.split(';')
let data = getCookie(cookie,MESSAGEREGEX)

if(data){
    let message =data.cookie
    function showMessage(message) {
        console.log("Input Message ",message);
        if(message != 'none'){
            document.getElementById('message').innerHTML = message;
            document.getElementById('message').hidden = false; 
        }
        
    }
    document.cookie = 'message=none'

    setTimeout(showMessage(message),800)
}
let tempArr = [];
const adder = () =>{
    let inputs = document.getElementsByClassName('form-control')
    Object.values(inputs).map(i=> tempArr.push(i.value))
    console.log("Add Btn clicked",tempArr);
}

let addbtn = document.getElementById('add')

addbtn.addEventListener('click',(req,res)=>{
    adder();    
    fetch('http://localhost:3000/event-add',{
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(tempArr) 
    })

    setTimeout(()=>location.reload(),2100)
})
