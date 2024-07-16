import React,{useState} from 'react';
import './styles/TodoInput.css';

const TodoInput = ({ allTodos,setTodos }) => {
  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");
  
  const handleAddTodo = ()=>{
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    }; 
    let updatedTodoArr=[...allTodos];
    updatedTodoArr.push (newTodoItem); 
    setTodos (updatedTodoArr);
    localStorage.setItem ('todolist', JSON.stringify (updatedTodoArr));
  };
  
  return (
    <div className='todo-input'>
      <div className='todo-input-item'>
        <label>Title</label>
        <input type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Write the Task Title..."
        />
      </div>
      <div className='todo-input-item'>
        <label>Description</label>
        <input type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Write the Task Description..."
        />
      </div>
      <div className='todo-input-item'>
        <button
          type='button'
          onClick={handleAddTodo}
          className='primaryBtn'>
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoInput;