
import React, { useRef, useEffect, useState, useContext } from "react";
import Webcam from "react-webcam";
import './../App.css';
import axios from 'axios';

function Face({setScreen, time}) {
    const URL= 'http://127.0.0.1:5000'
  
  const webcamRef = useRef(null);
  
  const canvasRef = useRef(null);
  // const captureImage = async () => {
  //   // Создаем снимок экрана
  //   const videoElement = webcamRef.current.video;
  //   const canvasElement = canvasRef.current;
  //   const ctx = canvasElement.getContext('2d');
  
  //   // Устанавливаем размеры холста
  //   canvasElement.width = videoElement.videoWidth;
  //   canvasElement.height = videoElement.videoHeight;
  
  //   // Выполняем захват изображения в следующем доступном кадре видео
  //   requestAnimationFrame(() => {
  //     ctx.drawImage(videoElement, 0, 0);
      
  //     // Получаем данные изображения в формате JPEG
  //     const imageData = canvasElement.toDataURL('image/jpeg');
      
  //     // Отправляем данные изображения в нужное место
  //     setScreen(imageData.split(',')[1]);
  //   });
  // };
  

  
  

  useEffect(()=>{
    time&& (  
      // captureImage(),
     capture())
  },[time])

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Теперь вы можете использовать imageSrc, чтобы показать снимок или выполнить другие операции с ним
    // console.log(imageSrc);
    setScreen(imageSrc.split(',')[1]);
  };

  return ( 
    <div className="w-max"> 
       {/* <p className='m-5 text-7xl'> {picture}</p> */}
      
    
      
      
      <div className="mirror flex"> 
     
        <Webcam 
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="absolute inset-x-0 rounded-lg m-auto w-[632px]"
        /> 
        <canvas 
          ref={canvasRef} 
          className="  output_canvas m-auto relative rounded-lg w-[632px] h-[474px] " 
        /> 
       
      </div> 
 
      
        {/* <LoginForm></LoginForm> */}
        
        
    </div > 
  ); 
} 
 
export default Face;