//Client side page
// const socket=io('http://localhost:8000')
const socket = io("http://localhost:8000", { transports: ["websocket"] });
const form=document.getElementById('sendBox')
const messageInput=document.getElementById('txtBox')
const messageContainer=document.querySelector(".container")
var audio=new Audio('tap.mp3')

const append=(message,position)=>{
    const messageElement=document.createElement('div')
    messageElement.innerHTML=message
    messageElement.classList.add('txt')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if (position==='left'){
        audio.play();
    }
}

const nameN=prompt("Enter your name to join")
socket.emit('new-user-joined',nameN)

form.addEventListener('submit',(e)=>{
e.preventDefault()
const message=txtBox.value;
append(`<b>You</b>:${message}`,'right')
socket.emit('send',message)
messageInput.value=''
})

socket.on('user-joined',nameN=>{
    append(`${(nameN === null||nameN ==='') ? "Unknown user" :nameN} joined the chat`,'center')
})
socket.on('receive',data=>{
    append(`<b>${(data.name === null||nameN ==='') ? "Unknown user" : data.name}</b>:${data.message}`,'left')
})
socket.on('left',nameN=>{
    append(`${(nameN === null||nameN ==='') ? "Unknown user" :nameN} lefts the chat`,'center')
})