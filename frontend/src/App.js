// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PageWrapper from "./components/PageWrapper"; // Import the PageWrapper
import "./index.css";
import ViewListing from "./pages/ViewListing";
import ProductPage from "./pages/ProductPage";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <PageWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/viewListing" element={<ViewListing />} />
            <Route path="/productPage" element={<ProductPage />} />
          </Routes>
        </PageWrapper>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
