//variaveis globais
const chosenLetters = [] //vetor para armazenar as letras digitadas, e guardar apenas as que ainda não foram

let getWordSelected = ''
let gameLife = ''
let listPlayers = JSON.parse(localStorage.getItem('infoGames')) || [] //aqui e o armazenamento local

function select(element) {
    return document.querySelector(element)
}

function selectAll(element) {
    return document.querySelectorAll(element)
}

function generateUUID(){
    let uuid = Math.random().toString(36).substring(2, 8)
    return uuid
}

function getDateToday(){
    let date = new Date()

    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    let month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
    let year = date.getFullYear()

    let currentDate = `${day}/${month}/${year}`

    return currentDate
}

function getHourToday(){
    let date = new Date()

    let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    let seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()

    let currentHours = `${hour}:${minute}:${seconds}`

    return currentHours
}

function random(value) {
    let min = 0
    let max = value

    let random = Math.floor(Math.random() * (max - min))
    return random
}

function difficultGame() {
    gameLife = 5

    life(gameLife)
}

function life(life) {
    let elementLife = select('.game .life')
    elementLife.innerHTML = `<h3 class="bold text-center">Chances: ${gameLife}</h3>`
}

function generateWords() {
    const words = [
        {
            word: 'Lucas',
            clue: 'Monitor(a) tecnológico presente no Cólegio Marista Uberaba.'
        },
        {
            word: 'Antônio',
            clue: 'Monitor(a) tecnológico presente no Cólegio Marista Uberaba.'
        },
        {
            word: 'Futebol',
            clue: 'Esporte preferido dos meninos no Cólegio Marista.'
        },
        {
            word: 'TBR',
            clue: 'Evento que ocorre em parceria com a Educação Tecnológica.'
        },
        {
            word: 'Carro',
            clue: 'Meio de transporte terreste.'
        },
        {
            word: 'Caminhão',
            clue: 'Meio de transporte terreste.'
        },
        {
            word: 'Moto',
            clue: 'Meio de transporte terreste.'
        }
        // {
        //     word: '',
        //     clue: ''
        // }
    ]

    let number = random((words.length))
    let randomWord = words[number]

    return [number, randomWord]
}

function trasnformWord(word) {
    //para retirar acento e em seguida deixar minusculo
    let newWord = word.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()

    return newWord
}

function getWordSelect(words) {
    let classLetter = select('.game-forca .word')
    let classClue = select('.game-forca .clue')
    let wordSelect = { letters: words.word.split(''), clue: words.clue }
    let html = ''

    for (i = 0; i < wordSelect.letters.length; i++) {
        html += `<div class="display-flex justify-content-center align-center letter"><span></span></div>`
    }

    classLetter.innerHTML = html
    classClue.innerHTML = `<h3 class="bold">Dica: ${wordSelect.clue}</h3>`

    getWordSelected = trasnformWord(words.word).toUpperCase().split('')
}

function wordRescue() {
    let objectWord = generateWords()
    getWordSelect(objectWord[1])
}

function showLetters() {
    let classCheckLetters = select('.game-forca .check .show-letters')
    let html = ''

    for (i = 0; i < chosenLetters.length; i++) {
        html += `<div class="letter"><span>${chosenLetters[i]}</span></div>`
    }

    classCheckLetters.innerHTML = html
}

function likenLettersToWord(letter) {
    let keyLetter = letter.key.toUpperCase()
    let codeLetter = letter.keyCode
    let checkChosenLetter = chosenLetters.filter(letter => letter == keyLetter)

    if (codeLetter > 64 && codeLetter < 91) {
        if (checkChosenLetter.length == 0) {
            chosenLetters.push(keyLetter)
            checkLetterInWord(keyLetter)
        } else {
            alert(`A letra ${keyLetter.toUpperCase()} já foi selecionada!`)
        }
    } else {
        alert("O sistema so aceita caracteres de A até Z!")
    }

    showLetters()
}

function checkLetterInWord(letter) {
    let checkLetter = selectAll('.game-forca .word .letter')
    let qtdSuccess = 0

    for (i = 0; i < getWordSelected.length; i++) {
        if (getWordSelected[i] == letter) {
            checkLetter[i].classList.add('success')
            checkLetter[i].innerHTML = `<span class="bold">${letter}</span>`
            qtdSuccess += 1
        }
    }

    if(qtdSuccess == 0){
        gameLife -= 1
        life(gameLife)

        if(gameLife < 1){
            checkGame('loss')
        }
    }    

    let checkSuccess = selectAll('.game-forca .word .letter.success')

    if (checkLetter.length == checkSuccess.length) {
        checkGame('victory')
    }
}

function checkGame(value) {
    let msg = ''

    switch (value) {
        case 'victory':
            msg = 'Parabens você ganhou, agora se prepare apra a proxima palavra!'
            break;

        case 'loss':
            msg = 'Infelizmente não foi dessa vez, mas agora se prepare para a proxima palavra'
            break;
    }

    setTimeout(() => {
        saveResults()
        alert(msg)
        location.reload()
    }, 250);
}

const saveResults = () => {
    listPlayers.push({
        uuid: generateUUID(),
        // operation: getSymbol,
        // expresion: saveResult,
        // alert: typeAlert,
        createdDate: getDateToday(),
        createdHour: getHourToday()
    })

    localStorage.setItem('infoGames', JSON.stringify(listPlayers))
}

function init() {
    difficultGame()
    wordRescue()

    console.log(listPlayers)
}

window.addEventListener('load', init)
window.addEventListener('keyup', likenLettersToWord)