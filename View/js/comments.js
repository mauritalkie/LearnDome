let selectedCourseId = localStorage.getItem("selectedCourseId")

let formDataCourse = new FormData()
formDataCourse.append("getCourse", "")
formDataCourse.append("id", selectedCourseId)
getCourse(formDataCourse)

let formDataGetComments = new FormData()
formDataGetComments.append("getComments", "")
formDataGetComments.append("courseId", selectedCourseId)
getComments(formDataGetComments)

// --------------------------------------- AJAX functions ---------------------------------------

function getCourse(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonCourse = JSON.parse(request.responseText)
            jsonCourse['results'].forEach(course => {
                document.getElementById('courseTitle').innerHTML = `Nombre del curso: ${course.course_name}`
                document.getElementById('courseTeacher').innerHTML = `Instructor del curso: ${course.first_name} ${course.last_name}`
                document.getElementById('coursePrice').innerHTML = `Precio: $${course.price}`
                document.getElementById('courseDescription').innerHTML = `Descripción del curso: ${course.course_description}`
            })
        }
    }
    request.send(formData)
}

function getComments(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/courseCommentApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonComments = JSON.parse(request.responseText)
            document.getElementById('courseComments').innerHTML = ""
            jsonComments.forEach(comment => {
                document.getElementById('courseComments').innerHTML += 
                `
                <div>
                    <div class="d-flex">
                        <h6 class="commentUser">${comment.username}</h6>
                        <div class="alignRight">
                            <h6>${comment.commented_at}</h6>
                        </div>
                    </div>
                    <div class="p-1 mb-3 bg-secondary rounded">
                        <p>${comment.comment_content}</p>
                        <a class="text-decoration-none text-white comment" id="${comment.id}" onclick="deleteComment(this.id)">Eliminar comentario</a>
                    </div>
                </div>
                `
            })
        }
    }
    request.send(formData)
}

function deleteComment(id){
	console.log(id)
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/courseCommentApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
        	let formDataGetComments = new FormData()
			formDataGetComments.append("getComments", "")
			formDataGetComments.append("courseId", selectedCourseId)
			getComments(formDataGetComments)
        }
    }

    let formData = new FormData()
    formData.append("deleteComment", "")
    formData.append("id", id)

    request.send(formData)
}