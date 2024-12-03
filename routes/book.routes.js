// routes/book.routes.js

const express = require('express')
const router = express.Router()

const prisma = require('../db/index')

//  POST /api/books  -  Creates a new book
router.post('/books', (req, res, next) => {
  const { title, year, summary, quantity, genre, authorId } = req.body

  const newBook = {
    title,
    year,
    summary,
    quantity,
    genre,
    authorId
  }

  prisma.book
    .create({ data: newBook })
    .then(book => {
      console.log('New book created', book)
      res.status(201).json(book)
    })
    .catch(err => {
      console.log('Error creating new book', err)
      res.status(500).json({ message: 'Error creating new book' })
    })
})

//  GET /api/books -  Retrieves all of the books
router.get('/books', (req, res, next) => {
  prisma.book
    .findMany({ include: { author: true } })
    .then(allBooks => {
      res.json(allBooks)
    })
    .catch(err => {
      console.log('Error getting books from DB', err)
      res.status(500).json({ message: 'Error getting books from DB' })
    })
})

//  GET /api/books/:bookId -  Retrieves a specific book by id
router.get('/books/:bookId', (req, res, next) => {
  const { bookId } = req.params

  prisma.book
    .findUnique({ where: { id: bookId }, include: { author: true } })
    .then(book => {
      if (!book) {
        res.status(404).json({ message: 'Book not found' })
      } else {
        res.json(book)
      }
    })
    .catch(err => {
      console.log('Error getting book from DB', err)
      res.status(500).json({ message: 'Error getting book from DB' })
    })
})

// PUT  /api/books/:bookId  -  Updates a specific book by id
router.put('/books/:bookId', (req, res, next) => {
  const { bookId } = req.params

  const { title, year, summary, quantity, genre, authorId } = req.body

  const newBookDetails = {
    title,
    year,
    summary,
    quantity,
    genre,
    authorId
  }

  prisma.book
    .update({ where: { id: bookId }, data: newBookDetails })
    .then(updatedBook => {
      res.json(updatedBook)
    })
    .catch(err => {
      console.log('Error updating a book', err)
      res.status(500).json({ message: 'Error updating a book' })
    })
})

// DELETE  /api/books/:bookId  -  Deletes a specific book by id
router.delete('/books/:bookId', (req, res, next) => {
  const { bookId } = req.params

  prisma.book
    .delete({ where: { id: bookId } })
    .then(() => {
      res.json({ message: `Book with id ${bookId} was deleted successfully` })
    })
    .catch(err => {
      console.log('Error deleting a book', err)
      res.status(500).json({ message: 'Error deleting a book' })
    })
})

module.exports = router
