import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

const figures = ["♦", "♥", "♠", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

document.addEventListener("DOMContentLoaded",()=>{
    
document.getElementById("generateButtom").addEventListener("click",generateCards);
document.getElementById("resetButton").addEventListener("click",resetGame);

});


function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (let i = 0; i < 22; i++) {
        let figure = getRandomFromArray(figures);
        let value = getRandomFromArray(values);
        
        let card = document.createElement("div");
        card.classList.add("card");
        card.draggable = true;
        card.ondragstart = drag;
        card.setAttribute("data-id", `card-${i}`);

        let colorClass = (figure === "♦" || figure === "♥") ? "red" : "black";
        card.innerHTML = `<div class="${colorClass}">${figure}</div><div>${value}</div><div class="${colorClass}">${figure}</div>`;

        cardContainer.appendChild(card);
    }
}

function resetGame() {
    document.getElementById("card-container").innerHTML = "";
    document.querySelectorAll(".drop-zone").forEach(zone => {
        zone.innerHTML = "";
    });
}

window.allowDrop = function(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text/html", event.target.outerHTML);
    event.dataTransfer.setData("text/plain", event.target.getAttribute("data-id"));
}

 window.drop = function(event) {
    event.preventDefault();
    let cardData = event.dataTransfer.getData("text/html");

    event.target.innerHTML = "";

    let droppedCard = document.createElement("div");
    droppedCard.innerHTML = cardData;
    droppedCard.querySelector(".card").draggable = true;
    droppedCard.querySelector(".card").ondragstart = drag;

    event.target.appendChild(droppedCard.firstChild);
}