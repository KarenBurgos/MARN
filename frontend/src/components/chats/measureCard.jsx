function MeasureCard({title, value, unit}){
    return(
        <div className="bg-primary-dark flex flex-col justify-center items-center rounded-md h-32">
            <h1 className="text-2xl">{title}</h1>
            <p>{value} {unit}</p>
        </div>
    )
}

export default MeasureCard;