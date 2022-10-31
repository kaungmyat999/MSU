

let memberId = getParam(document.URL).split('?')[0];
let profile_link = 'http://localhost:3000/user-profile/'+memberId;

let memberImg = document.getElementById('candi_img');

fetch('http://localhost:3000/get-img/'+memberId).then(d=>d.json()).then(data =>{
    console.log("Buff => ",data);
    let buff = data.buf;
    const mimeType = 'image/png'; 
    let resString = `data:${mimeType};base64,${buff}`
    
    memberImg.src = resString
    
    let userProfileImage = document.getElementById('candidate_img');
    userProfileImage ? userProfileImage.src=resString : '';
})
profile_caller(profile_link,true)


let approve_btn = document.getElementById('approve');
let cancel_btn = document.getElementById('reject');
let message = document.getElementById('message');

approve_btn.addEventListener('click',()=>{
    console.log("Approve Btn Clicked");

    fetch('/user-update',{
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({memberId,status:"Member"})
        
    }).then(data => data.json()).then(data => {
        console.log(data);
        if(data){
            message.innerHTML = data;
            message.hidden = false;
            setTimeout(()=>location.assign('/admission'),2100)

        }
    } )
})

cancel_btn.addEventListener('click',()=>{
    console.log('Clicked');
    fetch('/user-delete',{
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({memberId})
        
    }).then(data=> data.json()).then(data=>{
        if(data){
            message.innerHTML = data;
            message.hidden = false;
            setTimeout(()=>location.assign('/admission'),2800)

        }

        
    })
})
