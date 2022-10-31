const fs = require('fs')

class Special_Arr{
    constructor(x){
        this.length = x
        this.arr = Array.from({length:this.length},(x,i) =>(i))
        console.log(this.arr);
    }

    add(data){
        if(this.arr.length <5){
            this.arr.push(data)
        }
        if(this.arr.length >=5){
            while(this.arr.length >5){
                this.res = this.arr.pop();
                console.log(this.res);
            }
            this.arr.push(data)
        }
        console.log(this.arr);
    }

    writeFile(){
        console.log(JSON.stringify(`${this.arr}`));
    }
}
new Special_Arr(10).writeFile()
module.exports = Special_Arr;
