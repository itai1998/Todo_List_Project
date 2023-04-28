//Selectors
const todoInput = document.querySelector(".todo-input"); // Search the elements from its CSS
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector('.filter-todo');

//Event Listeners: addEventListener attach an event handler to a specified element,
//such as a button or input field. The first paremeter is the action that tragger the
//function. The second parameter is the function that is being traggered.
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener("click", filterTodo);


//Functions
function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");  // Create a new "div" element and save it into variable
    todoDiv.classList.add("todo");                  // Adds a CSS class "todo" to that variable
    //Create LI
    const newTodo = document.createElement('li');  // Create a new "li" element
    newTodo.innerText = todoInput.value;           // Sets the text content to the current value of the todoInput variable  using the innerText property.
    newTodo.classList.add('todo-item');            // Adds a CSS class
    todoDiv.appendChild(newTodo);                  // Appends the li element as a child to a div (No appendChile will only in mem not display)
    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    //Check Mark button
    const completedButton = document.createElement('button');       // Create a new "button" element
    completedButton.innerHTML = '<i class="fas fa-check"></i>';     // Given an inner HTML of an icon represented by the <i> tag with a class of "fas fa-check" (check mark).
    completedButton.classList.add("complete-btn");                  // Adds a CSS class
    todoDiv.appendChild(completedButton);                           // Appends the button element as a child to a div
    //Check trash button
    const trashButton = document.createElement('button');           // Create a new "button" element
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';         // Given an inner HTML of an icon represented by the <i> tag with a class of "fas fa-trash" (trash mark).
    trashButton.classList.add("trash-btn");                         // Adds a CSS class
    todoDiv.appendChild(trashButton);                               // Appends the button element as a child to a div
    //Append to list
    todoList.appendChild(todoDiv);                                  // add the style into the list
    // Clear Todo INPUT VALUE
    todoInput.value =" ";
}

function deleteCheck(e){
    const item = e.target;                                      // Refer to the HTML element that triggered the event
    //DELETE TODO
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;                        //  Returns the parent element(the container)
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){      // The transitionend event is fired when a CSS transition or animation ends on an element. 
            todo.remove();
        })
     
    }

    //CHECK MARK
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");                      // classList.toggle() method is used to toggle a specific class 

    }
}

function filterTodo(e){
    const todos = todoList.childNodes;                  // Get all the childNodes of todoList (ui in this case)
    todos.forEach(function(todo){                       // For-each loop to loop all of the childNodes (todo is the local parameter for perfoming the actions of the function inside the for-each loop)
        switch(e.target.value){                         // Use switch to check the value. Performing the different actions according to the result
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "umcompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{
                    todo.style.display = "none";
                }   
                break;
        }
    });
}

//----------------------------------Save to the local---------------------------------------------//

function saveLocalTodos(todo){
    //CHECK---If I already have thing in there?
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function getTodos(){
    //CHECK---If I already have thing in there?
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
    //Todo DIV
    const todoDiv = document.createElement("div");                  // Create a new "div" element and save it into variable
    todoDiv.classList.add("todo");                                  // Adds a CSS class "todo" to that variable
    //Create LI
    const newTodo = document.createElement('li');                   // Create a new "li" element
    newTodo.innerText = todo;                                       // Sets the text content to the current value of the todoInput variable  using the innerText property.
    newTodo.classList.add('todo-item');                             // Adds a CSS class
    todoDiv.appendChild(newTodo);                                   // Appends the li element as a child to a div (No appendChile will only in mem not display)
    //Check Mark button
    const completedButton = document.createElement('button');       // Create a new "button" element
    completedButton.innerHTML = '<i class="fas fa-check"></i>';     // Given an inner HTML of an icon represented by the <i> tag with a class of "fas fa-check" (check mark).
    completedButton.classList.add("complete-btn");                  // Adds a CSS class
    todoDiv.appendChild(completedButton);                           // Appends the button element as a child to a div
    //Check trash button
    const trashButton = document.createElement('button');           // Create a new "button" element
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';         // Given an inner HTML of an icon represented by the <i> tag with a class of "fas fa-trash" (trash mark).
    trashButton.classList.add("trash-btn");                         // Adds a CSS class
    todoDiv.appendChild(trashButton);                               // Appends the button element as a child to a div
    //Append to list
    todoList.appendChild(todoDiv);       
    });
}

function removeLocalTodos(todo){
     //CHECK---If I already have thing in there?
     let todos;
     if(localStorage.getItem("todos")===null){
         todos = [];
     } else{
         todos = JSON.parse(localStorage.getItem("todos"));
     }
     const todoIndex = todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex), 1);
     localStorage.setItem("todos", JSON.stringify(todos));
}


//Different action while clicking the action button
const title = document.querySelector(".title");
const action1 = document.querySelector(".action1");
let colorArr = ["red", "green", "blue", "black", "white"];

action1.addEventListener("click", changeTextColor);

function changeTextColor(){
    let randomNum = Math.floor(Math.random()*5);
    while(title.style.color === colorArr[randomNum]){
        randomNum = Math.floor(Math.random()*5);
    }
    title.style.color = colorArr[randomNum];

    // if(title.style.color === "red"){
    //     title.style.color = "white";
    // }else{
    //     title.style.color = "red";
    // }
}
