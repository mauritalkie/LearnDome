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

function filledFields(categoryName, categoryDescription){
	return(categoryName === '' || categoryDescription === '')
}

function checkData(){
	let categoryName = document.getElementById('txtCategoryNameACT').value
	let categoryDescription = document.getElementById('txtDescriptionCategoryACT').value

	let areFieldsEmpty = filledFields(categoryName, categoryDescription)
	if(areFieldsEmpty){
		makeSweetAlert('error', 'Error', 'Se deben llenar todos los campos')
		return
	}

    let formDataGet = new FormData()
    formDataGet.append("getCategoryByName", "")
    formDataGet.append("categoryName", categoryName)
    getCategoryByName(formDataGet)
}

// --------------------------------------- AJAX functions ---------------------------------------

function insertCategory(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/categoryApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            makeSweetAlert('success', 'Hecho', 'Categoría insertada con éxito')
            document.getElementById('txtCategoryNameACT').value = ''
            document.getElementById('txtDescriptionCategoryACT').value = ''
        }
    }
    request.send(formData)
}

function getCategoryByName(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/categoryApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            let jsonCategory = JSON.parse(request.responseText)
            if(jsonCategory.length > 0){
                makeSweetAlert('error', 'Error', 'La categoría ya se encuentra registrada')
                document.getElementById('txtCategoryNameACT').value = ''
                document.getElementById('txtDescriptionCategoryACT').value = ''
                return
            }

            let formDataInsert = new FormData()
            formDataInsert.append("insertCategory", "")
            formDataInsert.append("categoryName", document.querySelector('#txtCategoryNameACT').value)
            formDataInsert.append("categoryDescription", document.querySelector('#txtDescriptionCategoryACT').value)
            insertCategory(formDataInsert)
        }
    }
    request.send(formData)
}