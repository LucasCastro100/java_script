import { ReactNode } from "react";

type Props = {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <h2>
        Página de autenticação
      </h2>
      
      <div>
        {children}
      </div>
    </div>
  )
}

export default Layout;