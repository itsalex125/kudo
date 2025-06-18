import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import BoardDetail from './components/BoardDetail';
import './css/App.css';

function App() {
  return(
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/board/:boardId" element={<BoardDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;