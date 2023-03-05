let isTherePicture = false

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

    let isRightDate = rightDate(selectedDate)
    if(!isRightDate){
        alert("La fecha de nacimiento debe suceder antes del día actual")
        return false
    }

    return true
}

function redirectPage(role){
    if(role === "Student"){
        window.location.href = "/LearnDome/html/index.html"
        return
    }

    if(role === "Teacher"){
        window.location.href = "/LearnDome/html/teachers/CourseManager.html"
        return
    }

    if(role === "Admin"){
        window.location.href = "/LearnDome/html/admins/CourseCommentManager.html"
        return
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
         alert("Se deben llenar todos los campos")
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