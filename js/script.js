const inputBox = document.querySelector(".input-field input")
const addBtn = document.querySelector(".input-field button")
const todoList = document.querySelector(".todoList")
const clearAll = document.querySelector(".footer button")


// se digitar alguma coisa o layout do botao muda
inputBox.onkeyup = () => {
    let userData = inputBox.value
        if(userData.trim() != 0){
            addBtn.classList.add("active");
        }else{
            addBtn.classList.remove("active");

        }
}

showTarefa()

// funçao pra adicionar um novo todo
addBtn.onclick = () => {
    let userData = inputBox.value // pega o valor do input
    let getLocalStorage = localStorage.getItem('New todo')

    if(getLocalStorage == null){
        listArr = []
    }else{
        listArr = JSON.parse(getLocalStorage)
    }

    listArr.push(userData) // adiciona o valor do input aou todo
    localStorage.setItem('New todo', JSON.stringify(listArr)) // guarda no localStorage 

    showTarefa() // mostra todas as tarefas registradas
    addBtn.classList.remove("active"); // isso aqui e pra nao deixar eu adicionar uma tarefa vazia
}


// funçao pra mostrar as tarefas 
function showTarefa(){
    let getLocalStorage = localStorage.getItem('New todo')
    
    if(getLocalStorage == null){
        listArr = []
    }else{
        listArr = JSON.parse(getLocalStorage)
    }

    // conta quantas tarefas tem
    const number = document.querySelector(".number")
    number.textContent = listArr.length

    // verifica se tem tarefas. pra assim mudar o layout do butao de limpar tudo
    if(listArr.length != 0){
        clearAll.classList.add('active')
    }else{
        clearAll.classList.remove('active')
    }


    let newLiTag = ''
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element} <span onclick="deleteTarefa(${index})"><i class="fas fa-trash"></i></span></li>`
    });

    todoList.innerHTML = newLiTag
    inputBox.value = '' // limpar o input
}


// funçao pra deletar uma tarefa
function deleteTarefa(index){
    let getLocalStorage = localStorage.getItem('New todo')
    listArr = JSON.parse(getLocalStorage)
    listArr.splice(index, 1)

    localStorage.setItem('New todo', JSON.stringify(listArr))
    showTarefa()

}


// funçao pra limpar todas as tarefas
clearAll.onclick = () => {
    listArr = []

    localStorage.setItem('New todo', JSON.stringify(listArr))
    showTarefa()
}