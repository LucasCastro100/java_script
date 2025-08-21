'use client';

import Image from "next/image";
import HeaderIcon from "./header-icon";
import Link from "next/link";
import { useState } from "react";
import HeaderSarch from "./header-search";

type Menuitem = {
    label: string;
    href: string;
}

const Header = () => {
    const menu: Menuitem[] = [
        { label: 'Camisas', href: '/categories/camisas' },
        { label: 'Kits', href: '/categories/kits' },
        { label: 'Acessórios', href: '/categories/acessorios' },
        { label: 'Eletrônicos', href: '/categories/eletronicos' }
    ]

    const [menuOpened, setMenuOpened] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="bg-black text-white text-center p-5">
                <strong>FRETE GRÁTIS</strong> para todo o Nordeste nas compras acima de R$ 199,00. <strong> APROVEITA!</strong>
            </div>

            <div className="w-full max-w-6xl mx-auto p-5">
                <div className="flex items-center justidy-center gap-4">
                    <div className="">
                        <Link href={'/'}>
                            <Image
                                src={"/assets/ui/logo-black.png"}
                                alt="LogoStore"
                                width={120}
                                height={40}
                            />
                        </Link>
                    </div>

                    <div className="flex-1">
                        <div className="w-full hidden lg:flex gap-4">
                            <div className="flex-1">
                                <ul className="flex h-full items-center justify-center gap-4">
                                    {menu.map((item) => (
                                        <li>
                                            <Link key={item.label} href={item.href}>
                                                <div className="font-medium text-lg text-gray-500">{item.label}</div>

                                            </Link>
                                        </li>

                                    ))}
                                </ul>

                            </div>

                            <div className="w-80">
                                <HeaderSarch/>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Link href={'/my-orders'}>
                            <HeaderIcon src="/assets/ui/user-line.png" alt="Perfil" />
                        </Link>

                        <Link href={'/cart'}>
                            <HeaderIcon src="/assets/ui/shopping-bag-4-line.png" alt="Carrinho" />
                        </Link>

                        <div className="lg:hidden" onClick={() => setMenuOpened(!menuOpened)}>
                            <HeaderIcon src="/assets/ui/menu-line.png" alt="Menu"
                                selected={menuOpened}
                                srcSelected="/assets/ui/menu-line-white.png" />
                        </div>
                    </div>
                </div>
            </div>

            {menuOpened &&
                <div className="lg:hidden pb-5">
                    {menu.map((item) => (
                        <Link key={item.label} href={item.href}>
                            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                                <div className="font-medium text-lg text-gray-500">{item.label}</div>

                                <Image
                                    src={"/assets/ui/arrow-up-right.png"}
                                    alt="Ir a categoria"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            }

            <div className="p-5 pt-0 lg:hidden">
                <HeaderSarch />
            </div>
        </header >
    );
}

export default Header;