import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { LayoutDashboard } from "./components/Layout/dashboard";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { LayoutHome } from "./components/Layout/home";
import { CarDetail } from "./pages/Car";
import { LayoutMain } from "./components/Layout/main";
import { NewCar } from "./pages/Dashboard/Car/New";
import { LayoutAuth } from "./components/Layout/auth";
import { Private } from "./routes/Private";
import { Perfil } from "./pages/Dashboard/Perfil";
import { MyCars } from "./pages/Dashboard/Car";

export const router = createBrowserRouter([

    {
        element: <LayoutMain />,
        children: [
            {
                element: <LayoutHome />,
                children: [
                    {
                        path: "/",
                        element: <Home />
                    },
                    {
                        path: "/car-detail/:uid",
                        element: <CarDetail />
                    },
                ]
            },
            {
                element: <Private><LayoutDashboard /></Private>,
                children: [
                    {
                        path: "/dashboard",
                        element: <Dashboard />
                    },
                    {
                        path: "/dashboard/my-cars",
                        element: <MyCars />
                    },
                    {
                        path: "/dashboard/new-car",
                        element: <NewCar />
                    },
                    {
                        path: "/dashboard/perfil",
                        element: <Perfil />
                    },
                ]
            },
            {
                element: <LayoutAuth />,
                children: [
                    {
                        path: "/login",
                        element: <Login />
                    },
                    {
                        path: "/register",
                        element: <Register />
                    },

                ]
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    },

]);
