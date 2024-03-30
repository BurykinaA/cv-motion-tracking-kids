// Домашняя страница

import React, { Suspense, useContext, useEffect , useState, } from "react";
import { Link, useParams} from 'react-router-dom';
import '../App.css';
import 'flowbite';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "../components/Nav";
import axios from "axios";
import {postTaskData, URL} from '../data/editProject'
import { AuthContext, ProjectsContext } from "../context/context";
import Face from "../components/Face";
import { Modal } from "flowbite-react";
import DownloadVideo from "../components/DownloadVideo";


function Home(props) {
  const params = useParams();
  const [len, setLen]= useState()
  const {isAuth}= useContext(AuthContext)
  const { setProj}= useContext(ProjectsContext)
    
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
  const [category, setCategory]=useState([])

  

  function speak(text) {
    if(localStorage.getItem('sound')&&localStorage.getItem('sound')!=''&&localStorage.getItem('sound')!=null){
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = localStorage.getItem('sound');
      console.log("localStorage.getItem('sound')", localStorage, utterance.rate)
      speechSynthesis.speak(utterance);
    }
  }
  const [filteredData, setFilteredData] = useState([]);
  const [filteredData2, setFilteredData2] = useState([]);
  const handleFilterChange = (event) => {
    if (category && category.length > 0) {
      const filterValue = event.target.value;
      const filteredData = category.filter((item) =>
        item.category_name.toLowerCase().includes(filterValue.toLowerCase())
      );
      setFilteredData2(filteredData);
    }
  };


  const [openModal, setOpenModal] = useState('');
  const modalProps = { openModal, setOpenModal };
      
  return (
        
    <div className="h-screen relative">
      <div className={"h-screen w-full bg-gray-50 dark:bg-slate-950 dark:text-white  absolute z-0 top-[70px] left-0 "+ isAuth.contrast +' '+ isAuth.monoColor+' '+ isAuth.changeColor+" " +isAuth.saturate+ " "+isAuth.differentColor}></div>
      
      <Nav className={"z-30 dark:bg-slate-950 dark:text-white  "+ isAuth.contrast +' '+ isAuth.monoColor+' '+ isAuth.changeColor+" " +isAuth.saturate+ " "+isAuth.differentColor} setFilteredData={setFilteredData} setFontSize={setFontSize}/>
     
      <div className="top-[170px] absolute w-full flex flex-col items-center z-20 gap-10 ">
      <div className="flex items-center gap-10 justify-between w-full px-10">
        <button className='flex gap-2 w-max  items-center bg-blue-600   rounded-lg text-white hover:bg-blue-800 ' onClick={() => modalProps.setOpenModal('dismissible')}>
             
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none">
            <path d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="16" r="1" fill="currentColor"/>
            <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Ask a question
        </button>
        <div className="text-5xl flex items-center gap-10">
          <p className="m-0">{data.Cumulative_Accuracy}</p>
          <p className="m-0 ">You are doing great, rockstar!</p>
          <p className="m-0 text-base">{data.Step}</p>
        </div>
        <div className="w-max">
        <DownloadVideo/>
        </div>
        
                   <Modal  dismissible show={modalProps.openModal === 'dismissible'} size='4xl' onClose={() => modalProps.setOpenModal(undefined)}>
                    
                     <Modal.Body className='rounded dark:bg-gray-700 flex flex-col justify-center'>
                        <p className=" mx-auto text-5xl">Ask me any question!</p>
                     
                       {/* <FirstLaunchForm modalProps={modalProps} setFontSize={setFontSize}/> */}
                       <textarea className=" h-[300px] focus:outline-none bg-gray-100 border-2 border-gray-500 rounded-lg h-10 w-full outline-0 px-2 py-2.5"/>
                       <button className='w-full justify-center gap-2 flex text-white mt-3 items-center bg-blue-600 rounded-lg text-white hover:bg-blue-800 '>
                        Send
                      </button>
                     </Modal.Body>
                   </Modal>
        </div>
      
        <div className="flex items-center gap-10 justify-center">
          <Face/>
          <div className="relative">
          <div className="absolute bottom-0 left-0 bg-green-200 w-[40px] h-[274px]  border-[3px] border-green-400 border-t-0 rounded-b-full  z-10"/>
            <div className="bg-green-50 w-[40px] h-[474px] rounded-full border-[3px] border-green-400 relative"/>
            
          </div>

          <div className="bg-red-100 w-[632px] h-[474px] "></div>
        </div>
        <p className="m-0 text-5xl">(!) Tip: Do some tigidik with your right arm and then some tutun with other arm and repeat for 1 minute</p>

      </div>
     
    </div>
    );
};

export default Home;
