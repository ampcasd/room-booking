import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Home } from "./components/Home/Home";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getEventDetails, preselectReservation } from "./app/reservationsSlice";
import { isUserLoggedIn } from "./app/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  console.clear();

  const dispatch = useAppDispatch();
  const loggedIn: boolean = useAppSelector(isUserLoggedIn);

  dispatch(getEventDetails()).then(() => dispatch(preselectReservation()));

  return (
    <div className="main-wrapper">
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Home></Home> : <Navigate to="/login"></Navigate>}
        />
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/"></Navigate> : <Login></Login>}
        />
      </Routes>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;
