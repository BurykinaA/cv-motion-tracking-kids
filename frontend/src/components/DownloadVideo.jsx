import React, { useContext, useState } from 'react';

import '../App.css';
import { Modal } from 'flowbite-react';
import pic1 from '../assets/pic1.jpeg'
import pic2 from '../assets/pic2.jpeg'
import { Link } from 'react-router-dom';
function DownloadVideo() {
    const [openModal, setOpenModal] = useState('');
    const modalProps = { openModal, setOpenModal };
    
    return (
        <>
             <button className='w-full gap-2 justify-center flex text-white items-center bg-blue-600 rounded-lg text-white hover:bg-blue-800 ' onClick={() => modalProps.setOpenModal('dismissible')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 21 20" fill="none">
            <path d="M3.5 17H17.5M10.5 14V3M10.5 14L14 10.5M10.5 14L7 10.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
              Download video
            </button>
            <Modal  dismissible show={modalProps.openModal == 'dismissible'} size='4xl' onClose={() => modalProps.setOpenModal(undefined)}>
              <Modal.Body className='rounded dark:bg-gray-700'>
              <div class="flex items-center justify-center w-full text-2xl">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-max border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                    <div class="flex flex-col items-center justify-center py-12">
                        <p class="text-gray-500 font-normal  leading-tight">Перетащите файлы или выберите на компьютере</p>
                        <p class="text-center text-blue-600  font-normal  leading-normal flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15.0002 6.99996L8.50019 13.5C8.10237 13.8978 7.87887 14.4374 7.87887 15C7.87887 15.5626 8.10237 16.1021 8.50019 16.5C8.89802 16.8978 9.43758 17.1213 10.0002 17.1213C10.5628 17.1213 11.1024 16.8978 11.5002 16.5L18.0002 9.99996C18.7958 9.20432 19.2428 8.12518 19.2428 6.99996C19.2428 5.87475 18.7958 4.79561 18.0002 3.99996C17.2045 3.20432 16.1254 2.75732 15.0002 2.75732C13.875 2.75732 12.7958 3.20432 12.0002 3.99996L5.50019 10.5C4.30672 11.6934 3.63623 13.3121 3.63623 15C3.63623 16.6878 4.30672 18.3065 5.50019 19.5C6.69367 20.6934 8.31236 21.3639 10.0002 21.3639C11.688 21.3639 13.3067 20.6934 14.5002 19.5L21.0002 13" stroke="#1D5DEB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Выбрать файл
                        </p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" />
                </label>
            </div> 
            <Link to='/train'>
            <button className='w-full justify-center gap-2 flex text-white mt-3 items-center bg-blue-600 rounded-lg text-white hover:bg-blue-800 '>
              Start
            </button>
            </Link>
            
              </Modal.Body>
            </Modal>
        </>
    );
}

export default DownloadVideo;

