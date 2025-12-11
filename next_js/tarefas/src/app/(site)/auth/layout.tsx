import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode
}

export default function LayoutSite({ children }: LayoutProps) {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col gap-8 md:gap-12 max-w-[500px]">
                {children}
            </div>
        </div>
    )
}