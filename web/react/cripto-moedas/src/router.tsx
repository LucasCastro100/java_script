import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Detail } from './pages/Detail'
import { Notfound } from './pages/Notfound'

export const router = createBrowserRouter([{
    element: <Layout />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/detail/:cripto",
            element: <Detail />
        },
        {
            path: "*",
            element: <Notfound />
        }

    ]
}])