import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Post from './pages/Post'

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/post/:id' element={ <Post /> } />
                <Route path='*' element={ <NotFound /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp