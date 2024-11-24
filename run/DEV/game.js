const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ajuster la taille du canvas à l'écran
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Configuration initiale
let player = { x: 50, y: canvas.height / 2, width: 30, height: 30, speed: 5 };
let obstacles = [];
let speed = 3; // Vitesse initiale des obstacles
let score = 0;
let keys = { ArrowUp: false, ArrowDown: false }; // Suivi des touches utiles (haut et bas)

// Écouter les touches du clavier
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        keys[e.key] = true;
        e.preventDefault(); // Empêcher le comportement par défaut (défilement)
    }
});
window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        keys[e.key] = false;
        e.preventDefault(); // Empêcher le comportement par défaut (défilement)
    }
});

// Empêcher le défilement de la page
function preventScroll(event) {
    const keysToBlock = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "]; // Touches à bloquer (flèches et espace)
    if (keysToBlock.includes(event.key)) {
        event.preventDefault();
    }
}

// Empêcher le défilement pour les touches du clavier
window.addEventListener("keydown", preventScroll);

// Empêcher le défilement pour la molette de la souris
window.addEventListener("wheel", (event) => event.preventDefault(), { passive: false });

// Empêcher le défilement pour les gestes tactiles (mobile)
window.addEventListener("touchmove", (event) => event.preventDefault(), { passive: false });


// Déplacer le joueur
function movePlayer() {
    if (keys.ArrowUp && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y + player.height < canvas.height) {
        player.y += player.speed;
    }
}

// Créer un obstacle
function createObstacle() {
    const size = Math.random() * 50 + 20; // Taille aléatoire entre 20 et 70
    obstacles.push({
        x: canvas.width,
        y: Math.random() * (canvas.height - size), // Position aléatoire en hauteur
        width: size,
        height: size,
    });
}

// Mettre à jour et dessiner le jeu
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Déplacer le joueur
    movePlayer();

    // Dessiner le joueur
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Mettre à jour et dessiner les obstacles
    obstacles.forEach((obs, index) => {
        obs.x -= speed; // Faire avancer les obstacles vers la gauche

        // Supprimer les obstacles hors écran
        if (obs.x + obs.width < 0) {
            obstacles.splice(index, 1);
        }

        // Dessiner l'obstacle
        ctx.fillStyle = "red";
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        // Détecter les collisions
        if (
            player.x < obs.x + obs.width &&
            player.x + player.width > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.height > obs.y
        ) {
            alert(`Game Over! Score: ${score}`);
            document.location.reload(); // Redémarrer le jeu
        }
    });

    // Générer des obstacles aléatoirement
    if (Math.random() < 0.02) createObstacle();

    // Augmenter légèrement la vitesse
    speed += 0.001;

    // Afficher le score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
    score++;

    // Rafraîchir le jeu
    requestAnimationFrame(update);
}

// Lancer le jeu
update();
