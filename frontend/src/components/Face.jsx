
import React, { useRef, useEffect, useState, useContext } from "react";
import Webcam from "react-webcam";
import './../App.css';
import axios from 'axios';

function Face() {
    const URL= 'http://127.0.0.1:5000'
  
  const webcamRef = useRef(null);
  
  const canvasRef = useRef(null);
 

  const [imageSent, setImageSent] = useState(false);
  const captureImage = async () => {
    // Создаем снимок экрана
    
    const videoElement = webcamRef.current.video;
    const canvasElement = canvasRef.current;
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    const ctx = canvasElement.getContext('2d');
    ctx.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
  
    // Получаем данные с Canvas в формате base64
    const imageData = canvasElement.toDataURL('image/jpeg');
    // axios.post(URL+'/api/cam', [{photo: imageData.split(',')[1]}])
    //       .then(response => {
    //         const data= response.data
    //         // localStorage.setItem('response', data.photo)
    //         setPicture(data[0].log)
    //         // console.log(data.id)
    //       })
    //       .catch(error => {
    //           console.error('Error:', error);
    //       });
        
      
   

  };


  

  

  useEffect(() => {

  }, [])

  return ( 
    <div className="w-max"> 
       {/* <p className='m-5 text-7xl'> {picture}</p> */}
      
    
      
      
      <div className="mirror flex"> 
     
        <Webcam 
          ref={webcamRef} 
          className="absolute inset-x-0  rounded-lg m-auto w-[632px] "
          
        /> 
        <canvas 
          ref={canvasRef} 
          className="output_canvas m-auto relative rounded-lg w-[632px] h-[474px] " 
        /> 
      </div> 
 
      
        {/* <LoginForm></LoginForm> */}
        
        
    </div > 
  ); 
} 
 
export default Face;