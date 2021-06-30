import { Todo } from "./todo.class";


export class TodoList {

    constructor() {
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ) {
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ) {

        this.todos = this.todos.filter( todo => todo.id != id ) //Se hace con un solo = porque el el argumento es de tipo INT y el todo.id es STRING
        this.guardarLocalStorage();        
        
    }

    marcarCompletado( id ) {

        for (const todo of this.todos) {
            
            // console.log(id, todo.id);

            if( todo.id == id ) {

                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }

        }

    }

    eliminarCompletados() {

        this.todos = this.todos.filter( todo => !todo.completado )//filtra los que no están completados
        this.guardarLocalStorage();
        
    }

    guardarLocalStorage() {

        localStorage.setItem('todo', JSON.stringify( this.todos ));//convierte los object Object en strings que es lo que se necesita en los localStorage

    }

    cargarLocalStorage() {

        // if( localStorage.getItem('todo') ) {

        //     this.todos = JSON.parse( localStorage.getItem('todo') );
        //     console.log('cargarLocal: ', this.todos);
        //     console.log(typeof this.todos);

        // } else {
        //     this.todos = [];
        // }

        this.todos = ( localStorage.getItem('todo') ) 
                        ? JSON.parse( localStorage.getItem('todo') ) :
                        [];

        // this.todos = this.todos.map( obj => Todo.fromJson( obj ) );
        //Lo mismo de arriba
        this.todos = this.todos.map( Todo.fromJson );

    }

}