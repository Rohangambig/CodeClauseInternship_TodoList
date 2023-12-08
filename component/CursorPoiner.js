import React,{useState} from 'react'

export default function CursorPoiner() {
 
    const [currentPosition,setX] = useState({x:0,y:0});

    window.addEventListener('mousemove',(e) => {
        setX({x:e.clientX,y:e.clientY});
    })
 
  return (
    <div >
    <div className="cursor-dot" style={{left:currentPosition.x,top:currentPosition.y,position:'absolute'}}></div>
        <div className="cursor" style={{left:currentPosition.x,top:currentPosition.y,position:'absolute'}}></div>
    </div>
  )
}
