<?php
$host = 'localhost';
$user = 'admin';
$password = 'root';
$database = 'autocompletion';
$conn = new mysqli($host, $user, $password, $database);
$conn->set_charset("utf8mb4");

$id = $_GET['id'] ?? 0;

// Préparer et exécuter la requête pour obtenir les détails du sportif
$stmt = $conn->prepare("SELECT * FROM sportifs WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$sportif = $stmt->get_result()->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title><?= $sportif ? htmlspecialchars($sportif['nom']) : 'Sportif introuvable' ?></title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <?php if ($sportif): ?>
        <h1><?= htmlspecialchars($sportif['nom']) ?></h1>
        <p><?= htmlspecialchars($sportif['description']) ?></p>
    <?php else: ?>
        <p>Sportif introuvable.</p>
    <?php endif; ?>

    <p><a href="index.php">⬅ Retour à la recherche</a></p>
</body>
</html>
