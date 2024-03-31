// Домашняя страница

import React, { Suspense, useContext, useEffect , useState, } from "react";
import { Link, useParams} from 'react-router-dom';
import '../App.css';
import 'flowbite';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "../components/Nav";
import { AuthContext, ProjectsContext } from "../context/context";
import dolphin from '../assets/dolphin.png'
import { Modal } from "flowbite-react";
import DownloadVideo from "../components/DownloadVideo";
import AskQuestion from "../components/AskQuestion";



function StartPage(props) {
  const params = useParams();
  const {isAuth, setIsAuth}= useContext(AuthContext)
  
  const [openModal, setOpenModal] = useState('');
  const modalProps = { openModal, setOpenModal };
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

  const [name, setName] = useState(""); // состояние для имени

  // Обработчик для изменения имени
  const handleSaveClick = () => {
    
    const inputName = document.getElementById("nameInput").value;
    localStorage.setItem('name', inputName)
    localStorage.setItem('level', '0')
    localStorage.setItem('stars', '0')
    setName(inputName);
  };
useEffect(()=>{console.log(localStorage)},[localStorage])
console.log(localStorage.name)
      
  return (
        
    <div className="h-screen relative dark:text-white">
      <div className={"h-screen w-full bg-gray-50 dark:bg-slate-950 dark:text-white  absolute z-0 top-[70px] left-0 "+ isAuth.contrast +' '+ isAuth.monoColor+' '+ isAuth.changeColor+" " +isAuth.saturate+ " "+isAuth.differentColor}></div>
      
      <Nav className={"z-30 dark:bg-slate-950 dark:text-white  "+ isAuth.contrast +' '+ isAuth.monoColor+' '+ isAuth.changeColor+" " +isAuth.saturate+ " "+isAuth.differentColor} setFilteredData={setFilteredData} setFontSize={setFontSize}/>
     
      {!localStorage.name?
        <div className="top-[270px] absolute w-full flex flex-col items-center z-20 gap-10 justify-center">
          <h1 className="text-7xl">Hey!</h1>
          <div className="flex items-center">
            <img
              className='  w-[500px] opacity-80 inline-block px-2 py-1 cursor-pointer  ease-in-out duration-300 rounded-2xl'
              src={dolphin}
              alt='/'
            />
            <div className=" text-2xl">
              <h1 className="text-7xl">What is your name?</h1>
              <div className="flex items-center">
                <input id="nameInput" className="focus:outline-none bg-gray-100 border-2 border-gray-500 rounded-lg h-10 w-full outline-0 px-2 py-2.5" placeholder="Your name" />
                <button className='flex   h-10 items-center bg-blue-600 focus:bg-blue-800   rounded-lg text-white hover:bg-blue-800 'onClick={handleSaveClick}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      
    
    :
    <div className="top-[270px] absolute w-full flex flex-col items-center z-20 gap-10 justify-center">
    <h1 className="text-7xl">Welcome back, {localStorage.name}!</h1>
    <div className="flex items-center">
      <img
        className='  w-[500px] opacity-80 inline-block px-2 py-1 cursor-pointer  ease-in-out duration-300 rounded-2xl'
        src={dolphin}
        alt='/'
      />
      <div className={isAuth.contrast +' '+ isAuth.monoColor+' '+ isAuth.changeColor+" " +isAuth.saturate+ " "+isAuth.differentColor}>
        {/* <h1 className="text-7xl">What is your name?</h1> */}
        <div className="flex flex-col gap-3 items-center w-[400px] text-2xl">
          {/* <input id="nameInput" className="focus:outline-none bg-gray-100  border-2 border-gray-500 rounded-lg h-10 w-full outline-0 px-2 py-2.5" placeholder="Your name" /> */}
         
            <DownloadVideo/>
            <Link to='/library'className='no-underline w-full'>
            <button className='w-full justify-center gap-2 flex text-white  items-center bg-blue-600 rounded-lg text-white hover:bg-blue-800 '>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 21 20" fill="none">
                <path d="M3.5 17H17.5M10.5 14V3M10.5 14L14 10.5M10.5 14L7 10.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Video library
            </button>
            </Link>
           

            <button className='w-full justify-center gap-2 flex text-white  items-center bg-blue-600 rounded-lg text-white hover:bg-blue-800 '>
              
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none">
                <path d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <circle cx="12" cy="16" r="1" fill="currentColor"/>
                <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
               About app
            </button>
          <AskQuestion/>
           

            <button className='w-full justify-center gap-2 flex text-white  items-center bg-blue-600 rounded-lg text-white hover:bg-blue-800 '>
              
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZElEQVR4nO2WvU7DMBSFM7B15g1A0DBRhg5MPAmPAOlSCYZm6tIuLGVAYiEsbDBT2As8CDAh2Pj5kNULVJGd+joplRBHipQ4595PsuxjR9G/PATUgBtgZN6jWQloAFdAAtSBjB9lMpaIp1EluIe/+lWCLxTg87KwDaCrhH7DpVY/7cA15TUMAbcczT6AA5kR87wUgFsh4NjS6B3YyvmeCsBxyD49tTR6BRaBM2DBA5yp9jnjcHBN8728+4CNRhrw7ZRmMwPXcukUCj5RRyqwVgG4roIaSfaWBSeRVowDv0h3shbeCjyXoSdS99cjcy6HBLAPDICmfPcV4J7UNIFDYM8Xmk40OZIxk8lDWXCx5SIQS7Ybz7rUHE94Ug3U6BlY0l59gGXL4ZH6Qr/0AOwAm8A2sGKpXZV/xrMLPDp6pb7TnlenwNvOm70gNvlCXfBpfqc0UBu8LLgTUNcuC07nURv9SX0CrhqKC8ySGVEAAAAASUVORK5CYII="/>
              Achievements
            </button>
        </div>
      </div>
    </div>
  </div>
    
    }
    </div>
    );
};

export default StartPage;
