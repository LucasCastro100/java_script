import { Link } from "react-router-dom";
import type { ReactNode } from 'react';

interface SocialProps {
    url: string;
    children: ReactNode
}

export function Social({url, children}: SocialProps) {
    return (
        <Link to={url} target="_blank" rel="noopener noreferrer" className="rounded-md border border-white p-2">
            {children}
        </Link>
    )
}