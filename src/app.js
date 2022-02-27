const path = require('path')
const express = require('express')
const workdriveApi = require('./utils/workdriveApi.js')
const xmlJson = require('./utils/xmlJson.js')
const jsonCsv = require('./utils/json_csv.js')
const { fstat } = require('fs')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../files')


app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.send('hello world')
})

app.get('/xmlCsv', (req, res) => {
    if (!req.query.fileId||!req.query.folderId) {
        return res.send({
            error: 'Wrong Parameters!'
        })
    }
    //res.send('downloading file')
    workdriveApi.accessToken((error,data)=>{
        //console.log(data)
        if(error){
            return console.log(error)
        }
        console.log(data)
        workdriveApi.downloadFile(req.query.fileId,data.access_token,(err,data)=>{
            //console.log(err)
            if(err){
                return console.log(err)
            }
            //res.send('parsing to json')
            xmlJson.xmlJsonParser(data,(data)=>{
                console.log('json :')
                console.log(data)
                //res.send('creating csv file')
                jsonCsv(data,(err,csv)=>{
                    console.log('entered')
                    if(err){
                        console.log('error in csv creating')
                        return console.log(err,)
                    }

                    workdriveApi.accessToken((error,data)=>{
                        if(error){
                            return console.log(error)
                        }
                        console.log(data)
                        //res.send('uploading csv file to workdrive')
                        workdriveApi.uploadFile(req.query.folderId,data.access_token,(err,data)=>{

                            if(err){
                                return console.log(err)
                            } 
                            console.log(data)
                            res.send({

                                success: 'check your workdrive folder!',
                                details: data
                                
                            })
                            fs.unlink('../files/output.csv', (err) => {
                                if (err) {
                                  console.error(err)
                                  return
                                }
                              
                                //file removed
                              })

                        })
                    })
                })
            })
    
        })
       
        
    
    })

    

    

})





app.listen(port, () => {
    console.log('Server is up on port ' + port)
})