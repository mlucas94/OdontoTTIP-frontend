import React from "react";
import '../styles/App.css';
import {useFormik} from "formik"
import * as Yup from "yup"
import Calendar from 'react-calendar';
import '../styles/Calendar.css';
import axios from "axios";
import {useEffect, useState} from 'react';
import { ConstructionOutlined } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import '../styles/Searchbar.css'

const NewTurn = () => {
  
  const [pacientes, setPacientes]= useState([]);
  const [pacientesFiltrado, setPacientesFiltrados] = useState([])
  const [datosPaciente, setDatosPaciente] = useState([])
  const [tablaPacientes, setTablaPacientes]= useState([]);
  const [busqueda, setBusqueda]= useState("");
  const [horarios, setHorarios] = useState([])
  const [horario, setHorario] = useState("")
  const [botonSeleccionado, setBotonSeleccionado] = useState("")
  const [errorPaciente, setErrorPaciente] = useState("")
  const [errorFecha, setErrorFecha] = useState("")
  const [errorTurn, setErrorTurn] = useState("")
  const [successTurn, setSuccess] = useState("")

  const peticionGet=async()=>{
    await axios.get("http://localhost:8080/api/pacientes")
    .then(response=>{
      setPacientes(response.data);
      setTablaPacientes(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const horarioPost= ()=>{
    var dateABuscar = (date.toLocaleDateString("es-ES"))
    var fecha = {fecha: dateABuscar}
    console.log(fecha)
    axios.post("http://localhost:8080/api/fecha", fecha)
    .then(response=>{
      console.log("ok")
    }).catch(error=>{
      console.log(error);
    })
  }

  const horarioUpdatePost= ()=>{
    var horariosFilter = horarios.filter(e => e !== horario)
    var dateABuscar = (date.toLocaleDateString("es-ES"))
    axios.post("http://localhost:8080/api/fechaUpdate", {fecha: dateABuscar,horariosDisponible: horariosFilter
  })
    .then(response=>{
      setHorarios(horariosFilter)
    }).catch(error=>{
      console.log(error);
    })
  }

  const turnoPost= ()=>{
    
    console.log({
      paciente: datosPaciente,
      fecha: date,
      inicioTurno: horario
    })
    axios.post("http://localhost:8080/api/turno", {
      paciente: datosPaciente,
      fecha: date,
      inicioTurno: horario
    })
    .then(response=>{
      setErrorFecha("")
      setErrorPaciente("")
      setHorario("")
      setDatosPaciente([])
      setHorarios([])
      setSuccess("success")
    }).catch(error=>{
      setErrorTurn("error")
      setSuccess("")
    })
  }

  const fechaGet = async() =>{
    var dateABuscar = (date.toLocaleDateString("es-ES"))
    await axios.get("http://localhost:8080/api/fecha/"+dateABuscar.replaceAll("/","-",))
    .then(response=>{
      console.log("http://localhost:8080/api/fecha/"+dateABuscar.replaceAll("/","-",))
      setHorarios(response.data.horariosDisponible)
    }).catch(error=>{
      console.log(error);
    })
  }

  const handleChange = e =>{
    setBusqueda(e.target.value);
    if (e.target.value === "") {
      setPacientesFiltrados([]);
    } else {
      filtrar(e.target.value);
    }
    
  }

  const handleSelect = (e) => {
    setPacientesFiltrados([]);
    setDatosPaciente(e)
    setBusqueda([])
  }

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=tablaPacientes.filter((elemento)=>{
      if(elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return elemento;
      }
    });
    setPacientesFiltrados(resultadosBusqueda);
  }

  useEffect(()=>{
  peticionGet();
  },[])

  const [date, setDate] = useState(new Date());

  const handleChangeFecha = (e) =>{
    setDate(e)
    horarioPost()
    setHorarios([])
    fechaGet()
  }

  const handleClickHorario = (e) =>{
    if (e.target.style.backgroundColor != '#3fc1c9'){
      if (botonSeleccionado != ""){
      botonSeleccionado.style.backgroundColor = '#3b3b3b'
      }
      setBotonSeleccionado(e.target)
      e.target.style.backgroundColor  = '#3fc1c9'
      setHorario(e.target.value)
    }
    else {
      e.target.style.backgroundColor  = '#3b3b3b' 
      setBotonSeleccionado("")
      setHorario("")
    }
  }

  const handleClickTurn = () =>{
    console.log(errorPaciente)
    if (datosPaciente.length == 0){
      setErrorPaciente("error")
      console.log(errorPaciente)
    }
    if (horario == ""){
      setErrorFecha("error")
    }
    if(errorFecha == "" && errorPaciente == ""){
      turnoPost()
    }
    if (errorTurn == ""){
      horarioUpdatePost()
    }
  }

  const today = new Date();

    return (
    <div className="App-header">
      <div class="container mt-3 formPers rounded">
      <h1 className="text-dark">Nuevo Turno</h1>
      <form>
        <div className="searchInputs">
          <input
            className="form-control inputBuscar"
            value={busqueda}
            placeholder="Búsqueda de Paciente"
            onChange={handleChange}
          />
          <div className="searchIcon"><SearchIcon/></div>
        </div>
        {(errorPaciente !="") && (
          <div class="alert alert-danger" role="alert">
            Se debe seleccionar un Paciente.
          </div>)}
        {pacientesFiltrado.length != 0 && (
            <div className="dataResult">
              {pacientesFiltrado.slice(0, 15).map((paciente) => {
                return (
                  <a className="dataItem" target="_blank" onClick={() => handleSelect(paciente)}>
                    <p>{paciente.nombre} </p>
                  </a>
                );
              })}
            </div>
          )}
          {datosPaciente.length != 0 && (
            <div className="infoPaciente">
                    <h5 className="text-dark">Nombre: <i className="labelInfo">{datosPaciente.nombre}</i> </h5>
                    <h5 className="text-dark">Dni: <i className="labelInfo">{datosPaciente.dni}</i> </h5>
                    <h5 className="text-dark">Email: <i className="labelInfo">{datosPaciente.email}</i> </h5>
                    <h5 className="text-dark">Telefono: <i className="labelInfo">{datosPaciente.telefono}</i> </h5>
             </div>
          )}
          
       <Calendar onChange={handleChangeFecha} value={date}  minDate={(new Date(today.getFullYear(),String(today.getMonth()).padStart(2, '0'),String(today.getDate()).padStart(2, '0')))}/>
       {horarios.length != 0 && (horarios.map((h) => <button type="button" class="btn btn-dark hour-button" onClick={handleClickHorario} value={h}>{h}</button>))}
       {(errorFecha !="") && (
          <div class="alert alert-danger" role="alert">
            Se debe seleccionar Fecha y horario del turno.
          </div>)}
       <div>
       <button class="btn btn-outline-info confirm-turn" type="button" onClick={handleClickTurn}>Confirmar Turno</button>
       {(successTurn !="") && (
          <div class="alert alert-success" role="alert">
            Turno Creado.
          </div>)}
       </div>
      </form>
      </div>
    </div>
  );
};

export default NewTurn;