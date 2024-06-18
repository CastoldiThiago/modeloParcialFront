//Este sera el servicio que proporciona las funciones necesarias del ABMC para empleados.


import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config";
 const urlResource = config.urlResourceEmpleados;


async function Buscar(ApellidoYNombre, Suspendido, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { ApellidoYNombre, Suspendido, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(empleado) {
  const resp = await httpService.get(urlResource + "/" + empleado.IdEmpleado);
  return resp.data;
}


async function ActivarDesactivar(empleado) {
  await httpService.delete(urlResource + "/" + empleado.IdEmpleado);
}


async function Grabar(empleado) {
  if (empleado.IdEmpleado === 0) {
    await httpService.post(urlResource, empleado);
  } else {
    await httpService.put(urlResource + "/" + empleado.IdEmpleado, empleado);
  }
}


export const empleadosService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
