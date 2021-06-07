import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  const [nuevaTarea, setNuevaTarea] = useState({
    nombre: "",
  });
  const { nombre } = nuevaTarea;

  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {
    errorFormulario,
    setTarea,
    mostrarError,
    getTareas,
    tareaActual,
    updateTarea,
    cleanTarea,
  } = tareasContext;

  useEffect(() => {
    if (tareaActual) setNuevaTarea(tareaActual);
    else
      setNuevaTarea({
        nombre: "",
      });
  }, [tareaActual]);

  if (!proyectoActual) return null;

  const [proyecto] = proyectoActual;

  const onSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === "") {
      mostrarError();
      return;
    }
    if (tareaActual) {
      updateTarea(nuevaTarea);
      cleanTarea();
    } else {
      nuevaTarea.proyecto = proyecto._id;
      setTarea(nuevaTarea);
    }
    setNuevaTarea({
      nombre: "",
    });
    getTareas(proyecto._id);
  };

  const onChange = (e) => {
    setNuevaTarea({ ...nuevaTarea, [e.target.name]: e.target.value });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea"
            name="nombre"
            value={nombre}
            onChange={onChange}
          ></input>
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaActual ? "Editar Tarea" : "Agregar Tarea"}
          ></input>
        </div>
      </form>
      {errorFormulario ? (
        <p className="mensaje error">El nombre es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
