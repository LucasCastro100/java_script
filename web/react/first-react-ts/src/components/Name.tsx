type Age = number | string;

interface NameProps{
    name: string;
    age: Age
}

export function Name({name, age}: NameProps){
    return (
        <div className="flex flex-col md:flex-row gap-4">
            <p>Nome: {name}</p>
            <p>Idade: {age}</p>
        </div>
    )
}

