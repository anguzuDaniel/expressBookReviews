const express = require('express');
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

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const ISBN = req.params.isbn;
  const bookByISBN = books[ISBN];

  if (bookByISBN) {
    return res.status(200).json(bookByISBN);
  } else {
    return res.status(404).json({ message: 'No book found for ISBN'});
  }
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author.toLowerCase();
  const booksByAuthor = Object.values(books).filter(book => book.author.toLowerCase() === author);
  
  if (booksByAuthor.length > 0) {
    return res.status(200).json(booksByAuthor);
  } else {
    return res.status(404).json({ message: 'Author not found' });
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title.toLowerCase(); // Get the title from the request parameters and convert to lowercase for case-insensitive matching
  const booksByTitle = Object.values(books).filter(book => book.title.toLowerCase() === title); // Filter books by title

  if (booksByTitle.length > 0) {
    return res.status(200).json(booksByTitle); // Return the filtered books
  } else {
    return res.status(404).json({message: "No book with the provided title found."}); // Return a 404 if the title is not found
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
