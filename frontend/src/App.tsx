import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [isGreeting, setGreeting] = useState([])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => {
          fetch("http://localhost:8080/")
          .then((Response) => Response.json())
          .then((data) => {
            //alert(data)
            setGreeting(data)
            console.log(isGreeting[0].text)
          })
        }}
        >Get info from backend</button>

        {isGreeting !== undefined ? <p>isGreeting[0].text</p> : <p>Naaffing</p>}

      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
