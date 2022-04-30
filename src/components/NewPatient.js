import React from "react";
import '../styles/App.css';
import {useFormik} from "formik"
import * as Yup from "yup"
import Calendar from 'react-calendar';
import { useState } from 'react';
import '../styles/Calendar.css';

const NewTurn = () => {

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      tel: "",
      dni: ""
    },
    validationSchema: Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        tel: Yup.number().required(),
        dni: Yup.number().required()
    }),
    onSubmit: (formData) => {
        console.log(formData)
    }
  })

  const [date, setDate] = useState(new Date());

  const today = new Date();

  const horarios = ["10:00" ,"11:00","12:00","13:00"]
  

    return (
    <div className="App-header">
      <div class="container mt-3 formPers rounded">
      <h1 className="text-dark">Nuevo Turno</h1>
      <form onSubmit={formik.handleSubmit}>
       <input type="text" class="form-control inputPers" name="name" placeholder="Nombre y Apellido" onChange={formik.handleChange} error={formik.errors.name}/>
       <input type="email" class="form-control inputPers" name="email" placeholder="Email" onChange={formik.handleChange}/>
       <input type="number" class="form-control inputPers" name="tel" placeholder="Numero de Telefono" onChange={formik.handleChange}/>
       <input type="number" class="form-control inputPers" name="dni" placeholder="DNI" onChange={formik.handleChange}/>
       <Calendar onChange={setDate} value={date}  minDate={new Date(today.getFullYear(),String(today.getMonth()).padStart(2, '0'),String(today.getDate()).padStart(2, '0'))}/>
       {horarios.map((h) => <button class="btn btn-dark hour-button">{h}</button>)}
       <div>
       <button class="btn btn-outline-warning confirm-turn" type="button" >Confirmar Turno</button>
       </div>
      </form>
      </div>
    </div>
  );
};

export default NewTurn;