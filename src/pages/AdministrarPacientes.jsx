import { useState } from "react";
import { Form } from "react-router-dom";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
      <button 
      type="button"
      className="bg-indigo-600 rounded-lg text-white uppercase font-bold p-2 hover:bg-indigo-800 transition duration-300 mx-auto w-3/4 mb-5 md:hidden"
      onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >{mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}</button>
      {/* Si mostrar formulario es true muestra unas clase de lo contrario muestra otras */}
      <div
        className={`${
          mostrarFormulario ? "block" : "hidden"
        } md:block md:w-1/2 lg:w-2/5`}
      >
        <Formulario />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes />
      </div>
    </div>
  );
};

export default AdministrarPacientes;
