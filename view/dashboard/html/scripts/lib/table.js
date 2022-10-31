function user_table(userType,form_link,elementId='table') {
function fnBrowserDetect(){
                
    let userAgent = navigator.userAgent;
    let browserName;

    if(userAgent.match(/chrome|chromium|crios/i)){
        browserName = "chrome";
        }else if(userAgent.match(/firefox|fxios/i)){
        browserName = "firefox";
        }  else if(userAgent.match(/safari/i)){
        browserName = "safari";
        }else if(userAgent.match(/opr\//i)){
        browserName = "opera";
        } else if(userAgent.match(/edg/i)){
        browserName = "edge";
        }else{
        browserName="No browser detection";
        }

        return browserName;       
 }       
fetch('http://localhost:3000/users').then(data => data. json()).then(users =>{
    users = users.filter(i=>i.status == userType)
    table_datas =[]
    for(let i of users){
        table_datas.push([i.fullName,i.position,i.createdAt,i.status])
    }
    return table_datas;
    
    }).then(data =>{
        new gridjs.Grid({
        columns: ["FullName", "Position", "Since","Status"],

        pagination:{
            limit:9,
        },
 
        sort: true,
        style: {
            table:{
                'background-color': 'rgba(0, 0, 0, 0.1)',
                 
                
            },
            th:{
                textAlign : 'center'
            },
            td:{
                height: '12px',
                padding:'16px',
                paddingLeft: fnBrowserDetect() == 'chrome' ? '105px' : '130.5px',
                paddingRight: fnBrowserDetect() == 'chrome' ? '105px': '130.5px',
            },
            
        },
        
        responsive: [{
            breakpoint: undefined,
            options: {
                
            },
        }],
        language: {
            'search': {
            'placeholder': '🔍 Search...'
            },
            'pagination': {
            'previous': '⬅️',
            'next': '➡️',
            'showing': '😃 Displaying',
            'results': () => 'Pending Members'
            }
        },
        autoWidth:true,
        resizable:true,
        search:true,
        data: data,}).render(document.getElementById(elementId));
    }).then(()=>{
        console.log( document.getElementsByClassName('gridjs-tr').length)
        setTimeout(()=>console.log(document.getElementsByClassName('gridjs-tr')),500)
        
    
    })
    
    let rows;
    setTimeout(()=>{
        
        fetch('http://localhost:3000/user-profile/'+id).then(d => d.json()).then(user => {
            if(user.isAdmin){
                run()
            }
        })
        
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
            
            fetch('http://localhost:3000/profile',{
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(newobj)
                
            }).then(data => data.json()).then(data => {
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
    
    
    }
    
    
    
    
}