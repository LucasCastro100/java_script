interface SectionSiteProps {
    className?: string
    children: React.ReactNode
}

export default function SectionSite({ className = "", children }: SectionSiteProps) {
    return (
        <section className={`w-full ${className}`}>
            <div className="w-full max-w-6xl mx-auto p-4">
                {children}
            </div>
        </section>
    )
}