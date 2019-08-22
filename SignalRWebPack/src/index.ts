import "./css/main.css"
import * as signalR from "@aspnet/signalr";

const divMessages: HTMLDivElement = document.querySelector('#divMessages');
const tbMessage: HTMLInputElement = document.querySelector('#tbMessage');
const btnSend: HTMLButtonElement = document.querySelector('#btnSend');
const username = new Date().getTime();

const connection = new signalR.HubConnectionBuilder().withUrl('chatHub').build();
connection.start().catch(err => document.write(err));
connection.on("ReceiveMessage", (username: string, message: string) => {
    let messageDiv = document.createElement("div");
    messageDiv.innerHTML = `<div class="message-author">${username}</div><div>${message}</div>`;
    divMessages.appendChild(messageDiv);
    divMessages.scrollTop = divMessages.scrollHeight;

})

tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
        send();
    }
});

btnSend.addEventListener("click", send);

function send() {
    connection
        .send("sendMessage", username, tbMessage.value)
        .then(() => tbMessage.value = "");
}