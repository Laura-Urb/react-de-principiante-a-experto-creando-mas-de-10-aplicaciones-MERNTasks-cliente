import React, { useContext } from "react";
import tareaContext from "../../context/tareas/tareaContext";

const Tarea = ({ tarea }) => {
  const tareasContext = useContext(tareaContext);
  const { deleteTarea, getTareas, updateTarea, setTareaActual } = tareasContext;

  const eliminarTarea = () => {
    deleteTarea(tarea._id, tarea.proyecto);
    getTareas(tarea.proyecto);
  };

  const cambiarEstadoTarea = () => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    updateTarea(tarea);
  };

  const editarTarea = () => {
    setTareaActual(tarea);
  };

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button
            onClick={() => cambiarEstadoTarea()}
            type="button"
            className="completo"
          >
            Completo
          </button>
        ) : (
          <button
            onClick={() => cambiarEstadoTarea()}
            type="button"
            className="incompleto"
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={editarTarea}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={eliminarTarea}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
