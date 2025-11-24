<?php
header("Content-Type: application/json");

$host = 'localhost';
$user = 'admin';
$password = 'root';
$database = 'autocompletion';

try {
    $conn = new PDO("mysql:host=$host;dbname=$database;charset=utf8mb4", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("SELECT id, nom FROM sportifs");
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}?>