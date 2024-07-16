import { useEffect, useState } from 'react';
import './App.css';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import { BsCheckLg } from "react-icons/bs";
import TodoInput from './components/TodoInput';

function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem ('todolist')) || [];
  });

  const [completedTodos,setCompletedTodos] = useState([]);
  const [currentEdit,setCurrentEdit] = useState("");
  const [currentEditedItem,setCurrentEditedItem] = useState("");



  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1); 
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index)=>{

    let now = new Date();
    let completedOn = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',      hour: '2-digit', minute: '2-digit',
      //year: 'numeric',
      //month: '2-digit',
      //day: '2-digit',

    }).format(now);

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo =(index)=>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  useEffect (() => {
    let savedTodo = JSON.parse (localStorage.getItem ('todolist'));
    let savedCompletedTodo = JSON.parse (localStorage.getItem ('completedTodos'));

    if (savedTodo) {
      setTodos (savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos (savedCompletedTodo);
    }
  }, []);

  const handleEdit=(ind,item)=>{
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateTodo=()=>{
    let newToDo = [...allTodos];
    newToDo[currentEdit]=currentEditedItem;
    setTodos(newToDo);
    localStorage.setItem('todolist',JSON.stringify(newToDo));
    setCurrentEdit(""); 
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
      
      <TodoInput
        allTodos={allTodos}
        setTodos={setTodos}
      />
      
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
