//document.getElementById("myLink").onclick = function() {
    // do things, and then
  //  return true;
//};

//insertAdministrator('mauritalkie', 'my password', 'Mauricio', 'Guzman', 'Hombre', '2000-11-14', 'mauriciokun13@gmail.com', 'XD')
//deleteAdministrator(1);
//getAdministratorUsername('mauritalkie')
//getAdministratorEmail('mauriciokun14@gmail.com')
//loginAdministrator('mauritalkie', 'ur password')

//insertInstructor('mauritalkie', 'my password', 'Mauricio', 'Guzman', 'Hombre', '2000-11-14', 'mauriciokun13@gmail.com', 'XD')
//getInstructor(2)
//updateInstructor('mauritalkie2', 'ur password', 'Mauricio', 'Gonzalez', 'mauriciokun14@gmail.com', 'XDD', 1)
//deleteInstructor(1)
//getInstructorUsername('mauritalkie2')
//getInstructorEmail('mauriciokun14@gmail.com')
//increaseCoursesNumber(2)
//decreaseCoursesNumber(1)
//lockInstructor(1)
//unlockInstructor(1)
//loginInstructor('mauritalkie2', 'ur password')
//getLockedInstructors()

//insertStudent('gikako', 'his password', 'Gilberto', 'Casas', 'Hombre', '2000-09-10', 'gikako1@gmail.com', 'lol')
//getStudent(1)
//updateStudent('mauritalkie2', 'ur password', 'Mauricio', 'Gonzalez', 'mauriciokun14@gmail.com', 'XDD', 1)
//deleteStudent(1)
//getStudentUsername('mauritalkie')
//getStudentEmail('mauriciokun14@gmail.com')
//lockStudent(1)
//unlockStudent(1)
//loginStudent('mauritalkie2', 'ur password')
//buyCourse(1)
//completeCourse(1)
//getLockedStudents()

//insertCourse('C# programming', 1, 34.21, 'XD', 'Vas a aprender C#')
//getCourse(1)
//updateCourse(1, 'C++ programming', 50.90, 'XDD', 'No vas a aprender C#, era bait')
//deleteCourse(1)
//getCoursesByInstructor(1)

//insertComment(1, 1, 'wenas me banearon')
//getComments(1)
//deleteComment(1)

//insertMessage(1, 2, 'k bueno k bueno')
//getMesseges(1, 2)

//insertScore(1, 1, 0) // nota: para los valores booleanos es de awebo mandar un 0 o un 1, sino no jala bien

//insertPurchaseCourseStudent(1, 2)
//updateCurrentLevel(1, 2, 3)
//setCompletedDate(1, 2)

//insertCourselevel(2, 3, 'Proyectos en C#')
//getLevels(2)
//getExistingLevel(2, 4, 'another')

/*insertCourseSublevel(2, 1, 1, 'sintaxis basica', 'XD')
insertCourseSublevel(2, 1, 2, 'sentencias de control', 'XD')
insertCourseSublevel(2, 1, 3, 'arreglos', 'XD')
insertCourseSublevel(2, 2, 1, 'encapsulacion', 'XD')
insertCourseSublevel(2, 2, 2, 'herencia', 'XD')
insertCourseSublevel(2, 2, 3, 'polimorfismo', 'XD')
insertCourseSublevel(2, 3, 1, 'bases de datos', 'XD')
insertCourseSublevel(2, 3, 2, 'proyecto con unity', 'XD')
insertCourseSublevel(2, 3, 3, 'temas selectos de C#', 'XD')*/
//getSublevels(2, 3)
//getExistingSublevel(2, 3, 1, 'sintaxis basica')

// admins

function deleteAdministrator(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/administratorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getAdministratorUsername(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/administratorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getAdministratorEmail(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/administratorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}



// instructors

function getInstructor(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function updateInstructor(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function deleteInstructor(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}


function getInstructorUsername(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getInstructorEmail(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function increaseCoursesNumber(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function decreaseCoursesNumber(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function lockInstructor(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function unlockInstructor(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}



function getLockedInstructors(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

// students



function getStudent(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function updateStudent(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function deleteStudent(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getStudentUsername(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getStudentEmail(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function lockStudent(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function unlockStudent(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}



function buyCourse(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function completeCourse(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getLockedStudents(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

// courses



function getCourse(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function updateCourse(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function deleteCourse(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getCoursesByInstructor(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getCoursesByCategory(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getCoursesBySearch(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getBestScoredCourses(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getTopSoldCourses(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getMostRecentCourses(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

// comments

function insertComment(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseCommentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getComments(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseCommentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function deleteComment(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseCommentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

// messages

function insertMessage(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/messageApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getMesseges(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/messageApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

// scores

function insertScore(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseScoreApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

// courses bought by students

function insertPurchaseCourseStudent(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/CourseBoughtByStudentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function updateCurrentLevel(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/CourseBoughtByStudentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function setCompletedDate(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/CourseBoughtByStudentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

// levels

function insertCourselevel(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseLevelApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getLevels(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseLevelApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getExistingLevel(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseLevelApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

// sublevels

function insertCourseSublevel(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseSublevelApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getSublevels(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseSublevelApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getExistingSublevel(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseSublevelApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function setSeenSublevel(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseSublevelApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

// course category

function insertCourseCategory(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseCategoryApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function removeCategoryFromCourse(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseCategoryApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}

function getCategoriesFromSelectedCourse(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseCategoryApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(formData)
}