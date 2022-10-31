const fs = require("fs");
const path = require('path')
const fastcsv = require("fast-csv");
const csvDeleter = require("./deleter");

const exportCSV = async(inputJSON,outputDir)=>{
    console.log(path.join(__dirname+"\\output\\" + outputDir) );

    try{
        await fs.mkdirSync(path.join(__dirname,"\\output\\" ));
         
    }catch{
        console.log("exisit !!") 

    } 
    const ws = await fs.createWriteStream(path.join(__dirname,"\\output\\" + outputDir));
    let r =await fastcsv
    .write(inputJSON, { headers: true })
    .on("finish", function () {
    console.log("Write to itbuddies.csv successfully!");
    }).pipe(ws,(err)=>{
        csvDeleter(outputDir)
    })

    
    
    
}

module.exports = exportCSV;