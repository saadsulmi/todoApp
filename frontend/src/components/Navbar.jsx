import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Reset_auth } from '../features/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineLogout } from "react-icons/hi";
import { getUserApi } from '../services/API';
import { create_user, reset_user } from '../features/userReducer';
import { BsCloudMoon,BsCloudSun } from "react-icons/bs";

function Navbar() {
    const auth = useSelector(state=>state.auth);
    const dispatch = useDispatch()
    const [mode,setMode]=useState(true);

    const handleMode = ()=>{
      setMode(!mode);
      localStorage.setItem('mode',mode)
    }
    useEffect(()=>{
      if(auth){
        console.log('here here he',auth.auth);
        getUserApi({auth:auth.auth}).then(res=>{
          if(res.data){
            console.log(res.data,"here is my new data");
            dispatch(create_user(res.data))
          }else{
            dispatch(reset_user())
          }
        })
        localStorage.getItem('mode')
      }
    },[auth])
    const navigate=useNavigate();
    const location = useLocation();
    const [heading,setHeading]= useState(['ADD TO DO','TASK TO COMPLETE','COMPLETED TASK'])
    const handleLogout =()=>{
      localStorage.removeItem('auth-token')
      dispatch(Reset_auth())
      dispatch(reset_user())
      console.log(auth,"nthaay poii");
    }
    let result=''
    mode?result='header':result='nightheader'
    useEffect(()=>{
      console.log(localStorage.getItem('mode'))
    },[navigate])
  return (
    <>
       <div className={result}>
        <div className='headerBorder2'><h1 onClick={()=>navigate('/home')}>Let's TO DO</h1></div>
       <div>
        {heading.map((value,idx)=>{
                if(location.pathname==='/home'&&value==='ADD TO DO'){
                    return (<h1 key={idx} style={{fontSize:'25px'}}>{value}</h1>)
                }
                else if(location.pathname==='/task'&&value==='TASK TO COMPLETE'){
                    return (<h1 key={idx} style={{fontSize:'25px'}}>{value}</h1>)
                }
                else if(location.pathname==='/completed'&&value==='COMPLETED TASK'){
                    return (<h1 key={idx} style={{fontSize:'25px'}}>{value}</h1>)
                }
            })}
       </div>
        <div className='headerBorder'>
            <div className='subHeader'>
                <h1 onClick={()=>navigate('/')}>Home</h1>
                <h1 onClick={()=>navigate('/task')}>Task</h1>
                <h1 onClick={()=>navigate('/completed')}>Completed</h1>
                <h1 onClick={handleMode}>{mode?<BsCloudMoon/>:<BsCloudSun/>}</h1>
                <h1><HiOutlineLogout onClick={handleLogout} sx={{width:'20px'}}/></h1>
            </div> 
        </div>
      </div>
    </>
  )
}

export default Navbar
