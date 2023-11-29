import Login from "./component/form/login";
import Home from "./component/home";
import SignUp from "./component/form/signup";
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import PrivateRoute from "./Route/privateRoute";
import PublicRoute from "./Route/publicRoute";
import CustomRoom from "./component/customRoom/customRoom";

function App() {
  const navigate = useNavigate();
  const handleUserLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="App">
      <div className="d-flex justify-content-end w-100 pt-4 pe-3 pe-md-5">
        {!localStorage.getItem("accessToken") ? (
          <>
            <NavLink className="me-5" to="/signup">
              Signup
            </NavLink>

            <NavLink to="login">Login</NavLink>
          </>
        ) : (
          <button className="btn btn-danger" onClick={handleUserLogout}>
            Logout
          </button>
        )}
      </div>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute route="login">
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute route="signup">
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/custom_room/:roomCode"
          element={
            <PrivateRoute>
              <CustomRoom />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
