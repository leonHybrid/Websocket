import { useState,useEffect } from 'react'
import Slider from './components/Slider.jsx'
import MomentaryButton from './components/MomentaryButton.jsx'
import ColorWheel from './components/ColorWheel.jsx'
import { connect, send } from './utils/websocket';
import './App.css'

function App() {
  const [currentColor, setCurrentColor] = useState({ h: 0, s: 0 });
  function handleColorChange(newColor){
    setCurrentColor(newColor);
    send({ type: 'color', h: newColor.h, s: newColor.s });
  }
  function handleSliderChange(value) {
  send({ type: 'slider', value: value });
}

 function handleButtonClick(name) {
  send({ type: 'button', name:name });
}


   useEffect(() => {
  connect('wss://hybrid-websocket-df7faa7008b8.herokuapp.com:443');
 }, []);
 //[] means only run when component mounts

  return (
    <>
    <h1>Grafitty</h1>
<div className="single-row">
    <Slider onSliderChange={handleSliderChange}/>
    </div>
    <div className='button-row'>
    <MomentaryButton text={"Select BG"} onClick={handleButtonClick}/>
    <MomentaryButton text={"Select Brush"} onClick={handleButtonClick}/>
    <MomentaryButton text={"Select Style"} onClick={handleButtonClick}/>
 

        </div>
    <ColorWheel onColorChange={handleColorChange}/>

  <div className="single-row">

     <MomentaryButton text={"Surprise"} onClick={handleButtonClick}/>
    </div>
    <div className='button-row'>

     <MomentaryButton text={"Clear"} onClick={handleButtonClick}/>

     <MomentaryButton text={"Save"} onClick={handleButtonClick}/>
        </div>
    

    
    </>
  )
}

export default App
