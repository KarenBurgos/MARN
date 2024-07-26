const BeaufortScale = (scale) => {
    switch (scale) {
        case 0:
            return "Calma";
        case 1:
            return "Ventolina";
        case 2:
            return "Brisa ligera";
        case 3:
            return "Brisa suave";
        case 4:
            return "Brisa moderada";
        case 5:
            return "Brisa fresca";
        case 6:
            return "Brisa fuerte";
        case 7:
            return "Viento fuerte";
        case 8:
            return "Temporal fuerte";
        case 9:
            return "Temporal duro";
        case 10:
            return "Tempestad";
        case 11:
            return "Tormenta";
        case 12:
            return "Huracán";
        default:
            return "Valor desconocido";
    }
}

export default BeaufortScale;
