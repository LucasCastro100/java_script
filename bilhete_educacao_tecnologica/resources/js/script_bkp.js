document.addEventListener('DOMContentLoaded', (event) => {

})

const listAlunos = async (values) => {
    values.forEach(element => {
        let name = element.NICKNAME.split(' ')
        let letters = ''
        let firstName = ''
        let lastName =  ''

        if (name.length > 1) {     
            firstName = name[0]
            lastName =  name[name.length - 1]       
          

           for(let i = 1; i < ( name.length - 1); i++){
                letters += name[i][0]
                console.log(name[i])
           }

           name = `${firstName}${letters}${lastName}`
        }else{
            name = name[0]
        }        

        element.NICKNAME = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    })

    const dadosBlob = new Blob([JSON.stringify(values, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(dadosBlob);
    
    // Cria um link para fazer o download do arquivo
    const linkDownload = document.createElement('a');
    linkDownload.href = url;
    linkDownload.download = 'novos_dados.json';
    
    // Adiciona o link ao body e simula o clique para iniciar o download
    document.body.appendChild(linkDownload);
    linkDownload.click();
    
    // Limpa o objeto URL
    URL.revokeObjectURL(url);
}

window.addEventListener('load', (event) => {
    const getDados = async () => {
        fetch('resources/alunos_2024.json')
            .then(response => response.json())
            .then(data => {
                listAlunos(data)
            })
            .catch(error => {
                console.error('Erro ao ler o arquivo JSON:', error);
            });
    }

    getDados()
})