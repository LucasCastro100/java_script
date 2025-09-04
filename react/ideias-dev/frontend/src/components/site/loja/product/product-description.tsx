'use client'

type Props = {
    description?: string;
}
export const ProductDescription = ({description}: Props) => {
    return (
        <div className="w-full mt-8">
            <p className="text-gray-700">{ description }</p>
        </div>
    );
}