let currentInstructorId = localStorage.getItem("globalId")

let formData = new FormData()
formData.append("getSalesReport", "")
formData.append("instructorId", currentInstructorId)
getSalesReport(formData)

// --------------------------------------- AJAX functions ---------------------------------------

function getSalesReport(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonReport = JSON.parse(request.responseText)
            jsonReport.forEach(courseInfo => {
                document.getElementById('reportContent').innerHTML += 
                `
                <tr>
                    <td>${courseInfo.course_name}</td>
                    <td>${courseInfo.students}</td>
                    <td>${courseInfo.average_seen_sublevel}</td>
                    <td>$${courseInfo.total_income}</td>
                </tr>
                `
            })
        }
    }
    request.send(formData)
}