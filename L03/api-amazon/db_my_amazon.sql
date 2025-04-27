-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2025 at 03:45 PM
-- Server version: 8.0.40
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_my_amazon`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_prodotti`
--

CREATE TABLE `t_prodotti` (
  `id_prodotto` int NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `prezzo` decimal(10,2) NOT NULL,
  `quantita` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `t_prodotti`
--

INSERT INTO `t_prodotti` (`id_prodotto`, `nome`, `prezzo`, `quantita`) VALUES
(1, 'Mouse Logitech', 29.99, 100),
(2, 'Tastiera Meccanica', 89.90, 50),
(3, 'Monitor 24\"', 149.50, 30),
(4, 'Hard Disk 1TB', 59.99, 80),
(5, 'Cuffie Bluetooth', 39.95, 60),
(6, 'Laptop Dell Inspiron', 799.99, 20),
(7, 'Stampante HP LaserJet', 120.00, 15),
(8, 'Webcam HD Logitech', 45.00, 40),
(9, 'Powerbank 10000mAh', 25.50, 70),
(10, 'Zaino Porta PC', 35.99, 60);

-- --------------------------------------------------------

--
-- Table structure for table `t_utenti`
--

CREATE TABLE `t_utenti` (
  `id_utente` int NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `cognome` varchar(50) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `t_utenti`
--

INSERT INTO `t_utenti` (`id_utente`, `nome`, `cognome`, `username`, `password`) VALUES
(1, 'Marco', 'Rossi', 'marcorossi', 'password123'),
(2, 'Lucia', 'Bianchi', 'lucia_b', 'qwerty456'),
(3, 'Giovanni', 'Verdi', 'giovanniv', 'ciao789'),
(4, 'Anna', 'Neri', 'annineri', 'securepass'),
(5, 'Paolo', 'Gialli', 'paolog', 'paolo2025'),
(6, 'Francesca', 'Moretti', 'fra.moretti', 'francesca123'),
(7, 'Lorenzo', 'Martini', 'lmartini', 'lorenzo321'),
(8, 'Elena', 'Russo', 'elena_r', 'elena456'),
(9, 'Davide', 'Conti', 'd.conti', 'davide789'),
(10, 'Sara', 'Ferrari', 'sferrari', 'sara2025');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_prodotti`
--
ALTER TABLE `t_prodotti`
  ADD PRIMARY KEY (`id_prodotto`);

--
-- Indexes for table `t_utenti`
--
ALTER TABLE `t_utenti`
  ADD PRIMARY KEY (`id_utente`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `t_prodotti`
--
ALTER TABLE `t_prodotti`
  MODIFY `id_prodotto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `t_utenti`
--
ALTER TABLE `t_utenti`
  MODIFY `id_utente` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
