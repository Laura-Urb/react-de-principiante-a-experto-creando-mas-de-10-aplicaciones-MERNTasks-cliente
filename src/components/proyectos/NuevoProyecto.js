import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorFormulario,
    mostrarFormulario,
    setProyecto,
    mostrarError,
  } = proyectosContext;

  const [nuevoProyecto, setNuevoProyecto] = useState({
    id: "",
    nombre: "",
  });

  const { nombre } = nuevoProyecto;

  const onChange = (e) => {
    setNuevoProyecto({ ...nuevoProyecto, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (nombre === "") {
      mostrarError();
      return;
    }

    setProyecto(nuevoProyecto);
    setNuevoProyecto({
      nombre: "",
    });
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => mostrarFormulario()}
      >
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmit}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre del Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChange}
          ></input>
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          ></input>
        </form>
      ) : null}
      {errorFormulario ? (
        <p className="mensaje error">El nombre es obligatorio</p>
      ) : null}
    </Fragment>
  );
};

export default NuevoProyecto;
