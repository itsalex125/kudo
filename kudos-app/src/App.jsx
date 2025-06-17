import { useState } from 'react'
import './css/App.css'
import BoardList from './BoardList'

function App() {

  return (
    <div className="App">
      <header className="app-header">
        <h1> KudoBoard</h1>
      </header>
      <BoardList/>     
      <footer> ©2025 ARP KudoBoard</footer>
    </div>

  )
}

export default App
