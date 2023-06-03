let selectedCourseId = localStorage.getItem("selectedCourseId")
let isTherePicture = false
let lastLevelNumber = 0

let formDataCourse = new FormData()
formDataCourse.append("getCourse", "")
formDataCourse.append("id", selectedCourseId)
getCourse(formDataCourse)

let formDataContent = new FormData()
formDataContent.append("getAllLevels", "")
formDataContent.append("courseId", selectedCourseId)
getAllLevels(formDataContent)

let formData = new FormData()
formData.append("getCourseReport", "")
formData.append("courseId", selectedCourseId)
getCourseReport(formData)

function setCourseDetails(){
    localStorage.setItem("currentCourseId", selectedCourseId)
    localStorage.setItem("currentLevelNumber", lastLevelNumber)
}

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

document.getElementById("courseFile").addEventListener('change', (event) => {
    let image = event.target.files[0]
    let reader = new FileReader()

    reader.addEventListener('load', (event) => {

        isTherePicture = true

    }, false)

    reader.readAsDataURL(image)
}, false)

function filledFields(name, description, price){
    return(name === "" || description === "" || price === "" || isTherePicture === false)
}

function rightPrice(price){
    let dots = 0
    for(i=0; i<price.length; i++){
        if(price.charAt(i) == '.'){
            dots++
        }
    }
    
    if(dots > 1){
        return false
    }

    for(i=0; i<price.length; i++){
        if((price.charAt(i) == '.') || price.charAt(i) >= '0' && price.charAt(i) <= '9'){

        }
        else{
            return false
        }
    }

    let number = parseFloat(price)
    if(number <= 0.0){
        return false
    }
    
    return true
}

function checkData(){
    let name = document.getElementById("txtNameAC").value
    let description = document.getElementById("txtDescriptionAC").value
    let price = document.getElementById("txtPriceAC").value

    let areFieldsEmpty = filledFields(name, description, price)
    if(areFieldsEmpty){
        makeSweetAlert('error', 'Error', 'Se deben llenar todos los campos')
        return
    }

    let isRightPrice = rightPrice(price)
    if(!isRightPrice){
        makeSweetAlert('error', 'Error', 'El precio no es válido')
        return
    }

    let formDataUpdate = new FormData()
    formDataUpdate.append("updateCourse", "")
    formDataUpdate.append("id", selectedCourseId)
    formDataUpdate.append("courseName", name)
    formDataUpdate.append("price", price)
    formDataUpdate.append("courseDescription", description)
    formDataUpdate.append("image", document.querySelector('#courseFile').files[0])
    updateCourse(formDataUpdate)
}

// --------------------------------------- AJAX functions ---------------------------------------

function getCourseReport(formData){
	let request = new XMLHttpRequest()
	request.open('POST', '/LearnDome/Controller/instructorApi.php', true)
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			let jsonReport = JSON.parse(request.responseText)
			jsonReport.forEach(student => {
				document.getElementById('reportContent').innerHTML += 
				`
				<tr>
	                <td>${student.first_name} ${student.last_name}</td>
	                <td>${student.bought_date}</td>
	                <td>${student.seen_sublevels}</td>
	                <td>$${student.price}</td>
	                <td>Paypal</td>
                </tr>
				`
			})
		}
	}
	request.send(formData)
}

function getCourse(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonCourse = JSON.parse(request.responseText)
            jsonCourse['results'].forEach(course => {
                document.getElementById('courseTitle').innerHTML = course.course_name
                document.getElementById('courseImage').src = "data:image/png;base64, " +  course.image
                document.getElementById('courseTeacher').innerHTML = `Instructor del curso: ${course.first_name} ${course.last_name}`
                document.getElementById('courseScore').innerHTML = `Calificación: ${course.score}`
                document.getElementById('courseDate').innerHTML = `Fecha de alta: ${course.created_at.substr(0, 10)}`
                document.getElementById('coursePrice').innerHTML = `Precio: $${course.price}`
                document.getElementById('courseDescription').innerHTML = `Descripción del curso: ${course.course_description}`

                if(course.score < 0){
                    document.getElementById('courseScore').innerHTML = "Calificación: Sin calificación"
                }
                if(course.is_active == 0){
                    document.getElementById('btnUpdateCourse').style.display = 'none'
                    document.getElementById('btnAddContent').style.display = 'none'
                    document.getElementById('btnDeleteCourse').style.display = 'none'

                    document.getElementById('courseData').innerHTML += 
                    `
                    <div id="btnDeleteCourse" class="d-flex justify-content-center mt-3">
                        <h5 class="text-white mt-1">Este curso se ha dado de baja</h5>
                    </div>
                    `
                }

            })
        }
    }
    request.send(formData)
}

function getAllLevels(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/courseLevelApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonLevels = JSON.parse(request.responseText)
            //document.getElementById("courseContent").innerHTML = ''

            jsonLevels.forEach(level => {
                /*document.getElementById("courseContent").innerHTML += 
                `
                <div id="level${level.level_number}">
                    <h2 class="text-white">Nivel ${level.level_number}: ${level.block_title}</h2>
                </div>
                `*/

                document.getElementById("courseContent").innerHTML += 
                `
                <div id="level${level.level_number}">
                    <h2 class="text-white">Nivel ${level.level_number}: ${level.block_title}</h2>
                    <ul class="accordion" id="AccordionLevel${level.level_number}"></ul>
                </div>
                `
                let formDataSublevels = new FormData()
                formDataSublevels.append("getAllSublevels", "")
                formDataSublevels.append("courseId", selectedCourseId)
                formDataSublevels.append("levelNumber", level.level_number)
                getAllSublevels(formDataSublevels, level.level_number)

                lastLevelNumber = level.level_number
            })
        }
    }
    request.send(formData)
}

function getAllSublevels(formData, levelNumber){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/courseSublevelApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonSublevels = JSON.parse(request.responseText)

            jsonSublevels['results'].forEach(sublevel => {
                /*document.getElementById(`level${levelNumber}`).innerHTML += 
                `
                <div>
                    <h5>Subnivel ${sublevel.sublevel_number}: ${sublevel.topic_title}</h5>
                </div>
                `*/

                document.getElementById(`AccordionLevel${levelNumber}`).innerHTML += 
                `
                <li>
                    <label for="Level${levelNumber}Sublevel${sublevel.sublevel_number}">Subnivel ${sublevel.sublevel_number}: ${sublevel.topic_title} <span>&#x3e;</span></label>
                    <input type="radio" name="accordion" id="Level${levelNumber}Sublevel${sublevel.sublevel_number}">
                    <div class="content d-flex justify-content-center">
                        <video class="sizeVideo" controls="controls" poster="image" preload="metadata" src="data:video/mp4;base64, ${sublevel.media_file}" id="${sublevel.id}" onplay="insertSeenSublevel(this.id)"></video>
                    </div>
                </li>
                `
            })
        }
    }
    request.send(formData)
}

function updateCourse(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            location.reload()
        }
    }
    request.send(formData)
}

function deleteCourse(){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/Controller/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            location.reload()
        }
    }
    let formData = new FormData()
    formData.append("deleteCourse", "")
    formData.append("id", selectedCourseId)
    request.send(formData)
}