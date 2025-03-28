const validator = {
    select: (element) => { return document.querySelector(element) },
    selectAll: (element) => { return document.querySelectorAll(element) },
    localStorage: JSON.parse(localStorage.getItem('infoList')) || []
}

const btnElement = validator.select('#to-do-list .add-activities .btn')

const generateUUID = () => {
    let uuid = Math.random().toString(36).substring(2, 7)
    return uuid
}

const getDateToday = () => {
    let date = new Date()

    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    let month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
    let year = date.getFullYear()

    let currentDate = `${day}/${month}/${year}`

    return currentDate
}

const getHourToday = () => {
    let date = new Date()

    let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    let seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()

    let currentHours = `${hour}:${minute}:${seconds}`

    return currentHours
}

const getValueActivity = () => {
    let btnsElement = validator.selectAll('#to-do-list .list-activities ul li button')
    let removeActivity = validator.localStorage

    btnsElement.forEach((actv, i) => {
        
        actv.addEventListener('click', () => {
            removeActivity.splice(i, 1)
            localStorage.setItem('infoList', JSON.stringify(removeActivity))

            listActivities(validator.localStorage)
        })
    })
}

const listActivities = (list) => {
    const activitiesElement = validator.select('#to-do-list .list-activities ul')
    activitiesElement.innerHTML = ''
    
    if (list.length > 0) {
        list.map(item => {
            activitiesElement.innerHTML += `<li><span>${item.activity}</span> <button value="${item.uuid}">Excluir</button></li>`
        })

        getValueActivity()
    } else {
        activitiesElement.innerHTML = `Nenhuma atividade foi cadastrada!`
    }
}

const addActivy = (value) => {
    validator.localStorage.push({
        uuid: generateUUID(),
        activity: value,
        createdDate: getDateToday(),
        createdHour: getHourToday()
    })

    localStorage.setItem('infoList', JSON.stringify(validator.localStorage))

    listActivities(validator.localStorage)
}

const errorAddActivy = () => {
    alert('Esse valor não foi possivel adicionar!')
}

const getValueInput = () => {
    let getValueInput = ''
    let inputAtvs = validator.select('#to-do-list .add-activities #atvs')
    getValueInput = isNaN(inputAtvs.value.trim()) == true ? addActivy(inputAtvs.value.trim()) : errorAddActivy()

    inputAtvs.value = ''
}

btnElement.addEventListener('click', getValueInput)

const init = () => {
    listActivities(validator.localStorage)
}

window.addEventListener('load', init)