
function getVal(i1,i2){
    console.log("Input One => ",i1);
    console.log("Input Two => ",i2);
}
function input_form_shower(id){
    console.log("Clicked ",id);
    document.getElementById(id).style.display ='block'
}
let upperInputArr = [];
let fullName_input = document.getElementById('fullName')
let email_input = document.getElementById('email')
let password_input = document.getElementById('password')
let phone_input = document.getElementById('phone')
let img_input = document.getElementById('file')


let gender_input =document.getElementById('other_college_input')
let gender_btns  =document.getElementsByClassName('gender')
let college_input = document.getElementById('other_college_input')
let college_btns = document.getElementsByName('college')
let positions_inputs = document.getElementsByName('position');

function collegebtn_handler(index){
    college_input.classList.remove('required')
    document.getElementById('input_form2').style.display='none'
}
college_btns[0].addEventListener('click',()=>collegebtn_handler(0))
college_btns[1].addEventListener('click',()=>collegebtn_handler(1))




for (let btn of positions_inputs){
    btn.addEventListener('click',()=>{
        allowed_to_show_btn = true;

    })
}

for (let btn of gender_btns){
    btn.addEventListener('click',()=>{
        gender_input.classList.remove('required')
        document.getElementById('input_form1').style.display='none'
    })
}

let inputForm1 = document.getElementById('gender_input');

other_btn1 = document.getElementById('other1')
other_btn2 = document.getElementById('other2')
other_btn1.addEventListener('click',() => {
    gender_value=null;
    input_form_shower('input_form1')
    gender_input.classList.add('required')
    
})
other_btn2.addEventListener('click',()=>{
    input_form_shower('input_form2')
    college_input.classList.add('required')
})

college_cms =document.getElementsByClassName('college_cm')
college_labelgp = document.getElementsByClassName('version_3')
function remove_active(arr){
    for(let i of arr){
        i.classList.remove('active');
    }
}
    
        
for (let i of college_labelgp){
    i.addEventListener('click',()=>{
        remove_active(college_labelgp)
        i.classList.add('active')
    })
}

//File Size Handling

var uploadField = document.getElementById("image_file");

uploadField.onchange = function() {
    console.log(this.files[0].size);
    if(this.files[0].size > 350000 ){
       console.log("File is too big!");
       document.getElementById('file_error').style=''
       this.value = "";
    };
};


