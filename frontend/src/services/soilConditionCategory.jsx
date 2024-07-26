const SoilConditionCategory = (category) => {
    switch (category) {
        case 0:
            return "seco"
            ;
        case 1:
            return "húmedo"
            ;
        case 2:
            return "muy húmedo"
            ;
    
        default:
            return "sin datos"
            ;
    }
}

export default SoilConditionCategory;