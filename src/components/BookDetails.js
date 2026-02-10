import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBook, deleteBook } from "../services/api";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBook = async () => {
      try {
        const res = await getBook(id);
        setBook(res.data);
      } catch (err) {
        console.error(err);
        setError("Book not found. Check the ID or JSON Server.");
      }
    };
    loadBook();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Delete this book?")) {
      try {
        await deleteBook(id);
        navigate("/"); // back to table
      } catch (err) {
        alert("Failed to delete book");
        console.error(err);
      }
    }
  };

  if (error)
    return (
      <div className="container" style={{ color: "red", fontWeight: "600" }}>
        {error}
      </div>
    );

  if (!book) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      {/* Card container */}
      <div
        style={{
          padding: "30px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          maxWidth: "700px",
          margin: "0 auto"
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            fontSize: "2rem",
            color: "#1f2937",
            fontWeight: "700"
          }}
        >
          {book.title}
        </h2>

        <p style={{ margin: "8px 0", fontSize: "1rem" }}>
          <b>Author:</b> {book.author}
        </p>
        <p style={{ margin: "8px 0", fontSize: "1rem" }}>
          <b>Publisher:</b> {book.publisher}
        </p>
        <p style={{ margin: "8px 0", fontSize: "1rem" }}>
          <b>Published Date:</b> {book.publishedDate}
        </p>
        <p
          className="overview"
          style={{
            marginTop: "15px",
            fontStyle: "italic",
            color: "#4b5563"
          }}
        >
          <b>Overview:</b> {book.overview}
        </p>

        {/* Buttons row */}
        <div
          style={{
            marginTop: "25px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          }}
        >
          <button
            className="edit"
            onClick={() => navigate(`/edit/${book.id}`)}
          >
            Edit
          </button>
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
          <button className="back" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
