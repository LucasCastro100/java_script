import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { LayoutDashboard } from "./components/Layout/dashboard";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { LayoutHome } from "./components/Layout/home";
import { CarDetail } from "./pages/Car";


export const router = createBrowserRouter([
    {
        element: <LayoutHome />,
        children: [
            {
                path: "/",
                element: <Home />
            },
        ]
    },
    {
        element: <LayoutDashboard />,
        children: [
            {
                path: "/car-detail",
                element: <CarDetail />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "*",
        element: <NotFound />
    }
]);
