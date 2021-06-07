import {
  OBTENER_TAREAS,
  AGREGAR_TAREA,
  VALIDAR_FORMULARIO_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  EDITAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case OBTENER_TAREAS:
      return {
        ...state,
        tareasProyecto: action.payload,
      };
    case AGREGAR_TAREA:
      return {
        ...state,
        tareasProyecto: [action.payload, ...state.tareasProyecto],
        errorFormulario: false,
      };
    case VALIDAR_FORMULARIO_TAREA:
      return {
        ...state,
        errorFormulario: true,
      };
    case EDITAR_TAREA:
      return {
        ...state,
        tareasProyecto: state.tareasProyecto.map((tarea) =>
          tarea._id === action.payload._id ? action.payload : tarea
        ),
      };
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareasProyecto: state.tareasProyecto.filter(
          (tarea) => tarea._id !== action.payload
        ),
      };
    case TAREA_ACTUAL:
      return {
        ...state,
        tareaActual: action.payload,
      };
    case LIMPIAR_TAREA:
      return {
        ...state,
        tareaActual: null,
      };
    default:
      return state;
  }
};
