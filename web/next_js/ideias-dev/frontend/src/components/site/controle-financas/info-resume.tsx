type Props = {
    title: string;
    value: number;
}

export const InfoResume = ({ title, value }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="font-bold">{title}</div>
            <div style={{ color: value < 0 ? 'red' : 'green' }}>
                R$ {value}
            </div>
        </div>
    )
}