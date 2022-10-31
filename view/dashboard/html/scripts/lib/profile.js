
const profile_caller= (input_profile_link,isInputDisabled)=> {
    let inputs = document.getElementsByClassName('form-control')

    fetch(input_profile_link).then(d => d.json()).then(data => {          
        console.log("D => ",data);
        
        let data_keys = ['fullName','email','phone_no','position','college','gender']
        
        for(let i =0; i < inputs.length;i++){
            //Preventing Modifing from Accidental Click
             
            inputs[i].disabled = isInputDisabled;
    
            inputs[i].value = data[data_keys[i]]
        }
    
        let temp = Object.values(inputs)
        
    })
}



