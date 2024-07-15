import React, { useState } from 'react'
import TodoForm from './TodoForm'



const TodoWrapper = () => {
    const [todos,setTodos] = useState([]);

    const addTodo = todo => {
        setTodos([...todos,{id: todos.length+1,task: todo, 
            completed: false,isEditing: false}] );
            console.log(todo);
    }
    
  return (
    <div className='TodoWrapper'>
      <TodoForm addTodo={addTodo} />
    </div>
  )
}

export default TodoWrapper
