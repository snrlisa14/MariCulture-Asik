-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 18 Nov 2024 pada 15.52
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `seativa`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `akuakultur`
--

CREATE TABLE `akuakultur` (
  `id` int(11) NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripton` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `akuakultur`
--

INSERT INTO `akuakultur` (`id`, `image`, `title`, `descripton`) VALUES
(1, 'kesehatan-2.png', '23 Lorem ipsum dolor sit amet.', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius alias dignissimos assumenda?'),
(2, 'kesehatan-2.png', '3 Lorem, ipsum dolor', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius alias dignissimos assumenda?'),
(3, 'kesehatan-2.png', 'lorem, ipsum dolor', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius alias dignissimos assumenda?'),
(9, '1731769161374.jpeg', 'tes', 'tes');

-- --------------------------------------------------------

--
-- Struktur dari tabel `category_recommend`
--

CREATE TABLE `category_recommend` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `category_recommend`
--

INSERT INTO `category_recommend` (`id`, `name`) VALUES
(1, 'Pakan'),
(2, 'Obat-obatan'),
(3, 'Peralatan');

-- --------------------------------------------------------

--
-- Struktur dari tabel `causes`
--

CREATE TABLE `causes` (
  `id` int(11) NOT NULL,
  `disease_id` int(11) NOT NULL,
  `cause` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `causes`
--

INSERT INTO `causes` (`id`, `disease_id`, `cause`) VALUES
(1, 1, 'Kualitas air yang buruk'),
(2, 1, 'Kepadatan ikan yang tinggi'),
(3, 2, 'Kepadatan tebaran yang tinggi'),
(4, 2, 'Sanitasi yang buruk'),
(5, 2, 'Kontak dengan ikan terinfeksi'),
(6, 3, 'Infeksi oleh virus megalocytivirus'),
(7, 3, 'Perubahan musim'),
(8, 4, 'Kualitas air buruk'),
(9, 4, 'Stres pada ikan'),
(10, 4, 'Kontak langsung'),
(11, 5, 'Kepadatan tinggi'),
(12, 5, 'Nutrisi kurang baik'),
(13, 5, 'Stres pada ikan');

-- --------------------------------------------------------

--
-- Struktur dari tabel `diseases`
--

CREATE TABLE `diseases` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `diseases`
--

INSERT INTO `diseases` (`id`, `name`, `description`) VALUES
(1, 'Benedeniasis', 'Penyakit yang disebabkan oleh parasit Benedenia sp., yang sering menyerang ikan laut, terutama ikan kakap putih.'),
(2, 'Trematoda Worm Infection', 'Infeksi cacing trematoda pada ikan laut yang dapat menyebabkan kerugian besar dalam budidaya ikan.'),
(3, 'Scale Drop Disease', 'Penyakit yang menyerang ikan kakap putih yang menyebabkan kerusakan pada sisik dan jaringan ikan.'),
(4, 'Flexibacter Disease', 'Penyakit yang disebabkan oleh bakteri Flexibacter pada ikan kerapu.'),
(5, 'Monogenea Parasite Disease', 'Penyakit yang disebabkan oleh parasit Monogenea yang menginfeksi ikan laut.');

-- --------------------------------------------------------

--
-- Struktur dari tabel `fish`
--

CREATE TABLE `fish` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `fish`
--

INSERT INTO `fish` (`id`, `name`) VALUES
(1, 'Kerapu Cantang'),
(2, 'Kerapu Macan'),
(3, 'Kerapu Bebek'),
(4, 'Kerapu Tikus'),
(5, 'Bawal Bintang'),
(6, 'Kakap Putih'),
(7, 'Napoleon'),
(8, 'Cobia'),
(9, 'Ikan Kuwe');

-- --------------------------------------------------------

--
-- Struktur dari tabel `health`
--

CREATE TABLE `health` (
  `id` int(11) NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripton` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `health`
--

INSERT INTO `health` (`id`, `image`, `title`, `descripton`, `link`) VALUES
(1, '1731603296538.jpg', 'Pemantauan Kondisi Lingkungan', 'Menyediakan dasbor visual yang menampilkan data lingkungan penting seperti suhu, salinitas, dan kadar oksigen terlarut ', '0'),
(10, '1731940623983.jpeg', 'tes', 'tes', 'tes.com');

-- --------------------------------------------------------

--
-- Struktur dari tabel `indicator_environment`
--

CREATE TABLE `indicator_environment` (
  `id` int(11) NOT NULL,
  `fish_id` int(11) NOT NULL,
  `temperature_from` int(11) NOT NULL,
  `temperature_until` int(11) NOT NULL,
  `salinity_from` int(11) NOT NULL,
  `salinity_until` int(11) NOT NULL,
  `oxygen_from` int(11) NOT NULL,
  `oxygen_until` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `indicator_environment`
--

INSERT INTO `indicator_environment` (`id`, `fish_id`, `temperature_from`, `temperature_until`, `salinity_from`, `salinity_until`, `oxygen_from`, `oxygen_until`) VALUES
(1, 1, 28, 32, 24, 33, 5, 7),
(2, 2, 26, 31, 30, 35, 5, 8),
(3, 3, 27, 32, 30, 35, 4, 8),
(4, 4, 25, 32, 20, 32, 4, 8),
(5, 5, 28, 32, 29, 32, 5, 7),
(6, 6, 26, 32, 10, 35, 4, 8),
(7, 7, 27, 29, 27, 32, 3, 10),
(8, 8, 28, 29, 33, 35, 7, 12),
(9, 9, 27, 30, 27, 30, 6, 9);

-- --------------------------------------------------------

--
-- Struktur dari tabel `indicator_food`
--

CREATE TABLE `indicator_food` (
  `id` int(11) NOT NULL,
  `fish_id` int(11) DEFAULT NULL,
  `age_from` int(11) DEFAULT NULL,
  `age_until` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `indicator_food`
--

INSERT INTO `indicator_food` (`id`, `fish_id`, `age_from`, `age_until`, `name`) VALUES
(1, 1, 0, 2, 'Kuning telur sebagai cadangan makanan awal'),
(2, 1, 3, 9, 'Rotifera (1-3 ekor/mL) dan Nauplius Artemia (0,25-0,75 ekor/mL)'),
(3, 1, 10, 16, 'Rotifera, Nauplius Artemia, dan Phytoplankton (Chlorella sp., 5×10⁻⁵ hingga 10⁻² cells/mL)'),
(4, 1, 17, 25, 'Nauplius Artemia dengan kepadatan 2-5 ekor/mL, secara bertahap diganti dengan setengah dewasa'),
(5, 1, 29, 50, 'Ikan rucah cincang seperti teri, belanak, dan cumi-cumi'),
(6, 1, 51, NULL, 'Ikan rucah segar atau pelet protein tinggi'),
(7, 2, 0, 2, 'Fitoplankton (Nannochloropsis oculata)'),
(8, 2, 3, 20, 'Zooplankton seperti Rotifera (Brachionus plicatilis), diberikan dua kali sehari'),
(9, 2, 2, 20, 'Pakan buatan seperti Love Larva'),
(10, 2, 30, NULL, 'Pelet komersial (300-800 mikron) dan ikan rucah kecil'),
(11, 2, 51, NULL, 'Ikan rucah, cumi-cumi, dan udang dengan frekuensi sekali hingga dua kali sehari'),
(12, 3, 0, 3, 'Kuning telur sebagai nutrisi awal'),
(13, 3, 4, 15, 'Rotifera (Brachionus plicatilis, 5-6 individu/mL)'),
(14, 3, 16, 20, 'Rotifera dan Nauplius Artemia'),
(15, 3, 21, 30, 'Pakan buatan seperti Love Larva'),
(16, 3, 36, 90, 'Pelet halus dan ikan rucah kecil'),
(17, 3, 91, NULL, 'Pelet protein tinggi dan ikan rucah, diberikan dua kali sehari'),
(18, 4, 1, 14, 'Minyak cumi sebagai pakan utama'),
(19, 4, 15, 40, 'Zooplankton seperti Artemia dan Fitoplankton (Rotifera)'),
(20, 4, 17, 50, 'Pelet kecil dan rebon'),
(21, 4, 51, NULL, 'Pelet komersial, ikan rucah, dan udang kecil'),
(22, 4, 731, NULL, 'Pelet khusus dan ikan rucah, dua kali sehari'),
(23, 5, 0, 30, 'Rotifera dua kali sehari dan Fitoplankton (Nannochloropsis, Tetraselmis) satu kali sehari'),
(24, 5, 30, 90, 'Pelet kecil dan plankton kecil, diberikan empat kali sehari'),
(25, 5, 91, NULL, 'Ikan rucah dan cumi-cumi satu hingga dua kali sehari'),
(26, 5, 181, NULL, 'Pelet protein tinggi, ikan rucah, dan cumi-cumi dua kali sehari'),
(27, 6, 0, 3, 'Kuning telur sebagai cadangan makanan'),
(28, 6, 3, 15, 'Fitoplankton (Nannochloropsis sp.) dan Rotifera'),
(29, 6, 16, 25, 'Artemia (5-10 individu/mL) dan pelet larva (Love Larva 1)'),
(30, 6, 26, 30, 'Pelet Love Larva 2 dan Love Larva 3'),
(31, 6, 31, NULL, 'Pelet komersial dua kali sehari'),
(32, 6, 181, NULL, 'Ikan rucah seperti ikan kuniran, dan multivitamin seminggu sekali'),
(33, 7, 0, 3, 'Kuning telur sebagai cadangan makanan awal'),
(34, 7, 3, 10, 'Mikroalga (Nannochloropsis sp.) dan kuning telur ayam'),
(35, 7, 10, 40, 'Rotifera dan Nauplii Artemia (0,1-0,2 individu/mL)'),
(36, 7, 41, NULL, 'Ikan rucah (Decapterus spp.) dengan tambahan enzim papain'),
(37, 7, 61, NULL, 'Ikan rucah tinggi protein, diberikan dua kali sehari'),
(38, 8, 1, 25, 'Fitoplankton (Nannochloropsis sp.), Rotifera, Artemia, dan pelet Love Larva'),
(39, 8, 25, 45, 'Pelet kecil (Love Larva 3, Megami GR1) dua kali sehari'),
(40, 8, 46, NULL, 'Pelet protein tinggi (Megami GR5, Megami GR12) dua kali sehari'),
(41, 9, 0, 10, 'Rotifera (5-10 individu/mL)'),
(42, 9, 11, 30, 'Artemia nauplii (3-5 individu/mL) dan Copepoda'),
(43, 9, 31, 90, 'Pelet halus berprotein tinggi, Artemia dewasa, atau potongan ikan kecil'),
(44, 9, 91, NULL, 'Pelet protein tinggi, ikan rucah, dan udang kecil dua kali sehari');

-- --------------------------------------------------------

--
-- Struktur dari tabel `recommendation`
--

CREATE TABLE `recommendation` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripton` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `recommendation`
--

INSERT INTO `recommendation` (`id`, `category_id`, `image`, `title`, `descripton`, `link`) VALUES
(2, 1, 'kesehatan-2.png', 'Lorem, Ipsum Dolor', 'Memberikan deskripsi singkat terkait penyakit yang di derita, serta menawarkan solusi awal yang dapat diterapkan', 'instagram.com'),
(3, 1, 'kesehatan-2.png', 'Lorem, Ipsum dolor', 'Memberikan deskripsi singkat terkait penyakit yang di derita, serta menawarkan solusi awal yang dapat diterapkan fd', 'instagram.com'),
(4, 2, 'kesehatan-2.png', 'Lorem, Ipsum Dolor', 'Memberikan deskripsi singkat terkait penyakit yang di derita, serta menawarkan solusi awal yang dapat diterapkan', 'instagram.com'),
(5, 2, 'kesehatan-2.png', 'Lorem, Ipsum dolor', 'Memberikan deskripsi singkat terkait penyakit yang di derita, serta menawarkan solusi awal yang dapat diterapkan', 'instagram.com'),
(10, 2, '1731654931896.jpg', 'sdsad Tes developer', 'Tes developer', 'tess.com');

-- --------------------------------------------------------

--
-- Struktur dari tabel `symptoms`
--

CREATE TABLE `symptoms` (
  `id` int(11) NOT NULL,
  `disease_id` int(11) NOT NULL,
  `symptom` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `symptoms`
--

INSERT INTO `symptoms` (`id`, `disease_id`, `symptom`) VALUES
(1, 1, 'Pertumbuhan terhambat'),
(2, 1, 'Luka pada kulit'),
(3, 1, 'Kebutaan'),
(4, 1, 'Perilaku abnormal'),
(5, 1, 'Penurunan nafsu makan'),
(6, 2, 'Lemas dan tidak aktif'),
(7, 2, 'Peningkatan lendir pada kulit'),
(8, 2, 'Masalah pernapasan'),
(9, 2, 'Kerusakan pada sirip dan kulit'),
(10, 3, 'Kehilangan sisik'),
(11, 3, 'Perubahan warna'),
(12, 3, 'Kematian mendadak'),
(13, 4, 'Lendir berlebihan'),
(14, 4, 'Bintik merah'),
(15, 4, 'Ekor busuk'),
(16, 4, 'Penurunan nafsu makan'),
(17, 5, 'Luka dan ulcer'),
(18, 5, 'Produksi cairan berlebih'),
(19, 5, 'Nafsu makan menurun'),
(20, 5, 'Perubahan warna tubuh'),
(21, 5, 'Proses respirasi terganggu');

-- --------------------------------------------------------

--
-- Struktur dari tabel `treatments`
--

CREATE TABLE `treatments` (
  `id` int(11) NOT NULL,
  `disease_id` int(11) NOT NULL,
  `treatment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `treatments`
--

INSERT INTO `treatments` (`id`, `disease_id`, `treatment`) VALUES
(1, 1, 'Perendaman dalam air tawar'),
(2, 1, 'Penggunaan formalin'),
(3, 1, 'Perawatan luka'),
(4, 2, 'Penggunaan larutan formalin'),
(5, 2, 'Garam dapur'),
(6, 2, 'Larutan PK atau methylen blue'),
(7, 3, 'Karantina dan pengujian'),
(8, 3, 'Pengelolaan lingkungan'),
(9, 3, 'Vaksinasi dan pengobatan'),
(10, 4, 'Vaksinasi'),
(11, 4, 'Perbaikan kualitas air'),
(12, 4, 'Penggunaan antibakteri'),
(13, 4, 'Peningkatan imunitas'),
(14, 5, 'Pembersihan kolam'),
(15, 5, 'Vaksinasi');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `email`, `name`, `created_at`, `password`, `username`) VALUES
(1, 'admin@gmail.com', 'admin', '2024-11-14 12:40:50', 'rahasia123', 'admin123'),
(3, 'hanum@gmail.com', 'hanum', '2024-11-16 08:10:33', 'rahasia123', 'hanum');

-- --------------------------------------------------------

--
-- Struktur dari tabel `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('0875377a-9b01-4e9e-9b65-bbf456842127', '1aac52aa5564700a06bbe70ed770138b742d3471524dcf78dd078e14af114565', NULL, '20241114032725_add_table', 'A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20241114032725_add_table\n\nDatabase error code: 1061\n\nDatabase error:\nDuplicate key name \'user_email_key\'\n\nPlease check the query number 13 from the migration file.\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name=\"20241114032725_add_table\"\n             at schema-engine\\connectors\\sql-schema-connector\\src\\apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name=\"20241114032725_add_table\"\n             at schema-engine\\core\\src\\commands\\apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine\\core\\src\\state.rs:226', NULL, '2024-11-14 03:27:25.605', 0),
('2aa1cb5a-f246-4147-bcfc-c9f016def4b6', 'f8a22556716223e46e6318e68a266536453c7526dd10e947d5efc6d9cab42a68', '2024-11-14 03:27:13.768', '20241113152140_init', NULL, NULL, '2024-11-14 03:27:13.666', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `akuakultur`
--
ALTER TABLE `akuakultur`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `category_recommend`
--
ALTER TABLE `category_recommend`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `causes`
--
ALTER TABLE `causes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `disease_id` (`disease_id`);

--
-- Indeks untuk tabel `diseases`
--
ALTER TABLE `diseases`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `fish`
--
ALTER TABLE `fish`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `health`
--
ALTER TABLE `health`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `indicator_environment`
--
ALTER TABLE `indicator_environment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `indicator_environment_fish_id_fkey` (`fish_id`);

--
-- Indeks untuk tabel `indicator_food`
--
ALTER TABLE `indicator_food`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fish_id` (`fish_id`);

--
-- Indeks untuk tabel `recommendation`
--
ALTER TABLE `recommendation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recommendation_category_id_fkey` (`category_id`);

--
-- Indeks untuk tabel `symptoms`
--
ALTER TABLE `symptoms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `disease_id` (`disease_id`);

--
-- Indeks untuk tabel `treatments`
--
ALTER TABLE `treatments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `disease_id` (`disease_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`),
  ADD UNIQUE KEY `user_username_key` (`username`);

--
-- Indeks untuk tabel `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `akuakultur`
--
ALTER TABLE `akuakultur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `category_recommend`
--
ALTER TABLE `category_recommend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `causes`
--
ALTER TABLE `causes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `diseases`
--
ALTER TABLE `diseases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `fish`
--
ALTER TABLE `fish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `health`
--
ALTER TABLE `health`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `indicator_environment`
--
ALTER TABLE `indicator_environment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `indicator_food`
--
ALTER TABLE `indicator_food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT untuk tabel `recommendation`
--
ALTER TABLE `recommendation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `symptoms`
--
ALTER TABLE `symptoms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT untuk tabel `treatments`
--
ALTER TABLE `treatments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `causes`
--
ALTER TABLE `causes`
  ADD CONSTRAINT `causes_ibfk_1` FOREIGN KEY (`disease_id`) REFERENCES `diseases` (`id`);

--
-- Ketidakleluasaan untuk tabel `indicator_environment`
--
ALTER TABLE `indicator_environment`
  ADD CONSTRAINT `indicator_environment_fish_id_fkey` FOREIGN KEY (`fish_id`) REFERENCES `fish` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `indicator_food`
--
ALTER TABLE `indicator_food`
  ADD CONSTRAINT `indicator_food_ibfk_1` FOREIGN KEY (`fish_id`) REFERENCES `fish` (`id`);

--
-- Ketidakleluasaan untuk tabel `recommendation`
--
ALTER TABLE `recommendation`
  ADD CONSTRAINT `recommendation_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category_recommend` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `symptoms`
--
ALTER TABLE `symptoms`
  ADD CONSTRAINT `symptoms_ibfk_1` FOREIGN KEY (`disease_id`) REFERENCES `diseases` (`id`);

--
-- Ketidakleluasaan untuk tabel `treatments`
--
ALTER TABLE `treatments`
  ADD CONSTRAINT `treatments_ibfk_1` FOREIGN KEY (`disease_id`) REFERENCES `diseases` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
