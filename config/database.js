const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || '127.0.0.1', // Utilisez l'adresse IP de votre serveur MySQL
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE || 'pfe1'
});



db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = db;