// src/App.js

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreateListing from "./pages/CreateListing";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import PageWrapper from "./components/PageWrapper"; // Import PageWrapper
import ViewListing from "./pages/ViewListing";

const AppContent = () => {
  const location = useLocation();

  // Define paths where PageWrapper should be excluded
  const isAuthPage = ["/signup", "/login"].includes(location.pathname);

  return (
    <div>
      {!isAuthPage && <Header />}

      {/* Conditionally wrap non-auth pages with PageWrapper */}
      {isAuthPage ? (
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      ) : (
        <PageWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createListing" element={<CreateListing />} />
            <Route path="/viewListing/:id" element={<ViewListing />} />
          </Routes>
        </PageWrapper>
      )}

      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
