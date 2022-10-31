fetch('http://localhost:3000/users-events').then(d=> d.json()).then((data)=>{
    console.log("Dt",data);
    let numberOfEvent = data.length;
    let eventIdAss = [] 

    for(let event of data){
        console.log(event.eventId);
        //eventIdAss[event.eventId] ?  '' : 
        if(eventIdAss[event.eventId]){
            console.log("exist");
        }else{
            console.log("not exist");
            eventIdAss[event.eventId] = data.filter(i => i.eventId == event.eventId) 
        }
    }

    let date = []
    let numberOfAttendence  =[]

    console.log("eventIdAss ",eventIdAss);
    let eventNames = Object.keys(eventIdAss).map(i=>i="Event"+i)
    console.log("eventIdAss Keys",eventNames);
    console.log('lop');
    let pieData = []
    fetch('http://localhost:3000/users-count').then(d => d.json()).then(count => {
        

        for(let i of eventIdAss){

            if(i){
    
                date.push(getDate(i[0].date));
                console.log(i,i.length);
                numberOfAttendence.push(i.length)
                pieData.push((i.length/count)*100)
            }
            // i ? date.push(i[0].date) : ''
        }
        console.log('Date',date);
        console.log("Number of Attendence \n",numberOfAttendence);
        
        let events = Object.keys(eventIdAss);
        let values = Object.values(eventIdAss)
        console.log("Events",events);
        console.log("Values",values);
        event_attendance_chart(eventNames,numberOfAttendence);
        event_pie_chart(eventNames,pieData)
    })

    }

)
var table_datas= []
let event_attendance_user;
const table_output = (user) =>{
    return(`
        <tr>
        <td>${user.fullName}</td>
        <td><a href>${user.college}</a></td>
        <td>${user.position}</td>
        <td data-value="78025368997">${user.phone_no}</td>
        <td data-value="1"><span class="label success" title="Active">${user.status}</span></td>
        </tr>
    `)
}

fetch('http://localhost:3000/users').then(data => data.json()).then(users => {
    total_users = users.length;
    let percentChartArr ={eventNames:[],totals:[]}

    fetch('http://localhost:3000/events').then(d=> d.json()).then(data => {
        let lastest_event = data[data.length-1]
        console.log(data);
        let temp = []

        for(let i=(data.length-1);i>(data.length)-5;i--){
            temp.push(data[i]);
        }
        let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        let values = []

        let userEvents = fetch('http://localhost:3000/users-events').then(d=>d.json())
        console.log(userEvents);
        // temp.forEach(i=>{
        //     //for adding values for event percentage chart
        //     //percentChartArr.totals.push(i.date)  //Modify it
        //     userEvents.then(j=> {
        //         percentChartArr.totals.push(Math.round(((j.eventIds.filter(j => j==i.id).length)/total_users)*100).toFixed(0))
        //     })
        //     percentChartArr.eventNames.push(i.name);
            
        // })
        // console.log(percentChartArr);
        // console.log("temp => ",temp);

        
        //document.getElementById('event_attendance_percentage_chart').innerHTML += lastest_event.createdAt.split('T')[0];

    } )
    
    total_user_element.innerHTML= total_users+' <span class="text-sm">Total Member</span>'
    let pending_user=[];
    for(let i of users){
        (i.status == 'pending') ? pending_user.push(i) : '';
        table_datas.push([i.fullName,i.position,i.createdAt,i.status])
    }
    
    return {data:gender_analyer(users),pending:pending_user,percentChartArr:percentChartArr}
}).then(async(datas) => {
    let {eventNames, totals} = datas.percentChartArr
    // event_pie_chart(eventNames,totals)
    console.log("D",datas);
    data = await datas.data;
    pending_member.innerHTML = datas.pending.length+ ' pending members';
    // render_table(table_datas,)
    user_table('Member','http://localhost:3000/profile','dashtable')
    keys = [];
    values = [];
    Object.keys(data).map(k=>keys.push(k))
    Object.values(data).map(k=>values.push(k))
    return {keys,values};
})
.then(data=>{
    console.log("TO Gender Chart ",data);
    gender_chart(data.values,data.keys)
})


