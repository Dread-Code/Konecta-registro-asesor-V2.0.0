const moment = require('moment');

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