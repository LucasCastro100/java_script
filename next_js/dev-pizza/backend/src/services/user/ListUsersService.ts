export class ListUserService{
    async execute(){
        const users = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
        ];

        return ({ msg: "Lista de usuários", data: users });
    }
}