import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import alertaContext from "../../context/alertas/alertaContext";
import authContext from "../../context/auth/authContext";

const NuevaCuenta = (props) => {
  const alertasContext = useContext(alertaContext);
  const authsContext = useContext(authContext);

  const { registrarUsuario, mensaje, autenticado } = authsContext;

  const { alerta, mostrarAlerta } = alertasContext;

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });

  const { nombre, email, password, confirmarPassword } = usuario;

  useEffect(() => {
    if (autenticado) props.history.push("/proyectos");
    if (mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria);
    //eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  const onChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmarPassword.trim() === ""
    ) {
      mostrarAlerta("Todos los campo son obligatorios", "alerta-error");
      return;
    }
    if (password.length > 6) {
      mostrarAlerta(
        "El password debe tener al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }
    if (password !== confirmarPassword) {
      mostrarAlerta("Los passwords no son iguales", "alerta-error");
      return;
    }

    registrarUsuario({ nombre, email, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={onChange}
            ></input>
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            ></input>
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={onChange}
            ></input>
          </div>
          <div className="campo-form">
            <label htmlFor="confirmarPassword">Confirmar Password</label>
            <input
              type="password"
              id="confirmarPassword"
              name="confirmarPassword"
              placeholder="Confirma tu Password"
              value={confirmarPassword}
              onChange={onChange}
            ></input>
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            ></input>
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
