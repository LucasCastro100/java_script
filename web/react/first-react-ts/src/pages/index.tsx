import { Name } from "../components/Name";

export function Home() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Name name={"Lucas"} age={30} />
            <Name name={"Kathelin"} age={28} />
            <Name name={"Sara"} age={3} />
            <Name name={"Laura"} age={0} />
        </div>
    )
}