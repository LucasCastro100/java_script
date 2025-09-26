import Image from "next/image";
import Link from "next/link";

type Props = {
    href: string;
    icon: string;
    label?: string;
}

const FooterButton = ({ href, icon, label }: Props) => {
    return (
        <Link href={href} className="w-full">
            <div className="flex items-center gap-4 border border-gray-700 rounded-sm p-4 hover:bg-gray-900 flex justify-center items-center">
                <Image
                    src={icon}
                    alt=""
                    width={24}
                    height={24}
                />
                {label &&
                    <div className="flex-1">{label}</div>
                }
            </div>
        </Link>
    );
}

export default FooterButton;