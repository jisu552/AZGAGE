import logo from './logo.svg';
import './App.css';
import {  Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navs from './components/Navs';
import Login from './pages/Login';
import Board from './pages/Board';
import Register from './pages/Register';
import BoardDetail from './pages/BoardDetail';




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
      </Routes>
    </div>
  );
}

export default App;
