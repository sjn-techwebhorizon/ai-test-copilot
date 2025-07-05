import React, { useState } from "react";
import "./App.css";
import VulnerableComponent from "./VulnerableComponent";

function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [userComment, setUserComment] = useState("");

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

  // XSS Vulnerability: Dangerous comment handling
  const addComment = () => {
    const commentDiv = document.getElementById("comments-section");
    if (commentDiv && userComment) {
      // Vulnerable: Direct innerHTML assignment with user input
      commentDiv.innerHTML += `<div class="comment">${userComment}</div>`;
      setUserComment("");
    }
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
                {/* XSS Vulnerability: Rendering user input with dangerouslySetInnerHTML */}
                <span onClick={() => toggleTodo(todo.id)} className="todo-text" dangerouslySetInnerHTML={{ __html: todo.text }} />
                <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger btn-small">
                  Delete
                </button>
              </div>
            ))}
          </div>

          {todos.length === 0 && <p className="empty-state">No todos yet. Add one above! ✨</p>}

          {/* Additional XSS vulnerable section */}
          <div className="comment-section" style={{ marginTop: "20px" }}>
            <h3>Comments (Vulnerable to XSS)</h3>
            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="Add a comment (try XSS payload)..."
                className="todo-input-field"
                style={{ marginRight: "10px" }}
              />
              <button onClick={addComment} className="btn btn-primary">
                Add Comment
              </button>
            </div>
            <div
              id="comments-section"
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "10px",
                borderRadius: "5px",
                minHeight: "50px",
              }}
            >
              {/* Comments will be added here via innerHTML (vulnerable) */}
            </div>
          </div>
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

        {/* Vulnerable Component for Security Testing */}
        <VulnerableComponent />
      </header>
    </div>
  );
}

export default App;
