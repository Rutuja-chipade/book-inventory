import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/api";
import { Link } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await getBooks();
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <h1>📚 Book Inventory</h1>

        <Link to="/add">
          <button className="add-btn">+ Add Book</button>
        </Link>
      </div>

      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="6">No books found</td>
            </tr>
          ) : (
            books.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.publisher}</td>
                <td>{b.email}</td>
                <td>{b.age}</td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/edit/${b.id}`}>
                      <button className="edit-btn">
                        Edit
                      </button>
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(b.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
