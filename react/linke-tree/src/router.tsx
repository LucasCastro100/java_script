import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Notfound } from "./pages/Notfound";
import { Login } from "./pages/Login";
import { Networks } from "./pages/Networks";
import { Admin } from "./pages/Admin";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/admin',
        element: <Admin />
      },
      {
        path: '/admin/social',
        element: <Networks />
      }
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);
