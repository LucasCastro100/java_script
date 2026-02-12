'use client'

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function Container({ children, className=""}: ContainerProps) {
    return (
        <section className={`p-2 ${className}`}>
            {children}
        </section>
    )
}