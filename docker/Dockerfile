# Utilisation de l'image MySQL officielle comme base
FROM mysql:latest

# Copie du fichier contenant le schéma de base de données dans le conteneur
COPY init.sql /docker-entrypoint-initdb.d/

# Définition des variables d'environnement pour l'authentification de base
ENV MYSQL_ROOT_PASSWORD="root"
ENV MYSQL_DATABASE="pfe1"

# Exposition du port MySQL (optionnel, si vous souhaitez mapper le port dans le conteneur)
EXPOSE 3306

# Commande par défaut pour exécuter le serveur MySQL lors du démarrage du conteneur
CMD ["mysqld"]
