const pre_chart_ration_creater =(inputArr,point) =>{
    let res = []
    let arr2 = [...inputArr]
    arr2 =  arr2.sort() ;
    let end_index =arr2.length-1;
    for (let i=end_index; i >(end_index-point)  ;i--){
        res.push(arr2[i]);
        arr2.pop();
    }
    res.push(arr2.reduce((a,b)=> a+b))
    console.log(res);
    return res;
}
const chart_ration_creater = (arr,max_number) => {
    let firstRun = pre_chart_ration_creater(arr,max_number)
    while((firstRun[0]-30 ) < firstRun[max_number]){
        max_number++;
        firstRun = pre_chart_ration_creater(arr,max_number)
    }
}

let arr = [40,20,78,47,12]
chart_ration_creater(arr,3)
