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

// --------------------------------------- AJAX functions ---------------------------------------

function sendEmail(){
    let request = new XMLHttpRequest()
    let email = document.getElementById("txtEmailRecovery").value

    request.open('POST', '/LearnDome/ApiManager/loginApi.php', true)
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
    request.open('POST', '/LearnDome/ApiManager/administratorApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            let jsonAdmin = JSON.parse(request.responseText)
            if(jsonAdmin.length === 0){
                makeSweetAlert('error', 'Error', 'Usuario no encontrado')
                return
            }

            localStorage.setItem("globalId", jsonAdmin[0].id)
            window.location.href = "/LearnDome/html/admins/CourseCommentManager.html"
        }
    }
    request.send(formData)
}

function loginInstructor(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            let jsonInstructor = JSON.parse(request.responseText)
            if(jsonInstructor.length === 0){
                makeSweetAlert('error', 'Error', 'Usuario no encontrado')
                return
            }

            localStorage.setItem("globalId", jsonInstructor[0].id)
            window.location.href = "/LearnDome/html/teachers/CourseManager.html"
        }
    }
    request.send(formData)
}

function loginStudent(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            let jsonStudent = JSON.parse(request.responseText)
            if(jsonStudent.length === 0){
                makeSweetAlert('error', 'Error', 'Usuario no encontrado')
                return
            }

            localStorage.setItem("globalId", jsonStudent[0].id)
            window.location.href = "/LearnDome/html/index.html"
        }
    }
    request.send(formData)
}