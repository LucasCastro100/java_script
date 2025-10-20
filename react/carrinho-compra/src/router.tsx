import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./components/Layout";
import { InfoCart } from "./pages/InfoCart";


export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
            path: "/",
            element: <Home />
            },
            {
                path: "/cart",
                element: <Cart />
            },
             {
                path: "/cart/:id",
                element: <InfoCart />
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);
