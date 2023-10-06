import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Backdrop } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillClipboardCheckFill } from "react-icons/bs";
import { fetchAllTask, taskCompleted } from '../services/API';
function Task() {
    const [heading,setHeading]= useState([]);
    const user=useSelector(state=>state.user.user)
    const dispatch = useDispatch()
    useEffect(()=>{
     if(user){
      fetchAllTask({id:user.id}).then(res=>{
        setHeading([...res.data.reverse()])
      })
     }
     
    },[user])
    const handleComplete=(value)=>{
       taskCompleted({todo:value,user}).then(res=>{
        setHeading([...res.data.reverse()])
       }).catch(err=>{
        console.log(err);
       })
        console.log(value);
    }
  return (
    <>
      <Navbar/>
      <div className="bodyTodotask">
          <div className="bodyTodotasksub">

  {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
  <FormControlLabel required control={<Checkbox />} label="Required" />
  <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
            {heading&&heading.map((val,idx)=>{
                return(
                   <div key={idx} className='Task'><h1 className='tskcomplete'><BsFillClipboardCheckFill onClick={(e)=>{
                    handleComplete(val)
                   }}/></h1><h1>{val}</h1></div>
                    )
                })}
             
        </div>
      </div>
    </>
  )
}

export default Task
