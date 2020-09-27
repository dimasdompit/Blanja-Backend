-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 27 Sep 2020 pada 13.01
-- Versi server: 10.4.13-MariaDB
-- Versi PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blanja-api`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` varchar(256) NOT NULL COMMENT 'like Home, Office, etc.',
  `name` varchar(256) NOT NULL,
  `address` text NOT NULL,
  `telp` varchar(16) NOT NULL,
  `city` varchar(256) NOT NULL,
  `province` varchar(256) NOT NULL,
  `zipcode` varchar(11) NOT NULL,
  `country` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `address`
--

INSERT INTO `address` (`id`, `user_id`, `type`, `name`, `address`, `telp`, `city`, `province`, `zipcode`, `country`) VALUES
(7, 8, 'Home', 'Dimas Mokodompit', 'Jalan Taman Melati 2', '081209876543', 'Depok', 'West Java', '12345', 'Indonesia');

-- --------------------------------------------------------

--
-- Struktur dari tabel `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `image` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `banner`
--

INSERT INTO `banner` (`id`, `image`) VALUES
(3, 'banner-1600685582616.jpg'),
(4, 'banner-1601195831975.png'),
(5, 'banner-1601196560328.jpg'),
(6, 'banner-1601196577034.jpg'),
(7, 'banner-1601196590001.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'Shirt'),
(2, 'Pants'),
(3, 'Shoes'),
(4, 'Wirstwatch'),
(7, 'Handbag'),
(8, 'Bagback'),
(9, 'Socks'),
(10, 'Glasses'),
(11, 'Cap'),
(12, 'Tie'),
(13, 'Dress'),
(14, 'Formal Suit'),
(15, 'Accessories'),
(16, 'Jacket'),
(17, 'Hoodie');

-- --------------------------------------------------------

--
-- Struktur dari tabel `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `color` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `colors`
--

INSERT INTO `colors` (`id`, `color`) VALUES
(1, 'Black'),
(2, 'White'),
(3, 'Red'),
(5, 'Blue'),
(6, 'Pink'),
(7, 'Yellow'),
(8, 'Grey');

-- --------------------------------------------------------

--
-- Struktur dari tabel `conditions`
--

