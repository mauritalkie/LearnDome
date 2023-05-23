let formData = new FormData()
formData.append("getLockedStudents", "")
getLockedStudents(formData)

// --------------------------------------- AJAX functions ---------------------------------------

function unlockStudent(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let formData = new FormData()
            formData.append("getLockedStudents", "")
            getLockedStudents(formData)
        }
    }
    let formData = new FormData()
    formData.append("unlockStudent", "")
    formData.append("id", id)
    request.send(formData)
}

function getLockedStudents(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonStudents = JSON.parse(request.responseText)
            document.getElementById('lockedStudents').innerHTML = ''
            jsonStudents.forEach(student => {
                document.getElementById('lockedStudents').innerHTML += 
                `
                <tr>
                    <th scope="row">${student.id}</th>
                    <td>${student.username}</td>
                    <td><button class=" btn btn-success" id="${student.id}" onclick="unlockStudent(this.id)">Activar</button></td>
                </tr>
                `
            })
        }
    }
    request.send(formData)
}