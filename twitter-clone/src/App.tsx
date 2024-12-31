import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Twitter from "./pages/twitter/Twitter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/twitter",
    element: <Twitter />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
