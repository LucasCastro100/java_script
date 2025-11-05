import { Link } from "react-router-dom";

type LinkHeaderProps = {
    url: string
    title: string
    className?: string
}

export function LinkHeader({ url, title, className }: LinkHeaderProps) {
    return (
        <Link to={url}>
            <h1 className={`font-medium text-xl text-center py-1 px-2 
                ${className}`}>{title}</h1>
        </Link>
    )
}