function checkData(){
    let name = document.getElementById("txtNameAC").value
    let description = document.getElementById("txtDescriptionAC").value
    let price = document.getElementById("txtPriceAC").value

    let areFieldsEmpty = filledFields(name, description, price)
    if(areFieldsEmpty){
        makeSweetAlert('error', 'Error', 'Se deben llenar todos los campos')
        return
    }

    let isRightPrice = rightPrice(price)
    if(!isRightPrice){
        makeSweetAlert('error', 'Error', 'El precio no es válido')
        return
    }

    let formData = new FormData()
    formData.append("insertCourse", "")
    formData.append("courseName", document.querySelector('#txtNameAC').value)
    formData.append("instructorId", currentInstructorId)
    formData.append("price", document.querySelector('#txtPriceAC').value)
    formData.append("courseDescription", document.querySelector('#txtDescriptionAC').value)
    formData.append("image", document.querySelector('#courseFile').files[0])
    insertCourse(formData)
}

function filledFields(name, description, price){
    return(name === "" || description === "" || price === "" || addedCategories.length === 0 || isTherePicture === false)
}

function rightPrice(price){
    let dots = 0
    for(i=0; i<price.length; i++){
        if(price.charAt(i) == '.'){
            dots++
        }
    }
    
    if(dots > 1){
        return false
    }

    for(i=0; i<price.length; i++){
        if((price.charAt(i) == '.') || price.charAt(i) >= '0' && price.charAt(i) <= '9'){

        }
        else{
            return false
        }
    }

    let number = parseFloat(price)
    if(number <= 0.0){
        return false
    }
    
    return true
}

function makeSweetAlert(icon, title, message){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        icon: icon,
        title: title,
        html: `<p style='color:white'>${message}</p>`,
        confirmButtonText: 'OK'
    })
}

document.getElementById("courseFile").addEventListener('change', (event) => {
    let image = event.target.files[0]
    let reader = new FileReader()

    reader.addEventListener('load', (event) => {
        let imageSource = event.target.result
        let previewImage = document.getElementById("pictureCourse")

        previewImage.innerHTML = ''
        previewImage.innerHTML += `<img style="height: 20em; width: 20em;" src="${imageSource}">`
        isTherePicture = true
    }, false)

    reader.readAsDataURL(image)
}, false)
