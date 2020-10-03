require("dotenv").config();

const jwt = require("jsonwebtoken");

const express = require("express");
const app = express();

const books = require("./books.json");

app.use(express.json());

const users = [];

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(" ")[1];

  //no token
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  })
}

function searchBooks(q) {

  let res = [];

  books.forEach(book => {
    if (book.title.toLowerCase().search(q.toLowerCase()) >= 0) {
      res.push(book);
    }
  });

  return res;
}

app.get('/books', (req, res) => {
  res.json(books);
})

// app.

app.get('/search', (req, res) => {

  let q = req.param('q');

  let results = searchBooks(q);

  res.json(results);

})


app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/signup", (req, res) => {
  const user = {
    user: req.body.user,
    pass: req.body.pass,
  };
  users.push(user);
  res.status(201).send();
});

app.post("/login", (req, res) => {
  let user = users.find((u) => u.user == req.body.user);
  if (user && user.pass == req.body.pass) {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    res.json({
      accessToken
    })
  } else {
    res.status(400).send("Error");
  }
});

app.post("/purchase", authenticateToken, (req, res) => {
  console.log(req)
})

app.listen(5000);