import Image from "next/image";
import Link from "next/link";
import FooterButton from "./footer-button";

const Footer = () => {
    const menu: Menuitem[] = [
        { label: 'Camisas', href: '/categories/camisas' },
        { label: 'Kits', href: '/categories/kits' }
    ];
    return (
        <footer>
            <div className="bg-white border-t border-gray-200 px-6 py-14">
                <div className="w-full max-w-6xl mx-auto p-6 flex flex-col md:flex-row items-center gap-4">
                    <Image
                        src={'/assets/loja/ui/mail-send-line.png'}
                        alt=""
                        width={50}
                        height={50}
                    />
                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-xl mb-6 md:mb-2">Fique por dentro das promoções</h3>
                        <p className="text-gray-400">Coloque seu e-mail e seja o primeiro a saber</p>
                    </div>
                    <form method="POST" className="w-full flex-1 flex flex-col gap-4 md:flex-row">
                        <input
                            type="text"
                            className="flex-1 border border-gray-200 rounded-sm p-5 outline-0"
                            placeholder="Qual seu e-mail?"
                        />
                        <input
                            type="submit"
                            value="Enviar"
                            className="p-5 bg-blue-600 text-white border-0 rounded-sm"
                        />
                    </form>
                </div>
            </div>
            <div className="bg-black text-white">
                <div className="w-full max-w-6xl mx-auto px-5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 border-b border-gray-700">
                        <Link href="/">
                            <Image
                                src={'/assets/loja/ui/logo-white.png'}
                                alt="B7Store"
                                width={143}
                                height={48}
                            />
                        </Link>
                        <ul className="flex flex-col md:flex-row gap-4 items-center">
                            {menu.map((item, index) => (
                                <li key={index}><Link href={item.href}>{item.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 py-6 border-b border-gray-700">
                        <div className="flex-1">
                            <h4 className="mb-6 text-center md:text-left">Precisa de ajuda?</h4>
                            <div className="flex flex-col md:flex-row gap-6">
                                <FooterButton
                                    href="mailto:"
                                    icon="/assets/loja/ui/mail-line.png"
                                    label=""
                                />
                                <FooterButton
                                    href=""
                                    icon="/assets/loja/ui/phone-line.png"
                                    label="(11) 99999-9999"
                                />
                            </div>
                        </div>
                        <div className="">
                            <h4 className="mb-6 text-center md:text-left">Acompanhe nas redes sociais</h4>
                            <div className="flex flex-row justify-between gap-4">
                                <FooterButton
                                    href=""
                                    icon="/assets/loja/ui/instagram-line.png"
                                />
                                <FooterButton
                                    href=""
                                    icon="/assets/loja/ui/linkedin-line.png"
                                />
                                <FooterButton
                                    href=""
                                    icon="/assets/loja/ui/facebook-line.png"
                                />
                                <FooterButton
                                    href=""
                                    icon="/assets/loja/ui/twitter-x-fill.png"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-end items-center py-6">                        
                        <div className="flex justify-center">
                            <FooterButton
                                href="/"
                                icon="/assets/loja/ui/arrow-up-line.png"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;