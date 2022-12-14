const magazineModel = require('../models/magazineModel')
const {readCSV} = require('../readCSV')
const fs = require('fs')
const {Parser} = require('json2csv')

//reading magazine data from csv
const magazine = async function(req,res){
    const data = await readCSV('./magazines.csv')
    let result = await magazineModel.insertMany(data)
    return res.status(200).send(result)
}

//getting magazine by isbn
const magazineByISBN = async function(req, res){
    const data = await magazineModel.findOne({isbn:req.params.isbn})
    if(data) return res.status(200).send(data[i])
    return res.status(404).send({Error:"Magazine not found"})
}

//getting magazine by author's mail
const magazineByEmail = async function(req, res){
    const magazine = await magazineModel.find()
    let data = []
    for(i=0; i<magazine.length; i++){
        let authors = magazine[i].authors.split(";")
        if(authors.includes(req.params.email))data.push(magazine[i])
    }
    if(data.length>0)return res.status(200).send(data)
    else return res.status(404).send({Error:"Book does not exist"})
}

//adding new data to db and exporting it into new csv file
const createMagazineCSV = async function(req,res){
    let magazine = req.body
    await magazineModel.create(magazine)
    const data = await magazineModel.findOne(magazine).select({_id:0,__v:0}) 
    const jsonParser = new Parser()
    const csv = jsonParser.parse(data._doc)
    fs.writeFile("magazineNew.csv",csv,(err)=>{
        if(err){
            throw err
        }
        console.log("New CSV File Exported")
    })
    res.attachment("magazineNew.csv");
    res.status(201).send(data._doc)
}
module.exports = {magazine, magazineByISBN, magazineByEmail,createMagazineCSV}