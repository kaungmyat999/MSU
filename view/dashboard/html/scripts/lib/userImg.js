
let userImage = document.getElementsByClassName('user-image');

fetch('http://localhost:3000/get-img/'+id).then(d=>d.json()).then(data =>{
    console.log("Buff => ",data);
    let buff = data.buf;
    const mimeType = 'image/png'; 
    let resString = `data:${mimeType};base64,${buff}`
    for(let input of userImage){
        input.src = resString
    }
    let userProfileImage = document.getElementById('candidate_img');
    userProfileImage ? userProfileImage.src=resString : '';
})
