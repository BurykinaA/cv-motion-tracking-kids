// карточка товара
import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import { Checkbox, Label, Radio, Table, DarkThemeToggle, Flowbite} from 'flowbite-react';
import { AuthContext } from '../context/context';
import {postTaskData} from '../data/editProject'
import testPic from '../assets/testPic.png'

function FirstLaunchForm({ modalProps, setFontSize }) {
  const {isAuth, setIsAuth}= useContext(AuthContext)
  const [sound, setSound]= useState(false)
  const [contrast, setContrast]= useState(false)
  const [changeColor, setChangeColor]=useState(false)
  const [saturate, setSaturate] = useState(false)
  const [set, setSet]= useState('')
  useEffect(()=>{
    // console.log('isAuthisAuth',isAuth,'localSrorage', localStorage, 'data', postTaskData)
    setSound(isAuth.sound!='')
    setContrast(isAuth.contrast!='')
    setChangeColor(isAuth.changeColor!='')
    setSaturate(isAuth.saturate!='')

  },[isAuth])
  const handleSubmit=()=>{
    // console.log(postTaskData)
    modalProps.setOpenModal(undefined);
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    setIsAuth(postTaskData)
    setFontSize(postTaskData)
    if(postTaskData.largeText) 
      setFontSize((prevSprint) => {
        return {
          ...prevSprint,
          text: 'text-3xl' 
        };
      })
    else 
      setFontSize((prevSprint) => {
        return {
          ...prevSprint,
          text: 'text-base' 
        };
      })

    

    localStorage.setItem('auth', true)
    localStorage.setItem('largeText', postTaskData.largeText)
    localStorage.setItem('monoColor', postTaskData.monoColor)
    localStorage.setItem('contrast', postTaskData.contrast)
    localStorage.setItem('sound', postTaskData.sound)
    localStorage.setItem('voice', postTaskData.voice)
    localStorage.setItem('differentColor', postTaskData.differentColor)
    localStorage.setItem('changeColor', postTaskData.changeColor)
    localStorage.setItem('offImg', postTaskData.offImg)
    localStorage.setItem('button', postTaskData.button)
    localStorage.setItem('link', postTaskData.link)
    localStorage.setItem('saturate', postTaskData.saturate)
    localStorage.setItem('keyboard', postTaskData.keyboard)
    localStorage.setItem('leading', postTaskData.leading)

  }
  return (
    <div  className="z-10  flex flex-col items-center  md:flex-row  ">
      {/* {console.log(postTaskData)} */}
      <img 
        className={"object-cover w-48 h-[600px] bg-cover md:m-2 bg-a md:rounded "+ postTaskData.contrast+ ' '+ postTaskData.monoColor+ ' '+ postTaskData.differentColor+ ' '+ postTaskData.changeColor+ ' '+ postTaskData.saturate} 
        src={testPic} alt=""
      />
      <div className="flex relative ml-3 w-full flex-col text-left  justify-between leading-normal">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h3 className="text-3xl font-medium text-gray-900 dark:text-white">Settings</h3>
          <Table className="w-[95%] mx-auto overflow-visible"  >     
            <Table.Body className="divide-y">

              <Table.Row className="bg-white-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                <Table.Cell  className=" relative p-1 text-left hover:ring-blue-500 focus:ring-blue-100">
                  <div className=" flex h-[30px] items-center inline-block">
                    <div className=" w-max mr-2 inline-block block text-2xl font-medium">
                    Image Settings
                    </div>
                  </div> 
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white-100 dark:border-gray-700 dark:bg-gray-700">
                <Table.Cell  className=" relative p-1 text-left hover:ring-blue-500 focus:ring-blue-100">
                  <div className=" flex h-[30px] items-center inline-block">
                    <div className=" w-max mr-2 inline-block block">
                      <Label htmlFor="end" className='w-max' value="Grayscale" />
                    </div>
                  
                    <Checkbox
                    checked={postTaskData.monoColor == "grayscale"||(postTaskData.monoColor == ""&& isAuth.monoColor == "grayscale")}
                      onChange={(e)=>(e.target.checked? postTaskData.monoColor='grayscale': postTaskData.monoColor='grayscale-0', setSet(e.target.value+ " "+ e.target.checked))}
                      
                      className="mr-2"
                    />
                  </div>
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white-100dark:border-gray-700 dark:bg-gray-700">
                <Table.Cell  className=" relative p-1 text-left hover:ring-blue-500 focus:ring-blue-100">
                  <div className=" flex h-[30px] items-center inline-block">
                    <div className=" w-max mr-2 inline-block block">
                      <Label htmlFor="end" className='w-max' value="Contrast" />
                    </div>
                    <Checkbox
                      checked={contrast}
                      onChange={(e)=>setContrast(e.target.checked)}
                      
                      className="mr-2"
                    />
                    {contrast?
                      <div className='w-max inline-block'>
                        {/* {console.log('postTaskData.contrast',isAuth.contrast)} */}
                        <Radio
                           
                          
                          name="contrast"
                          value="contrast-50"
                          checked={postTaskData.contrast == "contrast-50" ||(postTaskData.contrast == ""&& isAuth.contrast == "contrast-50")}
                          onClick={(e)=>(postTaskData.contrast=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          0.5
                        </Label>
                
                       
                
                        <Radio
                          
                          
                          name="contrast"
                          value="contrast-150"
                          checked={ postTaskData.contrast == "contrast-150"||(postTaskData.contrast == ""&& isAuth.contrast == "contrast-150")}
                          onClick={(e)=>(postTaskData.contrast=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          1.5
                        </Label>
                
                        <Radio
                          
                          
                          name="contrast"
                          value="contrast-200"
                          checked={ postTaskData.contrast == "contrast-200"||(postTaskData.contrast == ""&& isAuth.contrast == "contrast-200")}
                          onClick={(e)=>(postTaskData.contrast=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          2
                        </Label>
                      </div>
                    :
                        postTaskData.contrast=''
                    }  
                  </div>
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white-100dark:border-gray-700 dark:bg-gray-700">
                <Table.Cell  className=" relative p-1 text-left hover:ring-blue-500 focus:ring-blue-100">
                  <div className=" flex h-[30px] items-center inline-block">
                    <div className=" w-max mr-2 inline-block block">
                      <Label htmlFor="end" className='w-max' value="Hue Rotate" />
                    </div>
                    <Checkbox
                    checked={changeColor}
                      onChange={(e)=>setChangeColor(e.target.checked)}
                      
                      className="mr-2"
                    />
                    {changeColor?
                      <div className='w-max inline-block'>
                        <Radio
                          checked={postTaskData.changeColor == "hue-rotate-30"||(postTaskData.changeColor == ""&& isAuth.changeColor == "hue-rotate-30")}
                          
                          name="changeColor"
                          value="hue-rotate-30"
                          onClick={(e)=>(postTaskData.changeColor=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          1
                        </Label>
                
                        <Radio
                          
                          
                          name="changeColor"
                          checked={ postTaskData.changeColor == "hue-rotate-60"||(postTaskData.changeColor == ""&& isAuth.changeColor == "hue-rotate-60")}
                          value="hue-rotate-60"
                          onClick={(e)=>(postTaskData.changeColor=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          2
                        </Label>
                        <Radio
                          
                          
                          name="changeColor"
                          value="hue-rotate-90"
                          checked={postTaskData.changeColor == "hue-rotate-90"||(postTaskData.changeColor == ""&& isAuth.changeColor == "hue-rotate-90")}
                          onClick={(e)=>(postTaskData.changeColor=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          3
                        </Label>
                        <Radio
                          
                          
                          name="changeColor"
                          checked={postTaskData.changeColor == "hue-rotate-180"||(postTaskData.changeColor == ""&& isAuth.changeColor == "hue-rotate-180`")}
                          value="hue-rotate-180"
                          onClick={(e)=>(postTaskData.changeColor=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          4
                        </Label>
                        <Radio
                          
                          
                          checked={postTaskData.changeColor == "-hue-rotate-30"||(postTaskData.changeColor == ""&& isAuth.changeColor == "-hue-rotate-30")}
                          name="changeColor"
                          value="-hue-rotate-30"
                          onClick={(e)=>(postTaskData.changeColor=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          5
                        </Label>
                
                        <Radio
                          
                          
                          checked={postTaskData.changeColor == "-hue-rotate-60"||(postTaskData.changeColor == ""&& isAuth.changeColor == "-hue-rotate-60")}
                          name="changeColor"
                          value="-hue-rotate-60"
                          onClick={(e)=>(postTaskData.changeColor=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          6
                        </Label>
                        <Radio
                          
                          
                          name="changeColor"
                          checked={postTaskData.changeColor == "-hue-rotate-90"||(postTaskData.changeColor == ""&& isAuth.changeColor == "-hue-rotate-90")}
                          value="-hue-rotate-90"
                          onClick={(e)=>(postTaskData.changeColor=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          7
                        </Label>
                      </div>
                    :
                      postTaskData.changeColor=''
                    } 
                  </div>
                </Table.Cell>
              </Table.Row>
        

              <Table.Row className="bg-white-100dark:border-gray-700 dark:bg-gray-700">
                <Table.Cell  className=" relative p-1 text-left hover:ring-blue-500 focus:ring-blue-100">
                  <div className=" flex h-[30px] items-center inline-block">
                    <div className=" w-max mr-2 inline-block block">
                      <Label htmlFor="end" className='w-max' value="Saturate" />
                    </div>
                    <Checkbox
                    checked={saturate}
                      onChange={(e)=>setSaturate(e.target.checked)}
                      
                      className="mr-2"
                    />
                    {saturate?
                      <div className='w-max inline-block'>
              
                        <Radio
                          name="saturate"
                          value="saturate-50"
                          checked={postTaskData.saturate == "saturate-50"||(postTaskData.saturate == ""&& isAuth.saturate == "saturate-50")}
                          onClick={(e)=>(postTaskData.saturate=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          0.5
                        </Label>
                
                        <Radio
                          checked={postTaskData.saturate == "saturate-100"||(postTaskData.saturate == ""&& isAuth.saturate == "saturate-100")}
                          
                          name="saturate"
                          value="saturate-100"
                          onClick={(e)=>(postTaskData.saturate=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          1
                        </Label>
                
                        <Radio
                          checked={postTaskData.saturate == "saturate-150"||(postTaskData.saturate == ""&& isAuth.saturate == "saturate-150")}
                          
                          name="saturate"
                          value="saturate-150"
                          onClick={(e)=>(postTaskData.saturate=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          1.5
                        </Label>
                
                        <Radio
                          checked={postTaskData.saturate == "saturate-200"||(postTaskData.saturate == ""&& isAuth.saturate == "saturate-200")}
                          
                          name="saturate"
                          value="saturate-200"
                          onClick={(e)=>(postTaskData.saturate=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          2
                        </Label>
                      </div>
                      :
                      postTaskData.saturate=''
                    } 
                  </div>
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white-100dark:border-gray-700 dark:bg-gray-700">
                <Table.Cell  className=" relative p-1 text-left hover:ring-blue-500 focus:ring-blue-100">
                  <div className=" flex h-[30px] items-center inline-block">
                    <div className=" w-max mr-2 inline-block block">
                      <Label htmlFor="end" className='w-max' value="Invert" />
                    </div>
                    {/* {console.log(postTaskData.differentColor, isAuth.differentColor)} */}
                    <Checkbox
                     value='differentColor'
                     
                     checked={postTaskData.differentColor == "invert"||(postTaskData.differentColor == ""&& isAuth.differentColor == "invert")}
                   
                      onChange={(e)=>( e.target.checked? postTaskData.differentColor='invert' : postTaskData.differentColor='invert-0', setSet(e.target.value +''+ e.target.checked))}
                      id="differentColors"
                      className="mr-2"
                    />
                  </div>
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white-100dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                <Table.Cell  className=" relative p-0 pt-5 text-left hover:ring-blue-500 focus:ring-blue-100">
                  <div className=" flex dark:bg-gray-800 rounded-t px-1 py-3 h-[30px] items-center inline-block">
                    <div className=" w-max mr-2 inline-block block text-2xl font-medium">
                    Other settings
                    </div>
                    
                  </div> 
                </Table.Cell>
              </Table.Row>

              {/* <Table.Row className="bg-white-100dark:border-gray-700 dark:bg-gray-700">
                <Table.Cell  className=" relative p-1 text-left hover:ring-blue-500 focus:ring-blue-100">
                  <div className=" flex h-[30px] items-center inline-block">
                    <div className=" w-max mr-2 inline-block block">
                      <Label htmlFor="end" className='w-max' value="Отключение изображений" />
                    </div>
                    {console.log(postTaskData.offImg, (!postTaskData.offImg&& (isAuth.offImg==true || isAuth.offImg=='true')), isAuth.offImg)}
                    <Checkbox
                      value='offImg'
                      checked={postTaskData.offImg||(!postTaskData.offImg&& (isAuth.offImg==true || isAuth.offImg=='true'))}
                    
                      onChange={(e)=>(postTaskData.offImg=e.target.checked, setSet(e.target.value +''+ e.target.checked))}
                      
                      
                      className="mr-2"
                    />
                  </div>
                </Table.Cell>
              </Table.Row> */}

              <Table.Row className="bg-white-100dark:border-gray-700 dark:bg-gray-700">
                <Table.Cell  className=" relative p-1 text-left hover:ring-blue-500 focus:ring-blue-100">
                  <div className=" flex h-[30px] items-center inline-block">
                    <div className=" w-max mr-2 inline-block block">
                      <Label htmlFor="end" className='w-max' value="Virtual keybord" />
                    </div>
                    <Checkbox
                    value='keyboard'
                    checked={postTaskData.keyboard||(!postTaskData.keyboard&& (isAuth.keyboard==true || isAuth.keyboard=='true'))}
                    
                      onChange={(e)=>(postTaskData.keyboard=e.target.checked, setSet(e.target.value +''+ e.target.checked))}
                      
                      className="mr-2"
                    />
                  </div>
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white-100dark:border-gray-700 dark:bg-gray-700">
                <Table.Cell  className=" relative p-1 text-left hover:ring-blue-500 focus:ring-blue-100">
                  <div className=" flex h-[30px] items-center inline-block">
                    <div className=" w-max mr-2 inline-block block">
                      <Label htmlFor="end" className='w-max' value="Large text" />
                    </div>
                    <Checkbox
                    value='largeText'
                      checked={postTaskData.largeText == "text-3xl"||(postTaskData.largeText == ""&& isAuth.largeText == "text-3xl")}
                      onChange={(e)=>(e.target.checked? postTaskData.largeText='text-3xl': postTaskData.largeText='text-base',  setSet(e.target.value +''+ e.target.checked))}
                      
                      className="mr-2"
                    />
                  </div> 
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white-100dark:border-gray-700 dark:bg-gray-700">
                <Table.Cell  className=" relative p-1 text-left hover:ring-blue-500 focus:ring-blue-100">
                  <div className=" flex h-[30px] items-center inline-block">
                    <div className=" w-max mr-2 inline-block block">
                      <Label htmlFor="end" className='w-max' value="Large line spacing" />
                    </div>
                    <Checkbox
                    value='leading'
                    checked={postTaskData.leading == "leading-10"||(postTaskData.leading == ""&& isAuth.leading == "leading-10")}
                      onChange={(e)=>(e.target.checked? postTaskData.leading='leading-10': postTaskData.leading='leading-5',  setSet(e.target.value +''+ e.target.checked))}
                      
                      className="mr-2"
                    />
                  </div> 
                </Table.Cell>
              </Table.Row>

              <Table.Row className="bg-white-100dark:border-gray-700 dark:bg-gray-700">
                <Table.Cell  className=" relative p-1 text-left hover:ring-blue-500 focus:ring-blue-100">
                  <div className=" flex h-[30px] items-center inline-block">
                    <div className=" w-max mr-2 inline-block block">
                      <Label htmlFor="end" className='w-max' value="Voice acting" />
                    </div>
                    <Checkbox
                    checked={sound}
                      onChange={(e)=>(setSound(e.target.checked))}
                      
                      className="mr-2"
                    />
                    {sound?
                      <div className='w-max inline-block'>
                        <Radio
                          
                          
                          name="sound"
                          value="1"
                          checked={postTaskData.sound == "1"||(postTaskData.sound == ""&& isAuth.sound == "1")}
                          onClick={(e)=>(postTaskData.sound=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          1x
                        </Label>
                
                        <Radio
                          
                          
                          name="sound"
                          value="1.25"
                          checked={postTaskData.sound == "1.25"||(postTaskData.sound == ""&& isAuth.sound == "1.25")}
                          onClick={(e)=>(postTaskData.sound=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          1.25x
                        </Label>
                
                        <Radio
                          
                          
                          name="sound"
                          value="1.5"
                          checked={postTaskData.sound == "1.5"||(postTaskData.sound == ""&& isAuth.sound == "1.5")}
                          onClick={(e)=>(postTaskData.sound=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          1.5x
                        </Label>
                
                        <Radio
                          
                          
                          name="sound"
                          value="1.75"
                          checked={postTaskData.sound == "1.75"||(postTaskData.sound == ""&& isAuth.sound == "1.75")}
                          onClick={(e)=>(postTaskData.sound=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          1.75x
                        </Label>
                
                        <Radio
                          
                          
                          name="sound"
                          value="2"
                          checked={postTaskData.sound == "2"||(postTaskData.sound == ""&& isAuth.sound == "2")}
                          onClick={(e)=>(postTaskData.sound=e.target.value, setSet(e.target.value +''+ e.target.checked))}
                        />
                        <Label htmlFor="united-state" className='mr-2'>
                          2x
                        </Label>
                      </div>
                      :
                      postTaskData.sound=''
                    } 
                  </div>
                </Table.Cell>
              </Table.Row>


              <Table.Row className="bg-white-100dark:border-gray-700 dark:bg-gray-700">
                <Table.Cell  className=" relative p-1 text-left hover:ring-blue-500 focus:ring-blue-100">
                  <div className=" flex h-[30px] items-center inline-block">
                    <div className=" w-max mr-2 inline-block block">
                      <Label htmlFor="end" className='w-max' value="Voice dialing" />
                    </div>
                    
                    <Checkbox
                      value='voice'
                      checked={postTaskData.voice||(!postTaskData.voice && (isAuth.voice==true || isAuth.voice=='true'))}
                    
                      onChange={(e)=>(postTaskData.voice=e.target.checked, setSet(e.target.value +''+ e.target.checked))}
                      
                      
                      className="mr-2"
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>  
            <button type="submit" className='bg-[#0075FF] mr-4 rounded-lg text-white hover:bg-blue-600'>Save</button>
                            
        </form>
      </div>
    </div>  
  );
}

export default FirstLaunchForm;

