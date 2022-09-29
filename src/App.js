
import './App.scss';
import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Instructions from './components/instructions/Instructions';
import PlayGame from './components/play/PlayGame';
function App() {
  return (
    <Routes >
      <Route path='/' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='instructions' element={<Instructions />} />
      <Route path='play' element={<PlayGame />} />

    </Routes>
  );
}

export default App;
