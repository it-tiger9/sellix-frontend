export const formData = (obj) => {
    var form_data = new FormData();

    for ( var key in obj ) {
        form_data.append(key, obj[key]);
    }
    
    return form_data
}