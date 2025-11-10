<?php
$host = 'localhost';
$user = 'admin';
$password = 'root';
$database = 'autocompletion';
$conn = new mysqli($host, $user, $password, $database);
$conn->set_charset("utf8mb4");

$q = $_GET['q'] ?? '';

if ($q === '') {
    echo json_encode([]);
    exit;
}

// Résultats qui commencent par la recherche
$sqlExact = "SELECT id, nom FROM sportifs WHERE nom LIKE CONCAT(?, '%')";
$stmtExact = $conn->prepare($sqlExact);
$stmtExact->bind_param("s", $q);
$stmtExact->execute();
$exact = $stmtExact->get_result()->fetch_all(MYSQLI_ASSOC);

// Résultats qui contiennent la recherche (mais ne commencent pas par)
$sqlPartial = "SELECT id, nom FROM sportifs WHERE nom LIKE CONCAT('%', ?, '%') AND nom NOT LIKE CONCAT(?, '%')";
$stmtPartial = $conn->prepare($sqlPartial);
$stmtPartial->bind_param("ss", $q, $q);
$stmtPartial->execute();
$partial = $stmtPartial->get_result()->fetch_all(MYSQLI_ASSOC);

$data = array_merge($exact, $partial);
$data['exact_count'] = count($exact);

echo json_encode($data);
?>
