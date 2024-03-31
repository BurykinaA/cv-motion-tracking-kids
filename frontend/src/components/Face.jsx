
import React, { useRef, useEffect, useState, useContext } from "react";
import Webcam from "react-webcam";
import './../App.css';
import axios from 'axios';

function Face({setScreen, time}) {
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
  
    const imageData = canvasElement.toDataURL('image/jpeg');
    setScreen(imageData.split(',')[1])
   

  };

  
  

  useEffect(()=>{
    time&& (  captureImage())
  },[time])

  

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