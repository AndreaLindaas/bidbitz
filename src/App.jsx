import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import "./App.scss";
import Register from "./pages/Register/Register";
import ListingPage from "./pages/ListingPage/ListingPage";
import CreateListing from "./pages/CreateListing/CreateListing";
import Logout from "./pages/Logout/Logout";
import EditListing from "./pages/EditListing/EditListing";
import Profile from "./pages/Profile/Profile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" index element={<Home />}></Route>
            <Route path="/create" element={<CreateListing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/listing/:listingId" element={<ListingPage />} />
            <Route path="/listing/edit/:listingId" element={<EditListing />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );

}

export default App;
