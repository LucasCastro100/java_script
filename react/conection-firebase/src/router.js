import { BroserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function RoutesApp() {
    return (
        <BroserRouter>
            <Routes>
                <Route path='/' element={ <Home /> } />
            </Routes>
        </BroserRouter>
    )
}

export default RoutesApp