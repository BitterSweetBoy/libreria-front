import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BooksList from "./components/BooksList";
import AddBook from "./components/AddBook";
import BookDetail from "./components/BookDetail";
import EditBook from "./components/EditBook"; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/agregar" element={<AddBook />} />
        <Route path="/libro/:id" element={<BookDetail />} />
        <Route path="/libro/:id/editar" element={<EditBook />} /> 
      </Routes>
    </Router>
  );
};

export default App;
