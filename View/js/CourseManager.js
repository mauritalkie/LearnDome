let currentInstructorId = localStorage.getItem("globalId")
let selectedCourseId = localStorage.getItem("selectedCourseId")

let formData = new FormData()
formData.append("getCoursesByInstructor", "")
formData.append("instructorId", currentInstructorId)
getCoursesByInstructor(formData)

function setSelectedCourseId(id){
    localStorage.setItem("selectedCourseId", id)
}

// --------------------------------------- AJAX functions ---------------------------------------

function getCoursesByInstructor(formData){
	let request = new XMLHttpRequest()
	request.open('POST', '/LearnDome/Controller/courseApi.php', true)
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			let jsonCourse = JSON.parse(request.responseText)
			jsonCourse['results'].forEach(course => {
				document.getElementById('coursesByInstructor').innerHTML += 
				`
				<div class="col-12 col-sm-6 col-md-6 col-lg-3">
		          <div class="card bg-dark">
		            <img src="data:image/png;base64, ${course.image}" class="card-img-top">
		            <div class="card-body">
		              <h5 class="card-title text-light">${course.course_name}</h5>
		              <p class="card-text text-light">${course.course_description}</p>
		              <a href="/LearnDome/View/html/teachers/CourseDetails.html" class="btn btn-danger" id="${course.id}" onclick="setSelectedCourseId(this.id)">Detalles</a>
		            </div>
		          </div>
        		</div>
				`
			})
		}
	}
	request.send(formData)
}