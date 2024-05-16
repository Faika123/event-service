
CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `nom` varchar(254) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `message` text NOT NULL,
  `date_message` date NOT NULL,
  `utilisateur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



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



CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tel` int(8) NOT NULL,
  `nbr_place` int(11) NOT NULL,
  `date_reservation` date NOT NULL,
  `utilisateur_id` int(11) NOT NULL,
  `evenement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `type` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `type`
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


ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utilisateur_id` (`utilisateur_id`);

ALTER TABLE `evenement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categorie_id` (`categorie_id`);


ALTER TABLE `paiement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utilisateur_id` (`utilisateur_id`),
  ADD KEY `evenement_id` (`evenement_id`);


ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`utilisateur_id`),
  ADD KEY `id_event` (`evenement_id`);


ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;


ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


ALTER TABLE `evenement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;


ALTER TABLE `paiement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;


ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;


ALTER TABLE `contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`);


ALTER TABLE `evenement`
  ADD CONSTRAINT `evenement_ibfk_1` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`);


ALTER TABLE `paiement`
  ADD CONSTRAINT `paiement_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `paiement_ibfk_2` FOREIGN KEY (`evenement_id`) REFERENCES `evenement` (`id`);


ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`evenement_id`) REFERENCES `evenement` (`id`);
COMMIT;


