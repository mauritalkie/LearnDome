let isTherePicture = false

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

document.getElementById("file").addEventListener('change', (event) => {
    let image = event.target.files[0]
    let reader = new FileReader()

    reader.addEventListener('load', (event) => {
        let imageSource = event.target.result
        let previewImage = document.getElementById("picture")

        previewImage.src = imageSource
        isTherePicture = true
    }, false)

    reader.readAsDataURL(image)
}, false)

function filledFields(name, lastName, email, user, password, genre, role, date){
    return(name === "" || lastName === "" || email === "" || user === "" || password === "" || genre === "No selection" || role === "No selection" || date === "" || isTherePicture === false)
}

function isLetter(letter){
    return letter.toLowerCase() != letter.toUpperCase()
}

function rightName(name){
    for(i=0; i<name.length; i++)
        if(!isLetter(name.charAt(i)) && name.charAt(i) != ' ')
            return false
    return true
}

function rightEmail(email){
    return email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

function rightPassword(password){
    let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    return password.match(regex)
}

function rightDate(date){
    let currentDate = new Date()
    return date < currentDate
}

function rightFields(name, lastName, email, user, password, selectedGenre, selectedRole, selectedDate){
    let isRightName = rightName(name)
    if(!isRightName){
        makeSweetAlert('error', 'Error', 'El nombre no es válido')
        return false
    }

    let isRightLastName = rightName(lastName)
    if(!isRightLastName){
        makeSweetAlert('error', 'Error', 'El apellido no es válido')
        return false
    }

    let isRightEmail = rightEmail(email)
    if(!isRightEmail){
        makeSweetAlert('error', 'Error', 'El correo electrónico no es válido')
        return false
    }

    let isRightPassword = rightPassword(password)
    if(!isRightPassword){
        makeSweetAlert('error', 'Error', 'La contraseña debe de tener al menos una letra minúscula, una letra mayúscula, un número, un símbolo especial y al menos 8 caracteres')
        return false
    }

    let isRightDate = rightDate(selectedDate)
    if(!isRightDate){
        makeSweetAlert('error', 'Error', 'La fecha de nacimiento debe suceder antes del día actual')
        return false
    }

    return true
}

function redirectPage(role){
    if(role === "Student"){
        let formData = new FormData()
        formData.append("insertStudent", "")
        formData.append("username", document.querySelector('#txtUserSignup').value)
        formData.append("password", document.querySelector('#txtPasswordSignup').value)
        formData.append("firstname", document.querySelector('#txtNameSignup').value)
        formData.append("lastname", document.querySelector('#txtLastnameSignup').value)
        formData.append("genre", document.querySelector('#cbGenderSignup').value)
        formData.append("birthdate", document.querySelector('#bornDate').value)
        formData.append("email", document.querySelector('#txtEmailSignup').value)
        formData.append("image", document.querySelector('#file').files[0])
        insertStudent(formData)
    }

    if(role === "Teacher"){
        let formData = new FormData()
        formData.append("insertInstructor", "")
        formData.append("username", document.querySelector('#txtUserSignup').value)
        formData.append("password", document.querySelector('#txtPasswordSignup').value)
        formData.append("firstname", document.querySelector('#txtNameSignup').value)
        formData.append("lastname", document.querySelector('#txtLastnameSignup').value)
        formData.append("genre", document.querySelector('#cbGenderSignup').value)
        formData.append("birthdate", document.querySelector('#bornDate').value)
        formData.append("email", document.querySelector('#txtEmailSignup').value)
        formData.append("image", document.querySelector('#file').files[0])
        insertInstructor(formData)
    }

    if(role === "Admin"){
        let formData = new FormData()
        formData.append("insertAdministrator", "")
        formData.append("username", document.querySelector('#txtUserSignup').value)
        formData.append("password", document.querySelector('#txtPasswordSignup').value)
        formData.append("firstname", document.querySelector('#txtNameSignup').value)
        formData.append("lastname", document.querySelector('#txtLastnameSignup').value)
        formData.append("genre", document.querySelector('#cbGenderSignup').value)
        formData.append("birthdate", document.querySelector('#bornDate').value)
        formData.append("email", document.querySelector('#txtEmailSignup').value)
        formData.append("image", document.querySelector('#file').files[0])
        insertAdministrator(formData)
    }
}

function checkData(){
    let name = document.getElementById("txtNameSignup").value
    let lastName = document.getElementById("txtLastnameSignup").value
    let email = document.getElementById("txtEmailSignup").value
    let user = document.getElementById("txtUserSignup").value
    let password = document.getElementById("txtPasswordSignup").value
    let selectedGenre = document.getElementById("cbGenderSignup").value
    let selectedRole = document.getElementById("cbRoleSignup").value
    let selectedDate = document.getElementById("bornDate").value

    let areFieldsEmpty = filledFields(name, lastName, email, user, password, selectedGenre, selectedRole, selectedDate)
     if(areFieldsEmpty){
         makeSweetAlert('error', 'Error', 'Se deben llenar todos los campos')
         return
     }

    const splittedDate = selectedDate.split('-')
    let dateBasedOnString = new Date(splittedDate[0], splittedDate[1] - 1, splittedDate[2])

    let areFieldsRight = rightFields(name, lastName, email, user, password, selectedGenre, selectedRole, dateBasedOnString)
    if(!areFieldsRight){
        return
    }

    redirectPage(selectedRole)
}

// --------------------------------------- AJAX functions ---------------------------------------

function insertAdministrator(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/administratorApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonAdmin = JSON.parse(request.responseText)
            localStorage.setItem("globalId", jsonAdmin[0].id)
            localStorage.setItem("messageId", jsonAdmin[0].id_for_message)
            makeSweetAlert('success', 'Hecho', 'Administrador creado con éxito')
            window.location.href = "/LearnDome/html/admins/CourseCommentManager.html"
        }
    }
    request.send(formData)
}

function insertInstructor(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonInstructor = JSON.parse(request.responseText)
            localStorage.setItem("globalId", jsonInstructor[0].id)
            localStorage.setItem("messageId", jsonInstructor[0].id_for_message)
            makeSweetAlert('success', 'Hecho', 'Instructor creado con éxito')
            window.location.href = "/LearnDome/html/teachers/CourseManager.html"
        }
    }
    request.send(formData)
}

function insertStudent(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonStudent = JSON.parse(request.responseText)
            localStorage.setItem("globalId", jsonStudent[0].id)
            localStorage.setItem("messageId", jsonStudent[0].id_for_message)
            makeSweetAlert('success', 'Hecho', 'Estudiante creado con éxito')
            window.location.href = "/LearnDome/html/index.html"
        }
    }
    request.send(formData)
}