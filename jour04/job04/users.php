<?php 

// connexion à la base de données
$pdo = new PDO('mysql:host=localhost;dbname=utilisateurs', 'admin', 'root');

// récupération des utilisateurs
$stmt = $pdo->query('SELECT * FROM utilisateurs');
$uers = $stmt->fetchAll(PDO::FETCH_ASSOC);

// renvoi des utilisateurs au format JSON
header('Content-Type: application/json');
echo json_encode($uers);
?>