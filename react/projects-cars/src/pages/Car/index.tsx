import { useParams } from "react-router-dom";

export function CarDetail() {
    const { uid } = useParams()

    return (
        <div className="">
            <div className="text-white">Carros - uid {uid}</div>
        </div>
    );
}