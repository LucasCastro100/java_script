type ButtonAuthProps = {
    text: string;
}

export function ButtonAuth({ text }: ButtonAuthProps) {
    return (
        <div className="flex items-center justify-end">
            <button type="submit" className="bg-red-800 font-medium text-base py-2 px-4 rounded-xl">{text}</button>
        </div>
    );
}