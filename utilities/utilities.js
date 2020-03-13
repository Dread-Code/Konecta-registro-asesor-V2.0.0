const moment = require('moment');

/* obtiene el año, convierte ambas fechas para que queden en un mismo formato,
 divide en un array el return del metodo format y retorna la resta en los indices
  2 del cada array */ 

function getAnio(date){
    let birthDate = moment(date).format('L');
    let currentDate = new Date;
    let currentD = moment(currentDate).format('L');
    let since = birthDate.split("/");
    let until = currentD.split("/");
    return until[2]-since[2];
}

module.exports = {
    getAnio
}