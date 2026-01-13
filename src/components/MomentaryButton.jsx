function MomentaryButton({text,onClick}){

return(
<>
<button className="momentary-btn" onClick={()=> onClick(text)}>{text}</button>

</>

)
}
export default MomentaryButton