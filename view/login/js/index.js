
let submit_btn = document.getElementById('form_submit_btn')

submit_btn.style.display = 'none'
let password = document.getElementById('password');

let genderInput = document.getElementsByClassName('gender');
let gender_hd = document.getElementById('gender_hd')
for(let i=0; i< genderInput.length; i++){
    genderInput[i].addEventListener('click',()=>{
        gender_hd.value = genderInput[i].value  
        console.log(gender_hd.value);
    })
    //console.log(genderInput[i]);
}

document.getElementById('gender_input').addEventListener('change',()=>{
    gender_hd.value =document.getElementById('gender_input').value
    console.log(document.getElementById('gender_input').value);
})



let end = document.getElementById('end');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let positon_inputs = document.getElementsByName('position');
let reg = document.getElementById('reg');
reg.bool= false;
let allowed_to_show_btn = false



let inputTempValues = {};
let page1Inputs = document.getElementsByClassName('detect');
console.log(page1Inputs);
Object.values(page1Inputs).map(input=>{
    input.addEventListener('change',()=>{
        console.log(input.value);
        inputTempValues[input.name]= (input.value)
    })
})


next.addEventListener('click', () =>{
    // console.log("password ",password.value);
    // let page1Inputs = document.getElementsByClassName('page1');
    // let arr = {}
    // for(let i=0; i<page1Inputs.length;i++){
    //     //console.log(page1Inputs[i].value);
    //     page1Inputs[i].value ? arr[page1Inputs[i].name] =page1Inputs[i].value: ''
    // }
    // arr["gender"]= gender_hd.value;
    // console.log(arr);
    // // fetch('/signup',{
    // //     method: 'POST',
    // //     headers: {
    // //     'Accept': 'application/json',
    // //     'Content-Type': 'application/json'
    // //     },
    // //     body: JSON.stringify({data :arr})
    // // })
    
    // let img_btn = document.getElementById('img_btn')
    //setTimeout(()=>img_btn.click(),1000)
    
    console.log(inputTempValues);
})
prev.addEventListener('click',()=>{
    allowed_to_show_btn = false;
    submit_btn.style.display = 'none';
    reg.bool = false;
})

// submit_btn.addEventListener('click',async()=>{

reg.addEventListener('change',()=>{
    console.log("Changing Reg Values");
    reg.bool ? reg.bool=!reg.bool : reg.bool= true;
    console.log(reg.bool);
    reg.bool ? submit_btn.style.display = '' : submit_btn.style.display='none'
})
    
// })

let hd_submit_btn = document.getElementById('hidden_submit')

let HiddenInputs = document.getElementsByClassName('hidden_inputs');
// HiddenInputs.map(input=>{
//     input.name == 
// })

//Handing college inputs;
let hdCollegeInput = document.getElementById('hd_college')
let college_Inputs = document.getElementsByClassName('college');
Object.values(college_Inputs).map(input=> {
    input.addEventListener('change',()=>{
        hdCollegeInput.value = input.value
    })
})

document.getElementById('other_college_input').addEventListener('change',()=>{
    hdCollegeInput.value = document.getElementById('other_college_input').value;

}
)


//Position 
let hd_position = document.getElementById('hd_position');
hd_position.value =null;
let position = document.getElementsByClassName('position');
Object.values(position).map(input=>{
    input.addEventListener('change',()=>{
        hd_position.value = input.value;
    })
})
document.getElementById('form_submit_btn').addEventListener('click',async()=>{
    inputTempValues[gender_hd.name] = gender_hd.value
    inputTempValues[hdCollegeInput.name] = hdCollegeInput.value;
    inputTempValues[hd_position.name] = hd_position.value;
    console.log(inputTempValues);
    
    let inputs = document.getElementsByClassName('input');
    let inputsValues = Object.values(inputs).map(i=> i.value);
    let time =0;
    await Object.keys(HiddenInputs).map(keys => {
        if(HiddenInputs[keys].name == 'img'){
            console.log("Found",HiddenInputs[keys]);
            HiddenInputs[keys].files = document.getElementById('image_file').files;
        }else{
            HiddenInputs[keys].value = inputsValues[time];
            time++;
        }
       
    }) 
    //HiddenInputs.img.files = await document.getElementById('image_file').files
    console.log(document.getElementById('image_file').files);
    console.log(HiddenInputs.img.files);
    await cleanInput()
    hd_submit_btn.click()

})

function cleanInput(){
    let inputs = document.getElementsByClassName('input');
    Object.keys(inputs).map(keys => inputs[keys].value = null)
}


