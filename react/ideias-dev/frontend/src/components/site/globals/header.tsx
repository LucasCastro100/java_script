import { data } from "@/data";
import { MenuHeader } from "@/types/menuheader";
import Link from "next/link"

export const Header = () => {
    const list: MenuHeader[] = data.menuHeader;
    return (
        <header>
            <div className="w-full bg-white border-b border-gray-200">
                <div className="max-w-5xl mx-auto p-4">
                    <div className="flex items-center justidy-center gap-4">
                        <div className="flex">
                            <Link href="/" className="text-2xl font-bold text-gray-900">
                                IDEIAS DEV
                            </Link>
                        </div>

                        <div className="flex-1">
                            <div className="w-full hidden lg:flex gap-4">
                                <div className="flex-1">
                                    <ul className="flex h-full items-center justify-center gap-4">
                                        {list.map((item) => (
                                            <li>
                                                <Link key={item.label} href={item.href}>
                                                    <div className="font-semibold text-lg text-gray-500 hover:text-blue-400">{item.label}</div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex lg:hidden">

                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}