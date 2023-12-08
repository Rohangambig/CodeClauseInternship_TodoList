import React,{useState,useEffect}from 'react';
import './App.css';
// import CursorPoiner from './component/CursorPoiner';

// <CursorPoiner></CursorPoiner>

// <CursorPoiner></CursorPoiner>
function App() {

  const [currentPosition,setX] = useState({x:0,y:0});
  window.addEventListener('mousemove',(e) => {
      setX({x:e.clientX,y:e.clientY});
  })

  const  [Toggle,settoggle] = useState(false);
  const [alltodos,setalltodo] = useState([]);
  const [Title,setTitle] = useState("");
  const [Desccript,setdescript] = useState("");
  const [complete,setcomplete] = useState([]);

  const Handler =(e) =>{
    e.preventDefault();
    let Todo ={
      title:Title,
      description:Desccript
    }                                                                                                       
    let updatedTodo =[...alltodos];
    updatedTodo.push(Todo);
    setalltodo(updatedTodo);

    localStorage.setItem('TodoList',JSON.stringify(updatedTodo))
}

useEffect(()=>{
  let savedTodo = JSON.parse(localStorage.getItem('TodoList'))
  let savedcompltedTodo = JSON.parse(localStorage.getItem('Completed'))
  if(savedTodo)
  {
    setalltodo(savedTodo);
  }
  if(savedcompltedTodo)
  {
    setcomplete(savedcompltedTodo)
  }
},[])

const DeleteTodo = (index) =>{
  let reduced = [...alltodos]
  reduced.splice(index,1);
  localStorage.setItem('TodoList',JSON.stringify(reduced))
  setalltodo(reduced)
}

const DeletecompltedTodo = (index) =>{
  let reduced = [...complete]
  reduced.splice(index,1);
  localStorage.setItem('Completed',JSON.stringify(reduced))
  setcomplete(reduced)
}


const CompleteTodo = (index) =>{
  let now = new Date()
  let dd = now.getDate();
  let month = now.getMonth()+1;
  let yy = now.getFullYear();
  let hours = now.getHours();
  let minute = now.getMinutes();
  let seconds =  now.getSeconds();
  let Completedon = dd+"-"+month+"-"+yy+' at '+hours+":"+minute+":"+seconds;

  let filteredon = {
    ...alltodos[index],
    completedOn:Completedon
  }
  let updatedcompletedarry = [...complete]
updatedcompletedarry.push(filteredon)
setcomplete(updatedcompletedarry)
DeleteTodo(index);
localStorage.setItem('Completed',JSON.stringify(updatedcompletedarry))
}

  return (
   <div className='App'>

   <div className="cursor-dot" style={{left:currentPosition.x,top:currentPosition.y,position:'absolute'}}></div>
   <div className="cursor" style={{left:currentPosition.x,top:currentPosition.y,position:'absolute'}}></div>

       <h1 className='Headings'>My Todos</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-title'>
          <label>Title</label>
          <input type='text'  onChange={(e)=>{setTitle(e.target.value)}} placeholder="Whats's the task Title ?"></input> 
          </div>

          <div className='todo-input-title'>
          <label>Description</label>
          <input type='text'  onChange={(e)=>{setdescript(e.target.value)}} placeholder="Whats's the Description ?"></input> 
          </div>

          <div className='todo-input-title'>
           <button type='button' onClick={Handler} className='PrimaryButton'>Add</button>
          </div>
        </div> 

        <div className='button-area'>
          <button className={`secondaryBtn ${Toggle === false && 'active'}`} onClick={()=>settoggle(false)}>Todo</button>
          <button className={`secondaryBtn ${Toggle === true && 'active'}`} onClick={()=>settoggle(true)}>Completed</button>
      </div>

      <div className='todo-list'>
        {Toggle === false && alltodos.map((item,index)=>{
          return(
            <div className='todo-list-item' key={index}>
          <div>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>

          <div>
            <i id='delete' onClick={()=>DeleteTodo(index)} class='bx bxs-trash-alt'></i>
            <i id='check' onClick={()=>CompleteTodo(index)} class='bx bx-check'></i>
          </div>
        </div>
          )
        })}

        {Toggle=== true && complete.map((item,index)=>{
          return(
            <div className='todo-list-item' key={index}>
          <div>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <p><small>Completed on: {item.completedOn}</small></p>
          </div>

          <div className='deleteICon'>
            <i id='delete' onClick={()=>DeletecompltedTodo(index)} class='bx bxs-trash-alt'></i>
          </div>
        </div>
          )
        })}
      </div>
   </div>

        

</div>   );
}

export default App;
