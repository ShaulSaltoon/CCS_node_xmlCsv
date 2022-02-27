const fs = require('fs')
const converter = require('json-2-csv');
const filer = require('/home/david/node/xmlCsv/src/utils/createFile.js')





const jsonCsv = (a,callback)=>{
  converter.json2csv([a],(err,csv)=>{
    //console.log(csv)
    if(err){
       return callback(err)
       
      
    }
    if(csv){
        fs.writeFileSync('../files/output.csv',csv)  
        callback(undefined,csv)
      
      }

  } , {unwindArrays: true}) 

}






module.exports = jsonCsv








