import Image from "next/image";

type Props = {
  icon: string;
  alt: string;
  title: string;
  description: string;
};

const BenefitCard = ({ icon, alt, title, description }: Props) => {
  return (
    <div className="flex flex-1 p-6 border border-gray-200 rounded-sm">
      <div className="w-16 pr-6 border-r border-gray-200 flex items-center justify-center">
        <Image src={icon} alt={alt} width={40} height={40} />
      </div>

      <div className="pl-6 flex-1">
        <div className="font-bold text-lg">{title}</div>
        <div className="text-gray-500">{description}</div>
      </div>
    </div>
  );
};

export default BenefitCard;
