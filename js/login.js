function checkData(){
    let user = document.getElementById("txtUserLogin").value
    let password = document.getElementById("txtPasswordLogin").value
    let selectedValue = document.getElementById("cbRoleLogin").value

    if(user === "" || password === ""){
        alert('Se deben llenar todos los campos')
        return
    }

    if(selectedValue === "No selection"){
        alert('Se debe seleccionar un rol de usuario')
        return
    }

    if(selectedValue === "Student"){
        window.location.href = "/LearnDome/html/index.html"
        return
    }

    if(selectedValue === "Teacher"){
        window.location.href = "/LearnDome/html/teachers/CourseManager.html"
        return
    }

    if(selectedValue === "Admin"){
        window.location.href = "/LearnDome/html/admins/CourseCommentManager.html"
        return
    }
}