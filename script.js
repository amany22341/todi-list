const input =document.querySelector("input");
const addButton=document.querySelector(".add-button");
const todosHtml =document.querySelector(".todos");
const emptyImage =document.querySelector(".empty-image");
let todosjson =JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton=document.querySelector(".delete-all");
const filters =document.querySelectorAll(".filters")



let filter ='';

showTodos();

function getTodoHtml(todo ,index){
    if(filter && filter != todo.status){
        return '';
    }
    let checked =todo.status == "completed" ? "checked" : "";
    return `
        <li class="todo">
            <label for="${index}">
            <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
            <span class=${checked}>${todo.name}</span>
            </label>
            <button class="delete-btn" data-index="${index}" onclick="remove(this)">
            <i class="fa fa-times"></i></button>
        </li>
    `;
}

function showTodos(){
    if(todosjson.length ==0 ){
        todosHtml.innerHTML='';
        emptyImage.style.display = 'block';
    }else{
        todosHtml.innerHTML=todosjson.map(getTodoHtml).join('');
        // console.log(todosHtml.innerHTML);
        emptyImage.style.display = 'none';
    }
}

function addTodo(todo){
    input.value="";
    todosjson.unshift({ name :todo , status:"pending"});
    localStorage.setItem("todos" , JSON.stringify(todosjson))
    showTodos();
}

input.addEventListener("keyup", e => {
    let todo =input.value.trim();
    if(!todo || e.key != "Enter"){
        return ;
    }
    addTodo(todo)
})
addButton.addEventListener("click" , () => {
    let todo =input.value.trim();
    if(!todo){
        return;
    }
    addTodo(todo)

})
function updateStatus(todo) {
    let todoName = todo.parentElement.lastElementChild;
    if (todo.checked) {
      todoName.classList.add("checked");
      todosjson[todo.id].status = "completed";
    } else {
      todoName.classList.remove("checked");
      todosjson[todo.id].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todosjson));
  }
 
function remove(todo){
    const index =todo.dataset.index;
    todosjson.splice(index,1);
    showTodos();
    localStorage.setItem("todos".JSON.stringify(todosjson))
}

filters.forEach(function (el) {
    el.addEventListener("click", (e) => {
      if (el.classList.contains('active')) {
        el.classList.remove('active');
        filter = '';
      } else {
        filters.forEach(tag => tag.classList.remove('active'));
        el.classList.add('active');
        filter = e.target.dataset.filter;
      }
      showTodos();
    });
  });
    
deleteAllButton.addEventListener("click",() => {
    todosjson =[];
    localStorage.setItem("todos",JSON.stringify(todosjson));
    showTodos()
});
