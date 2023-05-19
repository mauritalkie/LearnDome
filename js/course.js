let currentStudentId = localStorage.getItem("globalId")
let selectedCourseId = localStorage.getItem("selectedCourseId")
let currentPrice;

let formDataCourse = new FormData()
formDataCourse.append("getCourse", "")
formDataCourse.append("id", selectedCourseId)
getCourse(formDataCourse)

let formDataContent = new FormData()
formDataContent.append("getLevels", "")
formDataContent.append("courseId", selectedCourseId)
getLevels(formDataContent)

let formDataGetComments = new FormData()
formDataGetComments.append("getComments", "")
formDataGetComments.append("courseId", selectedCourseId)
getComments(formDataGetComments)

let formDataFinishedCourse = new FormData()
formDataFinishedCourse.append("getCourseStatus", "")
formDataFinishedCourse.append("studentId", currentStudentId)
formDataFinishedCourse.append("courseId", selectedCourseId)
getCourseStatus(formDataFinishedCourse)

showPaypalButton()

/*document.getElementById("courseContent").innerHTML += 
`
<ul class="accordion">
          <li>
            <label for="first">What is Accordion? <span>&#x3e;</span></label>
            <input type="radio" name="accordion" id="first">
            <div class="content">
              <p> lorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsudlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxd</p>
            </div>
          </li>
          <li>
            <label for="second">How to create? <span>&#x3e;</span></label>
            <input type="radio" name="accordion" id="second">
            <div class="content">
              <p> lorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxddrem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxd</p>
            </div>
          </li>
          <li>
            <label for="third">Where to use it? <span>&#x3e;</span></label>
            <input type="radio" name="accordion" id="third">
            <div class="content">
              <video controls="controls" poster="image" preload="metadata" id="idMedia"></video>
            </div>
          </li>
        </ul>

        <ul class="accordion">
          <li>
            <label for="fourth">What is Accordion? <span>&#x3e;</span></label>
            <input type="radio" name="accordion" id="fourth">
            <div class="content">
              <p> lorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsudlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxd</p>
            </div>
          </li>
          <li>
            <label for="fifth">How to create? <span>&#x3e;</span></label>
            <input type="radio" name="accordion" id="fifth">
            <div class="content">
              <p> lorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxddrem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxdxdddxdlorem ipsum xxdxd</p>
            </div>
          </li>
          <li>
            <label for="sixth">Where to use it? <span>&#x3e;</span></label>
            <input type="radio" name="accordion" id="sixth">
            <div class="content">
              <video controls="controls" poster="image" preload="metadata" id="idMedia"></video>
            </div>
          </li>
        </ul>
`*/

function checkEmptyComment(){
    let comment = document.getElementById('txtComment').value
    if(comment === "")
        return

    let formDataComment = new FormData()
    formDataComment.append("insertComment", "")
    formDataComment.append("studentId", currentStudentId)
    formDataComment.append("courseId", selectedCourseId)
    formDataComment.append("commentContent", comment)
    insertComment(formDataComment)

    document.getElementById('txtComment').value = ""
}

function likeButtonPressed(){
    let likeButton = document.getElementById('likeButton')
    let dislikeButton = document.getElementById('dislikeButton')
    likeButton.style.backgroundColor = "darkgreen"
    dislikeButton.style.backgroundColor = "#5b5b5b"

    let formDataScore = new FormData()
    formDataScore.append("insertScore", "")
    formDataScore.append("studentId", currentStudentId)
    formDataScore.append("courseId", selectedCourseId)
    formDataScore.append("liked", 1)
    insertScore(formDataScore)
}

function dislikeButtonPressed(){
    let likeButton = document.getElementById('likeButton')
    let dislikeButton = document.getElementById('dislikeButton')
    likeButton.style.backgroundColor = "#5b5b5b"
    dislikeButton.style.backgroundColor = "darkred"

    let formDataScore = new FormData()
    formDataScore.append("insertScore", "")
    formDataScore.append("studentId", currentStudentId)
    formDataScore.append("courseId", selectedCourseId)
    formDataScore.append("liked", 0)
    insertScore(formDataScore)
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

function showPaypalButton(){
    paypal.Buttons({
        style: {
            color: 'blue',
            shape: 'pill',
            label: 'pay'
        },
        
        createOrder: function(data, actions){
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: currentPrice
                    }
                }]
            })
        },

        onApprove: function(data, actions){
            actions.order.capture().then(function(details){

                let formDataPurchase = new FormData()

                formDataPurchase.append("insertPurchaseCourseStudent", "")
                formDataPurchase.append("studentId", currentStudentId)
                formDataPurchase.append("courseId", selectedCourseId)

                insertPurchaseCourseStudent(formDataPurchase)

            })
        }

    }).render('#paypalButtonContainer')
}

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

                currentPrice = course.price
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
                formDataSublevels.append("getSublevels", "")
                formDataSublevels.append("courseId", selectedCourseId)
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

function insertPurchaseCourseStudent(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/CourseBoughtByStudentApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            makeSweetAlert('success', 'Hecho', 'Gracias por su compra')
        }
    }
    request.send(formData)
}

function insertScore(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseScoreApi.php', true)
    request.send(formData)
}

function insertComment(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseCommentApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById('courseComments').innerHTML = ''
            let formDataUpdateComments = new FormData()
            formDataUpdateComments.append("getComments", "")
            formDataUpdateComments.append("courseId", selectedCourseId)
            getComments(formDataUpdateComments)
        }
    }
    request.send(formData)
}

function getComments(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseCommentApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonComments = JSON.parse(request.responseText)
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
                    </div>
                </div>
                `
            })
        }
    }
    request.send(formData)
}

function insertSeenSublevel(sublevelId){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/seenSublevelApi.php', true)

    let formData = new FormData()
    formData.append("insertSeenSublevel", "")
    formData.append("studentId", currentStudentId)
    formData.append("courseId", selectedCourseId)
    formData.append("sublevelId", sublevelId)

    request.send(formData)
}

function getCourseStatus(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonStatus = JSON.parse(request.responseText)
            if(jsonStatus[0].is_finished == false)
                document.getElementById('getCertificateOption').style.display = 'none'
        }
    }
    request.send(formData)
}