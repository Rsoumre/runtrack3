<?php
$host = 'localhost';
$user = 'admin';
$password = 'root';
$database = 'autocompletion';   
$conn = new mysqli($host, $user, $password, $database);
$conn->set_charset("utf8mb4");
?>


<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AUTOCOMPLETION</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<div class="container">
    <h1>
        Sportifs Recherches
    </h1>
    <form action="recherche.php" method="get">
    <input type="text" id="search" placeholder="Rechercher un sportif..." autocomplete="off">
    </form>
</div>





    <script src="script.js"></script>
</body>
</html>