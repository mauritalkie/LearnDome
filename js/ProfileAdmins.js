let currentAdministratorId = localStorage.getItem("globalId")
let formData = new FormData();
formData.append("getAdministrator", "")
formData.append("id", currentAdministratorId)

getAdministrator(formData)

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

document.getElementById("filePA").addEventListener('change', (event) => {
    let image = event.target.files[0]
    let reader = new FileReader()

    reader.addEventListener('load', (event) => {
        let imageSource = event.target.result
        let previewImage = document.getElementById("picturePA")

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
    let name = document.getElementById("txtNamePA").value
    let lastName = document.getElementById("txtLastNamePA").value
    let email = document.getElementById("txtEmailPA").value
    let user = document.getElementById("txtUserPA").value
    let password = document.getElementById("txtPasswordPA").value

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
    formData.append("updateAdministrator", "")
    formData.append("username", document.getElementById("txtUserPA").value)
    formData.append("password", document.getElementById("txtPasswordPA").value)
    formData.append("firstname", document.getElementById("txtNamePA").value)
    formData.append("lastname", document.getElementById("txtLastNamePA").value)
    formData.append("email", document.getElementById("txtEmailPA").value)
    formData.append("image", document.getElementById("filePA").files[0])
    formData.append("id", currentAdministratorId)
    updateAdministrator(formData)
}

// --------------------------------------- AJAX functions ---------------------------------------

function getAdministrator(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/administratorApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonAdmin = JSON.parse(request.responseText)
            jsonAdmin['results'].forEach(admin => {
                document.querySelector('#picturePA').src = "data:image/png;base64, " + admin.image
                document.querySelector('#txtNamePA').value = admin.first_name
                document.querySelector('#txtLastNamePA').value = admin.last_name
                document.querySelector('#txtEmailPA').value = admin.email
                document.querySelector('#txtUserPA').value = admin.username
                document.querySelector('#txtPasswordPA').value = admin.password
            })
        }
    }
    request.send(formData)
}

function updateAdministrator(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/administratorApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            makeSweetAlert('success', 'Éxito', 'Campos actualizados')
        }
    }
    request.send(formData)
}