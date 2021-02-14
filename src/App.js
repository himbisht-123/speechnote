import React, { useState,useEffect } from 'react';
import './App.css';
// import SpeechRecognition from 'react-speech-recognition';

const  SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
const mic=new SpeechRecognition();
mic.continuous=true;
mic.interimResults=true;
mic.lang='en-US'

function App() {
  const [islistening,setIslistening]=useState(false);
  const [note,setNote]=useState(null);
  const [savedNotes,setSavedNotes]=useState([]);

   useEffect(()=>{
    const handlelisten=()=>{
      if(islistening){
        mic.start()
        mic.onend=()=>{
          console.log('continue...');
          mic.start()
        }
      }
      else{
        mic.stop();
        mic.onend=()=>{
          console.log('stopped mic on click');
        }
      }
      mic.onstart=()=>{
        console.log('Mics on')
      }
      mic.onresult=event=>{
        const transcript=Array.from(event.results).map(result=>result[0]).map(result=>result.transcript).join('')
        console.log(transcript);
        setNote(transcript)
        mic.onerror=event=>{
          console.log(event.error);
        }
      }
    }
     handlelisten()
    
   },[islistening])

   
   const handleSaveNote=()=>{
     setSavedNotes([...savedNotes,note])
     setNote('')
   }
  return (
    <>
    <h1>Voice Notes</h1>
    <div className="container">
    <div className="box">
    <h2>Current note</h2>
    {islistening?<span>🎙</span>:<span>🛑🎙</span>}
    <button className="btn-1" onClick={handleSaveNote} disabled={!note}>Save note</button>
    <button onClick={()=>setIslistening(prevState=>!prevState)}>Start/Stop</button>
    <p>{note}</p>
    </div>
      <div className="box">
      <h2>Notes</h2>
      {
        savedNotes.map(n=>(
          <p key={n}>{n}</p>
        ))
      }
      </div>
    </div>
    </>
  );
}

export default App;
