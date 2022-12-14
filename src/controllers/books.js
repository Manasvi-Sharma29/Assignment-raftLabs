const bookModel = require('../models/bookModel')
const {readCSV} = require('../readCSV')
const magazineModel = require('../models/magazineModel')
const fs = require('fs')
const {Parser} = require('json2csv')

//reading book data from scv
const book = async function(req, res){
    const data = await readCSV('./books.csv')
    let result = await bookModel.insertMany(data)
    return res.status(200).send(result)    
}

//getting book by isbn
const bookByISBN = async function(req,res){
    const data = await bookModel.findOne({isbn:req.params.isbn})
    if(data)return res.status(200).send(data)
    return res.status(404).send({Error:"Book does not exist"})
}

//getting book by author's email
const bookByEmail = async function(req, res){
    const book = await bookModel.find()
    let data = []
    for(i=0; i<book.length; i++){
        let authors = book[i].authors.split(";")
        if(authors.includes(req.params.email))data.push(book[i])
    }
    if(data.length>0)return res.status(200).send(data)
    else return res.status(404).send({Error:"Book does not exist"})
}

//sorting book and magazine together by title
const booksAndMagazines = async function(req,res){
   let books = await bookModel.find()
   const magazines = await magazineModel.find()
    books = [...books,...magazines]
    books.sort((a,b)=> a.title.localeCompare(b.title))
    return res.status(200).send(books)
}

//adding new data to db and exporting it into new csv file
const createBookCSV = async function(req,res){
    let book = req.body
    await bookModel.create(book)
    const data = await bookModel.findOne(book).select({_id:0,__v:0}) 
    const jsonParser = new Parser()
    const csv = jsonParser.parse(data._doc)
    fs.writeFile("booksNew.csv",csv,(err)=>{
        if(err){
            throw err
        }
        console.log("New CSV File Exported")
    })
    res.attachment("bookNew.csv");
    res.status(201).send(data._doc)
}

module.exports = {book, bookByISBN, bookByEmail, booksAndMagazines, createBookCSV}