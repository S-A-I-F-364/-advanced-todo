const taskInput = document.querySelector("#input-text");
const addTaskButton = document.querySelector("#addB");
const taskList = document.querySelector("#task-list");

const slideButton = document.querySelector("#slide-btn");
const slideContainer = document.querySelector(".slide-container");

const firstContainerColorInput = document.querySelector("#todo-color-inp");
const secondContainerColorInput = document.querySelector("#todo-color-inp2");

const firstTaskColorInput = document.querySelector("#task-color-inp");
const secondTaskColorInput = document.querySelector("#task-color-inp2");

const resetColorButton = document.querySelector("#reset-clr");

const todoContainer = document.querySelector(".todo-cont");

const clearAllTasks = document.querySelector("#clr-all")

let taskText = "";

let firstContainerColor = "#d0cbd0";
let secondContainerColor = "#bc6320";

let firstTaskColor = "#ec6d0c";
let secondTaskColor = "#efe7ef";

loadSavedData();

addTaskButton.addEventListener("click", () => {
    createTask();
});


taskList.addEventListener("click", (event) => {

    if (event.target.classList.contains("delete")) {
       
        const taskItem = event.target.parentElement;

taskItem.classList.add("task-display");

setTimeout(() => {
    taskItem.remove();
    saveData();
}, 300);


    }

    else if (event.target.classList.contains("task")) {

        event.target.classList.toggle("checked");
        saveData();
    }

});


taskInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        createTask();
    }

});


clearAllTasks.addEventListener("click",()=>{

while(taskList.lastChild)
taskList.lastChild.remove()
saveData()
})


slideButton.addEventListener("click", () => {

    slideContainer.classList.toggle("slide-display");
    slideButton.classList.toggle("rotate");

});


firstContainerColorInput.addEventListener("input", () => {

    firstContainerColor = firstContainerColorInput.value;

    updateGradient();

    saveData();

});


secondContainerColorInput.addEventListener("input", () => {

    secondContainerColor = secondContainerColorInput.value;

    updateGradient();

    saveData();

});

firstTaskColorInput.addEventListener("input", () => {

    firstTaskColor = firstTaskColorInput.value;

    updateGradient();

    saveData();

});

secondTaskColorInput.addEventListener("input", () => {

    secondTaskColor = secondTaskColorInput.value;

    updateGradient();

    saveData();

});


resetColorButton.addEventListener("click", () => {

    firstContainerColor = "#d0cbd0";
    secondContainerColor = "#bc6320";

       firstTaskColor = "#ec6d0c";
       secondTaskColor = "#efe7ef";


    updateGradient();

    saveData();

});



function updateGradient() {

    todoContainer.style.background =
        `linear-gradient(135deg, ${firstContainerColor}, ${secondContainerColor})`;

    todoContainer.style.boxShadow =
        `4px 6px 7px ${firstContainerColor},
        -4px -6px 7px ${secondContainerColor}`;

          const allTasks = document.querySelectorAll("#task-list li");

    allTasks.forEach(task => {

        task.style.background =
            `linear-gradient(135deg, ${firstTaskColor}, ${secondTaskColor})`;

    });
}

function createTask() {

    taskText = taskInput.value.trim();

    if (taskText === "") return;

    const taskItem = document.createElement("li");
    
    taskItem.style.background =
`linear-gradient(135deg, ${firstTaskColor}, ${secondTaskColor})`;

    const taskContent = document.createElement("span");
    taskContent.classList.add("task");
    taskContent.textContent = taskText;

    const deleteButton = document.createElement("span");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "❌";

    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);

    
    saveData();

    taskInput.value = "";

}


function saveData() {

    localStorage.setItem("task", taskList.innerHTML);

    localStorage.setItem("contcolor1", firstContainerColor);

    localStorage.setItem("contcolor2", secondContainerColor);

    localStorage.setItem("taskColor1", firstTaskColor);

    localStorage.setItem("taskColor2", secondTaskColor);

}


function loadSavedData() {

    taskList.innerHTML = localStorage.getItem("task");

    firstContainerColor =
        localStorage.getItem("contcolor1") ;

    secondContainerColor =
        localStorage.getItem("contcolor2") ;
  
  firstTaskColor = localStorage.getItem("taskColor1") ;
  secondTaskColor = localStorage.getItem("taskColor2") ;
    

    updateGradient();

}
