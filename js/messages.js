let currentMessageId = localStorage.getItem("messageId")
let otherUserId
let update = false
document.getElementById('txtMessage').style.display = 'none'
document.getElementById('btnMessage').style.display = 'none'

setInterval(function(){
    if(update == true){
        let formData = new FormData()
        formData.append("getMesseges", "")
        formData.append("firstUserId", currentMessageId)
        formData.append("secondUserId", otherUserId)
        formData.append("userWhoSentId", currentMessageId)
        getMesseges(formData)
    }
    else{
        console.log('no hace nada equisde')
    }
}, 500)

function lookUser(){
    let username = document.getElementById('txtLookUser').value
    if(username === ""){
        return
    }

    let formData = new FormData()
    formData.append("getUserByUsername", "")
    formData.append("username", username)
    getUserByUsername(formData)
}

function sendMessage(){
    let messageContent = document.getElementById('txtMessage').value
    if(messageContent === ""){
        return
    }

    let formData = new FormData()
    formData.append("insertMessage", "")
    formData.append("firstUserId", currentMessageId)
    formData.append("secondUserId", otherUserId)
    formData.append("messageContent", messageContent)
    formData.append("userWhoSentId", currentMessageId)
    insertMessage(formData)
}

// --------------------------------------- AJAX functions ---------------------------------------

function insertMessage(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/messageApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(request.responseText)
            document.getElementById('txtMessage').value = ''
        }
    }
    request.send(formData)
}

function getMesseges(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/messageApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonMessage = JSON.parse(request.responseText)
            console.log(jsonMessage)
            document.getElementById('messages').innerHTML = ''
            jsonMessage.forEach(message => {
                if(message.user_who_sent_id == currentMessageId){
                    document.getElementById('messages').innerHTML +=
                    `
                    <div class="d-flex justify-content-start">
                        <p class="bg-danger rounded w-75 p-1" style="word-break: break-all;">${message.message_content}</p>
                    </div>
                    `
                }
                else{
                    document.getElementById('messages').innerHTML +=
                    `
                    <div class="d-flex justify-content-end">
                        <p class="bg-secondary rounded w-75 p-1" style="word-break: break-all;">${message.message_content}</p>
                    </div>
                    `
                }
                
            })
        }
    }
    request.send(formData)
}

function getUserByUsername(formData){
    let request = new XMLHttpRequest()
    request.open('POST', '/LearnDome/ApiManager/messageApi.php', true)
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let jsonUser = JSON.parse(request.responseText)
            otherUserId = jsonUser[0].id_for_message
            console.log(otherUserId)
            document.getElementById('txtMessage').style.display = ''
            document.getElementById('btnMessage').style.display = ''

            // let formData = new FormData()
            // formData.append("getMesseges", "")
            // formData.append("firstUserId", currentMessageId)
            // formData.append("secondUserId", otherUserId)
            // formData.append("userWhoSentId", currentMessageId)
            // getMesseges(formData)

            update = true
        }
    }
    request.send(formData)
}