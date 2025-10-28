import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode
};

export function SubContainer({ children }: ContainerProps) {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {children}
    </div>
  );
}