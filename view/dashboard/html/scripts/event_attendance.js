

document.getElementById('upload').addEventListener('click',()=>{
    
    let eventToken = document.getElementById('tokenInput').value
    document.getElementById('userIdInput').value = id;
    console.log("Form ",document.getElementById('form').action);
    console.log("User Id",document.getElementById('userIdInput').value);
    document.getElementById('btn_submit').click()
    setTimeout(()=>location.reload(),2100)
})  