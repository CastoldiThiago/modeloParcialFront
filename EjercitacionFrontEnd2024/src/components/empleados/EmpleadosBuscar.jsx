/* Este es un componente hijo de Empelados, el cual hereda las funciones y estados. 
Se encarga de actuar sobre la tabla Empleados y realizar busquedas con filtros dependiendo de ciertos parametros */

import React from "react";
//Este componente recibe los parametros ApellidoYNombre, Suspendido y las funciones Buscar y Agregar heredadas del componente padre.
export default function EmpleadosBuscar ({ApellidoYNombre, setApellidoYNombre, Suspendido, setSuspendido, Buscar, Agregar}) {
// Las funciones set son aquellas que se invocaran cuando se quiere cambiar el valor de un estado en vez de invocar al estado en si.

    return (

    /* Value permite enlazar los estados con los campos del formulario
    Y onChange se ejecuta cada vez que se modifica el valor de un campo */
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Apellido y Nombre:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setApellidoYNombre(e.target.value)}
              value={ApellidoYNombre}
              maxLength="55"
              autoFocus
            />
          </div>
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Suspendido:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <select
              className="form-control"
              onChange={(e) => setSuspendido(e.target.value)}
              value={Suspendido}
            >
              <option value={""}></option>
              <option value={false}>NO</option>
              <option value={true}>SI</option>
            </select>
          </div>
        </div>
  
        <hr />
  
        {/* Botones */}
        <div className="row">
          <div className="col text-center botones">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Buscar(1) }
          >
            <i className="fa fa-search"> </i> Buscar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Agregar() }
          >
            <i className="fa fa-plus"> </i> Agregar
          </button>
          </div>
        </div>
      </div>
    </form>
    )
  };
