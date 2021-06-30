import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';
import './styles.css';


export const todoList = new TodoList();

// todoList.todos.forEach( todo => crearTodoHtml( todo) );

todoList.todos.forEach( crearTodoHtml ); // Es lo mismo que arriba...como el argumento que se quiere enviar es el único argumento que se quiere enviar a otra instrucción o método que está aquí mismo, entonces se puede obviar eso

console.log('todos: ', todoList.todos);


// const tarea = new Todo('Aprender JavaScript!!!');

// todoList.nuevoTodo( tarea );

// console.log(todoList);

// crearTodoHtml( tarea );

// localStorage.setItem('mi-key', 'ABC1234');
// sessionStorage.setItem('mi-key', 'ABC1234');

// setTimeout( () => {

//     localStorage.removeItem('mi-key');

// }, 1500)
