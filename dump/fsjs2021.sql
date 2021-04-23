-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 23 avr. 2021 à 14:48
-- Version du serveur :  10.4.17-MariaDB
-- Version de PHP : 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `fsjs2021`
--

-- --------------------------------------------------------

--
-- Structure de la table `pokemon`
--

CREATE TABLE `pokemon` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `type` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`type`)),
  `poids` text NOT NULL,
  `path` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `pokemon`
--

INSERT INTO `pokemon` (`id`, `name`, `type`, `poids`, `path`) VALUES
(1, 'Dracaufeu', '{\"type\" : [\"fire\", \"flying\"]}', '90', 'cdn2.bulbagarden.net/upload/thumb/7/7e/006Charizard.png/250px-006Charizard.png'),
(2, 'Bulbasaur', '{\"type\" : [\"grass\", \"poison\"]}', '6.9', 'cdn2.bulbagarden.net/upload/thumb/2/21/001Bulbasaur.png/250px-001Bulbasaur.png'),
(3, 'Mélofé', '{\"type\" : [\"fairy\"]}', '40.0', 'cdn2.bulbagarden.net/upload/thumb/a/a9/036Clefable.png/250px-036Clefable.png'),
(4, 'Mewtwo', '{\"type\":[\"psychic\"]}', '122', 'cdn2.bulbagarden.net/upload/thumb/7/78/150Mewtwo.png/250px-150Mewtwo.png'),
(5, 'Lugia', '{\"type\":[\"psychic\",\"flying\"]}', '216', 'cdn2.bulbagarden.net/upload/thumb/4/44/249Lugia.png/250px-249Lugia.png'),
(6, 'Latios', '{\"type\" : [\"dragon\",\"psychic\"]}', '60', 'cdn2.bulbagarden.net/upload/thumb/5/52/381Latios.png/250px-381Latios.png'),
(7, 'Porygon', '{\"type\":[\"normal\"]}', '0.0', 'cdn2.bulbagarden.net/upload/thumb/6/6b/137Porygon.png/250px-137Porygon.png');

-- --------------------------------------------------------

--
-- Structure de la table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `userId` varchar(16) NOT NULL,
  `pokemonId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `teams`
--

INSERT INTO `teams` (`id`, `teamId`, `userId`, `pokemonId`) VALUES
(0, 0, 'f30855e9bfc8f5a0', 1),
(2, 1, 'f30855e9bfc8f5a0', 2),
(3, 1, 'f30855e9bfc8f5a0', 3),
(4, 1, 'f30855e9bfc8f5a0', 4),
(5, 1, 'f30855e9bfc8f5a0', 5),
(6, 1, 'f30855e9bfc8f5a0', 6);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` varchar(16) NOT NULL,
  `firstName` text DEFAULT NULL,
  `lastName` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `validation_code` text NOT NULL,
  `is_email_verif` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `password`, `email`, `validation_code`, `is_email_verif`) VALUES
('1', 'antoine', 'heinrich', '123', '1', '', 0),
('2', 'antoine2', 'heinrich2', '$2b$10$V1HVHEAkJ90flcahaI/vbO838HHRP6tk00aAnU00pQcptQV1hRUUi', 'ahdu59@me.com', '', 0),
('2e95bd7d39734070', 'Heinrich', 'Antoine', 'ahdu59@me.com', '$2b$10$woKDU5v5ku36jPS9J/zuEOcRRhO5EKWjSTnv9hukEuV84/IpfJ38.', '3AASLxUHVFWvnFlc', 0),
('7a747512c5557fbe', 'Jean', 'Heinrich', '$2b$10$sdxT/PIASpZLisMrp7Sc2u7iBj0FomfB43XQKUFrC3XkJzObZgzm6', 'test@test.testt', 'OvtfTskugWraxm5S', 0),
('a2f18b8103486c9a', 'kazek', 'MATHIS', 'mathiskazek@orange.fr', '$2b$10$TyhScgNe9afTR8VsisbR7.7Md45YM.p8gEnXA2sd20SVukOdpBd5u', '3nCVON1Ra9aIPDAU', 0),
('c541271451df82e2', 'Antoine', 'chiale', 'lisky599@gmail.com', '$2b$10$uMuLN9chO3/QuYaF8Kj/4ewAM8G0l.EOsBcep74kwZtG7U94u.9ju', 'YBdJbMTSuGqwShyj', 0),
('c80aae6e24df8343', 'FILS', 'DEPUTE', '$2b$10$Z0V52ZG6Fy.4Ve5HViMIxONiBNnFD5W3D4gysUa5Xwe3t2gWA2SJa', 'mathiskazek@orange.fr', 'd743RuUneQVVRG9e', 0),
('c92a53018cd804f2', 'Jean', 'chiale', '$2b$10$TTemGlJx73v7t0ljgI.Hgu6yaYDu0ZIFCSk04VCC5JuNNqU0Gw/SW', '0', 'test2@test.test', 0),
('d0b7d6415427e2da', 'Jean', 'DEPUTE', '$2b$10$D81rdXPjSLBLLecT4Ij6auiTS9wEWjVP/cB/.gOfFD.R3oycFfzVm', 'math02840@gmail.com', '2Hzfg1ErUqyWZdFZ', 0),
('dd918cdd42a36588', 'Jean', 'Heinrich', 'toinou@test.test', '$2b$10$Qc47JeYqGwn65luxImLaju5u1yys68h3zb7EWZSyrCkGr/Jm6aXuq', 'MoEyvYVE3ZjkUASJ', 0),
('f30855e9bfc8f5a0', 'Jean', 'chiale', '$2b$10$1yAm3GHP1mef7Z1vaT9LKeqUWVig.pYypdJ7L1VkWYEXNfQziTfZq', 'test@test.test', '3vTVlhRpfEekjcIT', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `pokemon`
--
ALTER TABLE `pokemon`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
