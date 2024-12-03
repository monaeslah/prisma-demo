// routes/author.routes.js

const express = require('express')
const router = express.Router()

const prisma = require('../db/index')

//  POST /api/authors  -  Creates a new author
router.post('/authors', (req, res, next) => {
  const { firstName, lastName, bio } = req.body

  const newAuthor = {
    firstName,
    lastName,
    bio
  }

  prisma.author
    .create({ data: newAuthor })
    .then(author => {
      console.log('New author created', author)
      res.status(201).json(author)
    })
    .catch(err => {
      console.log('Error creating new author', err)
      res.status(500).json({ message: 'Error creating new author' })
    })
})
router.get('/authors', (req, res, next) => {
  prisma.author
    .findMany()
    .then(authors => {
      console.log('Authors retrieved:', authors)
      res.status(200).json(authors)
    })
    .catch(err => {
      console.error('Error retrieving authors:', err)
      res.status(500).json({ message: 'Error retrieving authors' })
    })
})

module.exports = router
