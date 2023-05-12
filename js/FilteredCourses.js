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

function selectedCategory(){
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
}
