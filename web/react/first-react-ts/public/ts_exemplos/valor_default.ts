
// Como deixar um valor por default ou deixar ele opcional.

function cadastro(email: string, senha: string, nome = "Aluno", idade?: number): void {
  let data = {email, senha, nome, idade};

  console.log(data);

}

// cadastro("teste@teste.com", "123123", "Sujeito Programador", 28);


function cadastroLoja(nome: string, email: string, status = false): boolean{

  console.log("Status atual da loja: ", status);

  return status;
}


cadastroLoja("Buruger K", "bk@teste.com", true);