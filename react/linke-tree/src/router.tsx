import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Notfound } from "./pages/Notfound";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";

import { Private } from "./routes/Private";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },     
      {
        path: '/admin',
        element: <Private><Admin /></Private>
      }
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
  {
    path: '/login',
    element: <Login />
  },
]);
