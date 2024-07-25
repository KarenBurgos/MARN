const DewConditionCategory = (category) => {
    switch (category) {
        case 0:
            return "poco";
        case 1:
            return "mucho";
        case 2:
            return "abundante";
        case ".":
            return "no hay";
        default:
            return "desconocido"; // Valor predeterminado
    }
};


export default DewConditionCategory;