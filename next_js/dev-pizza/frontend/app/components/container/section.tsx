'use client'

interface SectionProps {
    children: React.ReactNode;
    className?: string;
}

export function Section({ children, className="" }: SectionProps) {
    return (
        <div className={`w-full max-w-7xl mx-auto ${className}`}>
            {children}
        </div>
    )
}