import { useState, useCallback,  useRef, useEffect} from 'react'

import './App.scss'

function App() {

const [length, setLength] = useState<number>(20)
const [uppercase, setUppercase] = useState<boolean>(false)
const copyPasteClipBoard= ()=>{
  console.log(copyPasteClipBoard)
}
  return (
    <>
     <div className='container'>
      <h2>Password Genarator</h2>
      <div className="form">
      <textarea cols={30} rows={10} value=""  readOnly></textarea>
      <button onClick={copyPasteClipBoard}>Copy</button>
      </div>
      <div className="options">
        <div className="inputs">
          <input
          type = "range"
          value= ""
          max={100}
          min={3}
          onChange={(e)=> setLength(parseInt(e.target.value))}  
          />
          <label htmlFor="range">{length}</label>       
        </div>
        <div className="inputs">
          <input type="checkbox" name="uppercase" id="uppercase"/>
          <label htmlFor="uppercase">Uppercase</label>
          </div>        
      </div>
      </div> 
    </>
  )
}

export default App
