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

function filledFields(name, description, price, categories){
    return(name === "" || description === "" || price === "" || categories === "")
}

function rightPrice(price){
    let dots = 0
    for(i=0; i<price.length; i++){
        if(price.charAt(i) == '.'){
            dots++
        }
    }
    
    console.log(dots)
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

function checkData(){
    let name = document.getElementById("txtNameAC").value
    let description = document.getElementById("txtDescriptionAC").value
    let price = document.getElementById("txtPriceAC").value
    let categories = document.getElementById("txtCategoriesAC").value

    let areFieldsEmpty = filledFields(name, description, price, categories)
    if(areFieldsEmpty){
        makeSweetAlert('error', 'Error', 'Se deben llenar todos los campos')
        return
    }

    let isRightPrice = rightPrice(price)
    if(!isRightPrice){
        makeSweetAlert('error', 'Error', 'El precio no es válido')
        return
    }

    makeSweetAlert('success', 'Éxito', 'Todo correcto')
}