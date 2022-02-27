const {xml2xsd,
    xsd2jsonSchema,
    json2xsd,
    validateXml,
    detectXmlSchema,
    jsonSchema2xsd
} = require('xsdlibrary')
const createFile = require('./createFile.js')


const first = (response, callback)=>{
    callback(xml2xsd(response))
}

const second = (response, callback)=>{
    callback(xsd2jsonSchema(response))
}



createFile.fileReader('/home/david/node/xmlCsv/files/test.xml',(response)=>{
    //console.log(response)
    first(response, (data)=>{
        console.log(data)
        second(data,(output)=>{
            console.log(output)
        })
        
    })
})
    




//  const tableCol = (jsonObj)=> {
//     let temp = Object.entries(jsonObj);
//     let fields= [];
//     for(let i=0; i < temp.length; i++){
//         [key, value] = temp[i]
//         if (typeof value === 'object' && !Array.isArray(value) && value !== null){
//             temp=temp.concat(Object.entries(value))
//             //console.log(Object.entries(value))
//         }
//         else{
            
//             fields.push(value)

//         }
//     }
//     return fields

//  }

//  module.exports = tableCol
