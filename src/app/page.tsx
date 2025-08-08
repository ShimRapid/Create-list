"use client";

import { useState } from "react";

// Define what a to-do item looks like
type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  // Keep track of all our to-do items
  const [todos, setTodos] = useState<TodoItem[]>([]);
  // Keep track of what the user is typing in the input box
  const [inputText, setInputText] = useState("");
  // Keep track of the next ID number to use
  const [nextId, setNextId] = useState(1);

  // Function to add a new to-do item
  const addTodo = () => {
    if (inputText.trim() !== "") {
      const newTodo: TodoItem = {
        id: nextId,
        text: inputText.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputText(""); // Clear the input box
      setNextId(nextId + 1); // Increment the ID for next item
    }
  };

  // Function to toggle a to-do item between completed and not completed
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Function to remove a to-do item
  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Function to handle pressing Enter in the input box
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 dark:from-gray-900 dark:via-pink-900 dark:to-rose-900 p-4">
      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm dark:bg-gray-800/90 rounded-xl shadow-xl border border-pink-100 dark:border-pink-800 p-6 mt-8">
        <h1 className="text-2xl font-bold text-pink-800 dark:text-pink-200 mb-6 text-center">
          My To-Do List
        </h1>
        
        {/* Input section for adding new items */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-pink-200 dark:border-pink-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gray-700 dark:text-gray-200 bg-pink-50/50"
          />
          <button
            onClick={addTodo}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Add
          </button>
        </div>

        {/* List of to-do items */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-pink-400 dark:text-pink-300 text-center py-8">
              No tasks yet. Add one above!
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 bg-pink-50/70 dark:bg-pink-900/30 rounded-lg border border-pink-100 dark:border-pink-800 hover:bg-pink-100/70 dark:hover:bg-pink-900/50 transition-colors"
              >
                {/* Checkbox to mark as completed */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 text-pink-600 rounded focus:ring-pink-400"
                />
                
                {/* Task text - crossed out if completed */}
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? "text-pink-400 line-through"
                      : "text-pink-900 dark:text-pink-100"
                  }`}
                >
                  {todo.text}
                </span>
                
                {/* Delete button */}
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="px-3 py-1 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded transition-colors hover:text-rose-700"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* Summary of tasks */}
        {todos.length > 0 && (
          <div className="mt-6 text-center text-sm text-pink-600 dark:text-pink-300">
            {todos.filter(todo => todo.completed).length} of {todos.length} tasks completed
          </div>
        )}
      </div>
    </div>
  );
}
