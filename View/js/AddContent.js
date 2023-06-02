document.getElementById('sublevelSpace').style.display = "none"

let isThereVideo = false
let atLeastOneSublevel = false
let currentLevel = localStorage.getItem("currentLevelNumber")
let currentSublevel = 0

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

document.getElementById("mediaFile").addEventListener('change', (event) => {
    let image = event.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image)

    reader.addEventListener('load', (event) => {
        isThereVideo = true
    }, false)

}, false)

function displayContent(){
    let blockName = document.getElementById('txtBlockName').value
    if(blockName === ""){
        makeSweetAlert('error', 'Error', 'Se debe llenar el campo')
        return
    }

    let formData = new FormData()
    formData.append("insertCourselevel", "")
    formData.append("courseId", localStorage.getItem("currentCourseId"))
    formData.append("levelNumber", ++currentLevel)
    formData.append("blockTitle", document.querySelector('#txtBlockName').value)
    insertCourselevel(formData)
}

function nextLevel(){
    if(atLeastOneSublevel === false){
        makeSweetAlert('error', 'Error', 'Cada nivel/bloque del curso debe tener al menos un subnivel/tema')
        return
    }

    document.getElementById('txtBlockName').readOnly = false
    document.getElementById('levelButton').disabled = false

    document.getElementById('txtBlockName').value = ''
    document.getElementById('txtTopicName').value = ''

    document.getElementById("inputSpace").innerHTML = ""
    document.getElementById("inputSpace").innerHTML += `<input class="form-control mt-3" type="file" id="mediaFile">`

    document.getElementById('sublevelSpace').style.display = "none"
    currentSublevel = 0
    atLeastOneSublevel = false
}

function nextSublevel(){
    let topicName = document.getElementById('txtTopicName').value
    if(topicName === "" || isThereVideo === false){
        makeSweetAlert('error', 'Error', 'Se deben llenar todos los campos')
        return
    }
    
    let formData = new FormData()
    formData.append("insertCourseSublevel", "")
    formData.append("courseId", localStorage.getItem("currentCourseId"))
    formData.append("levelNumber", currentLevel)
    formData.append("sublevelNumber", ++currentSublevel)
    formData.append("topicTitle", document.querySelector('#txtTopicName').value)
    formData.append("mediaFile", document.querySelector('#mediaFile').files[0])
    insertCourseSublevel(formData)

    /*let formData = new FormData()
    formData.append("insertCourseSublevel", "")
    formData.append("courseId", 1)
    formData.append("levelNumber", 1)
    formData.append("sublevelNumber", 1)
    formData.append("topicTitle", 'topicos 3 xd')
    formData.append("mediaFile", 'xd 3')
    insertCourseSublevel(formData)*/
}

// --------------------------------------- AJAX functions ---------------------------------------

function insertCourselevel(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/courseLevelApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById('txtBlockName').readOnly = true
            document.getElementById('sublevelSpace').style.display = ""
            document.getElementById('levelButton').disabled = true
        }
    }
    request.send(formData)
}

function insertCourseSublevel(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/courseSublevelApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            makeSweetAlert('success', 'Hecho', 'Contenido insertado correctamente')
            atLeastOneSublevel = true
            document.getElementById('txtTopicName').value = ''
            document.getElementById("inputSpace").innerHTML = ""
            document.getElementById("inputSpace").innerHTML += `<input class="form-control mt-3" type="file" id="mediaFile">`
        }
    }
    request.send(formData)
}