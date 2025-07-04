import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Simple React App! 🚀</h1>
        <p>This is a beautiful, modern React application</p>

        {/* Counter Section */}
        <div className="counter-section">
          <h2>Counter Demo</h2>
          <div className="counter">
            <button onClick={() => setCount(count - 1)} className="btn btn-secondary">
              -
            </button>
            <span className="count-display">{count}</span>
            <button onClick={() => setCount(count + 1)} className="btn btn-primary">
              +
            </button>
          </div>
          <button onClick={() => setCount(0)} className="btn btn-outline">
            Reset
          </button>
        </div>

        {/* Todo Section */}
        <div className="todo-section">
          <h2>Simple Todo List</h2>
          <div className="todo-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a new todo..."
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
              className="todo-input-field"
            />
            <button onClick={addTodo} className="btn btn-success">
              Add
            </button>
          </div>

          <div className="todo-list">
            {todos.map((todo) => (
              <div key={todo.id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
                <span onClick={() => toggleTodo(todo.id)} className="todo-text">
                  {todo.text}
                </span>
                <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger btn-small">
                  Delete
                </button>
              </div>
            ))}
          </div>

          {todos.length === 0 && <p className="empty-state">No todos yet. Add one above! ✨</p>}
        </div>

        <div className="features">
          <h3>Features included:</h3>
          <ul>
            <li>✅ Modern React with Hooks</li>
            <li>✅ Beautiful gradient design</li>
            <li>✅ Interactive counter</li>
            <li>✅ Todo list functionality</li>
            <li>✅ Responsive layout</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
