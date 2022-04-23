import logo from './images/logo.png';

import './styles/App.css';
import { BrowserRouter , Route, Routes, Link } from 'react-router-dom';


import Home from "./components/Home";
import NewTurn from "./components/NewTurn";

const App = () => {
  

  return (
    
    <div className="App">
      <BrowserRouter>
      <nav class="navbar navbar-light bg-light justify-content-between">
      <Link to={"/"}><img src={logo} className="App-logo" alt="logo" /></Link>
          <button class="btn btn-outline-warning button-turn" type="button" >
            <Link to="/newturn" style={{ textDecoration: 'none',color: 'inherit' }}>Pedir Turno</Link>
          </button>
      </nav>
      <div>
      
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/newturn" element={<NewTurn/>} />
      </Routes>
      
    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
