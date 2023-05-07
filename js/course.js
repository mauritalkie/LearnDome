let formDataCourse = new FormData()
formDataCourse.append("getCourse", "")
formDataCourse.append("id", 1)
getCourse(formDataCourse)

let formDataContent = new FormData()
formDataContent.append("getLevels", "")
formDataContent.append("courseId", 1)
getLevels(formDataContent)

// --------------------------------------- AJAX functions ---------------------------------------

function getCourse(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonCourse = JSON.parse(request.responseText)
            jsonCourse['results'].forEach(course => {
                document.getElementById('courseTitle').innerHTML = course.course_name
                document.getElementById('courseImage').src = "data:image/png;base64, " +  course.image
                document.getElementById('courseTeacher').innerHTML = `Instructor del curso: ${course.first_name} ${course.last_name}`
                document.getElementById('courseScore').innerHTML = `Calificación: ${course.score}`
                document.getElementById('courseDate').innerHTML = `Fecha de subida: ${course.created_at}`
                document.getElementById('coursePrice').innerHTML = `Precio: ${course.price}`
                document.getElementById('courseDescription').innerHTML = `Descripción del curso: ${course.course_description}`

                if(course.score < 0){
                    document.getElementById('courseScore').innerHTML = "Calificación: Sin calificación"
                }
            })
        }
    }
    request.send(formData)
}

function getLevels(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseLevelApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonLevels = JSON.parse(request.responseText)
            //document.getElementById("courseContent").innerHTML = ''

            jsonLevels.forEach(level => {
                document.getElementById("courseContent").innerHTML += 
                `
                <div id="level${level.level_number}">
                    <h2 class="text-white">Nivel ${level.level_number}: ${level.block_title}</h2>
                </div>
                `

                let formDataSublevels = new FormData()
                formDataSublevels.append("getSublevels", "")
                formDataSublevels.append("courseId", 1)
                formDataSublevels.append("levelNumber", level.level_number)
                getSublevels(formDataSublevels, level.level_number)
            })
        }
    }
    request.send(formData)
}

function getSublevels(formData, levelNumber){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseSublevelApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonSublevels = JSON.parse(request.responseText)

            jsonSublevels['results'].forEach(sublevel => {
                document.getElementById(`level${levelNumber}`).innerHTML += 
                `
                <div>
                    <h5 class="text-white">Subnivel ${sublevel.sublevel_number}: ${sublevel.topic_title}</h5>
                </div>
                `
            })
        }
    }
    request.send(formData)
}