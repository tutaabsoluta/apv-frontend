import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  // Usamos llaves porque lo que retorna el context es un objeto
  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setAlerta({
        msg: "Todos los Campos son Obligatorios",
        error: true,
      });
      return;
    }

    // Crea un objeto nuevo con la informacion pasada
    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });

    // Si se pasa la validacion eliminamos la alerta
    setAlerta({
      msg: 'Guardado Correctamente'
    });
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    setId('')
  };

  const { msg } = alerta;

  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Administrador de Pacientes
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus pacientes y{" "}
        <span className="text-indigo-600 font-bold"> Administralos</span>
      </p>

      <form
        className="bg-white py-10 px-5 shadow-md rounded-md  mb-10 lg:mb-0"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">
            Fecha de Alta
          </label>
          <input
            id="fecha"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe los Sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          className="bg-indigo-600 w-full text-white uppercase font-bold rounded-lg p-2 cursor-pointer hover:bg-indigo-800 transition duration-300"
          type="submit"
          value={id ? "Guardar Cambios" : "Agregar Paciente"}
        />
      </form>
      {msg && <Alerta alerta={alerta} />}
    </>
  );
};

export default Formulario;
