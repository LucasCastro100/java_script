'use client'

interface SiteProps {
    children: React.ReactNode;
    className?: string;
}

export function Site({ children, className="" }: SiteProps) {
    return (
        // header

        <div className={`flex-1 bg-gray-900 text-gray-200 ${className}`}>
            {children}
        </div>

        // footer
    )
}