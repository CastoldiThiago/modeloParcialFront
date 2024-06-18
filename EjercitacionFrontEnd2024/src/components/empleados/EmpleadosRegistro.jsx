/* Componente hijo de Empelados 
Permite ver los campos de un determinado registro seleccionado, estos campos pueden 'Consultarse' o 'Modificarse'. 
Este componente tambien brinda la interfaz que se usara para dar el 'Alta' a un nuevo registro* y se encarga de mostrar el formulario para agregar, modificar y/o agregar un registro.*/

import React, { useEffect } from "react";
import { useForm } from "react-hook-form"; //Importamos la libreria reack-hook-form para Enlazar los campos del formulario con el estado del componente react-hook-form.

//Este componente recibe como parametros los estados AcccionABMC, Empleado, y las funciones del componente padre Grabar y Volver.
export default function EmpleadosRegistro({
  AccionABMC,
  Empleado,
  Grabar,
  Volver,
}) {
  {/* Aca definimos el hook el cual brinda el objeto con las propiedades register, handleSubmit y formState, que nos permitirán manejar los estados de los campos del formulario .*/}
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted }, //las propiedades de este objeto, nos permiten implementar validaciones.
  } = useForm({ values: Empleado }); //Se le pasa como propiedad el Empleado, el cual tiene el estado del componente y los datos del registro a mostrar.

  //Esta funcion recibe como parametro una funcion que se ejecuta cuando el usuario hace click en el boton, grabar y el parametro es el estado del formulario(objeto, con los campos y valores)
  const onSubmit = (data) => {
    Grabar(data);
  };

  return (

    //Este es un evento que invoca a la funcion onSubmit
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        {/* fieldset es un contenedor que permite deshabilitar inputs y selects. En este caso cuando la AccionABMC es C(consulta)*/}
        <fieldset disabled={AccionABMC === "C"}>

          {/* campo apellidoyNombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="ApellidoYNombre">
                Apellido y nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"

                //El atributo register es una funcion que recibe como parámetro el nombre del campo y modifica al mismo, enlazando con el estado del componente.
                {...register("ApellidoYNombre", {
                  required: { value: true, message: "Apellido y Nombre es requerido" },
                  minLength: {
                    value: 4,
                    message: "Apellido y nombre debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Apellido y nombre debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.ApellidoYNombre ? "is-invalid" : "")
                }
              />
              {errors?.ApellidoYNombre && touchedFields.ApellidoYNombre && (
                <div className="invalid-feedback">
                  {errors?.ApellidoYNombre?.message}
                </div>
              )}
            </div>
          </div>
          {/* campo FechaNacimiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaNacimiento">
                Fecha de Nacimiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaAlta", {
                  required: { value: true, message: "Fecha de Nacimiento es requerido" }
                })}
                className={
                  "form-control " + (errors?.FechaNacimiento ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaNacimiento?.message}
              </div>
            </div>
          </div>

          {/* campo DNI */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Dni">
                DNI<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("Dni", {
                  required: { value: true, message: "Dni es requerido" },
                  minLength: {
                    value: 7,
                    message: "Dni debe tener al menos 7 caracteres",
                  },
                  maxLength: {
                    value: 8,
                    message: "Dni debe tener como máximo 8 caracteres",
                  },
                })}
                className={
                  "form-control " + (errors?.Dni ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.Dni?.message}</div>
            </div>
          </div>

          {/* campo Suspendio */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Suspendido">
                Suspendido<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                name="Suspendido"
                {...register("Suspendido", {
                  required: { value: true, message: "Suspendido es requerido" },
                })}
                className={
                  "form-control" + (errors?.Suspendido ? " is-invalid" : "")
                }
                disabled
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
              <div className="invalid-feedback">{errors?.Suspendido?.message}</div>
            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {/* Este div se utiliza con las validaciones de datos. Es un mensaje de error.
        "isValid" y "isSubmitted son dos estados  El primero se inicializa en true y se actualiza en el evento "onSubmit" del formulario, con el resultado de la validación del formulario. 
        El segundo se inicializa en false y se actualiza en el evento "onSubmit" del formulario, con el valor true. */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );
}