let usage = [
    {value: 335, name: 'Direct'},

    {value: 310, name: 'Mail'},
    
    {value: 234, name: 'Affiliate'},

    {value: 135, name: 'AD'},

    {value: 1548, name: 'Search'},
]

const gender_analyer = (arr) =>{
    let gender_arr = []
    for (let i of arr){
        (gender_arr[i.gender]) ? (gender_arr[i.gender]++) : gender_arr[i.gender] =1;
    }
    return gender_arr
}

fetch('http://localhost:3000/projects').then(data => data.json()).then(projects => {
    let monthString = "JanFebMarAprMayJunJulAugSepOctNovDec"
    let months = monthString.match(/.{1,3}/g)
    let tempArr = [...projects];
    
    console.log(tempArr);
    let mont = 0
    let total_created_project=[];
    let total_finished_project = [];
    let dates = []
    let superArr = []
    let superArr2 = []
    let temp = [...tempArr];
    temp.filter(i => i.dates =new Date(i.date).getMonth())
    let year = (temp[temp.length-1].date).split('T')[0].split('-')[0]
    console.log("Latest Year +> ",year);
    
    for (let  mont = 0; mont < 12; mont++){
        let arr = temp
        let arr1;
        let arr2;
        arr1 = arr.filter(i => (i.dates) == mont)
        if(arr1.length>0){
            for(let a of arr1){
                assArrAdder(superArr,months[a.dates]) 
            }
        }

        
        arr2 = arr.filter(i => (i.dates) == mont && i.hasFinished == true)
        arr2.length = arr2.length ? arr1.length -arr2.length : 0
        if(arr2.length>0) for(let b of arr2) assArrAdder(superArr2,months[b.dates])
        // total_created_project.push(arr1.length)
        // total_finished_project.push(arr2.length)
        
    }

    let arr1=[];
    let arr2 = []
    for (let k of Object.keys(superArr)) {
        arr1.push(superArr[k])
        arr2.push(superArr2[k])
        dates.push(dateCreator(k,year,monthString))
    };


    finished_project = tempArr.filter(i => i.hasFinished == true)
    total_project = projects.length;
    total_project_element.innerHTML = total_project+' <span class="text-sm">Projects</span>'
    let current_projects = []
    for(let i of projects){
        console.log("Get Month => ",new Date(i.date).getMonth());

        current_projects.push(i)
    } 
    return {data:projects,current:current_projects,pj_record:{arr1,arr2,dates}}
}).then(data => {
    current_member.innerHTML = (data.current.length>1) ?data.current.length+' current projects' : data.current.length+' current project' 
    project_record(data.pj_record)

})


const render_table = (input_data,inputId) => {
    let table = new gridjs.Grid({
        columns: ["FullName", "Position", "Since","Status"],
        pagination:{
            limit:5,
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
              'results': () => 'Members'
            }
        },
        resizable:true,
        search:true,
        data: input_data,
        }).render(document.getElementById(inputId));

}


const assArrAdder = (assArr,key)=>{
    (assArr[key] )? assArr[key]=assArr[key] +1 : assArr[key]=1; 
}

let dateCreator = (inputMonth,inputYear,monthString) =>{
    console.log(inputMonth,inputYear,monthString);
    let currentMonth = monthString.indexOf(inputMonth) / 3 + 1
    return currentMonth+'/01/'+inputYear+' GMT' 
}



function event_attendance_generator(attendence,total_user){
    return Math.round(Number.parseFloat((attendence/total_user *100)).toFixed(1))
}


fetch('http://localhost:3000/latest-finance-data',(req,res)=>{
    let data = JSON.parse(req.body);
    console.log("Finance Data",data);
})




//Lib get Date Creator function

function getDate(string) {
    let d = new Date(string);
    return (d.getMonth()+1)+'/'+(d.getDate()+1)+'/'+d.getUTCFullYear();
}



//Finance Data 
fetch('/read-finance-data').then(d => d.json()).then(({data}) => {
    
    console.log(data);
    let values = data.values;
    let latestData = values[values.length-1];
    console.log(values);
    document.getElementById('total_m').innerHTML = latestData+' <span class=\"text-sm\">Balance</span>';
    spendingPieChart(data.names,values)

})
