import axios from 'axios';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { render } from "react-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { AuthContext, ProjectsContext } from '../context/context';
import {postTaskData, URL} from '../data/editProject'
// import KeyboardComponent from './KeyboardComponent';
// import RussianKeyboard from './RussianKeyboard'; 


function VoiceSearch({setFilteredData}) {
  const {Proj}= useContext(ProjectsContext)
  const [recognition, setRecognition] = useState(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const {isAuth, setIsAuth}= useContext(AuthContext)
  const [show, setShow] = useState(false)

  const [layoutName, setLayoutName] = useState('default'); // Начальная раскладка (по умолчанию)
const [currentLanguage, setCurrentLanguage] = useState('ru');
  const [input, setInput] = useState(""); // Хук для input
  
  
  const layouts = {
    en: {
      default: [
        "{✖} 1 2 3 4 5 6 7 8 9 0 {backspace}",
    "q w e r t y u i o p",
    "a s d f g h j k l",
    "{shift} z x c v b n m",
    "{language} {space} {enter}",
  ],
  shift: [
    "{✖} ! @ # $ % ^ & * ( ) {backspace}",
    "Q W E R T Y U I O P",
    "A S D F G H J K L",
    "{shift} Z X C V B N M",
    "{language} {space} {enter}",
  ],
    },
    ru: {
      default: [
        "{✖} 1 2 3 4 5 6 7 8 9 0 {backspace}",
        "й ц у к е н г ш щ з х ъ",
        "ф ы в а п р о л д ж э",
        "{shift} я ч с м и т ь б ю",
        "{language} {space} {enter}",
      ],
      shift: [
        "{✖} ! @ # $ % ^ & * ( ){backspace}",
        "Й Ц У К Е Н Г Ш Щ З Х Ъ",
        "Ф Ы В А П Р О Л Д Ж Э",
        "{shift} Я Ч С М И Т Ь Б Ю",
        "{language} {space} {enter}",
      ],
    },
  };

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognitionInstance = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

      recognitionInstance.onstart = () => {
        setListening(true);
      };

      recognitionInstance.onend = () => {
        setListening(false);
      };

      recognitionInstance.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setTranscript(speechToText);
        handleSearch(speechToText);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = () => {
    event.preventDefault(); 
    
    // console.log(isAuth.voice=='true' || isAuth.voice==true)
    if (recognition && (isAuth.voice=='true' || isAuth.voice==true)) {
      recognition.start();
    }
  };

  const handleSearch = (query) => {
    event.preventDefault(); 
    // console.log('Search query:', query);
  };

  useEffect(()=>{
    
    postTaskData.search='Нажмите Enter или кнопку "Поиск" что бы провести автокоррекцию текста и поиск товаров.'
    setIsAuth((prevIsAuth) => ({ ...prevIsAuth, search: 'Нажмите Enter или кнопку "Поиск" что бы провести автокоррекцию текста и поиск товаров.' }));
    if (Proj && Proj.length > 0) {
        const filterValue = transcript;
        
        const filteredData = Proj.filter((item) =>
          item.product_name.toLowerCase().includes(filterValue.toLowerCase())
        );
        
        setFilteredData(filteredData);
        
      }
  },[transcript])

  const handlePost = () => {
    axios
      .post(URL + 'api/correct', { search: '' + transcript })
      .then((response) => {
        setIsAuth((prevIsAuth) => ({ ...prevIsAuth, search: 'Ничего не нашлось...' }));
        setTranscript(response.data.corection);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const onChange = (newInput) => {
    setTranscript(newInput);
    // console.log("Input changed", newInput);
  };

  const onKeyPress = (button) => {
    // console.log("Button pressed", button);
    if (button === "{shift}" || button === "{shiftleft}" || button === "{shiftright}") {
      setLayoutName((prevLayoutName) => (prevLayoutName === "default" ? "shift" : "default"));
      // setCurrentLanguage((prevLanguage) => (prevLanguage === "en" ? "ru" : "en"));
    } else if (button === "{language}") {
      setCurrentLanguage((prevLanguage) => (prevLanguage === "en" ? "ru" : "en"));
    }
    else if(button == "{enter}") { handlePost() }
    else if(button == "{✖}") { setShow(false) }
    
  };

  const handleShift = () => {
    setLayoutName((prevLayoutName) =>
      prevLayoutName === "default" ? "shift" : "default"
    );
  };

  const onChangeInput = (event) => {
    const newInput = event.target.value;
    setInput(newInput);
    this.keyboard.setInput(newInput);
  };
  

  return (
    <div>
{/* {console.log(currentLanguage, layoutName, layouts)} */}
      <div className="flex ">
        <label for="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
        <div className="relative w-full">
          {(isAuth.voice=='true' || isAuth.voice==true)?
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
              </svg>
            </div>
            :
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
          }
          <input onClick={startListening} onFocus={()=>( isAuth.keyboard&& setShow(true))}  onChange={(e)=>setTranscript(e.target.value) } type="search" id="search-dropdown" value= {transcript} className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
          <button onClick={handlePost} type='button'  className=" flex items-center absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-blue-600 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  focus:bg-blue-800">
            <svg className="w-4 h-4 inline-block mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>          
            </svg>
            Search
          </button>
          
        </div>
      </div>
      
       {layoutName!=undefined&& currentLanguage!=undefined&& show &&
       <div className='fixed w-[50%] ' >
        <Keyboard
        
        layoutName={layoutName}
        layout={layouts[currentLanguage]}
        onChange={onChange}
        onKeyPress={onKeyPress}
        
      />
      </div>
       }
        

      


      
    </div>
  );
}

export default VoiceSearch;
