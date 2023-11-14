import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/header/header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.scss";
function App() {
<<<<<<< Updated upstream
  return <>Hei</>;
=======
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" index element={<Home />}></Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
>>>>>>> Stashed changes
}

export default App;
