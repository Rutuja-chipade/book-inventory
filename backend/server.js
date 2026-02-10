const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");


const app = express();

app.use(cors());
app.use(express.json());

let books = [];

// Get all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// Add new book
app.post("/api/books", (req, res) => {
  const book = { id: Date.now(), ...req.body };
  books.push(book);
  res.json(book);
});

// Delete book
app.delete("/api/books/:id", (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.json({ message: "Deleted" });
});
// Update book
app.put("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  books = books.map((b) =>
    b.id === id ? { ...b, ...req.body } : b
  );

  res.json({ message: "Updated" });
});
app.use("/api/auth", authRoutes);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
