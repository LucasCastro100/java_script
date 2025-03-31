const select = async (element) => document.querySelector(element)
const selectAll = async (element) => document.querySelectorAll(element)

const getDados = async () => {
    await fetch('resources/js/alunos.json')
        .then(response => response.json())
        .then(async data => {
            console.log(data)
            await listAlunos(data)
            // await getHeight()            
        })
        .catch(error => {
            console.error('Erro ao ler o arquivo JSON:', error);
        });
}

const getHeight = async () => {       
    await new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            const cards = await selectAll('.card')
            const heightsCard = []
        
            let maxNumber = 0
        
            Array.from(cards).forEach(itens => {
                heightsCard.push(itens.clientHeight)
            })
        
            maxNumber = Math.max(...heightsCard)             
        }, 500)
    })
}    

const listAlunos = async (values) => { 
    await new Promise(async (resolve, reject) => {
        const naps = { nap1: {}, nap2: {}, nap3: {} }
        const listAlunos = await select('.listAlunos')
        const link = 'https://mundoz.zoom.education/'
        
        setTimeout(() => {
            let html = ''
            let nap1 = values.filter(item => item.TURMA[0] < 2)
            let nap2 = values.filter(item => item.TURMA[0] > 1 && item.TURMA[0] < 6)
            let nap3 = values.filter(item => item.TURMA[0] > 5)

            naps.nap1 = nap1
            naps.nap2 = nap2
            naps.nap3 = nap3            

            Object.keys(naps).forEach(nap => {
                let newVector = []
                const corte = 4

                html += `<div class="col-12 naps ${nap}">`
                html += `<h2 class="title">${nap.toLocaleUpperCase()}</h2>`

                for (var i = 0; i < naps[nap].length; i = i + corte) {
                    newVector.push(naps[nap].slice(i, i + corte));
                }

                newVector.forEach((printIten, index_pai) => {
                    console.log(newVector.length, index_pai)
                    const cardClass = index_pai === newVector.length - 1 ? 'alter-show' : 'alter-none';
                    html += `<div class="printer_pai page-break ${cardClass}">`
                    html += `<div class="row col-12 printer_filho">`
                    printIten.forEach((itens, index_filho) => {                        
                        html += `<div class="col-12 card">`
                        html += `<div class="info">`
                        html += `<div class="col-12">`
                        html += `<p class="title-card bold text-center">DADOS DE ACESSO À PLATAFORMA ZOOM</p>`
                        html += `</div>`
                        // html += `<div class="logo">`
                        // html += `<img src="/resources/img/logo_marista/logo_vertical_preta.png">`
                        // html += `<div>`                       
                        html += `<span>TURMA: ${itens.TURMA}</span>`
                        html += `<span>ALUNO: ${itens.ALUNO}</span>`
                        html += `<span>LINK: ${link}</span>`
                        html += `<span>LOGIN: ${itens.USUARIO}</span>`
                        html += `<span>SENHA: Inicial@123</span>`
                        html += `<span>RECUPERAR SENHA: ${itens.EMAIL}</span>`
                        html += `</div>`
                        html += `</div>`                        
                        // html += `<p class="obs bold text-center">OBS: CASO VOCÊ TENHA SE CADASTRADO, ENTRE COM SEUS DADOS.</p>`
                        // html += `</div>`
                        // html += `</div>`
                    })
                    html += `</div>`
                    html += `</div>`
                })

                html += `</div>`
            })

            listAlunos.innerHTML = html
            resolve()
        }, 500)
    })
}

window.addEventListener('load', async (event) => {
    await getDados()
})