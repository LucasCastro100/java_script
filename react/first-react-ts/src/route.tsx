import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages';
import { Layout } from './components/Layout';

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }

])

export { router };