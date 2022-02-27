
const  xml2js = require('xml2js');
const {xml2xsd,
    xsd2jsonSchema,
    json2xsd,
    validateXml,
    detectXmlSchema,
    jsonSchema2xsd
} = require('xsdlibrary')
//xml to json : 
const xmlJsonParser = (xmlString, callback)=>{
    const parser = new xml2js.Parser();
    parser.parseStringPromise(xmlString).then(function (result) {
        callback(result)
        //console.log(util.inspect(result, false, null, true));
    
  
    })
    .catch(function (err) {
        callback('failure'+err)
    // Failed
    });

}
    
     

//analyse and create xsd : 
const first = (response, callback)=>{
    callback(xml2xsd(response))
}

const second = (response, callback)=>{
    callback(xsd2jsonSchema(response))
}



module.exports =  {first, second, xmlJsonParser}
