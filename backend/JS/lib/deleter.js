const {PythonShell} = require('python-shell')
const path  = require('path')
const csvDeleter = async(inputName) =>{
    let fileDir = await path.join(__dirname,'\\output')
    console.log(fileDir);
    let options={
        args:[fileDir]
    }
    await PythonShell.run('lib\\delete.py', options, function (res,err) {
        if (err) console.log(err);;
        console.log("from py",res);
        console.log('finished');
      });
}

module.exports = csvDeleter;