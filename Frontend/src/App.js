import './App.css';
import {  Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navs from './components/Navs';
import Login from './pages/Login';
import Board from './pages/Board';
import Register from './pages/Register';
import BoardDetail from './pages/BoardDetail';
import Stage from './pages/Stage';




function App() {
  return (
    <div className="App">
      <Navs/>

      <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Board" element={<Board/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Board/:board_idx" element={<BoardDetail/>}/>
        <Route path="/Stage" element={<Stage/>}/>
      </Routes>
    </div>
  );
}

export default App;
