let formData = new FormData()
formData.append("getCategories", "")
getCategories(formData)

const addedCategories = new Array()
let isTherePicture = false
let currentInstructorId = localStorage.getItem("globalId")

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
        previewImage.innerHTML += `<img style="height: 25em; width: 25em;" src="${imageSource}">`
        isTherePicture = true
    }, false)

    reader.readAsDataURL(image)
}, false)

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

function addCategory(){
    let category = document.getElementById('cbCategoriesAC')
    if(category.value === "No selection")
        return

    let categoryId = category.options[category.selectedIndex].id
    let categoryName = category.value

    for(i=0; i<addedCategories.length; i++)
        if(categoryId === addedCategories[i])
            return

    addedCategories.push(categoryId)
    document.getElementById('categoriesSpace').innerHTML += `<h6 class="text-white">${categoryName}</h6>`
}

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

// --------------------------------------- AJAX functions ---------------------------------------

function getCategories(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/categoryApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            let jsonCategories = JSON.parse(request.responseText)
            if(jsonCategories.length == 0){
                makeSweetAlert('info', 'Aviso', 'No existen categorías disponibles para los cursos')
                return
            }

            jsonCategories.forEach(category => {
                document.getElementById('cbCategoriesAC').innerHTML += `<option value="${category.category_name}" id="${category.id}">${category.category_name}</option>`
            })
        }
    }
    request.send(formData)
}

function insertCourse(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonCourse = JSON.parse(request.responseText)
            localStorage.setItem("currentCourseId", jsonCourse[0].id)

            let currentCourseId = localStorage.getItem("currentCourseId")
            for(i=0; i<addedCategories.length; i++){
                let formDataCourseCategory = new FormData()
                formDataCourseCategory.append("insertCourseCategory", "")
                formDataCourseCategory.append("courseId", currentCourseId)
                formDataCourseCategory.append("categoryId", addedCategories[i])
                insertCourseCategory(formDataCourseCategory)
            }

            window.location.href = '/LearnDome/html/teachers/AddContent.html'
        }
    }
    request.send(formData)
}

function insertCourseCategory(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseCategoryApi.php', true)
    request.send(formData)
}