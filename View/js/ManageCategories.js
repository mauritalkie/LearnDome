let currentId = 0

let formData = new FormData()
formData.append("getCategories", "")
getCategories(formData)

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
	let categoryName = document.getElementById('txtCategoryName').value
	let categoryDescription = document.getElementById('txtCategoryDescription').value

	let areFieldsEmpty = filledFields(categoryName, categoryDescription)
	if(areFieldsEmpty){
		makeSweetAlert('error', 'Error', 'Se deben llenar todos los campos')
		return
	}

	let formDataUpdate = new FormData()
	formDataUpdate.append("updateCategory", "")
	formDataUpdate.append("categoryName", categoryName)
	formDataUpdate.append("categoryDescription", categoryDescription)
	formDataUpdate.append("id", currentId)
	updateCategory(formDataUpdate)
}

function setCurrentId(id){
	currentId = id
}

// --------------------------------------- AJAX functions ---------------------------------------

function getCategories(formData){
	let request = new XMLHttpRequest()
	request.open('POST', '/LearnDome/Controller/categoryApi.php', true)
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			let jsonCategories = JSON.parse(request.responseText)
			document.getElementById('categories').innerHTML = ''
			jsonCategories.forEach(category => {
				document.getElementById('categories').innerHTML += 
				`
				<tr>
		          <td>${category.category_name}</td>
		          <td>${category.category_description}</td>
		          <td><button class=" btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${category.id}" onclick="setCurrentId(this.id)">Editar</button></td>
		          <td><button class=" btn btn-danger" id="${category.id}" onclick="deleteCategory(this.id)">Eliminar</button></td>
		        </tr>
				`
			})
		}
	}
	request.send(formData)
}

function updateCategory(formData){
	let request = new XMLHttpRequest()
	request.open('POST', '/LearnDome/Controller/categoryApi.php', true)
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			makeSweetAlert('success', 'Hecho', 'Se deben llenar todos los campos')
			document.getElementById('txtCategoryName').value = ''
			document.getElementById('txtCategoryDescription').value = ''

			let formDataGet = new FormData()
			formDataGet.append("getCategories", "")
			getCategories(formDataGet)
		}
	}
	request.send(formData)
}

function deleteCategory(id){
	let request = new XMLHttpRequest()
	request.open('POST', '/LearnDome/Controller/categoryApi.php', true)
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			let formDataGet = new FormData()
			formDataGet.append("getCategories", "")
			getCategories(formDataGet)
		}
	}
	let formData = new FormData()
	formData.append("deleteCategory", "")
	formData.append("id", id)
	request.send(formData)
}