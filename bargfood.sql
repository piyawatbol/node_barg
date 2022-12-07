-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 07, 2022 at 05:38 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bargfood`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_address`
--

CREATE TABLE `tb_address` (
  `address_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address_img` varchar(255) NOT NULL,
  `house_number` varchar(100) NOT NULL,
  `county` varchar(200) NOT NULL,
  `district` varchar(200) NOT NULL,
  `province` varchar(200) NOT NULL,
  `zip_code` varchar(5) NOT NULL,
  `latitude` varchar(100) NOT NULL,
  `longtitude` varchar(100) NOT NULL,
  `address_image` varchar(200) NOT NULL,
  `address_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_address`
--

INSERT INTO `tb_address` (`address_id`, `user_id`, `address_img`, `house_number`, `county`, `district`, `province`, `zip_code`, `latitude`, `longtitude`, `address_image`, `address_status`) VALUES
(1, 1, '', '555/4', 'คลองจั่น ', 'บางกระปิ', 'กทม', '10240', '13.7914', '100.6275', '1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_buyer`
--

CREATE TABLE `tb_buyer` (
  `buyer_id` int(11) NOT NULL,
  `buyer_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_buyer`
--

INSERT INTO `tb_buyer` (`buyer_id`, `buyer_name`) VALUES
(1, 'QRcode'),
(2, 'cash');

-- --------------------------------------------------------

--
-- Table structure for table `tb_cart`
--

CREATE TABLE `tb_cart` (
  `cart_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `store_id` int(10) NOT NULL,
  `food_list` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`food_list`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_food`
--

CREATE TABLE `tb_food` (
  `food_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `food_name` varchar(200) NOT NULL,
  `price` varchar(100) NOT NULL,
  `detail` varchar(100) NOT NULL,
  `food_image` varchar(200) NOT NULL,
  `food_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_food`
--

INSERT INTO `tb_food` (`food_id`, `store_id`, `food_name`, `price`, `detail`, `food_image`, `food_status`) VALUES
(2, 1, 'ก๋วยเตี๋ยวเส้นเล็กหมูน้ำตก', '40', 'ลูกชิ้นหมู', 'img_1665154908591.jpg', 1),
(3, 1, 'ก๋วยเตี๋ยวเส้นเล็กต้มยำหมู', '40', '-', 'img_1665157422109.jpg', 1),
(5, 1, 'บะหมี่', '50', '-', 'img_1667921961113.jpg', 1),
(6, 1, 'ก๋วยจั๊บ', '50', 'เส้นใหญ่', 'img_1667922009980.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_order`
--

CREATE TABLE `tb_order` (
  `id` int(10) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `food_id` varchar(255) NOT NULL,
  `food_name` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `detail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_order`
--

INSERT INTO `tb_order` (`id`, `order_id`, `food_id`, `food_name`, `amount`, `price`, `detail`) VALUES
(26, '2022127104638', '5', 'บะหมี่', '2', '100', ''),
(27, '2022127104638', '3', 'ก๋วยเตี๋ยวเส้นเล็กต้มยำหมู', '2', '80', ''),
(28, '2022127104638', '6', 'ก๋วยจั๊บ', '3', '150', ''),
(29, '2022127225614', '5', 'บะหมี่', '2', '100', ''),
(30, '2022127225614', '3', 'ก๋วยเตี๋ยวเส้นเล็กต้มยำหมู', '2', '80', ''),
(31, '2022127225614', '6', 'ก๋วยจั๊บ', '3', '150', '');

-- --------------------------------------------------------

--
-- Table structure for table `tb_order_status`
--

CREATE TABLE `tb_order_status` (
  `order_status_id` int(11) NOT NULL,
  `order_status_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_order_status`
--

INSERT INTO `tb_order_status` (`order_status_id`, `order_status_name`) VALUES
(1, 'waiting confirm order'),
(2, 'confirmed order'),
(3, 'waiting rider'),
(4, 'rider confirm'),
(5, 'send to rider'),
(6, 'delivering'),
(7, 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `tb_otp_email`
--

CREATE TABLE `tb_otp_email` (
  `send_otp_id` int(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `otp` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_request`
--

CREATE TABLE `tb_request` (
  `request_id` int(10) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `address_id` int(10) NOT NULL,
  `rider_id` varchar(255) NOT NULL,
  `store_id` varchar(255) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `rider_lati` varchar(255) NOT NULL,
  `rider_longti` varchar(255) NOT NULL,
  `slip_img` varchar(255) NOT NULL,
  `status` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_request`
--

INSERT INTO `tb_request` (`request_id`, `user_id`, `address_id`, `rider_id`, `store_id`, `order_id`, `rider_lati`, `rider_longti`, `slip_img`, `status`, `date`, `time`) VALUES
(12, '1', 1, '3', '1', '2022127104638', '13.7914', '100.62751', 'img_1670384798329.jpg', '7', '7/12/2022', '10:46:38'),
(13, '1', 1, '', '1', '2022127225614', '', '', 'img_1670428574982.jpg', '3', '7/12/2022', '22:56:14');

-- --------------------------------------------------------

--
-- Table structure for table `tb_request_success`
--

CREATE TABLE `tb_request_success` (
  `success_id` int(10) NOT NULL,
  `request_id` varchar(255) NOT NULL,
  `success_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_request_success`
--

INSERT INTO `tb_request_success` (`success_id`, `request_id`, `success_img`) VALUES
(5, '7', 'img_1670327782174.jpg'),
(6, '8', 'img_1670344712008.jpg'),
(7, '12', 'img_1670385447611.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tb_solve_report`
--

CREATE TABLE `tb_solve_report` (
  `solve_id` int(11) NOT NULL,
  `solve_detail` text NOT NULL,
  `solve_type` varchar(20) NOT NULL,
  `solve_image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_store`
--

CREATE TABLE `tb_store` (
  `store_id` int(11) NOT NULL,
  `store_name` varchar(100) NOT NULL,
  `store_image` varchar(200) NOT NULL,
  `user_id` int(11) NOT NULL,
  `store_house_number` varchar(100) NOT NULL,
  `store_county` varchar(200) NOT NULL,
  `store_district` varchar(200) NOT NULL,
  `store_province` varchar(200) NOT NULL,
  `store_zipcode` varchar(100) NOT NULL,
  `store_lat` varchar(200) NOT NULL,
  `store_long` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_store`
--

INSERT INTO `tb_store` (`store_id`, `store_name`, `store_image`, `user_id`, `store_house_number`, `store_county`, `store_district`, `store_province`, `store_zipcode`, `store_lat`, `store_long`) VALUES
(1, 'ร้านก๋วยเตี๋ยว', 'img_1665154529828.jpg', 2, '123', 'บางกระปิ', 'คลองจั่น', 'กรุงเทพมหานคร', '10240', '13.793357164696895', '100.63653890043496');

-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `pass_word` varchar(100) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `user_image` varchar(500) NOT NULL,
  `status_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`user_id`, `user_name`, `pass_word`, `first_name`, `last_name`, `email`, `phone`, `user_image`, `status_id`) VALUES
(1, 'user1', '123456', 'user1', 'user1', 'user1@gmail.com', '09999', 'img_1670415808870.jpg', 1),
(2, 'store1', '123456', 'store1', 'store1', 'store1@gmail.com', '09999999', 'img_1665154433457.jpg', 2),
(3, 'rider1', '123456', 'rider1', 'rider1', 'rider1@gmail.com', '09999999', 'img_1668330407591.jpg', 3);

-- --------------------------------------------------------

--
-- Table structure for table `tb_user_status`
--

CREATE TABLE `tb_user_status` (
  `status_id` int(11) NOT NULL,
  `status_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_user_status`
--

INSERT INTO `tb_user_status` (`status_id`, `status_name`) VALUES
(1, 'customer'),
(2, 'partner'),
(3, 'rider');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_address`
--
ALTER TABLE `tb_address`
  ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `tb_buyer`
--
ALTER TABLE `tb_buyer`
  ADD PRIMARY KEY (`buyer_id`);

--
-- Indexes for table `tb_food`
--
ALTER TABLE `tb_food`
  ADD PRIMARY KEY (`food_id`);

--
-- Indexes for table `tb_order`
--
ALTER TABLE `tb_order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_order_status`
--
ALTER TABLE `tb_order_status`
  ADD PRIMARY KEY (`order_status_id`);

--
-- Indexes for table `tb_otp_email`
--
ALTER TABLE `tb_otp_email`
  ADD PRIMARY KEY (`send_otp_id`);

--
-- Indexes for table `tb_request`
--
ALTER TABLE `tb_request`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `tb_request_success`
--
ALTER TABLE `tb_request_success`
  ADD PRIMARY KEY (`success_id`);

--
-- Indexes for table `tb_solve_report`
--
ALTER TABLE `tb_solve_report`
  ADD PRIMARY KEY (`solve_id`);

--
-- Indexes for table `tb_store`
--
ALTER TABLE `tb_store`
  ADD PRIMARY KEY (`store_id`);

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `tb_user_status`
--
ALTER TABLE `tb_user_status`
  ADD PRIMARY KEY (`status_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_address`
--
ALTER TABLE `tb_address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_buyer`
--
ALTER TABLE `tb_buyer`
  MODIFY `buyer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_food`
--
ALTER TABLE `tb_food`
  MODIFY `food_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_order`
--
ALTER TABLE `tb_order`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `tb_order_status`
--
ALTER TABLE `tb_order_status`
  MODIFY `order_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tb_otp_email`
--
ALTER TABLE `tb_otp_email`
  MODIFY `send_otp_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `tb_request`
--
ALTER TABLE `tb_request`
  MODIFY `request_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tb_request_success`
--
ALTER TABLE `tb_request_success`
  MODIFY `success_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tb_solve_report`
--
ALTER TABLE `tb_solve_report`
  MODIFY `solve_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_store`
--
ALTER TABLE `tb_store`
  MODIFY `store_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tb_user_status`
--
ALTER TABLE `tb_user_status`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
