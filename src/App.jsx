import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/header/header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import "./App.scss";
import Register from "./pages/register";
import ListingPage from "./pages/ListingPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" index element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listing/:listingId" element={<ListingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
