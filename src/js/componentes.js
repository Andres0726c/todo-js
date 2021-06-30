import { todoList } from '..';
import { Todo } from '../classes';


//Referencias en el HTML 
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label> ${ todo.tarea } </label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`
    
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    
    //divTodoList

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;

}

//Eventos 
txtInput.addEventListener('keyup', ( event ) => {
    // console.log(event);

    if( event.keyCode === 13 && txtInput.value.length > 0 ) { //keyCode es el valor de la tecla...en este caso ENTER

        console.log(txtInput.value);
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );
        txtInput.value = '';

        console.log(todoList);

    }

});

divTodoList.addEventListener('click', ( event ) => {

    const nombreElemento = event.target.localName; //Input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    // console.log(nombreElemento);


    if( nombreElemento.includes('input') ) { // click en el check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    } else if( nombreElemento.includes('button') ){ // borrar el todo

        todoList.eliminarTodo( todoId );// aqui elimina el todo pero no desaparece del HTML
        divTodoList.removeChild( todoElemento );// aqui eliminamos el todo del HTML

    }

    console.log( todoList );



    // console.log(todoElemento);
    // console.log(todoId);
    // console.log('click');
    // console.log(event.target.localName);

});

btnBorrar.addEventListener('click', ()=> {

    todoList.eliminarCompletados();

    //vamos a eliminar de abajo hacia arriba para no tener problemas con los índices del arreglo
    for( let i = divTodoList.children.length - 1; i >= 0; i-- ) {

        const elemento = divTodoList.children[i];
        // console.log(elemento);

        if( elemento.classList.contains('completed') ) { // evalúa si contiene esa clase
            divTodoList.removeChild(elemento);
        }

    }

});

ulFiltros.addEventListener('click', (event)=> {

    const filtro = event.target.text;
    if( !filtro ) { 
        return; 
    }

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        // console.log(elemento);
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch ( filtro ) {
            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }
                break;
        
            case 'Completados':
                if ( !completado ) {
                    elemento.classList.add('hidden');
                }
                break;
        }

    }
})