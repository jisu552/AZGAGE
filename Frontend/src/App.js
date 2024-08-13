import './App.css';
import {  Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navs from './components/Navs';
import Login from './pages/Login';
import Board from './pages/Board';
import Register from './pages/Register';
import BoardDetail from './pages/BoardDetail';
import BoardDetaile from './pages/BoardDetaile';
import Stage from './pages/Stage';
import  Mypage  from './pages/Mypage';




function App() {
  return (
    <div className="App">
      <Navs/>

      <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/question" element={<Board/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/question/:board_idx" element={<BoardDetail/>}/>
        <Route path='/Stage/:que_idx' element={<BoardDetaile/>}/>
        <Route path="/Stage" element={<Stage/>}/>
        <Route path="/Mypage" element={<Mypage/>}/>
      </Routes>
    </div>
  );
}

export default App;
