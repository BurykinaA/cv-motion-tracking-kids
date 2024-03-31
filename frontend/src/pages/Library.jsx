// Домашняя страница

import React, { Suspense, useContext, useEffect , useRef, useState, } from "react";
import { Link, useParams} from 'react-router-dom';
import '../App.css';
import 'flowbite';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "../components/Nav";
import axios from "axios";
import {postTaskData} from '../data/editProject'
import { AuthContext, ProjectsContext, VideoContext } from "../context/context";
import Face from "../components/Face";
import { Modal } from "flowbite-react";
import DownloadVideo from "../components/DownloadVideo";
import StatusBar from "../components/StatusBar";


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
      
        <div className="flex items-center gap-10 justify-center h-[500px]">
        <p className="text-4xl my-auto">nothing’s here yet :(</p>
          </div>
          
        </div>
        

      
     
    </div>
    );
};

export default Library;
