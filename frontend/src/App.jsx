import { lazy,Suspense } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import UserPublicRoute from '../src/routes/UserPublicRoutes'
import UserPrivateRoutes from '../src/routes/UserPrivateRoutes'
function App() {
  
  const Loginpage = lazy(()=>import('../src/pages/LoginPage'))
  const SignupPage = lazy(()=>import('../src/pages/SignupPage'))
  const Home = lazy(()=>import('./pages/Home'))
  const Task = lazy(()=>import('./pages/Task'))
  const Completed = lazy(()=>import('./pages/CompletedTask'))
  return (
    <>
    <Suspense>
      <Routes path='/' >
        <Route element={<UserPublicRoute/>} >
          <Route index element={<Loginpage/>}></Route>
          <Route path='/signup' element={<SignupPage/>}></Route>
        </Route>
        <Route element={<UserPrivateRoutes/>}>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/task' element={<Task/>}></Route>
          <Route path='/completed' element={<Completed/>}></Route>
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Suspense>
    </>
  )
}

export default App
