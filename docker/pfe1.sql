-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 14 mai 2024 à 10:12
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pfe1`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `nom` varchar(254) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `nom`, `description`) VALUES
(31, 'cinema', 'tous les catégories de type culturel'),
(35, 'theatre', 'Tous les catégories de théâtre, les comédies musicales et les spectacles'),
(36, 'Festivals culturels', ' Festivals célébrant la culture locale ou internationale.');

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `message` text NOT NULL,
  `date_message` date NOT NULL,
  `utilisateur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contact`
--

INSERT INTO `contact` (`id`, `message`, `date_message`, `utilisateur_id`) VALUES
(1, 'J\\\'aime bien ce site !', '2024-04-19', 21),
(4, 'Le site est simple à utiliser et efficace', '2024-04-28', 2);

-- --------------------------------------------------------

--
-- Structure de la table `evenement`
--

CREATE TABLE `evenement` (
  `id` int(11) NOT NULL,
  `titre` text NOT NULL,
  `description` text NOT NULL,
  `prix` float NOT NULL,
  `lieu` text NOT NULL,
  `places_disponibles` int(11) NOT NULL,
  `date_deb` date NOT NULL,
  `date_fin` date NOT NULL,
  `categorie_id` int(11) NOT NULL,
  `photo_url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `evenement`
--

INSERT INTO `evenement` (`id`, `titre`, `description`, `prix`, `lieu`, `places_disponibles`, `date_deb`, `date_fin`, `categorie_id`, `photo_url`) VALUES
(13, 'Rouhaniyet', 'Rouhaniyet Nafta est un Festival dédié aux expressions musicales et artistiques des mystiques, et particulièrement celles issues du patrimoine mondial et national des Soufis.', 20, 'Dar El Ouedi, Médina de Nefta', 30, '2024-05-14', '2024-05-14', 36, '/assets/img/rouhaniyet.jpg'),
(14, 'Dachra', 'Dachra (دشرة) est un film d\'horreur tunisien écrit et réalisé par Abdelhamid Bouchnak et sorti en 2018.', 25, ' DERMECH — CINEMADART', 30, '2024-05-11', '2024-05-11', 31, '/assets/img/Dachra.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `paiement`
--

CREATE TABLE `paiement` (
  `id` int(11) NOT NULL,
  `email` varchar(254) NOT NULL,
  `montant` float NOT NULL,
  `nbr_carte` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `date_creation` date NOT NULL,
  `evenement_id` int(11) NOT NULL,
  `utilisateur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tel` int(8) NOT NULL,
  `nbr_place` int(11) NOT NULL,
  `date_reservation` date NOT NULL,
  `utilisateur_id` int(11) NOT NULL,
  `evenement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `type`
--

CREATE TABLE `type` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `type`
--

INSERT INTO `type` (`id`, `nom`, `description`) VALUES
(4, 'culture', 'tous les catégories de type culturel'),
(6, 'social', 'Tous les catégories de type social'),
(9, 'santé', 'Tous les catégories de type santé'),
(14, 'Education', 'tous les catégories de type évènement');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `nom` varchar(254) NOT NULL,
  `prenom` varchar(254) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mot_de_passe` varchar(50) NOT NULL,
  `tel` int(8) NOT NULL,
  `photo_url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `nom`, `prenom`, `email`, `mot_de_passe`, `tel`, `photo_url`) VALUES
(1, 'malek', 'nasrallah', 'maleknasrallah@gmail.com', 'malek6', 25369850, 'https://images.ladepeche.fr/api/v1/images/view/5c365dff3e454679880470c5/full/image.jpg'),
(2, 'faika', 'benzaara', 'faikabenzaara@gmail.com', 'faika123', 21777998, 'https://images.ladepeche.fr/api/v1/images/view/5c365dff3e454679880470c5/full/image.jpg'),
(4, 'ghofrane', 'chorfi', 'ghofranechorfi@gmail.com', 'ghofrane69', 95683210, 'https://images.ladepeche.fr/api/v1/images/view/5c365dff3e454679880470c5/full/image.jpg'),
(5, 'ahmed', 'nafty', 'ahmed@gmail.com', 'ahmed', 54896710, 'https://images.ladepeche.fr/api/v1/images/view/5c365dff3e454679880470c5/full/image.jpg'),
(19, 'basma', 'chebbi', 'basma@gmail.com', 'basma123', 95360124, 'C:\\fakepath\\basma.jpg'),
(21, 'mariem', 'said', 'mariem@gmail.com', 'mariem456', 54896321, 'C:\\fakepath\\mariem.png'),
(23, 'kenza', 'rebha', 'kenza@gmail.com', 'kenza', 25639001, 'C:\\fakepath\\basma.jpg');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utilisateur_id` (`utilisateur_id`);

--
-- Index pour la table `evenement`
--
ALTER TABLE `evenement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categorie_id` (`categorie_id`);

--
-- Index pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utilisateur_id` (`utilisateur_id`),
  ADD KEY `evenement_id` (`evenement_id`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`utilisateur_id`),
  ADD KEY `id_event` (`evenement_id`);

--
-- Index pour la table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT pour la table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `evenement`
--
ALTER TABLE `evenement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `paiement`
--
ALTER TABLE `paiement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `type`
--
ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `evenement`
--
ALTER TABLE `evenement`
  ADD CONSTRAINT `evenement_ibfk_1` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`);

--
-- Contraintes pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD CONSTRAINT `paiement_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `paiement_ibfk_2` FOREIGN KEY (`evenement_id`) REFERENCES `evenement` (`id`);

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`evenement_id`) REFERENCES `evenement` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
