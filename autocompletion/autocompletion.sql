-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 12 nov. 2025 à 15:07
-- Version du serveur : 10.11.13-MariaDB-0ubuntu0.24.04.1
-- Version de PHP : 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `autocompletion`
--

-- --------------------------------------------------------

--
-- Structure de la table `sportifs`
--

CREATE TABLE `sportifs` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sportifs`
--

INSERT INTO `sportifs` (`id`, `nom`, `description`) VALUES
(1, 'Marc-André ter Stegen', 'Gardien allemand, capitaine et pilier du FC Barcelone.'),
(2, 'Iñaki Peña', 'Gardien espagnol, formé à la Masia.'),
(3, 'Ronald Araújo', 'Défenseur central uruguayen, solide et rapide.'),
(4, 'Jules Koundé', 'Défenseur français polyvalent, à droite ou au centre.'),
(5, 'Alejandro Balde', 'Jeune latéral gauche espagnol, très rapide.'),
(6, 'Andreas Christensen', 'Défenseur danois, calme et intelligent dans le jeu.'),
(7, 'Pau Cubarsí', 'Jeune défenseur central espagnol très prometteur.'),
(8, 'Frenkie de Jong', 'Milieu néerlandais, excellent à la relance.'),
(9, 'Gavi', 'Milieu espagnol combatif formé à la Masia.'),
(10, 'Pedri', 'Milieu offensif espagnol, talentueux et créatif.'),
(11, 'Luis Suarez', 'Attaquand Uruguayen, l`un meilleur Attanquant du Barça.'),
(12, 'Fermín López', 'Jeune milieu espagnol énergique et efficace devant le but.'),
(13, 'Robert Lewandowski', 'Attaquant polonais expérimenté et buteur régulier.'),
(14, 'Raphinha', 'Ailier brésilien technique et rapide.'),
(15, 'Ferran Torres', 'Ailier espagnol capable de jouer à plusieurs postes offensifs.'),
(16, 'Lamine Yamal', 'Jeune prodige espagnol, l’un des plus grands espoirs du club.'),
(17, 'Neymar Jr', 'l’un des meilleur Attaquant brésilien.'),
(18, 'Oriol Romeu', 'Milieu défensif espagnol revenu au club en 2023.'),
(19, 'Héctor Fort', 'Latéral droit espagnol issu de la Masia.'),
(20, 'Lionel Messi', 'Meilleur joueur du monde la Pulga');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `sportifs`
--
ALTER TABLE `sportifs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `sportifs`
--
ALTER TABLE `sportifs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
