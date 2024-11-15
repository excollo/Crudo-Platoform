import OrderForm from "./pages/OrderForm";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SignInPage from "./pages/Signin/SignInPage";
import SignUpPage from "./pages/Signup/SignUpPage";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

// Create a wrapper component to handle NavBar rendering
const AppContent = () => {
  // Use useLocation hook to get current path
  const location = useLocation();
  const shouldShowNavbar = !["/signin", "/signup"].includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <NavBar />}
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <OrderForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
