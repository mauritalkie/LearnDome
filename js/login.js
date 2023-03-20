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