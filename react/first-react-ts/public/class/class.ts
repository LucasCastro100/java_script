class Loja {
    name: string;
    category: string;

    constructor(name:string, category:string){
        this.name = name
        this.category = category
    }
}

const newLoja = new Loja('RedBull', 'Bebida')
console.log(newLoja)