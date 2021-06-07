import React, { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "../../context/auth/authContext";

const RutaPrivada = ({ component: Component, ...props }) => {
  const authsContext = useContext(authContext);
  const { autenticado, usuarioAutenticado, cargando } = authsContext;

  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando ? (
          <Redirect to="/"></Redirect>
        ) : (
          <Component {...props}></Component>
        )
      }
    ></Route>
  );
};

export default RutaPrivada;
