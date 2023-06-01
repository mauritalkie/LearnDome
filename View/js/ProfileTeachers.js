let currentInstructorId = localStorage.getItem("globalId")
let formData = new FormData()
formData.append("getInstructor", "")
formData.append("id", currentInstructorId)
getInstructor(formData)

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

document.getElementById("filePT").addEventListener('change', (event) => {
    let image = event.target.files[0]
    let reader = new FileReader()

    reader.addEventListener('load', (event) => {
        let imageSource = event.target.result
        let previewImage = document.getElementById("picturePT")

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
    let name = document.getElementById("txtNamePT").value
    let lastName = document.getElementById("txtLastNamePT").value
    let email = document.getElementById("txtEmailPT").value
    let user = document.getElementById("txtUserPT").value
    let password = document.getElementById("txtPasswordPT").value

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
    formData.append("updateInstructor", "")
    formData.append("username", document.querySelector('#txtUserPT').value)
    formData.append("password", document.querySelector('#txtPasswordPT').value)
    formData.append("firstname", document.querySelector('#txtNamePT').value)
    formData.append("lastname", document.querySelector('#txtLastNamePT').value)
    formData.append("email", document.querySelector('#txtEmailPT').value)
    formData.append("image", document.querySelector('#filePT').files[0])
    formData.append("id", currentInstructorId)
    updateInstructor(formData)
}

// --------------------------------------- AJAX functions ---------------------------------------

function getInstructor(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/instructorApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonInstructor = JSON.parse(request.responseText)
            jsonInstructor['results'].forEach(instructor => {
                document.querySelector('#lblInstructorScore').innerHTML = `Calificación como instructor: ${instructor.score}`
                document.querySelector('#picturePT').src = "data:image/png;base64, " + instructor.image
                document.querySelector('#txtNamePT').value = instructor.first_name
                document.querySelector('#txtLastNamePT').value = instructor.last_name
                document.querySelector('#txtEmailPT').value = instructor.email
                document.querySelector('#txtUserPT').value = instructor.username
                document.querySelector('#txtPasswordPT').value = instructor.password

                if(instructor.score == -1){
                    document.querySelector('#lblInstructorScore').innerHTML = "Calificación como instructor: Sin calificación"
                }
            })
        }
    }
    request.send(formData)
}

function updateInstructor(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/instructorApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            makeSweetAlert('success', 'Éxito', 'Campos actualizados')
        }
    }
    request.send(formData)
}