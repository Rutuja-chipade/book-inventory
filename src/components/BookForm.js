import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addBook, getBook, updateBook } from "../services/api";

function BookForm({ onSave }) {
  const { id } = useParams(); // undefined for Add, set for Edit
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    publisher: "",
    publishedDate: "",
    overview: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // Load book for editing
      const loadBook = async () => {
        try {
          setLoading(true);
          const res = await getBook(id);
          setBook(res.data);
        } catch (err) {
          console.error(err);
          alert("Book not found.");
        } finally {
          setLoading(false);
        }
      };
      loadBook();
    }
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateBook(id, book);
      } else {
        await addBook(book);
      }

      if (onSave) onSave(); // callback to refresh table dynamically
      navigate("/"); // back to table
    } catch (err) {
      console.error(err);
      alert("Failed to save book.");
    }
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1>{id ? "Edit Book" : "Add New Book"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={book.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={book.author} onChange={handleChange} required />
        </div>
        <div>
          <label>Publisher:</label>
          <input type="text" name="publisher" value={book.publisher} onChange={handleChange} required />
        </div>
        <div>
          <label>Published Date:</label>
          <input type="date" name="publishedDate" value={book.publishedDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Overview:</label>
          <textarea name="overview" value={book.overview} onChange={handleChange} rows="4" required />
        </div>
        <div style={{ marginTop: "15px" }}>
          <button className="add" type="submit">{id ? "Update Book" : "Add Book"}</button>
          <button className="back" type="button" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default BookForm;
