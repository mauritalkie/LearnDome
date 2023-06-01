let selectedCourseId = localStorage.getItem("selectedCourseId")

let formData = new FormData()
formData.append("getCourseReport", "")
formData.append("courseId", selectedCourseId)
getCourseReport(formData)

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