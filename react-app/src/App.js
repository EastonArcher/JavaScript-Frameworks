import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  // State
  const [todos, setTodos] = useState([]);

  // Binding
  const todoText = useRef();

  // Side Effects / Lifecycle
  useEffect(() => {
    const existingTodos = localStorage.getItem('todos');
    setTodos(existingTodos ? JSON.parse(existingTodos) : []);
  }, []);

  // Events
  function addTodo(event) {
    event.preventDefault();
    const next = [...todos, todoText.current.value];
    setTodos(next);
    localStorage.setItem('todos', JSON.stringify(next));
    todoText.current.value = ''; // Clear the todoText input after adding a todo
  }

  function clearList() {
    setTodos([]);
    localStorage.removeItem('todos');
  }

  return (
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>

      <form onSubmit={addTodo}>
        <input type="text" ref={todoText} />
        <input type="submit" value="Add Todo" />
        <button type="button" onClick={clearList}>Clear List</button>
      </form>
    </div>
  );
}

export default App;

