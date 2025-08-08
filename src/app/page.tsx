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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
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
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
          />
          <button
            onClick={addTodo}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Add
          </button>
        </div>

        {/* List of to-do items */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No tasks yet. Add one above!
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                {/* Checkbox to mark as completed */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                
                {/* Task text - crossed out if completed */}
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {todo.text}
                </span>
                
                {/* Delete button */}
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="px-3 py-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* Summary of tasks */}
        {todos.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {todos.filter(todo => todo.completed).length} of {todos.length} tasks completed
          </div>
        )}
      </div>
    </div>
  );
}
