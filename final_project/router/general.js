const express = require('express');
let books = require("./booksdb.js");
const { authenticatedUser } = require('../utils/authenticateUser.js');
const jsonwebtoken = require('jsonwebtoken');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({message: "Error loggin in"});
  }

  if (authenticatedUser(username, password)) {
      let accessToken = jsonwebtoken.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 })

      req.session.authorization = {
        accessToken, username
      }

      return res.status(200).send("User successfully logged in");
  } else {
      return res.status(200).json({message: "Invalid Login. Check username and password"});
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(JSON.stringify(books))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const ISBN = req.body.isbn;
  //Write your code here
  return res.status(300).json({isbn: ISBN});
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
