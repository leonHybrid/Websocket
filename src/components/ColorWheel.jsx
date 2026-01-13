import { useEffect } from "react"
import { useState,useRef } from "react"

function ColorWheel({onColorChange}){
const [position,setPostion] = useState({x:50,y:50})
const [isDragging,setIsDraggin] = useState(false)
const [color,setColor] = useState({h:0,s:0})
const wheelRef = useRef(null)


function handleMove(e) {
	let clientX,clientY;

	if(e.touches){
	// touchevent
	clientX = e.touches[0].clientX;
	clientY = e.touches[0].clientY;
	} else {
	if(e.buttons !==1) return
	clientX = e.clientX;
    clientY = e.clientY;
	}
	  const rect = wheelRef.current.getBoundingClientRect();
	  const radius = rect.width/2;
	  const centerX =rect.width/2;
	  const centerY =rect.height/2;
  const x = clientX - rect.left-centerX;
  const y = clientY - rect.top-centerY;

  const distance = Math.sqrt(x*x + y*y);

  let finalX = x;
  let finalY = y;

  if(distance> radius){
	finalX = (x/distance)*radius;
	finalY = (y/distance)*radius;
  
  }
  
const xPercent = ((finalX + centerX) / rect.width) * 100;
const yPercent = ((finalY + centerY) / rect.height) * 100;
setPostion({x:xPercent,y:yPercent})
const [hue,saturation] = convertColor(finalX,finalY,distance,radius)

setColor({ h: hue, s: saturation });
onColorChange({ h: hue, s: saturation });
}

function convertColor(x, y, distance, radius) {
  const angle = Math.atan2(y, x);
  const hue = ((angle * (180 / Math.PI)) + 360) % 360;  // Removed the negative
  const saturation = (distance > radius ? 100 : (distance / radius) * 100);
  
  return [hue, saturation];
}

return(
<div className="color-wheel" ref={wheelRef} onMouseMove={handleMove} onTouchMove={handleMove}>
	<div className="knob" style={{
	left:`${position.x}%`,
	top:`${position.y}%`
	
	
	}}>
	</div>
	    <div 
  style={{ 
    backgroundColor: `hsl(${color.h}, ${color.s}%, 50%)`,
    width: '50px',
    height: '50px'
  }} 
/>
</div>


)
}
export default ColorWheel
