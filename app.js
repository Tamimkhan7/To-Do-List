let inputbox = document.querySelector('#inputbox');
let addbtn = document.querySelector('#addbtn');
let todolist = document.querySelector('.todolist');

let gettodos = JSON.parse(localStorage.getItem('todo-list')) || [];

function addtodo() {
    let inputtext = inputbox.value.trim(); //why use trim -- Removes any leading or trailing whitespace (spaces, newlines, and tabs) from the input value.

    gettodos.push(inputtext);
    localStorage.setItem('todo-list', JSON.stringify(gettodos)); //localstroage always key pair value
    inputbox.value = ''; //inputbox create empty string
}
function showLocalTodo() {
    todolist.innerHTML = gettodos.map(item =>
        `  <li>
          <p>${item}</p>
          <button class="btn editbtn">Edit</button>
          <button class="btn deletebtn">Delete</button>
        </li>
        `
    ).join('');
    inputbox.value = '';
}
function updateTodo() {
    let value = e.target.innerText;
    if (value == 'Delete') {
        let todotext = e.target.parentElement.Children[0].innerText;
        let todoindex = gettodos.indexof(todotext);
        gettodos.splice(todoindex, 1);
        localStorage.setItem('todo-list', JSON.stringify(gettodos));
        showLocalTodo();
    }

}
todolist.addEventListener('click', updateTodo);
window.addEventListener('load', showLocalTodo);
addbtn.addEventListener('click', addtodo);