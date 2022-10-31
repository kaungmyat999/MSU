let cookies = document.cookie.split(';');
let userRegex = /userId=/;
let id =getCookie(cookies,userRegex).cookie ;
console.log("ID => " ,id); 



fetch('http://localhost:3000/user-profile/'+id).then(d => d.json()).then(async(user)=>{
    let userName = document.getElementsByClassName('userName')
    console.log("user =>",user.isAdmin);
    if(!user.isAdmin){
        AdminElementsDeleter()
        if(document.URL.split('/')[3] == 'profile'){
            document.getElementById('edit').hidden = true
            console.log(document.getElementById('edit').hidden);
        }

    }
    console.log("UserName",userName);
    console.log('userImage',userImage);
    for(let input of userName){
        console.log(input);
        input.innerHTML = user.fullName
        
    }
    console.log("Image ",user.img.data);

    

    
    
    
    

})
