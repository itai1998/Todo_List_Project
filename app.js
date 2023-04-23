//Selectors
const todoInput = document.querySelector(".todo-input"); // 
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");



//Event Listeners: addEventListener attach an event handler to a specified element,
//such as a button or input field. The first paremeter is the action that tragger the
// function. The second parameter is the function that is being traggered.
todoButton.addEventListener("click",addTodo);
todoList.addEventListener('click', deleteCheck);


//Functions
function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");  // Create a new "div" element and save it into variable
    todoDiv.classList.add("todo");                  // Adds a CSS class "todo" to that variable
    //Create LI
    const newTodo = document.createElement('li');  // Create a new "li" element
    newTodo.innerText = todoInput.value; // Sets the text content to the current value of the todoInput variable  using the innerText property.
    newTodo.classList.add('todo-item');  // Adds a CSS class
    todoDiv.appendChild(newTodo);        // Appends the li element as a child to a div (No appendChile will only in mem not display)
    //Check Mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);    // add the style into the list
    // Clear Todo INPUT VALUE
    todoInput.value =" ";
}

function deleteCheck(e){
    const item = e.target;
    //DELETE TODO
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
     
    }

    //CHECK MARK
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");

    }
}
