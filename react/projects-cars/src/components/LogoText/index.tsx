import { Link } from "react-router-dom";

export function LogoText() {
    return (
        <Link to={'/'} className="flex flex-row">
            <span className="font-bold text-3xl text-white">Dev</span>
            <span className="font-bold text-3xl text-red-700">Cars</span>
        </Link>
    )
}