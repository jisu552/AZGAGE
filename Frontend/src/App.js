import logo from './logo.svg';
import './App.css';
import {  Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navs from './components/Navs';
import Login from './pages/Login';
import Board from './pages/Board';
import Register from './pages/Register';
<<<<<<< HEAD
=======
import Stage from './pages/Stage';
>>>>>>> 2c35a209c6b5c218d8618f5ec224ea6455b5548a




function App() {
  return (
    <div className="App">
      <Navs/>

      <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Board" element={<Board/>}/>
        <Route path="/Register" element={<Register/>}/>
<<<<<<< HEAD
=======
        <Route path="/Stage" element={<Stage/>}/>
>>>>>>> 2c35a209c6b5c218d8618f5ec224ea6455b5548a
      </Routes>
    </div>
  );
}

export default App;
