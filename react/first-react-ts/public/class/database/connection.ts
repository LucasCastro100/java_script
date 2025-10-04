type Connections ={
    host: string,
    user: string,
    password: string,
    database: string
}

export function connection(info: Connections) : boolean{
    console.log(`Conexão realizada com sucesso!  ${info.host}`);
    return true;
}