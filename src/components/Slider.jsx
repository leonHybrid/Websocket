import { useEffect } from "react";
import { useState } from "react"
function Slider({onSliderChange}){
const [sliderState,setSliderState] = useState(50);

function handleSliderChange(e) {
	const value = e.target.value;
	setSliderState(value)
	onSliderChange(value)
}

return(
<>
<div className="slider">
<input type="range" min="0" max="100" onChange={handleSliderChange} />
</div>
</>

)
}
export default Slider
