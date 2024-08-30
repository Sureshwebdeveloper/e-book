import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import { StoreContext } from "./context/DataContext";
import PrivateRoute from "./utils/PrivateRoute";
import SignIn from "./pages/Auth/SignIn";
import ManageBook from "./components/ManageBook.jsx"
import UploadBook from "./components/UploadBook.jsx"
import UsersList from "./components/UsersList.jsx"
import Orders from "./components/Orders.jsx"
import UpdateBook from "./components/UpdateBook.jsx";

const App = () => {
  const { token,authenticated } = useContext(StoreContext);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        {token && <NavBar />}
        <Routes>
        {!token && !authenticated && <Route path="/" element={<SignIn/>}/>}
        <Route element={<PrivateRoute/>}>
          <Route path="/" element={<UploadBook />} />;
          <Route path="/manage" element={<ManageBook />} />;
          <Route path="/users" element={<UsersList />} />;
          <Route path="/orders" element={<Orders />} />;
          <Route path="/update/:id" element={<UpdateBook />} />;
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
  

export default App;
