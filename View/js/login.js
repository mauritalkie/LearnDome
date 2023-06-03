let instructorAttemps = 0, studentAttemps = 0
let pastInstructorUsername = '', pastStudentUsername = ''

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

function redirectPage(role){
    if(role === "Student"){
        let formData = new FormData();
        formData.append("loginStudent", "")
        formData.append("username", document.querySelector('#txtUserLogin').value)
        formData.append("password", document.querySelector('#txtPasswordLogin').value)
        loginStudent(formData)
    }

    if(role === "Teacher"){
        let formData = new FormData();
        formData.append("loginInstructor", "")
        formData.append("username", document.querySelector('#txtUserLogin').value)
        formData.append("password", document.querySelector('#txtPasswordLogin').value)
        loginInstructor(formData)
    }

    if(role === "Admin"){
        let formData = new FormData();
        formData.append("loginAdministrator", "")
        formData.append("username", document.querySelector('#txtUserLogin').value)
        formData.append("password", document.querySelector('#txtPasswordLogin').value)
        loginAdministrator(formData)
    }
}

function checkData(){
    let user = document.getElementById("txtUserLogin").value
    let password = document.getElementById("txtPasswordLogin").value
    let selectedRole = document.getElementById("cbRoleLogin").value

    if(user === "" || password === ""){
        makeSweetAlert('error', 'Error', 'Se deben llenar todos los campos')
        return
    }

    if(selectedRole === "No selection"){
        makeSweetAlert('error', 'Error', 'Se debe seleccionar un rol de usuario')
        return
    }

    redirectPage(selectedRole)
}

function resetAttemps(){
    instructorAttemps = 0
    studentAttemps = 0
}

// --------------------------------------- AJAX functions ---------------------------------------

function sendEmail(){
    let request = new XMLHttpRequest()
    let email = document.getElementById("txtEmailRecovery").value

    request.open('POST', '/LearnDome/Controller/loginApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let result = request.responseText
            if(result == 'sent') makeSweetAlert('success', 'Éxito', 'Correo enviado')
            else makeSweetAlert('error', 'Error', 'El correo no está registrado')
        }
    }
    request.send(`recoveryPassword&email=${email}`)
}

function loginAdministrator(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/administratorApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            let jsonAdmin = JSON.parse(request.responseText)
            if(jsonAdmin.length === 0){
                makeSweetAlert('error', 'Error', 'Usuario no encontrado')
                return
            }

            localStorage.setItem("globalId", jsonAdmin[0].id)
            localStorage.setItem("messageId", jsonAdmin[0].id_for_message)
            window.location.href = "/LearnDome/View/html/admins/CourseCommentManager.html"
        }
    }
    request.send(formData)
}

function loginInstructor(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/instructorApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            let jsonInstructor = JSON.parse(request.responseText)
            if(jsonInstructor.length !== 0){
                let unlocked = jsonInstructor[0].unlocked
                if(!unlocked){
                    makeSweetAlert('warning', 'Advertencia', 'No es posible acceder porque este usuario está bloqueado, favor de contactar a un administrador')
                    return
                }
            }

            if(jsonInstructor.length === 0){
                let formDataUsername = new FormData()
                formDataUsername.append("getInstructorUsername", "")
                formDataUsername.append("username", document.querySelector('#txtUserLogin').value)
                getInstructorUsername(formDataUsername)
                return
            }

            localStorage.setItem("globalId", jsonInstructor[0].id)
            localStorage.setItem("messageId", jsonInstructor[0].id_for_message)
            window.location.href = "/LearnDome/View/html/teachers/CourseManager.html"
        }
    }
    request.send(formData)
}

function loginStudent(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/studentApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            let jsonStudent = JSON.parse(request.responseText)
            if(jsonStudent.length !== 0){
                let unlocked = jsonStudent[0].unlocked
                if(!unlocked){
                    makeSweetAlert('warning', 'Advertencia', 'No es posible acceder porque este usuario está bloqueado, favor de contactar a un administrador')
                    return
                }
            }

            if(jsonStudent.length === 0){
                let formDataUsername = new FormData()
                formDataUsername.append("getStudentUsername", "")
                formDataUsername.append("username", document.querySelector('#txtUserLogin').value)
                getStudentUsername(formDataUsername)
                return
            }

            localStorage.setItem("globalId", jsonStudent[0].id)
            localStorage.setItem("messageId", jsonStudent[0].id_for_message)
            window.location.href = "/LearnDome/View/html/students/MainStudentsPage.html"
        }
    }
    request.send(formData)
}

function lockInstructor(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/instructorApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            resetAttemps()
            makeSweetAlert('warning', 'Usuario bloqueado', 'Este usuario ha sido bloqueado, favor de contactar con un administrador')
        }
    }
    request.send(formData)
}

function getInstructorUsername(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/instructorApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonInstructor = JSON.parse(request.responseText)
            if(jsonInstructor.length === 0){
                resetAttemps()
                makeSweetAlert('error', 'Error', 'Usuario no encontrado')
                return
            }

            let unlocked = jsonInstructor[0].unlocked
            if(!unlocked){
                makeSweetAlert('warning', 'Advertencia', 'No es posible acceder porque este usuario está bloqueado, favor de contactar a un administrador')
                return
            }

            let username = document.querySelector('#txtUserLogin').value
            if(username !== pastInstructorUsername){
                resetAttemps()
            }
            pastInstructorUsername = jsonInstructor[0].username

            instructorAttemps++
            if(instructorAttemps < 3){
                makeSweetAlert('error', 'Error', `Contraseña incorrecta, le quedan ${3 - instructorAttemps} intentos`)
                return
            }

            let formDataLock = new FormData()
            formDataLock.append("lockInstructor", "")
            formDataLock.append("id", jsonInstructor[0].id)
            lockInstructor(formDataLock)
        }
    }
    request.send(formData)
}

function lockStudent(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/studentApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            resetAttemps()
            makeSweetAlert('warning', 'Usuario bloqueado', 'Este usuario ha sido bloqueado, favor de contactar con un administrador')
        }
    }
    request.send(formData)
}

function getStudentUsername(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/studentApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonStudent = JSON.parse(request.responseText)
            if(jsonStudent.length === 0){
                resetAttemps()
                makeSweetAlert('error', 'Error', 'Usuario no encontrado')
                return
            }

            let unlocked = jsonStudent[0].unlocked
            if(!unlocked){
                makeSweetAlert('warning', 'Advertencia', 'No es posible acceder porque este usuario está bloqueado, favor de contactar a un administrador')
                return
            }

            let username = document.querySelector('#txtUserLogin').value
            if(username !== pastStudentUsername){
                resetAttemps()
            }
            pastStudentUsername = jsonStudent[0].username

            studentAttemps++
            if(studentAttemps < 3){
                makeSweetAlert('error', 'Error', `Contraseña incorrecta, le quedan ${3 - studentAttemps} intentos`)
                return
            }

            let formDataLock = new FormData()
            formDataLock.append("lockStudent", "")
            formDataLock.append("id", jsonStudent[0].id)
            lockStudent(formDataLock)
        }
    }
    request.send(formData)
}