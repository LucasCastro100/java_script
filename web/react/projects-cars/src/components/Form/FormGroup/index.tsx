import { ReactNode } from "react";

interface FormGroupProps {
    children: ReactNode;
    className?: string;
}

export function FormGroup({ children, className }: FormGroupProps) {
    return (
        <div className={`flex flex-col col-span-1 ${className}`}>
            {children}
        </div>
    );
}