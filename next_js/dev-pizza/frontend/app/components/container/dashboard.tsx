'use client'

interface DashboardProps {
    children: React.ReactNode;
    className?: string;
}

export function Dashboard({ children, className="" }: DashboardProps) {
    return (
        // header

        <div className={`flex-1 bg-gray-900 text-gray-200${className}`}>
            {children}
        </div>

        // footer
    )
}