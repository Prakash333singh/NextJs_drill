"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Todos() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTodoInfo, setEditTodoInfo] = useState({
    id: "",
    desc: "",
    completed: false,
  });

  interface Todo {
    id: string;
    desc: string;
    title: string;
    completed: boolean;
  }

  useEffect(() => {
    axios.get("/api/todos").then((res) => {
      console.log(res.data.todos);
      setTodos(res.data.todos);
    });
  }, []);

  async function clearTodos() {
    try {
      await axios.delete("/api/todos");
      setTodos([]);
    } catch (error) {
      console.error(error);
    }
  }


  async function deleteTodo(todo: Todo) {
    const id = todo.id;
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  async function editTodo(todo: Todo) {
    setEditMode(true);
    setEditTodoInfo({
      id: todo.id,
      desc: todo.desc,
      completed: todo.completed,
    });
  }

  async function addTodo() {
    try {
      const res = await axios.post("/api/todos", {
        desc: inputText,
      });

      // console.log(res.data);
      setTodos((prev) => [...prev, { desc: inputText, completed: false }]);

      setInputText("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditSubmit() {
    const data = {
      desc: editTodoInfo.desc,
      completed: editTodoInfo.completed,
    };

    try {
      await axios.put(`/api/todos/${editTodoInfo.id}`, data);
      setTodos((prev) =>
        prev.map((t) => (t.id === editTodoInfo.id ? { ...t, ...data } : t))
      );
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  }

  function toggleCompleted(todo: Todo) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    axios.put(`/api/todos/${todo.id}`, updatedTodo)
      .then(() => {
        setTodos((prev) =>
          prev.map((t) => (t.id === todo.id ? updatedTodo : t))
        );
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="flex flex-col items-center gap-8 bg-slate-400 pb-32">
      <div className="text-4xl text-white mt-10 ">
        Todo List App
        <div className="flex gap-4 mt-8">
          <input
            className="text-xl rounded-md text-black px-4"
            type="text"
            placeholder="enter todos"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            className="text-xl bg-green-700 rounded-md text-white px-4"
            onClick={addTodo}
          >
            Add
          </button>
          <button
            className="text-xl bg-orange-500 rounded-md text-white p-2"
            onClick={clearTodos}
          >
            Clear
          </button>
        </div>
      </div>

      {editMode ? (
        <div className="flex flex-col py-8 items-center gap-8 bg-slate-400 pb-32">
          <div className="text-6xl text-white ">Edit Todo</div>
          <div className="flex gap-4">
            <div className="text-3xl text-gray-700">Edit desc:</div>
            <input
              className="rounded-md py-2 px-2 shadow-sm"
              type="text"
              placeholder="Enter new desc"
              value={editTodoInfo.desc}
              onChange={(e) =>
                setEditTodoInfo({ ...editTodoInfo, desc: e.target.value })
              }
            />
          </div>
          <div className="flex gap-4">
            <div className="text-3xl text-gray-700">
              Edit completed:
            </div>
            <input
              type="checkbox"
              className="mt-2 w-6 h-6 rounded-md"
              checked={editTodoInfo.completed}
              onChange={(e) =>
                setEditTodoInfo({
                  ...editTodoInfo,
                  completed: e.target.checked,
                })
              }
            />
          </div>
          <button
            className="text-xl bg-green-700 rounded-md text-white p-2 px-4"
            onClick={handleEditSubmit}
          >
            Submit
          </button>
        </div>
      ) : (
        <div>
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between items-center p-2 border-b gap-8 bg-slate-600 mr-14 mb-2 rounded-md"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompleted(todo)}
                  className="w-6 h-6 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500"
                />
                <div className="text-4xl text-white px-2">{todo.desc}</div>
              </div>

              <div className="flex gap-4">
                <button
                  className="text-xl bg-red-600 rounded-md text-white p-1"
                  onClick={() => deleteTodo(todo)}
                >
                  Delete
                </button>
                <button
                  className="text-xl bg-blue-700 rounded-md text-white p-2"
                  onClick={() => editTodo(todo)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
