import React, { useContext, useState } from 'react';

import '../App.css';
import {Link} from 'react-router-dom';
import { Modal } from 'flowbite-react';
import FirstLaunchForm from "../components/FirstLaunchForm";
import Help from './Help';
import { AuthContext } from '../context/context';

function Nav({setFilteredData,  setFontSize, products, name} ) {
    const [openModal, setOpenModal] = useState('');
    const modalProps = { openModal, setOpenModal };
    const {isAuth, setIsAuth}= useContext(AuthContext)
    const [set, setSet]= useState(false)
  return (
    <div className={'z-30 shadow bg-gray-100 dark:bg-gray-700'+ isAuth.contrast +' '+ isAuth.monoColor+' '+ isAuth.changeColor+" " +isAuth.saturate+ " "+isAuth.differentColor}>
      <div className="nav fixed min-h-[70px] flex items-center justify-between z-30  dark:bg-slate-800">  
        
        
        <div className='flex w-max items-center'>
        <a href="https://youtu.be/dQw4w9WgXcQ"  className='ml-1 pt-1 w-[30px]' target="_blank" draggable="false" display="false">
            <img src="/static/MISIShunters.svg" className='ml-1 py-1' draggable="false" width="60%"/>
        </a>
        <br/>
        <div className=' mx-3'>
          <Link to='/' className='rounded-lg' >
            <button className='bg-blue-600 flex items-center focus:bg-blue-800 hover:ring-8 hover:ring-blue-500 focus:ring-blue-500 focus:ring-8   rounded-lg text-white hover:bg-blue-800 ' >
              <svg class="w-6 h-6 inline-block mr-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"/>
              </svg>
              Home
            </button>
          </Link>
        </div>
        </div>
      { localStorage.name&& 
        <div className='flex w-max items-center gap-5'>
          <h1>
          {localStorage.name}
        </h1>
        <h1>
        ⚡ Level: {localStorage.level}
        </h1>
        <h1>
        🌟 Stars: {localStorage.stars}
        </h1>
        </div>}
     
       
        
           
       
        
            
{/*             
       
          {setFilteredData!=undefined&&
           <form className="flex-grow"> 
            <VoiceSearch setFilteredData={setFilteredData} />
            </form>
          }   */}
       
        
        

        
       <div className='flex w-max items-center'>
        {setFontSize!=undefined&&
          <>
            <button className='flex  mx-3 items-center bg-blue-600 focus:bg-blue-800 hover:ring-8 hover:ring-blue-500 focus:ring-blue-500 focus:ring-8   rounded-lg text-white hover:bg-blue-800 ' onClick={() => modalProps.setOpenModal('dismissible')}>
              <svg class="w-6 h-6 text-white inline-block mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M19 11V9a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L12 2.757V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L2.929 4.343a1 1 0 0 0 0 1.414l.536.536L2.757 8H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535L8 17.243V18a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H18a1 1 0 0 0 1-1Z"/>
                  <path d="M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                </g>
              </svg>
              Settings
            </button>
            <Modal  dismissible show={modalProps.openModal === 'dismissible'} size='4xl' onClose={() => modalProps.setOpenModal(undefined)}>
              <Modal.Body className='rounded dark:bg-gray-700'>
                <FirstLaunchForm modalProps={modalProps} setFontSize={setFontSize}/>
              </Modal.Body>
            </Modal>
          </>
        }
         <button className='flex gap-2 mx-3 items-center bg-blue-600 focus:bg-blue-800 hover:ring-8 hover:ring-blue-500 focus:ring-blue-500 focus:ring-8   rounded-lg text-white hover:bg-blue-800 ' onClick={() =>( localStorage.setItem('name', ''), setIsAuth({...isAuth, name:''}))}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>


              Quit
            </button>
        <Help/>
       
        </div>
      </div> 
    </div>


  );
}

export default Nav;

