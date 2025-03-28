//api cep 
//api de conversao de moeda https://economia.awesomeapi.com.br/json/BRL-USD aqui exemplo do br para eua
// pegando siglas dos paises apra conversao https://economia.awesomeapi.com.br/json/available/uniq 

const options = {
    select: async (element) => { return document.querySelector(element) },
    selectAll: async (element) => { return document.querySelectorAll(element) },
    localStorage: async () => { return (JSON.parse(localStorage.getItem('infoUser')) || []) }
}

const searchCep = async (value) => {
    const url = `https://cep.awesomeapi.com.br/json/${value}`

    const methods = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        cache: "default",
    }

    await fetch(url, methods)
        .then(response => response.json())
        .then(data => { console.log(data) })
        .catch(error => { console.log(error) })
}

document.addEventListener("DOMContentLoaded", async (event) => {
    //AQUI A PROGRAMAÇÃOSO VAI RODAR DEPOIS QUE O HTML FOR CARREGADO
    console.log(`DOCUMENTO: ${event.timeStamp.toFixed(0)} milissegundos para carregar...`)

    const formElement = await options.select('#form #create-user')
    const formSubmit = await options.select('#form #create-user input[type="submit"]')

    formSubmit.addEventListener('click', (event) => {
        event.preventDefault()

        const form = new FormData(formElement)

        if (form.get('userPass') === form.get('userConfirmPass')) {
            for (const [key, value] of form) {
                console.log(`${key}: ${value}\n`)
            }

            searchCep(form.get('userCEP'))

        } else {
            console.log('As senhas não batem')
        }
    })
})

window.addEventListener("load", async (event) => {
    const loadElementor = await options.select('.loading')
    const mainElementor = await options.select('main')

    loadElementor.style.display = 'none'
    mainElementor.style.display = 'block'

    //AQUI A PROGRAMAÇÃOSO VAI RODAR DEPOIS QUE A PAGINA FOR CARREGADA
    console.log(`PÁGINA: ${event.timeStamp.toFixed(0)} milissegundos para carregar...`)
})