const select = async (element) => { return document.querySelector(element)}
const selectAll = async (element) => { return document.querySelectorAll(element)}

const showName = async (name) => {
    alert(`${name}`)
}

const init = async () => {

}

window.addEventListener('load', init)