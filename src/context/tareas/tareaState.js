import React, { useReducer } from "react";
import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";
import {
  OBTENER_TAREAS,
  AGREGAR_TAREA,
  VALIDAR_FORMULARIO_TAREA,
  TAREA_ACTUAL,
  ELIMINAR_TAREA,
  EDITAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";
import clienteAxios from "../../config/axios";

const TareaState = (props) => {
  const initalState = {
    tareasProyecto: [],
    errorFormulario: false,
    tareaActual: null,
  };

  const [state, dispatch] = useReducer(tareaReducer, initalState);

  const getTareas = async (proyecto) => {
    try {
      const response = await clienteAxios.get("/api/tareas", {
        params: { proyecto },
      });
      dispatch({
        type: OBTENER_TAREAS,
        payload: response.data.tareas,
      });
    } catch (error) {}
  };

  const setTarea = async (tarea) => {
    try {
      const response = await clienteAxios.post("/api/tareas", tarea);
      dispatch({
        type: AGREGAR_TAREA,
        payload: response.data,
      });
    } catch (error) {}
  };

  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO_TAREA,
    });
  };

  const setTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  const deleteTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, {
        params: { proyecto },
      });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {}
  };

  const updateTarea = async (tarea) => {
    try {
      const response = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );
      dispatch({
        type: EDITAR_TAREA,
        payload: response.data.tarea,
      });
    } catch (error) {}
  };

  const cleanTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };

  return (
    <tareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasProyecto: state.tareasProyecto,
        errorFormulario: state.errorFormulario,
        tareaActual: state.tareaActual,
        updateTarea,
        getTareas,
        setTarea,
        mostrarError,
        setTareaActual,
        deleteTarea,
        cleanTarea,
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;
