// Домашняя страница

import React, { Suspense, useContext, useEffect , useRef, useState, } from "react";
import '../App.css';
import 'flowbite';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "../components/Nav";
import { AuthContext, ProjectsContext, VideoContext } from "../context/context";
import DownloadVideo from "../components/DownloadVideo";
import axios from "axios";
import { URL } from "../data/editProject";
import DoxsType from "../components/DoxsType";
import { Link } from "react-router-dom";



function Library(props) {
  
  
  const {video, setVideo}= useContext(VideoContext)
  const {isAuth}= useContext(AuthContext)
    
  const [fontSize, setFontSize] = useState({
    text:'text-base', 
    monoColor: false,
    contrast :  false,
    sound: false,
    voice : false,
    differentColor: false,
    changeColor: false,
    offImg: false,
    button: false,
    link:false,
  });


  const [openModal, setOpenModal] = useState('');
  const modalProps = { openModal, setOpenModal };

  const [data, setData] =useState() 
  const [load, setLoad]= useState(true)

  useEffect(()=>{
    axios.get(URL+'api/video', '')
    .then(response=>
      {
        // setData(response.data)
        console.log(response.data)
        setData(response.data)
        response.data.map(item=>{localStorage.setItem(item, '1')})
        // response.data.map(item=>{
        //   axios.get(URL+'api/video/'+item, '')
        //   .then(responsee=>
        //     {
        //       // setData(response.data)
        //       console.log(responsee)
              
        //     })
        //     .catch(error=>{
        //       console.error('Error fetching tasks:', error);
        //     })
        // })
        setLoad(false)
      })
      .catch(error=>{
        console.error('Error fetching tasks:', error);
        setLoad(false)
      })

  },[])
  console.log(localStorage)
  
  return (
        
    <div className="h-screen relative dark:text-white">
      <div className={"h-screen w-full bg-gray-50 dark:bg-slate-950 dark:text-white  absolute z-0 top-[70px] left-0 "+ isAuth.contrast +' '+ isAuth.monoColor+' '+ isAuth.changeColor+" " +isAuth.saturate+ " "+isAuth.differentColor}></div>
      
      <Nav className={"z-30 dark:bg-slate-950 dark:text-white  "+ isAuth.contrast +' '+ isAuth.monoColor+' '+ isAuth.changeColor+" " +isAuth.saturate+ " "+isAuth.differentColor}  setFontSize={setFontSize}/>
     
      <div className={"top-[170px] absolute w-full flex flex-col items-center z-20 gap-10 "+isAuth.contrast +' '+ isAuth.monoColor+' '+ isAuth.changeColor+" " +isAuth.saturate+ " "+isAuth.differentColor}>
      <div className="flex items-center gap-10 justify-between w-full px-10 ">
       <p className="text-6xl">Video library</p>
        
        <div className="w-max">
        <DownloadVideo/>
        </div>
        
                 
        </div>
      
        <div className="flex flex-col items-center gap-10 justify-center h-[500px] min-w-[500px]">
        {!load?
        data&&data.map(item=>
          <Link to='/train' className="no-underline min-w-max w-full">
            <div onClick={()=>console.log('pup')} className='min-w-max w-full bg-gray-50 dark:bg-gray-500 shadow-sm rounded-lg flex items-center justify-between p-[16px] text-2xl'>
              <div className='w-max flex gap-3'>
                <p className='mb-0'>{item}</p>
                <p className='mb-0 text-blue-600 font-bold'>{localStorage[item]==""?'New!':"Your score: "+localStorage[item]}</p>
              </div>
              
              <DoxsType type={item.substring( item.lastIndexOf('.') + 1)}/>
            </div>
          </Link>
          )
        :<p className="text-4xl my-auto">nothing’s here yet :(</p>}
          </div>
          
        </div>
        

      
     
    </div>
    );
};

export default Library;
