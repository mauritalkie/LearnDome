getFilteredCourses()

function dateToDatetime(date, hour){
    const splittedDate = date.split('-')
    let datetime = `${splittedDate[0]}-${splittedDate[1]}-${splittedDate[2]} ${hour}`
    return datetime
}

function getFilteredCourses(){
    let filterType = localStorage.getItem("filterType")
    
    if(filterType === "ByCategory"){
        let categoryId = localStorage.getItem("categoryId")
        let formData = new FormData()

        formData.append("getCoursesByCategory", "")
        formData.append("id", categoryId)

        getCoursesByCategory(formData)
    }
    else if(filterType === "ByInstructor"){
        let selectedInstructor = localStorage.getItem("selectedInstructor")
        let formData = new FormData()

        formData.append("getCoursesByInstructorName", "")
        formData.append("completeName", selectedInstructor)

        getCoursesByInstructorName(formData)
    }
    else if(filterType === "ByDateRange"){
        let firstDate = dateToDatetime(localStorage.getItem("firstDate"), '00:00:00')
        let lastDate = dateToDatetime(localStorage.getItem("lastDate"), '23:59:59')
        let formData = new FormData()

        formData.append("getCoursesByDateRange", "")
        formData.append("firstDate", firstDate)
        formData.append("lastDate", lastDate)

        getCoursesByDateRange(formData)
    }
    else{
        let courseName = localStorage.getItem("courseSearch")
        let formData = new FormData()

        formData.append("getCoursesBySearch", "")
        formData.append("courseSearch", courseName)

        getCoursesBySearch(formData)
    }
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

/*function selectedCategory(){
    let selectedCategory = document.getElementById('cbCategoriesModal').value
    if(selectedCategory === "No selection"){
        makeSweetAlert('error', 'Error', 'Se debe seleccionar una categoría')
        return
    }
    window.location.href = "/LearnDome/html/students/FilteredCourses.html"
}

function selectedInstructor(){
    let selectedInstructor = document.getElementById('txtFilterInstructor').value
    if(selectedInstructor === ""){
        makeSweetAlert('error', 'Error', 'Se debe llenar el campo')
        return
    }
    window.location.href = "/LearnDome/html/students/FilteredCourses.html"
}

function selectedDates(){
    let firstDate = document.getElementById('firstDate').value
    let lastDate = document.getElementById('lastDate').value

    if(firstDate === "" || lastDate === ""){
        makeSweetAlert('error', 'Error', 'Se deben llenar todos los campos')
        return
    }

    const splittedFirstDate = firstDate.split('-')
    const splittedLastDate = lastDate.split('-')

    let firstDateBasedOnString = new Date(splittedFirstDate[0], splittedFirstDate[1] - 1, splittedFirstDate[2])
    let lastDateBasedOnString = new Date(splittedLastDate[0], splittedLastDate[1] - 1, splittedLastDate[2])

    if(firstDateBasedOnString > lastDateBasedOnString){
        makeSweetAlert('error', 'Error', 'La primera fecha no debe ser mayor a la última fecha')
        return
    }

    window.location.href = "/LearnDome/html/students/FilteredCourses.html"
}*/

function setSelectedCourseId(id){
    localStorage.setItem("selectedCourseId", id)
}

// --------------------------------------- AJAX functions ---------------------------------------

function getCoursesByCategory(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonCourse = JSON.parse(request.responseText)
            jsonCourse['results'].forEach(course => {
                document.getElementById('filteredCourses').innerHTML += 
                `
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-2">
                    <div class="card bg-dark">
                        <img src="data:image/png;base64, ${course.image}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title text-light">${course.course_name}</h5>
                            <p class="card-text text-light">${course.course_description}</p>
                            <a href="/LearnDome/html/students/course.html" class="btn btn-outline-danger" id="${course.id}" onclick="setSelectedCourseId(this.id)">Iniciar</a>
                        </div>
                    </div>
                </div>
                `
            })
        }
    }
    request.send(formData)
}

function getCoursesByInstructorName(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonCourse = JSON.parse(request.responseText)
            jsonCourse['results'].forEach(course => {
                document.getElementById('filteredCourses').innerHTML += 
                `
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-2">
                    <div class="card bg-dark">
                        <img src="data:image/png;base64, ${course.image}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title text-light">${course.course_name}</h5>
                            <p class="card-text text-light">${course.course_description}</p>
                            <a href="/LearnDome/html/students/course.html" class="btn btn-outline-danger" id="${course.id}" onclick="setSelectedCourseId(this.id)">Iniciar</a>
                        </div>
                    </div>
                </div>
                `
            })
        }
    }
    request.send(formData)
}

function getCoursesByDateRange(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonCourse = JSON.parse(request.responseText)
            jsonCourse['results'].forEach(course => {
                document.getElementById('filteredCourses').innerHTML += 
                `
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-2">
                    <div class="card bg-dark">
                        <img src="data:image/png;base64, ${course.image}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title text-light">${course.course_name}</h5>
                            <p class="card-text text-light">${course.course_description}</p>
                            <a href="/LearnDome/html/students/course.html" class="btn btn-outline-danger" id="${course.id}" onclick="setSelectedCourseId(this.id)">Iniciar</a>
                        </div>
                    </div>
                </div>
                `
            })
        }
    }
    request.send(formData)
}

function getCoursesBySearch(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonCourse = JSON.parse(request.responseText)
            jsonCourse['results'].forEach(course => {
                document.getElementById('filteredCourses').innerHTML += 
                `
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-2">
                    <div class="card bg-dark">
                        <img src="data:image/png;base64, ${course.image}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title text-light">${course.course_name}</h5>
                            <p class="card-text text-light">${course.course_description}</p>
                            <a href="/LearnDome/html/students/course.html" class="btn btn-outline-danger" id="${course.id}" onclick="setSelectedCourseId(this.id)">Iniciar</a>
                        </div>
                    </div>
                </div>
                `
            })
        }
    }
    request.send(formData)
}