document.addEventListener("DOMContentLoaded", async (event) => {
    //AQUI A PROGRAMAÇÃOSO VAI RODAR DEPOIS QUE O HTML FOR CARREGADO
    console.log(`DOCUMENTO: ${event.timeStamp.toFixed(0)} milissegundos para carregar...`)
})

const validator = {
    select: async (element) => { return document.querySelector(element) },
    selectAll: async (element) => { return document.querySelectorAll(element) },
    localStorage: async () => { return (JSON.parse(localStorage.getItem('infoList')) || []) }
}

const searchColor = async (color) => {
    const url = `https://www.thecolorapi.com/id?rgb=rgb(${color[0]},${color[1]},${color[2]})`

    const methods = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        cache: "default",
    }

    await fetch(url, methods)
        .then(response => response.json())
        .then(data => { alterTitle(data.name.value); console.log(data) })
        .catch(error => { console.log(error) })
}

const alterTitle = async (title) => {
    const getTitle = await validator.select('main #info-colors .title')
    console.log(getTitle)
    getTitle.innerText = `RGB - ${title}`
}

const getValueColors = async (colors) => {
    const rgb = []

    colors.forEach((color, indice) => {
        rgb[indice] = color.valueAsNumber

    })

    return rgb
}

const setValuesColor = async (element) => {
    const setValueColor = await validator.selectAll('main .colors .color-title p')

    element.forEach((item, indice) => {
        item.addEventListener('change', () => {
            setValueColor[indice].innerText = `${item.dataset.color} (${item.valueAsNumber})`
        })
    })
}

const loadColor = async () => {
    const valueColors = await validator.selectAll('main .colors .color-config #range')
    const areaColor = await validator.select('main .area-color')

    const colors = await getValueColors(valueColors)
    areaColor.style.backgroundColor = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`

    searchColor(colors)
    setValuesColor(valueColors)
}

window.addEventListener("load", async (event) => {
    const button = await validator.select('main .action button')

    loadColor()
    button.addEventListener('click', loadColor)    

    //AQUI A PROGRAMAÇÃOSO VAI RODAR DEPOIS QUE A PAGINA FOR CARREGADA
    console.log(`PÁGINA: ${event.timeStamp.toFixed(0)} milissegundos para carregar...`)
})