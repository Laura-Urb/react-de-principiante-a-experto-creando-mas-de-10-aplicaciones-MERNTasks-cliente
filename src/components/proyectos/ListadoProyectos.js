import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectos/proyectoContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import alertaContext from "../../context/alertas/alertaContext";
const ListadoProyectos = () => {
  const alertasContext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertasContext;

  const proyectosContext = useContext(proyectoContext);
  const { proyectos, getProyectos, mensaje } = proyectosContext;

  useEffect(() => {
    getProyectos();
    //eslint-disable-next-line
    if (mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria);
    //eslint-disable-next-line
  }, [mensaje]);

  if (proyectos.length === 0) return <h2>N hay proyectos</h2>;

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto}></Proyecto>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
