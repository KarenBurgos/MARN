function MeasureCard({title, subtitle, value, unit}){
    return(
        <div className="bg-primary-dark flex flex-col justify-center items-center rounded-md h-[15vh] ">
            <h1 className="text-lg">{title}</h1>
            <h2 className="text-base">{subtitle}</h2>
            <p className="text-4xl 2xl:text-5xl pt-2 font-semibold">{value} {unit}</p>
        </div>
    )
}

export default MeasureCard;