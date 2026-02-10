import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookTable from "./components/BookTable";
import BookDetails from "./components/BookDetails";
import BookForm from "./components/BookForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookTable />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/add" element={<BookForm />} />
        <Route path="/edit/:id" element={<BookForm />} />
      </Routes>
    </Router>
  );
}

export default App;
