import FooterSite from "@/components/site/footer"
import HeaderSite from "@/components/site/header"

interface LayoutSiteProps {
    children: React.ReactNode
}

export default function LayoutSite({ children }: LayoutSiteProps) {
    return (
        <>
            <HeaderSite />

            <main className="flex flex-1">
                {children}
            </main>

            <FooterSite />
        </>
    )
}