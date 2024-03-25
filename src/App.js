import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import RootLayout from "./components/RootLayout";
import SignIn from "./components/SignIn";
import Cart from "./components/Cart";
import SignUp from "./components/SignUp";
import CheckoutPage from "./components/CheckoutPage";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_PATH;

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/checkout" element={<CheckoutPage />}></Route>
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;