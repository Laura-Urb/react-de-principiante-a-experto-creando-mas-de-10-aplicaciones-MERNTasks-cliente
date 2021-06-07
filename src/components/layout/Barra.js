import React, { useContext, useEffect } from "react";
import authContext from "../../context/auth/authContext";

const Barra = () => {
  const authsContext = useContext(authContext);
  const { usuarioAutenticado, cerrarSesion, usuario } = authsContext;

  useEffect(() => {
    usuarioAutenticado();    
    //eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          Hola
          <span> {usuario.nombre}</span>
        </p>
      ) : null}
      <nav className="nav-principal">
        <button onClick={()=> cerrarSesion()} className="btn btn-blank cerrar-sesion">
          Cerrar Sesión
        </button>
      </nav>
    </header>
  );
};

export default Barra;
