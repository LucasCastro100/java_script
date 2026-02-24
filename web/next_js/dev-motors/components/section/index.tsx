interface SectionProps {
    children: React.ReactNode;
    className?: string;
}

export function Section({ children, className }: SectionProps) {
    return (
        <section className={`${className}`}>
            <div className="w-full max-w-6xl mx-auto p-4">
                {children}
            </div>
        </section>
    );
}