import { todoList } from "..";
import { Todo } from "../classes";

//Referencias en el html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const ulfiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const botonEliminarCompletados = document.querySelector('.clear-completed');
const strongCount = document.querySelector('strong');



export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}  >
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li> `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;

}

export const contarPendientesHtml = () => {
    strongCount.innerText = todoList.todos.length;
}


const insertarTareaHtml = (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
        strongCount.innerText = todoList.todos.length;
    }
};

const toggleTareaHtml = (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    let i = todoList.todos.length;

    if (nombreElemento.includes('input')) {
        //click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
        

    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
        strongCount.innerText = todoList.todos.length;
    }
}

const filtros = (event) => {
    const filtro = event.target.text;
    if (!filtro) { return; }
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of (divTodoList.children)) {
        elemento.classList.remove('hidden');
        const completada = elemento.classList.contains('completed');
        switch (filtro) {
            case 'Pendientes':
                if (completada) {
                    elemento.classList.add('hidden')
                }
                break;
            case 'Completados':
                if (!completada) {
                    elemento.classList.add('hidden');
                }
                break;
            default:
                break;
        }
    }
}

const eliminarTodosCompletados = () => {
    todoList.eliminarCompletados();
    strongCount.innerText = todoList.todos.length;
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {

        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }

    }
}


txtInput.addEventListener('keyup', insertarTareaHtml);

divTodoList.addEventListener('click', toggleTareaHtml);

ulfiltros.addEventListener('click', filtros);

botonEliminarCompletados.addEventListener('click', eliminarTodosCompletados);

