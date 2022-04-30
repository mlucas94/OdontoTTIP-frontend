import React from "react";
import consultorio from '../images/consultorio.jpg'
import '../styles/App.css';
import {  Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className="App-header">
      
        <div class="card cardP rounded">
          <img  className='cardHome rounded' src={consultorio}></img>
          <div class="card-body">
            <h5 class="card-title text-dark">Bienvenido/a a Odonto TTIP</h5>
            <h5 class="card-title text-dark">Aquí podras gestionar tus turnos con nuestros expertos.</h5>
            <h5 class="card-title text-dark">Puedes comenzar pidiento un texto <Link to="/newturn" style={{color: '#3fc1c9' }}>AQUI</Link>.</h5>
          </div>
        </div>
    </div>
  );
};

export default Home;