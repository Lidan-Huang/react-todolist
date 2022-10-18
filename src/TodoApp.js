import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import TopTodo from "./TopTodo";
import EditableTodoList from "./EditableTodoList";
import TodoForm from "./TodoForm";

/** App for managing a todo list.
 *
 * Props:
 * - initialTodos: possible array of [ todo, ... ]
 *
 * State:
 * - todos: array of [ todo, ... ]
 *
 * App -> TodoApp -> { TodoForm, EditableTodoList }
 */

const initialTodos = [
  {
    id: 1,
    title: "Code!",
    description: "Write some code",
    priority: 2,
  },
  {
    id: 2,
    title: "Make dinner",
    description: "Cook something healthy",
    priority: 1,
  },
  {
    id: 3,
    title: "Go to bed",
    description: "In bed by 11:15",
    priority: 3,
  }];

function TodoApp() {
  const [todos, setTodos] = useState(initialTodos);
  /** add a new todo to list */
  function create(newTodo) {
    setTodos(todos => ([
      ...todos,
      { id: uuid(), ...newTodo },
    ]));
  }

  /** update a todo with updatedTodo */
  function update(updatedTodo) {
    setTodos(todos.map(
      todo => todo.id !== updatedTodo ? todo : updatedTodo
    ))
  }

  /** delete a todo by id */
  function remove(id) {
    setTodos(todos.filter(
      todo => todo.id !== id
    ));
  }

  return (
    <main className="TodoApp">
      <div className="row">

        <div className="col-md-6">
          <h3>Todos</h3>
          {todos.length > 0 
            ?<EditableTodoList todos={todos} remove={remove} update={update}/>
            :
            <span className="text-muted">You have no todos.</span>
          }
        </div>

        <div className="col-md-6">
          <section className="mb-4">
            <h3>Top Todo</h3>
            <TopTodo todos={todos} />
          </section>

          <section>
            <h3 className="mb-3">Add Nü</h3>
            <TodoForm addOrEdit={create} />
          </section>
        </div>

      </div>
    </main>
  );
}

export default TodoApp;