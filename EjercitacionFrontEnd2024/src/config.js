//const urlServidor = "http://localhost:3000"
//const urlServidor = ""  // vacio para cuando se despliega el frontend, en el mismo servidor que el backend
const urlServidor = "http://localhost:4000" //Sera el puerto en el cual se conectara la url
//const urlServidor = "https://webapi.pymes.net.ar"
//const urlServidor = "https://labsys.frc.utn.edu.ar/dds-express"



const urlResourceArticulos = urlServidor + "/api/articulos";
const urlResourceEmpleados = urlServidor + "/api/empleados"; //API empleados
const urlResourceArticulosFamilias = urlServidor + "/api/articulosfamilias";
const urlResourceArticulosJWT = urlServidor + "/api/articulosjwt";

export const config = {
    urlServidor,
    urlResourceArticulos,
    urlResourceEmpleados,
    urlResourceArticulosFamilias,
    urlResourceArticulosJWT,
}