# Express Book Reviews API

Welcome to the **Express Book Reviews API**! This project is a modern, efficient, and easy-to-use RESTful API

## 🚀 Features

- **User Registration**: Secure registration of users with basic authentication.
- **Book Management**: Retrieve book details, search by ISBN, author, or title.
- **Review Management**: Add, update, and delete reviews for books.
- **Async Data Fetching**: Utilize Axios for efficient data retrieval.

## 💻 Technologies Used

- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Web framework for Node.js, designed for fast and flexible API development.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **JavaScript ES6+**: Modern JavaScript features for cleaner and more readable code.

## 📖 API Endpoints

### User Endpoints

- **Register User**: `POST /register`
  - Request Body: `{ "username": "string", "password": "string" }`
  - Response: `{ "message": "User registered successfully" }`

### Book Endpoints

- **Get All Books**: `GET /`
  - Response: List of all books in JSON format.

- **Get Book by ISBN**: `GET /isbn/:isbn`
  - Response: Details of the book with the given ISBN.

- **Get Books by Author**: `GET /author/:author`
  - Response: List of books written by the given author.

- **Get Books by Title**: `GET /title/:title`
  - Response: List of books with the given title.

### Review Endpoints

- **Add/Update Review**: `PUT /auth/review/:isbn`
  - Request Body: `{ "review": "string" }`
  - Response: `{ "message": "Review added/updated successfully" }`

- **Delete Review**: `DELETE /auth/review/:isbn`
  - Request Body: `{ "review": "string" }`
  - Response: `{ "message": "Review deleted successfully" }`

## 📸 Screenshots

- **Task 10**: [task10.png](path/to/task10.png) - Screenshot of book list fetching.
- **Task 11**: [task11.png](path/to/task11.png) - Screenshot of book details fetching by ISBN.

## 📫 Contact

For any inquiries or feedback, feel free to reach out:

- **Email**: anguzud7@gmail.com
- **LinkedIn**: [Your LinkedIn Profile](https://www.linkedin.com/in/anguzu-daniel-7b793023a/)
- **GitHub**: [Your GitHub Profile](https://github.com/anguzuDaniel)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.