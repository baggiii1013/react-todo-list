import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState({ title: "", desc: "" });
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem('todos'))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = ()=>{
    localStorage.setItem("todos" , JSON.stringify(todos))
  }

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.id]: e.target.value,
    });
  };

  const handleAdd = () => {
    if (todo.title.trim() && todo.desc.trim()) {
      const newTodo = {
        id: uuidv4(),
        title: todo.title,
        desc: todo.desc,
        isCompleted: false,
      };
      setTodos(prevTodos => {
        const updatedTodos = [...prevTodos, newTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      });
      setTodo({ title: "", desc: "" });
    }
  };

  const handleCheck = (index) => {
    const newTodos = todos.map((item, i) => {
      if (i === index) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodos(newTodos);
    saveToLS()
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    saveToLS()
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.filter((item) => item.id === id);
    if (todoToEdit) {
      setTodo({
        title: todoToEdit[0].title,
        desc: todoToEdit[0].desc,
      });
      // Remove the todo being edited
      const newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos,()=>{
      saveToLS()
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-400 min-h-[80]">
        <div className="addTodo my-3">
          <h2 className="text-lg font-bold">Add a new Todo</h2>
          <input
            type="text"
            name="title"
            id="title"
            className="w-2/3 outline my-2 p-2  rounded-md"
            placeholder="Title"
            onChange={handleChange}
            value={todo.title}
          />
          <input
            type="text"
            name="desc"
            id="desc"
            className="w-2/3 outline my-2  p-2 rounded-md"
            placeholder="description"
            onChange={handleChange}
            value={todo.desc}
          />
          <button
            className="mx-5 bg-violet-800 px-[8px] py-[5px] rounded-md text-white font-mono font-semibold  font-xl"
            onClick={handleAdd}
          >
            Confirm
          </button>
        </div>
        <div className="todos grid grid-cols-1 divide-y m-3">
          <h2 className="text-lg font-bold">Your added todo's</h2>
          {todos.map((item, index) => (
            <div
              key={item.id}
              className={
                !item.isCompleted ? "" : "bg-black bg-opacity-30 text-white"
              }
            >
              <div className="check flex gap-1">
                <input
                  type="checkbox"
                  name="todo"
                  id="isCompeleted"
                  className="mx-1 items-center "
                  checked={item.isCompleted}
                  onChange={() => handleCheck(index)}
                />
                <h2 className="title text-2xl font-extrabold font-mono ">
                  {item.title}
                </h2>
              </div>
              <div className="flex gap-3 justify-between align-middle">
                <p className="desc font-semibold my-auto text-lg">
                  {item.desc}
                </p>
                <div className="buttons py-auto">
                  <button
                    className="mx-3 my-2 bg-violet-800 px-[8px] py-[5px] rounded-md text-white font-mono font-semibold font-xl"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="mx-3 bg-violet-800 px-[8px] py-[5px] rounded-md text-white font-mono font-semibold font-xl"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
