let addBtn= document.getElementById('add');
let subtract =document.getElementById('subtract');
let num =document.getElementById('num');
let txt = document.getElementById('text')

let value = 0;
num.innerHTML = value;

addBtn.addEventListener('click',()=>{
    value ++;
    console.log(value);
    if(value ==3){
        txt.style.display = 'block'
    }
    num.innerHTML = value;
})

subtract.addEventListener('click',()=>{
    value --;
    console.log(value);
    num.innerHTML = value;
})

