import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useLocation } from 'react-router-dom';
import { HiBackspace } from "react-icons/hi";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { BsXSquareFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { deleteTask, fetchCompletedTask } from '../services/API';

function CompletedTask() {
  const user = useSelector(state=>state.user.user)
  const [completed,setCompleted] = useState ([])

  useEffect(()=>{

    if(user){
      fetchCompletedTask({userid:user?.id})
    .then(res=>{
      setCompleted([...res.data.reverse()])
    })
    .catch(err=>{
      console.log(err);
    })
    }

  },[user])

  const handleDelete = (val) => {
    deleteTask({val,id:user?.id}).then(res=>{
      setCompleted([...res.data.reverse()])
    }).catch(err=>{
      console.log(err);
    })
  };
  return (
    <>
      <Navbar/>
      <div className="bodyTodotask">
        <div className="bodyCompletetasksub">
        {completed&&completed.map((val,idx)=>{
                return(
                   <div key={idx} className='Task3'><h1>{val}</h1><h2><BsXSquareFill onClick={(e)=>{
                    handleDelete(val)
                   }}/></h2></div>
                    )
                })}
        </div>
        </div>
    </>
  )
}

export default CompletedTask
