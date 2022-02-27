const fs = require('fs');

const createFileJson = function (file,fileName){
    fs.writeFileSync(fileName,JSON.stringify(file))
  }

  const fileReader = (directory,callback) => {
        fs.readFile(directory, (err, data) => {
            if(err){
                callback(err.toString())
                
            }
            callback(data.toString())
                
         })
    }



module.exports= {createFileJson, fileReader}


