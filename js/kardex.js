let currentStudentId = localStorage.getItem("globalId")

let formDataInfo = new FormData()
formDataInfo.append("getStudentInfo", "")
formDataInfo.append("studentId", currentStudentId)
getStudentInfo(formDataInfo)

let formDataCourse = new FormData()
formDataCourse.append("getCompletedCourses", "")
formDataCourse.append("studentId", currentStudentId)
getCompletedCourses(formDataCourse)

let formDataKardex = new FormData()
formDataKardex.append("getStudentKardex", "")
formDataKardex.append("studentId", currentStudentId)
getStudentKardex(formDataKardex)

function setStatus(totalSublevels, seenSublevels){
	return totalSublevels == seenSublevels ? 'Completo' : 'Incompleto'
}

// --------------------------------------- AJAX functions ---------------------------------------

function getStudentInfo(formData){
	let request = new XMLHttpRequest();
	request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			let jsonInfo = JSON.parse(request.responseText)
			jsonInfo['results'].forEach(info => {
				document.getElementById('image').src = `data:image/png;base64, ${info.image}`
				document.getElementById('lblName').innerHTML = `Nombre: ${info.first_name} ${info.last_name}`
				document.getElementById('lblId').innerHTML = `ID: ${currentStudentId}`
				document.getElementById('lblBoughtCourses').innerHTML = `Cursos comprados: ${info.bought_courses}`
			})
		}
	}
	request.send(formData)
}

function getCompletedCourses(formData){
	let request = new XMLHttpRequest()
	request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			let jsonCourse = JSON.parse(request.responseText)
			document.getElementById('lblCompletedCourses').innerHTML = `Cursos completados: ${jsonCourse[0].completed_courses}`
		}
	}
	request.send(formData)
}

function getStudentKardex(formData){
	let request = new XMLHttpRequest()
	request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			let jsonKardex = JSON.parse(request.responseText)
			jsonKardex.forEach(row => {
				document.getElementById('kardexContent').innerHTML += 
				`
				<tr>
		            <td>${row.course_name}</td>
		            <td>${row.bought_date}</td>
		            <td>${row.total_sublevels}</td>
		            <td>${row.seen_sublevels}</td>
		            <td>${setStatus(row.total_sublevels, row.seen_sublevels)}</td>
	            </tr>
				`
			})
		}
	}
	request.send(formData)
}