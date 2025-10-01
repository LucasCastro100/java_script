import { Link } from "react-router-dom"

function NotFound(){
    return (
        <div className="_404">
            <p className="m-0 erro">404</p>
            <p className="m-0">OPSS... PÁGINA NÃO ENCONTRADA</p>
            <Link to="/" className="link">Ir para página inicial</Link>
        </div>
    )
}

export default NotFound