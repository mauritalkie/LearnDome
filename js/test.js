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

function insertAdministrator(username, password, firstname, lastname, genre, birthdate, email, image){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/administratorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`insertAdministrator&username=${username}&password=${password}&firstname=${firstname}` +
        `&lastname=${lastname}&genre=${genre}&birthdate=${birthdate}&email=${email}&image=${image}`)
}

function deleteAdministrator(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/administratorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`deleteAdministrator&id=${id}`)
}

function getAdministratorUsername(username){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/administratorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getAdministratorUsername&username=${username}`)
}

function getAdministratorEmail(email){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/administratorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getAdministratorEmail&email=${email}`)
}

function loginAdministrator(username, password){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/administratorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`loginAdministrator&username=${username}&password=${password}`)
}

// instructors

function insertInstructor(username, password, firstname, lastname, genre, birthdate, email, image){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`insertInstructor&username=${username}&password=${password}&firstname=${firstname}` +
        `&lastname=${lastname}&genre=${genre}&birthdate=${birthdate}&email=${email}&image=${image}`)
}

function getInstructor(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getInstructor&id=${id}`)
}

function updateInstructor(username, password, firstname, lastname, email, image, id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`updateInstructor&username=${username}&password=${password}&firstname=${firstname}` +
        `&lastname=${lastname}&email=${email}&image=${image}&id=${id}`)
}

function deleteInstructor(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`deleteInstructor&id=${id}`)
}


function getInstructorUsername(username){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getInstructorUsername&username=${username}`)
}

function getInstructorEmail(email){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getInstructorEmail&email=${email}`)
}

function increaseCoursesNumber(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`increaseCoursesNumber&id=${id}`)
}

function decreaseCoursesNumber(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`decreaseCoursesNumber&id=${id}`)
}

function lockInstructor(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`lockInstructor&id=${id}`)
}

function unlockInstructor(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`unlockInstructor&id=${id}`)
}

function loginInstructor(username, password){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`loginInstructor&username=${username}&password=${password}`)
}

function getLockedInstructors(){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/instructorApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getLockedInstructors`)
}

// students

function insertStudent(username, password, firstname, lastname, genre, birthdate, email, image){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`insertStudent&username=${username}&password=${password}&firstname=${firstname}` +
        `&lastname=${lastname}&genre=${genre}&birthdate=${birthdate}&email=${email}&image=${image}`)
}

function getStudent(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getStudent&id=${id}`)
}

function updateStudent(username, password, firstname, lastname, email, image, id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`updateStudent&username=${username}&password=${password}&firstname=${firstname}` +
        `&lastname=${lastname}&email=${email}&image=${image}&id=${id}`)
}

function deleteStudent(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`deleteStudent&id=${id}`)
}

function getStudentUsername(username){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getStudentUsername&username=${username}`)
}

function getStudentEmail(email){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getStudentEmail&email=${email}`)
}

function lockStudent(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`lockStudent&id=${id}`)
}

function unlockStudent(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`unlockStudent&id=${id}`)
}

function loginStudent(username, password){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`loginStudent&username=${username}&password=${password}`)
}

function buyCourse(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`buyCourse&id=${id}`)
}

function completeCourse(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`completeCourse&id=${id}`)
}

function getLockedStudents(){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/studentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getLockedStudents`)
}

// courses

function insertCourse(courseName, instructorId, price, image, courseDescription){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`insertCourse&courseName=${courseName}&instructorId=${instructorId}&price=${price}` +
        `&image=${image}&courseDescription=${courseDescription}`)
}

function getCourse(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getCourse&id=${id}`)
}

function updateCourse(id, courseName, price, image, courseDescription){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`updateCourse&id=${id}&courseName=${courseName}&price=${price}&image=${image}` +
        `&courseDescription=${courseDescription}`)
}

function deleteCourse(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`deleteCourse&id=${id}`)
}

function getCoursesByInstructor(instructorId){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getCoursesByInstructor&instructorId=${instructorId}`)
}

// comments

function insertComment(studentId, courseId, commentContent){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseCommentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`insertComment&studentId=${studentId}&courseId=${courseId}` +
        `&commentContent=${commentContent}`)
}

function getComments(courseId){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseCommentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getComments&courseId=${courseId}`)
}

function deleteComment(id){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseCommentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`deleteComment&id=${id}`)
}

// messages

function insertMessage(firstUserId, secondUserId, messageContent){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/messageApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`insertMessage&firstUserId=${firstUserId}&secondUserId=${secondUserId}` +
        `&messageContent=${messageContent}`)
}

function getMesseges(firstUserId, secondUserId){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/messageApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getMesseges&firstUserId=${firstUserId}&secondUserId=${secondUserId}`)
}

// scores

function insertScore(studentId, courseId, liked){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseScoreApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`insertScore&studentId=${studentId}&courseId=${courseId}&liked=${liked}`)
}

// courses bought by students

function insertPurchaseCourseStudent(studentId, courseId){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/CourseBoughtByStudentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`insertPurchaseCourseStudent&studentId=${studentId}&courseId=${courseId}`)
}

function updateCurrentLevel(studentId, courseId, newLevel){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/CourseBoughtByStudentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`updateCurrentLevel&studentId=${studentId}&courseId=${courseId}&newLevel=${newLevel}`)
}

function setCompletedDate(studentId, courseId){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/CourseBoughtByStudentApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`setCompletedDate&studentId=${studentId}&courseId=${courseId}`)
}

// levels

function insertCourselevel(courseId, levelNumber, blockTitle){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseLevelApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`insertCourselevel&courseId=${courseId}&levelNumber=${levelNumber}
        &blockTitle=${blockTitle}`)
}

function getLevels(courseId){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseLevelApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getLevels&courseId=${courseId}`)
}

function getExistingLevel(courseId, levelNumber, blockTitle){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseLevelApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getExistingLevel&courseId=${courseId}&levelNumber=${levelNumber}` +
        `&blockTitle=${blockTitle}`)
}

// sublevels

function insertCourseSublevel(courseId, levelNumber, sublevelNumber, topicTitle, mediaFile){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseSublevelApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`insertCourseSublevel&courseId=${courseId}&levelNumber=${levelNumber}` +
        `&sublevelNumber=${sublevelNumber}&topicTitle=${topicTitle}&mediaFile=${mediaFile}`)
}

function getSublevels(courseId, levelNumber){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseSublevelApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getSublevels&courseId=${courseId}&levelNumber=${levelNumber}`)
}

function getExistingSublevel(courseId, levelNumber, sublevelNumber, topicTitle){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/courseSublevelApi.php', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            alert(request.responseText)
    }
    request.send(`getExistingSublevel&courseId=${courseId}&levelNumber=${levelNumber}` +
        `&sublevelNumber=${sublevelNumber}&topicTitle=${topicTitle}`)
}