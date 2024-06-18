/* Empleados es el componente padre de EmpleadosBuscar y EmpleadosListado, los cuales herendan sus estados y funciones*/

import React, { useState, useEffect } from "react"; //Se importa useState para el manejo de estado
import moment from "moment"; //Se importa moment para el manejo de fechas
import EmpleadosBuscar from "./EmpleadosBuscar"; //Se importa el componente hijo Empleados Buscar
import EmpleadosListado from "./EmpleadosListado"; //Se importa el componente hijo Empleados Listado
import EmpleadosRegistro from "./EmpleadosRegistro";
import { empleadosService } from "../../services/empleados.service"; //Se importan los servicios que se utilizaran
import modalDialogService from "../../services/modalDialog.service";



function Empleados() {
  const TituloAccionABMC = {
    //Lista de acciones que se podran realizar en el ABM
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [ApellidoYNombre, setApellidoYNombre] = useState("");
  const [Suspendido, setSuspendido] = useState("");

  const [Empleados, setEmpleados] = useState(null);
  const [Empleado, setEmpleado] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await empleadosService.Buscar(ApellidoYNombre, Suspendido, _pagina);
    modalDialogService.BloquearPantalla(false);
    setEmpleados(data.Empleados);
    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  //Buscar empleado por id
  async function BuscarPorId(empleado, accionABMC) {
    const data = await empleadosService.BuscarPorId(empleado);
    setEmpleado(data);
    setAccionABMC(accionABMC);
  }
  
  //Consultar el empleado buscado por id
  function Consultar(empleado) {
    BuscarPorId(empleado, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  //Modificar a un empleado
  function Modificar(empleado) {
    if (!empleado.Suspendido) {
      //alert("No puede modificarse un registro Inactivo.");
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(empleado, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  //Se encarga de inicializar el estado de cada componente para que se muestre en el EmpleadosRegistro, con los campos vacios para que se puedean completar
  async function Agregar() {
    setAccionABMC("A");
    setEmpleado({
        IdEmpleado: 0,
        ApellidoNombre: '',
        FechaNacimiento: moment(new Date()).format("YYYY-MM-DD"),
        Dni: '',
        Suspendido: true, //Se inicializa la propiedad Activo en true. Solo se puede modificar el campo con la funcion activar/desactivar, ya que es de solo lectura.
      });
    //modalDialogService.Alert("preparando el Alta...");
  }

  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  //Implementacion de la baja logica. En este caso del estado suspendido del empleado.
  async function ActivarDesactivar(empleado) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
        (empleado.Suspendido ? "desactivar" : "activar") +
        " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await empleadosService.ActivarDesactivar(empleado);
        await Buscar();
      }
    );

  }
  
  
  /* Se encarga de grabar el alta y modificacion de un registro.
  Solo funciona al implementar el formulario controlado, el cual invoca los parametros*/
  async function Grabar(empleado) {
    // agregar o modificar
    try
    {
      await empleadosService.Grabar(empleado);
    }
    catch (error)
    {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString()) //Muestra un alert con el mensaje de error en el caso de querer dar de alta un registro con un error
      return;
    }
    await Buscar();
    Volver();
  
    //setTimeout(() => {
      modalDialogService.Alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    //}, 0);
  }
  

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Empleados <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>
      {/* Aca le pasamos los parametros al componente EmpleadosBuscar, el cual es mas simple por el operador de propagacion de JavaScript.
      A travez de una condicion segun el estado actual de AccionABMC, hacemos que cada componente se muestre cuando corresponda. */}
      {AccionABMC === "L" && (
        <EmpleadosBuscar
          ApellidoYNombre={ApellidoYNombre}
          setApellidoYNombre={setApellidoYNombre}
          Suspendido={Suspendido}
          setSuspendido={setSuspendido}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {/* La condicion esque la lista de empleados debe ser mayor 0, se debe contener un empleado aunque sea*/}
      {AccionABMC === "L" && Empleados?.length > 0 && (
        <EmpleadosListado
          {...{
            Empleados,
            Consultar,
            Modificar,
            ActivarDesactivar,
            Imprimir,
            Pagina,
            RegistrosTotal,
            Paginas,
            Buscar,
          }}
        />
      )}

      {/* Mensaje cuando no se encuentren registros. Cuando la cantidad de empleados sea igual a 0. */}
      {AccionABMC === "L" && Empleados?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <EmpleadosRegistro
          {...{ AccionABMC, Empleado, Grabar, Volver }}
        />
      )}
    </div>
  );
}
export { Empleados };
