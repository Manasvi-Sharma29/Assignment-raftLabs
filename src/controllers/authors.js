const {readCSV} = require('../readCSV')
const authorModel = require('../models/authorModel')


//reading author's data from csv
const author = async function(req, res){
    const data = await readCSV('./authors.csv')
    console.log(data)
    let result = await authorModel.insertMany(data)
    return res.status(200).send(result)    
}

module.exports = {author}