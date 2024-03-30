import { useState, useEffect } from 'react'
import React from 'react';
import {  BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import AppRouted from "./components/AppRouted";
import {AuthContext, CartContext, ProjectsContext, VideoContext } from './context/context';
import Nav from "./components/Nav";
import ThemeToggle from './components/ThemeToggle';



function App() {
  const [isAuth, setIsAuth] = useState('')
  const [video, setVideo]= useState('')
  const [CartItem, setCartItem] = useState([]);
  const [Proj, setProj] = useState([])

  useEffect(()=>{
    // console.log(localStorage)
    // console.log(localStorage.getItem('cart'))
    if (localStorage.length!=0)
      setIsAuth(localStorage)
    if(localStorage.getItem('cart')!=null)
      setCartItem(JSON.parse(localStorage.getItem('cart')))
  },[localStorage])
  useEffect(()=>{
    console.log('localStorage', localStorage)
    console.log('isAuth', isAuth)
    // console.log(localStorage.getItem('cart'))
   
  })
  
  const [count, setCount] = useState(0)

  return (
    <div >
      <AuthContext.Provider value={{isAuth, setIsAuth}}>
        {/* <CartContext.Provider value={{CartItem, setCartItem}}> */}
          <VideoContext.Provider value={{video, setVideo}}>
            <BrowserRouter>
              <div className='w-min fixed right-0 top-3 z-40'>
                <ThemeToggle />
              </div>
              <AppRouted/>
            </BrowserRouter>
          </VideoContext.Provider>
        {/* </CartContext.Provider> */}
      </AuthContext.Provider>
    </div>
  )
}

export default App
