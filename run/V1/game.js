const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ajuster la taille du canvas à l'écran
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Configuration initiale
let player = { x: 50, y: canvas.height / 2, width: 30, height: 30, speed: 300 }; // La vitesse est en pixels par seconde
let obstacles = [];
let speed = 200; // Vitesse initiale des obstacles (pixels/seconde)
let score = 0;
let keys = { ArrowUp: false, ArrowDown: false }; // Suivi des touches

// Temps pour synchronisation
let lastTime = 0;

// Écouter les touches du clavier
window.addEventListener("keydown", (e) => {
    if (e.key in keys) {
        keys[e.key] = true;
        e.preventDefault();
    }
});
window.addEventListener("keyup", (e) => {
    if (e.key in keys) {
        keys[e.key] = false;
        e.preventDefault();
    }
});

// Déplacer le joueur
function movePlayer(deltaTime) {
    const distance = player.speed * (deltaTime / 1000); // Distance parcourue = vitesse x temps

    if (keys.ArrowUp && player.y > 0) {
        player.y -= distance;
    }
    if (keys.ArrowDown && player.y + player.height < canvas.height) {
        player.y += distance;
    }
}
let touchStartY = null; // Position initiale du toucher

let touchStartY = null; // Position initiale du toucher

// Fonction pour déplacer le joueur vers le haut
function movePlayerUp() {
    if (player.y > 0) {
        player.y -= player.height; // Déplacer d'un bloc vers le haut
    }
}

// Fonction pour déplacer le joueur vers le bas
function movePlayerDown() {
    if (player.y + player.height < canvas.height) {
        player.y += player.height; // Déplacer d'un bloc vers le bas
    }
}

// Empêcher le défilement et capturer les gestes tactiles
window.addEventListener("touchstart", (e) => {
    // Bloquer les gestes de défilement par défaut
    e.preventDefault();

    // Sauvegarder la position de départ du toucher
    touchStartY = e.touches[0].clientY;
}, { passive: false });

window.addEventListener("touchmove", (e) => {
    if (touchStartY === null) return;

    const touchEndY = e.touches[0].clientY;
    const touchDeltaY = touchStartY - touchEndY;

    // Déplacement vers le haut (si le mouvement est assez grand)
    if (touchDeltaY > 30) {
        movePlayerUp(); // Appeler la fonction de déplacement vers le haut
        touchStartY = null; // Réinitialiser après un geste
    }
    // Déplacement vers le bas (si le mouvement est assez grand)
    else if (touchDeltaY < -30) {
        movePlayerDown(); // Appeler la fonction de déplacement vers le bas
        touchStartY = null; // Réinitialiser après un geste
    }
}, { passive: false });

// Réinitialiser après un toucher terminé
window.addEventListener("touchend", () => {
    touchStartY = null;
});




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
function update(currentTime) {
    // Calculer le temps écoulé depuis le dernier appel
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Déplacer le joueur
    movePlayer(deltaTime);

    // Dessiner le joueur
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Mettre à jour et dessiner les obstacles
    obstacles.forEach((obs, index) => {
        obs.x -= speed * (deltaTime / 1000); // Avancer en fonction du temps écoulé

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
    speed += 0.01; // Ajuste la difficulté au fil du temps

    // Afficher le score
    ctx.fillStyle = "blue";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
    score += Math.floor(deltaTime / 100); // Incrémenter le score en fonction du temps écoulé

    // Rafraîchir le jeu
    requestAnimationFrame(update);
}

// Lancer le jeu
requestAnimationFrame(update);
