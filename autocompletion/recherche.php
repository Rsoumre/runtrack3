<?php
$host = 'localhost';
$user = 'admin';
$password = 'root';
$database = 'autocompletion';
$conn = new mysqli($host, $user, $password, $database);
$conn->set_charset("utf8mb4");

$search = $_GET['search'] ?? '';

$stmt = $conn->prepare("SELECT * FROM sportifs WHERE nom LIKE CONCAT('%', ?, '%')");
$stmt->bind_param("s", $search);
$stmt->execute();
$resultats = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Résultats pour <?= htmlspecialchars($search) ?></title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Résultats pour « <?= htmlspecialchars($search) ?> »</h1>

    <ul>
        <?php while ($r = $resultats->fetch_assoc()): ?>
            <li>
                <a href="element.php?id=<?= $r['id'] ?>">
                    <?= htmlspecialchars($r['nom']) ?>
                </a>
            </li>
        <?php endwhile; ?>
    </ul>

    <?php if ($resultats->num_rows === 0): ?>
        <p>Aucun joueur trouvé.</p>
    <?php endif; ?>

    <p><a href="index.php">⬅ Retour à l'accueil</a></p>
</body>
</html>
