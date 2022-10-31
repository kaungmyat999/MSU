
const form_link = 'http://localhost:3000/review-project'
fetch('http://localhost:3000/projects').then( d => d.json()).then(projects => {
    table_datas =[]
    for(let i of projects){
        console.log(i);
        table_datas.push([i.name,i.lead_by,String(i.hasFinished),i.date])
    }
    return table_datas;
}).then(data => {
    
    new gridjs.Grid({
        columns: ["Name", "Leadby", "Finished","Date"],
        pagination:{
            limit:6,
        },
        serach : true,
        sort: true,
        style: {
            table:{
                'background-color': 'rgba(0, 0, 0, 0.1)',
                'width' : '100%'
            }
        },
        language: {
            'search': {
            'placeholder': '🔍 Search...'
            },
            'pagination': {
            'previous': '⬅️',
            'next': '➡️',
            'showing': '😃 Displaying',
            'results': () => 'Projects'
            }
        },
        resizable:true,
        search:true,
        data: data}).render(document.getElementById("table"));
})

let rows;
setTimeout(()=>{
    

    run()
    let btns= document.querySelectorAll("[role='button']");
    Object.values(btns).forEach(i=>i.addEventListener('click',()=>{
        console.log("Btn clicked");
        setTimeout(()=>run(),700)
    }))

},500)
let table_data;

async function run(){
    rows = (document.getElementsByClassName('gridjs-tr'))
    table_data = Object.values(rows);
    console.log(table_data);
    let hd_inputs = document.getElementsByClassName('user_datas_ht')
    // for(let i=0 ; i<5;i++){
    //         hd_inputs[i].value = table_data.childNodes[i].innerText
    //     }
    await Object.values(rows).forEach(i => (i).addEventListener('click',()=>{
        console.log(i);
        let assArr = []
        let resObj ={}
        let newobj = []
        console.log("Before",hd_inputs[0].name);
        for(let j=0; j<i.childNodes.length;j++){
            newobj.push(i.childNodes[j].innerText)
            console.log(hd_inputs[j]);
            hd_inputs[j].value=i.childNodes[j].innerText
            console.log(hd_inputs[j].value,i.childNodes[j].innerText);
            assArr[hd_inputs[j].name] = i.childNodes[j].innerText;
            
        }
        console.log(newobj);
        console.log("AssARR\n",hd_inputs);
        
        fetch('http://localhost:3000/projects',{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newobj) 
            
        }).then(data => data.json()).then(data => {
            console.log(data);
            document.getElementById('hd_form').action = form_link+'/'+data.id
            console.log(document.getElementById('hd_form').action);
            document.getElementById('hd_form').submit();
        })
        setTimeout(()=>{
            console.log("Uploaded",JSON.stringify(assArr));
            console.log(hd_inputs);
            for(let i of hd_inputs){
                (i => resObj[i.name]=resObj[i.value])
            }
            //document.getElementById('hd_form').submit();
            //document.getElementById('member_btn').click()
        },1000 )

        console.log('clicked',i.childNodes[0].innerText,i.childNodes[1].textContent,i.childNodes[2].innerText,i.childNodes[3].innerText)
    }) )


    console.log(table_data);
}