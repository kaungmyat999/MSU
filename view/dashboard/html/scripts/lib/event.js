
const event_caller= (input_event_link,isInputDisabled)=> {
    let id = (document.URL.split('?')[0].split('/'))[4];
    input_event_link += id;
    let inputs = document.getElementsByClassName('form-control')

    fetch(input_event_link).then(d => d.json()).then(data => {
        console.log(data);
        let data_keys = ['name','leadby','location','date']
        for(let i of document.getElementsByName('id')){
            i.value = data.id;
        };
        
        input_Freeze_Or_Activer(isInputDisabled,inputs,data,data_keys)
        let temp = Object.values(inputs)

        
        
    })
    let editBtn =document.getElementById('edit');
    let cancelBtn = document.getElementById('cancel');
    let updateBtn = document.getElementById('update');
    editBtn.addEventListener('click',()=>{

        Inactiver(false,inputs)
        btnONOFF(true)
        
        
    })

    cancelBtn.addEventListener('click',()=>{
        Inactiver(true,inputs)
        btnONOFF(false)
        fetch('http://localhost:3000/event-delete',{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({id:id}) 
        
        }).then(data => data.json()).then(data => {
            console.log(data)
            setTimeout(()=> location.href=document.URL.split('review-event')[0]+'event-table',500)
        })

    })

    updateBtn.addEventListener('click',()=>{
        updater(id);
        setTimeout(()=> location.reload(),500)
    })

    
    const btnONOFF = (bool) => {
        editBtn.hidden = bool
        cancelBtn.hidden = !bool
        updateBtn.hidden = !bool
    }

}

const updater = (inputId)=>{
    let inputs = document.getElementsByClassName('form-control')
    let tempArr = []
    tempArr.push(inputId)
    for (let i of inputs ){
        tempArr.push(i.value)
    }
    fetch('http://localhost:3000/event-update',{
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(tempArr) 
        
    }).then(data => data.json()).then(data => console.log(data))

}

const input_Freeze_Or_Activer = (bool,inputs,data,data_keys)=>{
    console.log(inputs);
    for(let i =0; i < inputs.length;i++){
        //Preventing Modifing from Accidental Click
        inputs[i].disabled = bool;

        inputs[i].value = data[data_keys[i]]
    }
} 

const Inactiver = (bool,inputs) => {
    for(let i =0; i < inputs.length;i++){
        //Preventing Modifing from Accidental Click
        inputs[i].disabled = bool;

    }
}


const getId = () => console.log(window.URL.split('?')[0]);