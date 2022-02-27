const request = require('postman-request');
const fs = require('fs')
var requestx = require('request');







const accessToken = (callback) =>{

    request({url:'https://accounts.zoho.com/oauth/v2/token?refresh_token=1000.cc9c6464d87987a8ad3717e9d1a3d3f8.69ed82c78cecbd2f00dd88816873c7a2&client_id=1000.GABQ85A6KU5HME2V7HF1G658FTLUMH&client_secret=1917a314461e8d3c4d52ec81f5245bc7e7fc33f510&redirect_uri=https://example.com/callback&grant_type=refresh_token',json:true,method:'POST'},(error,response)=>{
        if(error){
            callback('unable to connect to zoho service',)

        } else if(response.body.error){
            callback(body.error)
        }else{ 
            //console.log(response.body)
            callback(undefined, response.body)
        }

    })

}

const downloadFile = (fileId,accessToken,callback)=>{
   const options = {
        url: 'https://workdrive.zoho.com/api/v1/download/'+fileId,
        headers: {Authorization:'Zoho-oauthtoken '+accessToken},
        json:true,
        method:'GET'

    }
    //console.log(options)
    request(options,(error,response)=>{

        if(error){
            callback('connection problem')
        }else if(response.error){
            callback(response.error)
        }else{
            callback(undefined,response.body)
        }

    })

}



const uploadFile =(parentId,accessToken,callback) =>{
    const options = {
        'method': 'POST',
        'url': 'https://workdrive.zoho.com/api/v1/upload?parent_id='+parentId,
        'headers': {
          'Authorization': 'Zoho-oauthtoken '+accessToken,
          'Cookie': '18d3a4e635=34d679f8fce1580ae6537cd166d602f3; JSESSIONID=16E895880E235254B63B8AAC681D43D0; _zcsr_tmp=6b16fda5-3b69-4195-8b04-a7460af3a7df; zpcc=6b16fda5-3b69-4195-8b04-a7460af3a7df'
        },
        formData: {
          'content': {
            'value': fs.createReadStream('../files/output.csv'),
            'options': {
              'filename': '',
              'contentType': null
            }
          }
        }
      };
      requestx(options, function (error, response) {
        if (error) return callback(error);
        callback(undefined,response.body);
      });

    
}



// accessToken((error,data)=>{
//     //console.log(data)
//     if(error){
//         return console.log(error)
//     }
//     console.log(data)
//     // downloadFile('f20041f884d71f8f146a2b1947012e367fc8c',data.access_token,(err,data)=>{
//     //     //console.log(err)
//     //     if(err){
//     //         return console.log(err)
//     //     }

//     // })
//     uploadFile('f2004cf072d0c5dd140dca6036fd368c34105',data.access_token,(err,data)=>{

//         if(err){
//             return console.log(err)
//         } 
//         console.log(data)
//     })

// })
module.exports = {uploadFile, downloadFile, accessToken}