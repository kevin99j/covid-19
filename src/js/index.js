import json from '../assets/medidasPreventivas.json';
let pais ='';
let cedula = '';
let departamentos = [];

console.log(json)

let param = window.location.search.substr(1);
getParamsFromUrl(param);

/**
 *  get parameters from url
 * @param param lista de parametros recibidos por get
 * @author kevin olarte
 */
const getParamsFromUrl = param => {
  let arrayparams = param.split("&");
 
  arrayparams.forEach(element => {
    if (element.includes("gel")) {
      cedula = element.split("=")[1];
    } else if (element.includes("wad")) {
      pais = element.split("=")[1];
    }
  });
 departamentos = getDepartamentos(pais);
};

/**
 * @author kevin olarte
 * metodo que muestra los departamentos por país
 */
const getDepartamentos = () =>{
  let departamentos = [];
   for (const iterator of json.MEDIDAS_AGLOMERACIONES_CEDULA) {
      if(iterator.PAIS === pais){
          if(departamentos.filter(dep => dep === iterator.DEPARTAMENTO).length===0){
            departamentos.push(iterator.DEPARTAMENTO)
          }
          
      }
   }
return departamentos;
}

/**
 * @param departamento
 * @author kevin olarte
 * metodo que muestra las ciudades por departamento
 */
const getCiudad=(departamento)=>{
    let ciudades = [];
    for (const iterator of json.MEDIDAS_AGLOMERACIONES_CEDULA) {
       if(iterator.DEPARTAMENTO === departamento){
           if(ciudades.filter(city => city === iterator.CIUDAD).length===0){
            ciudades.push(iterator.CIUDAD)
           }
           
       }
    }
 return ciudades;
}

/**
 * @param departamento
 * @param ciudad
 * @author kevin olarte
 * metodo que filtra los datos dependiendo de los parametros 
 */
const getInfoFromJson=(departamento,ciudad)=>{
    let data = [];
    cedula = cedula.substring(cedula.length -1);
    for (const iterator of json.MEDIDAS_AGLOMERACIONES_CEDULA) {
        if(iterator.PAIS===pais){
            data.push(iterator);
        }
    }

    data = data.filter(dato => (dato.CEDULA===cedula && dato.DEPARTAMENTO === departamento && dato.CIUDAD===ciudad));
return data;
}
