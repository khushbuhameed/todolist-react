import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [ShowFinished, setshowFinished] = useState(true)

  useEffect(()=>{
   let  todoString = localStorage.getItem("todos")
   if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
   }  
  },[])

 
  const saveToLS =()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
 const toggleFinished =()=>{
 setshowFinished(!ShowFinished)
 }

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos)
    console.log(newTodos)
    saveToLS()
  
  }
  const handleDelete = (e,id) => {
      let newTodos = todos.filter(item=>{
        return item.id!==id;
      });
      setTodos(newTodos)
      console.log(newTodos)
      saveToLS()
  }

  const handleAdd = () => {
   setTodos([...todos,{id: uuidv4(),todo, isCompleted:false}])
   setTodo("")
   console.log(todos)
   saveToLS()
  }

 const handleChange = (e) => {
 setTodo(e.target.value)
 }

 const handleCheckBox =(e)=>{
  let id = e.target.name;
  let index = todos.findIndex(item=>{
  return item.id === id;
 })
  let newTodos = [...todos];
  newTodos[index].isCompleted = !newTodos[index].isCompleted;
  setTodos(newTodos)
  console.log(newTodos)
  saveToLS()
 }

  return (
    <>
    <Navbar />
    
     <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-slate-200 min-h-[89vh] md:w-2/5">
      <h1 className=' text-center text-3xl font-bold'>iTask - Manage your todos at one place</h1>
      <div className="addtodo my-5 flex flex-col gap-4">
        <h2 className='text-xl font-bold'>Add  a ToDo</h2>
        <input onChange={handleChange} value={todo} type="text"className='w-full rounded-lg px-5 py-3' placeholder='Add Somthing here!' />
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-slate-700 hover:bg-slate-500 p-3 py-1 text-sm text-white rounded-lg cursor-pointer'>Save</button>
      </div>
        <input className='m-1 my-4' onChange={toggleFinished} type="checkbox" checked={ShowFinished} />Show Finished
       <h2 className='text-xl font-bold text-center'>Yours ToDoList</h2>
       <div className="todos">
        {todos.length===0 && <div className='m-40 flex justify-center font-bold'>No Todos to Display</div>}
        {todos.map(item =>{

     
       return (ShowFinished || !item.isCompleted) && <div key={item.id} className="todo flex  justify-between my-3">
        <div className='flex gap-5'>
        <input name ={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} />
          <div className= {item.isCompleted?"line-through":""}>{item.todo}</div>
        </div>
         
          <div className="text"></div>
          <div className="buttons flex h-full">
            <button onClick={(e)=>handleEdit(e,item.id)} className='bg-slate-700 hover:bg-slate-500 p-3 py-1 text-sm text-white rounded-lg mx-1'><FiEdit /></button>
            <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-slate-700 hover:bg-slate-500 p-3 py-1 text-sm text-white rounded-lg mx-1'><MdDelete /></button> 
         
          </div>
        </div>
           })}
       </div>
     </div>
    </>
  )
}

export default App
