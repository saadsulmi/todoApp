import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Navbar from '../components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addTask, fetchAllTask } from '../services/API';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
    const [todo,setTodo]  = useState('');
    const [todoList,setTodoList]  = useState([]);
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user.user)

    useEffect(()=>{
        console.log(user?.id,'<==this is inside home');
            fetchAllTask({id:user?.id}).then((res)=>{
                if(res.data){
                    console.log(res.data);
                    setTodoList([...res.data])
                }
                
            })
            .catch(err=>{
                console.log(err);
            })

    },[user])

   

    

    const handleTodo=()=>{
       addTask({todo}).then(res=>{
        if(res.status===200){
            toast.success(`task added successfully`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        setTodoList([...res.data])
        setTodo('')
       }).catch(err=>{
        if(err.response.status===409){
            toast.warn(`${err.response.data.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }else{
            toast.warn(`${err.response.data.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
       })
    }
  return (
    <>
     <Navbar/>
     <div className='bodyTodomain'>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" value={todo} sx={{
            background:'white',
            width: '1000px',
            borderRadius:'50px'
        }} onChange={(e)=>setTodo(e.target.value)} />
        <div>
        <button className='addButton' onClick={handleTodo}>ADD TO DO</button>
        </div>
        <ToastContainer
// position="top-right"
// autoClose={5000}
// hideProgressBar={false}
// newestOnTop={false}
// closeOnClick
// rtl={false}
// pauseOnFocusLoss
// draggable
// pauseOnHover
// theme="light"
/>

     </div>

    </>
  )
}

export default Home
