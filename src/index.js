import { TodoList } from './classes/index';
import { contarPendientesHtml, crearTodoHtml } from './js/componentes';
import './styles.css';

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml);

contarPendientesHtml();