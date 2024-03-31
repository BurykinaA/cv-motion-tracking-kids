import React, { useContext, useEffect, useRef, useState } from 'react';

import '../App.css';
import { Modal } from 'flowbite-react';
import { AuthContext, VideoContext } from '../context/context';
import { URL } from '../data/editProject';
import axios from 'axios';

function AskQuestion() {
  
  // const [text, setText]=useState('')
  let text=''
  
  const {isAuth}= useContext(AuthContext)
    const [openModal, setOpenModal] = useState('');
    const modalProps = { openModal, setOpenModal };
    const [data, setData]=useState()
    const textRef = useRef(null);

  const handleSend = () => {
    const formData = {
      text: textRef.current.value
    };
    // modalProps.setOpenModal(undefined);
    axios.post(URL + 'api/text', {text:formData.text}, '')
      .then(response => {
        setData(response.data);
        console.log(response);
        textRef.current.value = '';
      })
      .catch(error => {
        textRef.current.value = '';
        setData(error.message);
        console.error('Error fetching tasks:', error);
      });
  };
    useEffect(()=>{setData()},[openModal])
    return (
        <div className={'dark:text-white w-full '+isAuth.contrast +' '+ isAuth.monoColor+' '+ isAuth.changeColor+" " +isAuth.saturate+ " "+isAuth.differentColor}>
             <button className={'min-w-max w-full gap-2 justify-center flex text-white items-center bg-blue-600 rounded-lg text-white hover:bg-blue-800 '+isAuth.contrast +' '+ isAuth.monoColor+' '+ isAuth.changeColor+" " +isAuth.saturate+ " "+isAuth.differentColor} onClick={() => (modalProps.setOpenModal('dismissible'))}>
              {text=''}
             <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none">
            <path d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="16" r="1" fill="currentColor"/>
            <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Ask a question
        
            </button>
            <Modal  className={'dark:text-white '+isAuth.contrast +' '+ isAuth.monoColor+' '+ isAuth.changeColor+" " +isAuth.saturate+ " "+isAuth.differentColor}  dismissible show={modalProps.openModal == 'dismissible'} size='4xl' onClose={() => modalProps.setOpenModal(undefined)}>
              <Modal.Body className='rounded dark:bg-gray-700'>
               <p className=" mx-auto text-5xl">Ask me any question!</p>
                { 
                  data?
                    <>
                      <p className=" mx-auto text-3xl">{data.output}</p>
                      <button className='w-full justify-center gap-2 flex text-white mt-3 items-center bg-blue-600 rounded-lg text-white hover:bg-blue-800 ' onClick={()=>setData()}>
                          Another question
                        </button>
                    </>
                   
                  :

                    <>
                    <textarea ref={textRef} className=" h-[300px] focus:outline-none bg-gray-100 border-2 border-gray-500 rounded-lg h-10 w-full outline-0 px-2 py-2.5 dark:bg-gray-400 text-3xl" />
                      <button className='w-full justify-center gap-2 flex text-white mt-3 items-center bg-blue-600 rounded-lg text-white hover:bg-blue-800 ' onClick={handleSend}>
                        Send
                      </button>
                    </>
                }
              </Modal.Body>
            </Modal>
        </div>
    );
}

export default AskQuestion;

