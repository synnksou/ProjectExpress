-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 30 avr. 2021 à 19:41
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
(7, 'Porygon', '{\"type\":[\"normal\"]}', '0.0', 'cdn2.bulbagarden.net/upload/thumb/6/6b/137Porygon.png/250px-137Porygon.png'),
(8, 'Lapras', '{\"type\" : [\"water\",\"ice\"]}', '70', 'cdn2.bulbagarden.net/upload/thumb/a/ab/131Lapras.png/250px-131Lapras.png'),
(9, 'Evoly', '{\"type\" : [\"normal\"]}', '70', 'cdn2.bulbagarden.net/upload/thumb/e/e2/133Eevee.png/250px-133Eevee.png'),
(10, 'Sceptile', '{\"type\" : [\"grass\"]}', '140', 'cdn2.bulbagarden.net/upload/thumb/3/3e/254Sceptile.png/250px-254Sceptile.png'),
(11, 'Metagross', '{\"type\" : [\"steel\",\"psychic\"]}', '300', 'cdn2.bulbagarden.net/upload/thumb/0/05/376Metagross.png/250px-376Metagross.png'),
(12, 'Lucario', '{\"type\" : [\"fighting\", \"steel\"]}', '45', 'cdn2.bulbagarden.net/upload/thumb/d/d7/448Lucario.png/250px-448Lucario.png'),
(13, 'Ectoplasma', '{\"type\" : [\"ghost\", \"poison\"]}', '140', 'cdn2.bulbagarden.net/upload/thumb/c/c6/094Gengar.png/250px-094Gengar.png');

-- --------------------------------------------------------

--
-- Structure de la table `teams`
--

CREATE TABLE `teams` (
  `id` varchar(16) NOT NULL,
  `teamId` varchar(16) NOT NULL,
  `userId` varchar(16) NOT NULL,
  `pokemonId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `teams`
--

INSERT INTO `teams` (`id`, `teamId`, `userId`, `pokemonId`) VALUES
('09f06675825f8d06', 'bf4d933c3dfd7991', 'ae68d6bb25bc8476', 3),
('1fc96cea32417309', 'bf4d933c3dfd7991', 'ae68d6bb25bc8476', 2),
('30bab047a56292ff', 'bf4d933c3dfd7991', 'ae68d6bb25bc8476', 6),
('39664ac87f5ae254', 'cfabe7673fdc5bbf', '0a1d905b1f98d5a6', 4),
('3baac7aca828a156', 'bf4d933c3dfd7991', 'ae68d6bb25bc8476', 11),
('52baaa709148b655', '6dc19ce44df1d75d', '6db99622bd61718e', 1),
('63b776449d9c67ed', '6dc19ce44df1d75d', '6db99622bd61718e', 3),
('78a098671b7adad4', '6dc19ce44df1d75d', '6db99622bd61718e', 2),
('7f70e0a42576eca5', 'bf4d933c3dfd7991', 'ae68d6bb25bc8476', 1),
('8163d4bb150089f3', 'cfabe7673fdc5bbf', '0a1d905b1f98d5a6', 5),
('84e002ce100365b5', '6dc19ce44df1d75d', '6db99622bd61718e', 6),
('9c6cf43f2d85d3b0', 'cfabe7673fdc5bbf', '0a1d905b1f98d5a6', 13),
('9d738ed7a8075a25', 'cfabe7673fdc5bbf', '0a1d905b1f98d5a6', 1),
('bb5c176cd108accc', '6dc19ce44df1d75d', '6db99622bd61718e', 5),
('d552b0c05de578f8', '6dc19ce44df1d75d', '6db99622bd61718e', 4),
('dccb526b0d3a0b17', 'cfabe7673fdc5bbf', '0a1d905b1f98d5a6', 10),
('e5635ac3aa385358', 'cfabe7673fdc5bbf', '0a1d905b1f98d5a6', 12),
('f9cd110c24cad484', 'bf4d933c3dfd7991', 'ae68d6bb25bc8476', 8);

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
('0a1d905b1f98d5a6', 'Mathis', 'Mathis', '$2b$10$pXaYbxB1axRETAQQ2dU.ruV.8xfYNdyP.RLXKlpy01rYPyyBLAfua', 'test2@test.test', 'npXw6ffiD5FSvZbc', 0),
('ae68d6bb25bc8476', 'Heinrich', 'Antoine', '$2b$10$7QRg7osvMaXoPimHtzKFKu/HTtRptLtbB5NFKVIqYD93DZVljestq', 'test@test.test', 'kQsbkO3xspXzAa8h', 0),
('c92a53018cd804f2', 'Jean', 'chiale', '$2b$10$TTemGlJx73v7t0ljgI.Hgu6yaYDu0ZIFCSk04VCC5JuNNqU0Gw/SW', '0', 'test2@test.test', 0);

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