CREATE TABLE `conditions` (
  `id` int(11) NOT NULL,
  `condition_name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `conditions`
--

INSERT INTO `conditions` (`id`, `condition_name`) VALUES
(1, 'New'),
(2, 'Secondhand');

-- --------------------------------------------------------

--
-- Struktur dari tabel `otp`
--

CREATE TABLE `otp` (
  `id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `email` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(256) NOT NULL,
  `store` int(11) NOT NULL,
  `image` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `stock` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `condition_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `product_name`, `store`, `image`, `description`, `stock`, `price`, `condition_id`, `category_id`, `size_id`, `color_id`, `created_at`, `updated_at`) VALUES
(90, 'Nike Airmax 270 (Black)', 6, 'Nike-Airmax-270-(Black)-1601038604701.jpg', 'Nike\'s first lifestyle Air Max brings you style, comfort and big attitude in the Nike Air Max 270. The design draws inspiration from Air Max icons, showcasing Nike\'s greatest innovation with its large window and fresh array of colours.\n\nBenefits\n\n    The Max Air 270 unit delivers unrivalled, all-day comfort.\n    Woven and synthetic fabric on the upper provides a lightweight fit and airy feel.\n    The foam midsole feels soft and comfortable.\n    The stretchy inner sleeve and booty-like construction creates a personalised fit.\n    Rubber on the outsole adds traction and durability.\n\n\nProduct Details\n\n    Pull tab\n    Rubber sole\n    Padded collar\n    Colour Shown: Black/White/Solar Red/Anthracite\n    Style: AH8050-002\n    Country/Region of Origin: Vietnam,Indonesia\n\n\nNike Air Max Origins\n\nRevolutionary Air technology first made its way into Nike footwear in 1978. In 1987, the Air Max 1 debuted with visible Air technology in its heel, allowing fans more than just the feel of Air cushioning—suddenly they could see it. Since then, next-generation Air Max shoes have become a hit with athletes and collectors by offering striking colour combinations and reliable, lightweight cushioning.', 20, 153, 1, 3, 4, 1, '2020-09-25 12:56:45', '2020-09-25 12:56:45'),
(91, 'Adidas Stargon 1.0 (Blue)', 9, 'Adidas-Stargon-1.0-(Blue)-1601125079269.jpg', 'The adidas running shoes for men. These lightweight shoes give all round comfort, cushioning, durability & support in a simplistic design. The combination of Textile-Mesh upper ensure breathability and durability while the Lightstrike IMEVA midsole provides premium cushioning. Full Rubber outsole provides durability. ', 32, 58, 1, 3, 4, 5, '2020-09-26 12:57:59', '2020-09-26 12:57:59'),
(93, 'Alexandre Christie 9200 Nm (Black) - EDIT', 10, 'Alexandre-Christie-9200-Nm-(Black)---EDIT-1601188087300.jpg', 'Having a history of more than half a century in the design and manufacture of quality watches, Alexandre Christie creates an essence in design that is strong in character and the art of watch making. A high-integrity design team works seriously with manufacturing technicians to ensure accurate quality and design interpretation right down to every single part of the Alexandre Christie watch product; make dreams / desires come true through art of watch making.\n\nAll Alexandre Christie watches are manufactured from selected high quality stainless steel. With “stringent testing,” every part of the Alexandre Christie watch can withstand everyday wear. Alexandre Christie, passionate dreams come true', 15, 147, 1, 4, 4, 1, '2020-09-26 19:36:22', '2020-09-26 19:36:22'),
(94, 'Charles & Keith Tuck-In Flap Structured Bag (Pink)', 11, 'Charles-&-Keith-Tuck-In-Flap-Structured-Bag-(Pink)-1601152884208.jpg', 'A practical bag for errands and shopping. Take this sweet pink structured bag into the weekend when you style it with a denim jacket, a mini skirt and mules. ', 10, 63, 1, 7, 3, 6, '2020-09-26 20:41:24', '2020-09-26 20:41:24'),
(100, 'Louis Vuitton Ivory Dress (Black)', 12, 'Louis-Vuitton-Ivory-Dress-(Black)-1601182613414.jpg', 'An elegant update on the little black dress: this wool-and-silk cady crepe design stands out with an embroidered scarf that can be fastened or removed with a zipper at the neck. Inspired by metallic watch bracelets, the aluminum sequins are applied to Monogram twill. Classic yet versatile.', 10, 3750, 1, 13, 3, 1, '2020-09-27 04:56:53', '2020-09-27 04:56:53');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image`) VALUES
(147, 90, 'Nike-Airmax-270-(Black)-1601038604701.jpg'),
(148, 90, 'Nike-Airmax-270-(Black)-1601038604729.jpg'),
(149, 90, 'Nike-Airmax-270-(Black)-1601038604732.jpg'),
(150, 90, 'Nike-Airmax-270-(Black)-1601038604735.jpg'),
(151, 91, 'Adidas-Stargon-1.0-(Blue)-1601125079269.jpg'),
(152, 91, 'Adidas-Stargon-1.0-(Blue)-1601125079298.jpg'),
(153, 91, 'Adidas-Stargon-1.0-(Blue)-1601125079361.jpg'),
(154, 91, 'Adidas-Stargon-1.0-(Blue)-1601125079363.jpg'),
(159, 93, 'Alexandre-Christie-9200-Nm-(Black)---EDIT-1601188087300.jpg'),
(160, 93, 'Alexandre-Christie-9200-Nm-(Black)---EDIT-1601188087481.jpg'),
(161, 93, 'Alexandre-Christie-9200-Nm-(Black)---EDIT-1601188087487.jpg'),
(162, 93, 'Alexandre-Christie-9200-Nm-(Black)---EDIT-1601188087491.jpg'),
(163, 94, 'Charles-&-Keith-Tuck-In-Flap-Structured-Bag-(Pink)-1601152884208.jpg'),
(164, 94, 'Charles-&-Keith-Tuck-In-Flap-Structured-Bag-(Pink)-1601152884253.jpg'),
(165, 94, 'Charles-&-Keith-Tuck-In-Flap-Structured-Bag-(Pink)-1601152884255.jpg'),
(166, 94, 'Charles-&-Keith-Tuck-In-Flap-Structured-Bag-(Pink)-1601152884258.jpg'),
(178, 100, 'Louis-Vuitton-Ivory-Dress-(Black)-1601182613414.jpg'),
(179, 100, 'Louis-Vuitton-Ivory-Dress-(Black)-1601182613523.jpg'),
(180, 100, 'Louis-Vuitton-Ivory-Dress-(Black)-1601182613529.jpg'),
(181, 100, 'Louis-Vuitton-Ivory-Dress-(Black)-1601182613576.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sizes`
--

CREATE TABLE `sizes` (
  `id` int(11) NOT NULL,
  `size` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `sizes`
--

INSERT INTO `sizes` (`id`, `size`) VALUES
(1, 'XS'),
(2, 'S'),
(3, 'M'),
(4, 'L'),
(5, 'XL'),
(7, 'XXL');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `shipping_address` int(11) NOT NULL,
  `ordered_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `total`, `shipping_address`, `ordered_at`) VALUES
(5, 8, 205, 7, '2020-09-27 06:48:53'),
(6, 8, 153, 7, '2020-09-27 07:19:14');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaction_details`
--

CREATE TABLE `transaction_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transaction_details`
--

INSERT INTO `transaction_details` (`id`, `order_id`, `product_id`, `qty`) VALUES
(6, 5, 91, 1),
(7, 5, 93, 1),
(8, 6, 90, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `role` int(2) NOT NULL DEFAULT 0,
  `birthday_date` date DEFAULT NULL,
  `store` varchar(256) NOT NULL,
  `telp` varchar(16) NOT NULL,
  `image` varchar(256) NOT NULL DEFAULT 'user-default.png',
  `is_active` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`, `role`, `birthday_date`, `store`, `telp`, `image`, `is_active`, `created_at`, `updated_at`) VALUES
(6, 'nikecompany@gmail.com', 'Nike Company', '$2b$04$.dAHEZ7A6r4StKe3nAdweOtyLnJEUmKhEAlGdqJvSWcA4UqO6cWq.', 1, NULL, 'Nike Store', '081212345678', 'user-default.png', 0, '2020-09-20 05:17:12', '2020-09-20 05:17:12'),
(8, 'dimasdompit@gmail.com', 'Dimas Mokodompit Edit', '$2b$04$TmZeI.s077iz11R3WSsuKuwESo8y/GokRhpbZK7UBKz99o4q0AiQq', 0, '1995-01-01', '', '', '1601060965631-8.jpg', 0, '2020-09-25 13:36:11', '2020-09-25 13:36:11'),
(9, 'adidascompany@gmail.com', 'Adidas Company', '$2b$04$iy12FIaaGt8eBlz26T9Gd.wYzVN8SGOJx3OBZ8XJIRNnTtFKHF1Ei', 1, NULL, 'Adidas Official', '082143567253', 'user-default.png', 0, '2020-09-26 11:34:26', '2020-09-26 11:34:26'),
(10, 'acofficial@gmail.com', 'AC Corps', '$2b$04$XrZXOi0U.I8LSpzYgeh6mOJh4Y7MiyAwiaU.Spi8TNg35Z5N9qPKa', 1, NULL, 'Alexandre Christie', '085728228888', 'user-default.png', 0, '2020-09-26 19:28:23', '2020-09-26 19:28:23'),
(11, 'charleskeith@gmail.com', 'Charles & Keith', '$2b$04$R/MM2F5DgmFa6W8pU1tw1ew3U4Ia6hYG6mo9miVIdpWJKdBz2IhY2', 1, NULL, 'C & K Official Store', '089822349985', 'user-default.png', 0, '2020-09-26 20:32:50', '2020-09-26 20:32:50'),
(12, 'louisvuitton@gmail.com', 'Louis Vuitton Company', '$2b$04$LjMaVCsEBmSL05CLAmV3huOy4Ww7LQUaVErki0Hj8yuKUgmWgNq8W', 1, NULL, 'Louis Vuitton', '0214356844', 'user-default.png', 0, '2020-09-27 04:49:15', '2020-09-27 04:49:15');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `conditions`
--
ALTER TABLE `conditions`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_ibfk_1` (`condition_id`),
  ADD KEY `products_ibfk_2` (`category_id`),
  ADD KEY `products_ibfk_3` (`color_id`),
  ADD KEY `products_ibfk_4` (`size_id`),
  ADD KEY `products_ibfk_5` (`store`);

--
-- Indeks untuk tabel `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transactions_ibfk_1` (`user_id`),
  ADD KEY `transactions_ibfk_2` (`shipping_address`);

--
-- Indeks untuk tabel `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_details_ibfk_1` (`order_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `conditions`
--
ALTER TABLE `conditions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT untuk tabel `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=182;

--
-- AUTO_INCREMENT untuk tabel `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `transaction_details`
--
ALTER TABLE `transaction_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`condition_id`) REFERENCES `conditions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_5` FOREIGN KEY (`store`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`shipping_address`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD CONSTRAINT `transaction_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
