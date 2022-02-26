let todoInput = document.querySelector(".todo-input");
let todoButton = document.querySelector(".todo-button");
let todoList = document.querySelector(".todo-list");
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let date = document.getElementById("date")

date.innerHTML = new Date();

function addTodo() {
    if(todoInput.value != ""){
        let todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        let newTodo = document.createElement("li");
        newTodo.innerHTML = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        saveLocalTodos(todoInput.value);
        let completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        let trashButton = document.createElement("button");
        trashButton.innerHTML = 'x';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
        todoInput.value = "";
    }  
    else{
        alert("Cannot add blank to-do");
    }
}

function deleteCheck(e) {
    let item = e.target;

    if(item.classList[0] === "trash-btn") {
        let todo = item.parentElement;
        let todoTextContent = e.path[1].firstElementChild.textContent;
        todo.remove();
        let index = todos.indexOf(todoTextContent);
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    if(item.classList[0] === "complete-btn") {
        let todo = e.path[1].firstElementChild;
        todo.classList.toggle("completed");
    }
}

function saveLocalTodos(todo){
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
document.addEventListener("DOMContentLoaded", function(){
    if(todos != [])
    {
        todos.forEach((todo) =>
        {
        let todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        let newTodo = document.createElement("li");
        newTodo.textContent = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        let completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        let trashButton = document.createElement("button");
        trashButton.innerHTML = 'x';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
         });
    }
})