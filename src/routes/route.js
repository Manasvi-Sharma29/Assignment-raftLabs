const express = require('express')
const { author } = require('../controllers/authors')
const router = express.Router()
const{book, bookByISBN, bookByEmail, booksAndMagazines, createBook, createBookCSV} = require('../controllers/books')
const {magazine, magazineByISBN, magazineByEmail, createMagazineCSV} = require('../controllers/magazine')

//author routes
router.get('/authors',author)

//book routes
router.get('/books', book)
router.get('/booksByISBN/:isbn',bookByISBN)
router.get('/booksByEmail/:email',bookByEmail)
router.get('/booksAndMagazines',booksAndMagazines)
router.post('/createBookCSV',createBookCSV)

//magazine routes
router.get('/magazines', magazine)
router.get('/magazinesByISBN/:isbn',magazineByISBN)
router.get('/magazinesByEmail/:email',magazineByEmail)
router.post('/createMagazineCSV',createMagazineCSV)


//Validating the endpoint
router.all("/*", function (req, res) {
    return res
      .status(404)
      .send({ status: false, message: "Page Not Found" });
});

module.exports = router