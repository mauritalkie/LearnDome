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
        alert("El nombre no es válido")
        return false
    }

    let isRightLastName = rightName(lastName)
    if(!isRightLastName){
        alert("El apellido no es válido")
        return false
    }

    let isRightEmail = rightEmail(email)
    if(!isRightEmail){
        alert("El correo electrónico no es válido")
        return false
    }

    let isRightPassword = rightPassword(password)
    if(!isRightPassword){
        alert("La contraseña debe de tener al menos una letra minúscula, una letra mayúscula, un número, un símbolo especial y al menos 8 caracteres")
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
         alert("Se deben llenar todos los campos")
         return
     }

    let areFieldsRight = rightFields(name, lastName, email, user, password)
    if(!areFieldsRight){
        return
    }

    alert("Campos actualizados")
}