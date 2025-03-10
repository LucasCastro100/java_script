//api cep https://cep.awesomeapi.com.br/json/38050560
//api de conversao de moeda https://economia.awesomeapi.com.br/json/BRL-USD aqui exemplo do br para eua
// pegando siglas dos paises apra conversao https://economia.awesomeapi.com.br/json/available/uniq 

const validator = {
    select: async (element) => { return document.querySelector(element) },
    selectAll: async (element) => { return document.querySelectorAll(element) },
    localStorage: async () => { return (JSON.parse(localStorage.getItem('infoList')) || []) }
}

document.addEventListener("DOMContentLoaded", async (event) => {
    //AQUI A PROGRAMAÇÃOSO VAI RODAR DEPOIS QUE O HTML FOR CARREGADO
    console.log(`DOCUMENTO: ${event.timeStamp.toFixed(0)} milissegundos para carregar...`)
})

window.addEventListener("load", async (event) => {
    //AQUI A PROGRAMAÇÃOSO VAI RODAR DEPOIS QUE A PAGINA FOR CARREGADA
    console.log(`PÁGINA: ${event.timeStamp.toFixed(0)} milissegundos para carregar...`)
})