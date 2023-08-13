const validar = (inputs) =>{
    const regexNombre = /[\w]{5,}/i;
    let errores = {}

    if(!regexNombre.test(inputs.name) || inputs.name.length>30){
        errores.name = "Name must be 5 to 30 characters long"
    } else if(regexNombre.test(inputs.name) && inputs.name.length<30){delete errores.name}
    if(inputs.difficulty === 0){ errores.difficulty = "Please select difficulty"}
    else if(inputs.difficulty !== 0){delete errores.difficulty}
    if(inputs.duration === 0  || inputs.duration > 10){
        errores.duration = "Duration must be between 1 and 10 hours"
    } else if (inputs.duration !== 0 && inputs.duration <= 10){
        delete errores.duration
    }
    if(inputs.season === ""){
        errores.season = "Please select season"
    } else if( inputs.season !== ""){delete errores.season}
    if(inputs.countryId.join("") === "" ){
        errores.countryId = "Please select at least one country"
    } else if( inputs.countryId.length !== 0){delete errores.countryId}
    if(inputs.imageURL === "error"){
        errores.imageURL = "Please enter a valid image URL"
    }
    if(inputs.description.length > 200){
        errores.description = "Description text must be less than 200 characters"
    } else if(!inputs.description || inputs.description.length <= 200){
        delete errores.description
    }
    
    return errores
}