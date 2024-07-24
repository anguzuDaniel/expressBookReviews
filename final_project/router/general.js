const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const { authenticatedUser } = require('../utils/authenticateUser.js');
const jsonwebtoken = require('jsonwebtoken');
const doesExist = require('../utils/doesExit.js');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username or & password required" });
  }

  if (doesExist(username)) {
    return res.status(400).json({ message: "Username already exists" })
  }

  // Register the new user
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

public_users.get('/books', (req, res) => {
  res.json(books);
});

let fetchBooks = new Promise((resolve, reject) => {
  axios.get("http://localhost:5000/books")
  .then(response => {
    resolve(response.data)
  })
  .catch(error => {
    reject(error.message)
  })
})

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  fetchBooks.then((booksList) => {
    return res.status(200).json(booksList);
  }).catch((errorMessage) => {
    return res.status(500).json({ message: "Error fetching books:", error: errorMessage })
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const ISBN = req.params.isbn;

  fetchBooks.then((booksLists) => {
    const bookByISBN = booksLists[ISBN];

    if (bookByISBN) {
      return res.status(200).json(bookByISBN);
    } else {
      return res.status(404).json({ message: 'No book found for ISBN'});
    }
  }).catch((errorMessage) => {
    return res.status(500).json({ message: "Error fetching books:", error: errorMessage });
  })
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author.toLowerCase();

  fetchBooks.then((booksList) => {
    const booksByAuthor = Object.values(booksList).filter(book => book.author.toLowerCase() === author);
  
    if (booksByAuthor.length > 0) {
      return res.status(200).json(booksByAuthor);
    } else {
      return res.status(404).json({ message: 'Author not found' });
    }
  }).catch(errorMessage => {
    return res.status(500).json({ message: "Error fetching books:", error: errorMessage });
  })

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title.toLowerCase();

  fetchBooks.then((booksList) => {
    const booksByTitle = Object.values(booksList).filter(book => book.title.toLowerCase() === title);

    if (booksByTitle.length > 0) {
      return res.status(200).json(booksByTitle);
    } else {
      return res.status(404).json({message: "No book with the provided title found."});
    }
  }).catch(errorMessage => {
    return res.status(500).json({ message: "Error fetching books:", error: errorMessage });
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
