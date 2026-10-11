-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2023 at 12:36 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proweaverwebdb018`
--

-- --------------------------------------------------------

--
-- Table structure for table `formdatabase_emails`
--

CREATE TABLE `formdatabase_emails` (
  `form_id` int(11) NOT NULL,
  `form_from` varchar(50) NOT NULL,
  `form_subject` varchar(500) NOT NULL,
  `date_sent` datetime NOT NULL,
  `form_content` longtext NOT NULL,
  `status` enum('new','read','deleted') NOT NULL,
  `email_type` enum('inbox','trash') NOT NULL,
  `attachments` text NOT NULL,
  `date_deleted` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `formdatabase_users`
--

CREATE TABLE `formdatabase_users` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(20) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_pass` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `formdatabase_emails`
--
ALTER TABLE `formdatabase_emails`
  ADD PRIMARY KEY (`form_id`);

--
-- Indexes for table `formdatabase_users`
--
ALTER TABLE `formdatabase_users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `formdatabase_emails`
--
ALTER TABLE `formdatabase_emails`
  MODIFY `form_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `formdatabase_users`
--
ALTER TABLE `formdatabase_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
