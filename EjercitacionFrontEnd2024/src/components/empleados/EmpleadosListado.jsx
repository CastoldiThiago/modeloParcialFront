/* Este es un componente hijo de Empleados el cual hereda sus funciones y estados
Este permitirá mostrar en una tabla un resumen del resultado de la búsqueda según los parámetros establecidos en el componente anterior En este caso no desarrollamos empleado buscar.
Tambien se incluyen:
1. Contador de registros que cumplen la condición de filtrado, un paginador. 
2. Botón imprimir.
3. Mensaje para avisar cuando no se encuentren resultados según el criterio establecido.*/

import React from "react";
import moment from "moment";

export default function EmpleadosListado({
  Empleados,
  Consultar,
  Modificar,
  ActivarDesactivar,
  Imprimir,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Apellido y Nombre</th>
            <th className="text-center">Fecha de nacimiento</th>
            <th className="text-center">DNI</th>
            <th className="text-center">Suspendido</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Empleados &&
          //Mapea a los empleados junto a sus atributos para mostrarlos
            Empleados.map((Empleado) => (
              <tr key={Empleado.IdEmpleado}>
                <td>{Empleado.ApellidoYNombre}</td>
                <td className="text-end">
                  {moment(Empleado.FechaNacimiento).format("DD/MM/YYYY")}
                </td>
                <td className="text-end">{Empleado.Dni}</td>
                {/* En la columna suspendido, su valor dependera segun el valor de la propiedad empleado.suspendido. depende si es True o False el texto sera SI o NO */}
                <td>{Empleado.Suspendido ? "SI" : "NO"}</td>
                <td className="text-center text-nowrap">

                  {/* Boton Consultar*/}
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Empleado)} // Pasa al empleado actual a la funcion de consultar
                  >
                    <i className="fa fa-eye"></i>
                  </button>

                  {/* Boton Modificar*/}
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Empleado)} // Pasa al empleado actual a la funcion de modificar
                  >
                    <i className="fa fa-pencil"></i>
                  </button>

                  {/* Boton de Suspendido*/}
                  <button
                    className={
                      "btn btn-sm " +
                      (Empleado.Suspendido
                        ? "btn-outline-danger"
                        : "btn-outline-success")
                    }
                    // En la columna suspendido, su valor dependera segun el valor de la propiedad empleado.suspendido. Depende si es True o False el texto sera Desactivar o Activar.
                    title={Empleado.Suspendido ? "Desactivar" : "Activar"}
                    onClick={() => ActivarDesactivar(Empleado)} // Pasa al empelado actual la funcion de activar o desactivar
                  >
                    <i
                      className={"fa fa-" + (Empleado.Suspendido ? "times" : "check")}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Paginador*/}
      {/* No hace falta si no lo piden*/}
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          <div className="col text-center">
            Pagina: &nbsp;
            <select
              value={Pagina}
              onChange={(e) => {
                Buscar(e.target.value);
              }}
            >
              {Paginas?.map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
            &nbsp; de {Paginas?.length}
          </div>

          <div className="col">
          {/* Boton de impresion*/}
            <button className="btn btn-primary float-end" onClick={() => Imprimir()}> 
              <i className="fa fa-print"></i>Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
