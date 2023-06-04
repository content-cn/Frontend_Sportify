import { useEffect } from "react";
import "./App.css";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setAuthUser } from "./redux/reducers/authReducer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/UI/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Teams from "./pages/Teams/Teams";
import Players from "./pages/Players/Players";
import FavoritePlayers from "./pages/FavoritePlayers/FavoritePlayers";
import SearchPlayers from "./pages/SearchPlayers/SearchPlayers";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setAuthUser({ user }));
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" exact element={<Register />} />
        <Route path="/signin" exact element={<Login />} />
        <Route path="/teams/:id" exact element={<Teams />} />
        <Route path="/players/:id" exact element={<Players />} />
        <Route path="/favorites" exact element={<FavoritePlayers />} />
        <Route path="/search" exact element={<SearchPlayers />} />
        {/* NotFoundPage would be rendered if an invalid route is tried to access */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
