let formData = new FormData()
formData.append("getLockedInstructors", "")
getLockedInstructors(formData)

// --------------------------------------- AJAX functions ---------------------------------------

function unlockInstructor(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let formData = new FormData()
            formData.append("getLockedInstructors", "")
            getLockedInstructors(formData)
        }
    }
    let formData = new FormData()
    formData.append("unlockInstructor", "")
    formData.append("id", id)
    request.send(formData)
}

function getLockedInstructors(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonInstructors = JSON.parse(request.responseText)
            document.getElementById('lockedInstructors').innerHTML = ''
            jsonInstructors.forEach(instructor => {
                document.getElementById('lockedInstructors').innerHTML += 
                `
                <tr>
                    <th scope="row">${instructor.id}</th>
                    <td>${instructor.username}</td>
                    <td><button class=" btn btn-success" id="${instructor.id}" onclick="unlockInstructor(this.id)">Activar</button></td>
                </tr>
                `
            })
        }
    }
    request.send(formData)
}