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

let edit_btn = document.getElementById('edit');
let update_btn = document.getElementById('update');
let delete_btn = document.getElementById('delete');
let message = document.getElementById('message')
edit_btn.addEventListener('click',()=>{
    update_btn.hidden = false;
    delete_btn.hidden = false;
    edit_btn.hidden = true;
    profile_caller(profile_link,false)

})
update_btn.addEventListener('click',()=>{
    let inputs = document.getElementsByClassName('form-control');
    let temp = []
    temp.push(memberId)
    for(let i of inputs){
        temp.push(i.value)
        
    }
    console.log(temp);

    fetch('/user-update',{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(temp)
            
    }).then(data => data.json()).then(data => {
        if(data){
            message.innerHTML = data;
            message.hidden = false;
        }
        location.reload()
    } )
    console.log("Edit Btn Clicked");

})
delete_btn.addEventListener('click',()=>{
    console.log("Delete Btn Clicked",memberId);
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
            setTimeout(()=>location.assign('/members'),2800)

        }

        
    })
})




document.getElementsByClassName('form-control')


