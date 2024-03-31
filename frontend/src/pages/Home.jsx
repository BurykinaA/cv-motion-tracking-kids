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
import AskQuestion from "../components/AskQuestion";


function Home(props) {
  const params = useParams();
  const [len, setLen]= useState()
  const {video, setVideo}= useContext(VideoContext)
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
  const [set, setSet] = useState(false)


  const videoRef = useRef(null);

  // !!!!!!!
  const URL='http://127.0.0.1:5000/'

  const [screen, setScreen]= useState('')
  const [origScreen, setOrigScreen] = useState('')
  const [persentage, setPercentage]= useState(0)
  let time=0
  useEffect(() => {
    const video = videoRef.current;

    const captureFrame = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/png');

      setOrigScreen( canvas.toDataURL('image/png'))
     
    };
    
    const handleTimeUpdate = () => {
      const currentTime = Math.floor(video.currentTime);
// console.log(video.duration)
      setPercentage(parseInt((video.currentTime/video.duration)*100))
      if (time!=currentTime) {
        time=currentTime
        // console.log(currentTime, video.currentTime, time)
        captureFrame();
        setSet(true)
      } else setSet(false)
    };

  

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  // useEffect(()=>{ console.log({...screen,originalVideo:origScreen.split(',')[1]})},[screen])
const [data, setData]= useState({})
  useEffect(()=>{axios.post(URL+'api/photo',
  {
    userVideo: screen,
    originalVideo:origScreen.split(',')[1]
  },
   '')
  .then(response=>
    {
      setData(response.data)
      // console.log(response)
    })
    .catch(error=>{
      console.error('Error fetching tasks:', error);
    })},[screen])
  

    const toggleVideo = () => {
      const video = videoRef.current;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    };

    // useEffect(() => {
    //   // Обновляем компонент при изменении значения persentage
    //   console.log(persentage);
    // }, [persentage]);
  return (
        
    <div className="h-screen relative dark:text-white">
      <div className={"h-screen w-full bg-gray-50 dark:bg-slate-950 dark:text-white  absolute z-0 top-[70px] left-0 "+ isAuth.contrast +' '+ isAuth.monoColor+' '+ isAuth.changeColor+" " +isAuth.saturate+ " "+isAuth.differentColor}></div>
      
      <Nav className={"z-30 dark:bg-slate-950 dark:text-white  "+ isAuth.contrast +' '+ isAuth.monoColor+' '+ isAuth.changeColor+" " +isAuth.saturate+ " "+isAuth.differentColor} setFilteredData={setFilteredData} setFontSize={setFontSize}/>
     
      <div className="top-[170px] absolute w-full flex flex-col items-center z-20 gap-10 ">
      <div className="flex items-center gap-10 justify-between w-full px-10">
       
        <AskQuestion/>
        <div className="text-5xl flex items-center gap-10">
          <p className="m-0">{data.Cumulative_Accuracy}</p>
          <p className="m-0">You are doing great, rockstar! </p>
          <p className="m-0 text-base"> {data.Step}</p>
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
          <Face setScreen={setScreen} time={set} />
          <StatusBar video={ videoRef.current}/>
          {/* <div ></div> */}
          {/* <div id="video-container"className="bg-red-100 w-[632px] h-[474px] "></div> */}
          <div id="video-container" className="bg-red-100 w-[677px] h-[474px]"  onClick={()=>toggleVideo}>
            <video ref={videoRef} controls >
              <source src={video.src} type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
          </div>
          
        </div>
        <p className="m-0 text-5xl">(!) Tip: Do some tigidik with your right arm and then some tutun with other arm and repeat for 1 minute</p>

      </div>
     
    </div>
    );
};

export default Home;
