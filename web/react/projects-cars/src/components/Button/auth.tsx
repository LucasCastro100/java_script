type ButtonAuthProps = {
    text: string;
}

export function ButtonAuth({ text }: ButtonAuthProps) {
    return (
        <button type="submit" className="bg-red-800 font-medium text-base py-2 px-4 rounded-xl">{text}</button>
    );
}