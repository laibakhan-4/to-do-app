import { useEffect, useState } from 'react';
import './App.css';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");
  const [completedTodos,setCompletedTodos] = useState([]);
  const [currentEdit,setCurrentEdit] = useState("");
  const [currentEditedItem,setCurrentEditedItem] = useState("");

  //^ ADD btn function
  const handleAddTodo = ()=>{
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    }; //*creates a new to-do item
    let updatedTodoArr=[...allTodos];
    updatedTodoArr.push (newTodoItem); 
    setTodos (updatedTodoArr);
    //*adds it to the allTodos array
    localStorage.setItem ('todolist', JSON.stringify (updatedTodoArr));
    //*stores in local storage
  };

  //^DELETE  function
  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1); 
    //*removes the selected item from the allTodos array
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
    //*updates the local storage

  };

  //^CheckMark function
  const handleComplete = (index)=>{
    let now = new Date();
    let dow = now.getDay();
    let dd = now.getDate();
    let mm = now.getMonth()+1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dName = dayNames[dow];

    let completedOn =dName + ', ' + dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    //*moves the completed item from the allTodos array to the completedTodos array
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
    //*completed item is removed from the allTodos array & the local storage is updated
  };

  //^DELETE function in completed tasks
  const handleDeleteCompletedTodo =(index)=>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  useEffect (() => {
    //* retrieves the todo list data from the browser's local storage
    //* retrieved data is parsed from a JSON string back into a JavaScript object 
    let savedTodo = JSON.parse (localStorage.getItem ('todolist'));
    let savedCompletedTodo = JSON.parse (localStorage.getItem ('completedTodos'));

    if (savedTodo) {
      setTodos (savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos (savedCompletedTodo);
    }
  }, []);

  //*sets the currentEdit and currentEditedItem state variables to the selected item
  const handleEdit=(ind,item)=>{
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  //* updates the allTodos array with the modified item
  const handleUpdateTodo=()=>{
    let newToDo = [...allTodos];
    newToDo[currentEdit]=currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit(""); //*clears the currentEdit state variable
  };

  const handleUpdateTitle=(value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,title:value}
    })
  };

  const handleUpdateDescription=(value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,description:value}
    })
  };

  return (
    <div className='App'>
      <h1>My ToDo List</h1>

      <div className='todo-wrapper'>
      
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input 
            type="text" 
            value={newTitle}
            onChange={(e)=>setNewTitle(e.target.value)}
            placeholder="Write the Task Title..."/>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input 
            type="text" 
            value={newDescription}
            onChange={(e)=>setNewDescription(e.target.value)}
            placeholder="Write the Task Description..."/>
          </div>
          <div className='todo-input-item'>
            <button 
            type='button' 
            onClick={handleAddTodo}
            className='primaryBtn'>Add</button>
          </div>
        </div>

        <div className='btn-area'>
          <button
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen (false)}>
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen (true)}>
            Completed
          </button>
        </div>

        <div className='todo-list'>           
          {isCompleteScreen===false && allTodos.map((item,index)=>{

            if(currentEdit===index){
              return(
                <div className='edit-wrapper' key={index}>
                  <input placeholder="Updated Title"
                  value={currentEditedItem.title}
                  onChange={(e)=>handleUpdateTitle(e.target.value)} />
                  <textarea placeholder='Updated Title'
                  rows={4}
                  onChange={(e)=>handleUpdateDescription(e.target.value)}
                  value={currentEditedItem.description} />
                  <button 
                  type="button" 
                  onClick={handleUpdateTodo} 
                  className='primaryBtn'>Update</button>
                </div>
              )


            }else{
              return(
                <div className='todo-list-item' key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
  
              <div>
                <AiOutlineDelete 
                className='icon'
                title="Delete?" 
                onClick={()=>handleDeleteTodo(index)} />
                <BsCheckLg 
                className='check-icon' 
                title="Complete?" 
                onClick={()=>handleComplete(index)} />
                <AiOutlineEdit  className="check-icon"
                  onClick={() => handleEdit (index,item)}
                  title="Edit?" />
              </div>
  
            </div>
              );
            }

          })}

          {isCompleteScreen===true && completedTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><small>Completed On: <i>{item.completedOn}</i></small></p>
            </div>

            <div>
              <AiOutlineDelete 
              className='icon'
              title="Delete?" 
              onClick={()=>handleDeleteCompletedTodo(index)} />
            </div>

          </div>
            )

          })}

        </div>

      </div>
    </div>
  );
}

export default App;
