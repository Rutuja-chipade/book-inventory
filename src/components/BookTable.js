import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks, deleteBook } from "../services/api";

function BookTable() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this book?")) {
      try {
        await deleteBook(id);
        fetchBooks(); // refresh dynamically
      } catch (err) {
        alert("Failed to delete book.");
      }
    }
  };

  return (
    <div className="container">
      <h1>Book Inventory</h1>
      <button className="add" onClick={() => navigate("/add")}>Add New Book</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td
                onClick={() => navigate(`/book/${book.id}`)}
                style={{ color: "#007bff", textDecoration: "underline" }}
              >
                {book.title}
              </td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>
                <button className="edit" onClick={() => navigate(`/edit/${book.id}`)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookTable;
