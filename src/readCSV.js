const csv = require('csv-parser')
const fs = require('fs')

//function to read different csv files
const readCSV = function(file){
    let results = []
    return new Promise((resolve, reject)=>
    fs.createReadStream(file)
    .pipe(csv({}))
    .on('error', error => {
        reject(error);
    })
    .on('data',(data)=> results.push(data))
    .on('end', ()=>{
        resolve(results)
    }))
}


module.exports = {readCSV}



