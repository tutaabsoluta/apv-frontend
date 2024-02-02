import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from '../hooks/useAuth';

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {
  // Definimos el state de pacientes como un arreglo de pacientes
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const { auth } = useAuth();

  // Cuando cargue este componente, se llama la API
  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        // primero obtener token
        const token = localStorage.getItem("token");

        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json", // Aquí corregí la coma
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios("pacientes", config);
        setPacientes(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
  }, [auth]); // se ejecuta una sola vez

  // Cuando es un POST que requiere autenticacion se tiene que pasar la URL, los datos y el Request con la condfiguracion de la autenticacion
  const guardarPaciente = async (paciente) => {

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json", // Aquí corregí la coma
        Authorization: `Bearer ${token}`,
      },
    };

    if (paciente.id) {
      try {
        const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)

        const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState )
        setPacientes(pacientesActualizado)
      } catch (error) {
        console.log(error);
      }
    } else {

      try {
        const { data } = await clienteAxios.post("/pacientes", paciente, config);
  
        // Creamos un nuevo objeto, excluyendo las variables declaradas
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
  
        // Pasar la informacion al state y tomamos una copia de lo que hay en pacientes
        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const eliminarPaciente = async id => {
    const confirmar = confirm('Deseas eliminar el paciente?')

    if(confirmar) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)

        const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id)

        setPacientes(pacientesActualizado);

      } catch (error) {
        console.log(error);
      }
    }
  }

  const setEdicion = (paciente) => {
    setPaciente(paciente)
  }
    
  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export { PacientesProvider };

export default PacientesContext;
