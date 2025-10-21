import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./components/Layout";


export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
            path: "/",
            element: <Home />
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);
