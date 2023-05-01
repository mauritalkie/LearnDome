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

    let formData = new FormData()
    formData.append("insertCategory", "")
    formData.append("categoryName", document.querySelector('#txtCategoryNameACT').value)
    formData.append("categoryDescription", document.querySelector('#txtDescriptionCategoryACT').value)
    insertCategory(formData)
}

// --------------------------------------- AJAX functions ---------------------------------------

function insertCategory(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/categoryApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            makeSweetAlert('success', 'Hecho', 'Categoría insertada con éxito')
        }
    }
    request.send(formData)
}