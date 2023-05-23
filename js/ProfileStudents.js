let currentStudentId = localStorage.getItem("globalId")
let formData = new FormData()
formData.append("getStudent", "")
formData.append("id", currentStudentId)
getStudent(formData)

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

document.getElementById("filePS").addEventListener('change', (event) => {
    let image = event.target.files[0]
    let reader = new FileReader()

    reader.addEventListener('load', (event) => {
        let imageSource = event.target.result
        let previewImage = document.getElementById("picturePS")

        previewImage.src = imageSource
        isTherePicture = true
    }, false)

    reader.readAsDataURL(image)
}, false)

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

function rightFields(name, lastName, email, user, password){
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

    return true
}

function filledFields(name, lastName, email, user, password){
    return(name === "" || lastName === "" || email === "" || user === "" || password === "")
}

function checkData(){
    let name = document.getElementById("txtNamePS").value
    let lastName = document.getElementById("txtLastNamePS").value
    let email = document.getElementById("txtEmailPS").value
    let user = document.getElementById("txtUserPS").value
    let password = document.getElementById("txtPasswordPS").value

    let areFieldsEmpty = filledFields(name, lastName, email, user, password)
     if(areFieldsEmpty){
         makeSweetAlert('error', 'Error', 'Se deben llenar todos los campos')
         return
     }

    let areFieldsRight = rightFields(name, lastName, email, user, password)
    if(!areFieldsRight){
        return
    }

    let formData = new FormData()
    formData.append("updateStudent", "")
    formData.append("username", document.querySelector('#txtUserPS').value)
    formData.append("password", document.querySelector('#txtPasswordPS').value)
    formData.append("firstname", document.querySelector('#txtNamePS').value)
    formData.append("lastname", document.querySelector('#txtLastNamePS').value)
    formData.append("email", document.querySelector('#txtEmailPS').value)
    formData.append("image", document.querySelector('#filePS').files[0])
    formData.append("id", currentStudentId)
    updateStudent(formData)
}

// --------------------------------------- AJAX functions ---------------------------------------

function getStudent(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonStudent = JSON.parse(request.responseText)
            jsonStudent['results'].forEach(student => {
                document.querySelector('#picturePS').src = "data:image/png;base64, " + student.image
                document.querySelector('#txtNamePS').value = student.first_name
                document.querySelector('#txtLastNamePS').value = student.last_name
                document.querySelector('#txtEmailPS').value = student.email
                document.querySelector('#txtUserPS').value = student.username
                document.querySelector('#txtPasswordPS').value = student.password
            })
        }
    }
    request.send(formData)
}

function updateStudent(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            makeSweetAlert('success', 'Éxito', 'Campos actualizados')
        }
    }
    request.send(formData)
}