import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/UseAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home></Home> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/login"
              element={!user ? <Login></Login> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/signup"
              element={!user ? <Signup></Signup> : <Navigate to="/" />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
