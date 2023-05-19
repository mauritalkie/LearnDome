let currentStudentId = localStorage.getItem("globalId")
let selectedCourseId = localStorage.getItem("selectedCourseId")

console.log('hii there')

let formData = new FormData()
formData.append("getCourseCertificate", "")
formData.append("studentId", currentStudentId)
formData.append("courseId", selectedCourseId)
getCourseCertificate(formData)

// --------------------------------------- AJAX functions ---------------------------------------

function getCourseCertificate(formData){
	let request = new XMLHttpRequest()
	request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			let jsonCertificate = JSON.parse(request.responseText)
			document.querySelector('#student').innerHTML = `${jsonCertificate[0].first_name} ${jsonCertificate[0].last_name}`
			document.querySelector('#course').innerHTML = jsonCertificate[0].course_name
			document.querySelector('#date').innerHTML = jsonCertificate[0].completed_date
		}
	}
	request.send(formData)
}