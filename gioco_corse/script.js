const gameContainer = document.querySelector(".game-container");
const car = document.querySelector(".car");

let carPosition = 175; // Posizione iniziale dell'auto
const speed = 5; // Velocità di movimento
const roadWidth = 400;
let gameOver = false;

// Movimento auto con frecce
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && carPosition > 0) {
        carPosition -= 25;
    } else if (event.key === "ArrowRight" && carPosition < roadWidth - 50) {
        carPosition += 25;
    }
    car.style.left = `${carPosition}px`;
});

// Creazione degli ostacoli
function createObstacle() {
    if (gameOver) return;

    let obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = `${Math.floor(Math.random() * (roadWidth - 50))}px`;
    obstacle.style.top = "-100px";
    gameContainer.appendChild(obstacle);

    moveObstacle(obstacle);
}

// Movimento degli ostacoli
function moveObstacle(obstacle) {
    let interval = setInterval(() => {
        if (gameOver) {
            clearInterval(interval);
            return;
        }

        let obstacleTop = parseInt(obstacle.style.top) || 0;
        obstacle.style.top = `${obstacleTop + 5}px`;

        // Controllo collisione
        if (obstacleTop > 500 && checkCollision(car, obstacle)) {
            alert("Hai perso! Ricarica la pagina per riprovare.");
            gameOver = true;
            clearInterval(interval);
        }

        if (obstacleTop > 600) {
            obstacle.remove();
        }
    }, 30);
}

// Controllo collisione
function checkCollision(car, obstacle) {
    let carRect = car.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    return !(
        carRect.bottom < obstacleRect.top ||
        carRect.top > obstacleRect.bottom ||
        carRect.right < obstacleRect.left ||
        carRect.left > obstacleRect.right
    );
}

// Generazione ostacoli ogni 2 secondi
setInterval(createObstacle, 2000);