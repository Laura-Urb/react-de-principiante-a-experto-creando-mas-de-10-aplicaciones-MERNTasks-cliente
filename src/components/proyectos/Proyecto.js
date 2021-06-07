import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  const proyectosContext = useContext(proyectoContext);
  const { setProyectoActual } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const { getTareas } = tareasContext;

  const getProyectoActual = () => {
    setProyectoActual(proyecto._id);
    getTareas(proyecto._id);
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={getProyectoActual}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
