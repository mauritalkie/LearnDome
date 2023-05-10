let formDataBestScoredCourses = new FormData()
let formDataTopSoldCourses = new FormData()
let formDataMostRecentCourses = new FormData()

formDataBestScoredCourses.append("getBestScoredCourses", "")
formDataTopSoldCourses.append("getTopSoldCourses", "")
formDataMostRecentCourses.append("getMostRecentCourses", "")

getBestScoredCourses(formDataBestScoredCourses)
getTopSoldCourses(formDataTopSoldCourses)
getMostRecentCourses(formDataMostRecentCourses)

function setSelectedCourseId(id){
    localStorage.setItem("selectedCourseId", id)
}

// --------------------------------------- AJAX functions ---------------------------------------

function getBestScoredCourses(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonCourse = JSON.parse(request.responseText)
            jsonCourse['results'].forEach(course => {
                document.getElementById('BestScoredCourses').innerHTML += 
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

function getTopSoldCourses(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonCourse = JSON.parse(request.responseText)
            jsonCourse['results'].forEach(course => {
                document.getElementById('TopSoldCourses').innerHTML += 
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

function getMostRecentCourses(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonCourse = JSON.parse(request.responseText)
            jsonCourse['results'].forEach(course => {
                document.getElementById('MostRecentCourses').innerHTML += 
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