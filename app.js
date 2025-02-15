let inputbox = document.querySelector('#inputbox');
let addbtn = document.querySelector('#addbtn');
let todolist = document.querySelector('.todolist');

let gettodos = JSON.parse(localStorage.getItem('todo-list')) || [];
let localInput = null;

function addtodo() {
    let inputtext = inputbox.value.trim();
    if (inputtext.length < 1) {
        alert('Please write a to-do');
        return;
    }

    if (addbtn.value == 'Edit') {
        let todo = localInput.target.previousElementSibling.innerText;
        let todoindex = gettodos.indexOf(todo);
        if (todoindex !== -1) {
            gettodos[todoindex] = inputtext;
        }
    } else {
        if (gettodos.includes(inputtext)) {
            alert('This to-do already exists!');
            return;
        }
        gettodos.push(inputtext);
    }

    localStorage.setItem('todo-list', JSON.stringify(gettodos));
    addbtn.value = 'Add';
    inputbox.value = '';
    showLocalTodo();
}

function showLocalTodo() {
    todolist.innerHTML = gettodos.map(item =>
        `<li>
          <p>${item}</p>
          <button class="btn editbtn">Edit</button>
          <button class="btn deletebtn">Delete</button>
        </li>`
    ).join('');
}

function updateTodo(e) {
    let value = e.target.innerText;
    if (value == 'Delete') {
        let todotext = e.target.parentElement.children[0].innerText;
        let todoindex = gettodos.indexOf(todotext);
        if (todoindex !== -1) {
            gettodos.splice(todoindex, 1);
            localStorage.setItem('todo-list', JSON.stringify(gettodos));
            showLocalTodo();
        }
    }

    if (value == 'Edit') {
        inputbox.value = e.target.previousElementSibling.innerText;
        addbtn.value = 'Edit';
        inputbox.focus();
        localInput = e;
    }
}

todolist.addEventListener('click', updateTodo);
window.addEventListener('load', showLocalTodo);
addbtn.addEventListener('click', addtodo);
