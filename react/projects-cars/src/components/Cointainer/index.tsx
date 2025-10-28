import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode
};

export function Container({ children }: ContainerProps) {
  return (
    <div className="w-full h-full space-y-4">
      {children}
    </div>
  );
}
