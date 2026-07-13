-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` LONGTEXT NULL,
    `access_token` LONGTEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` LONGTEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `accounts_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sessions_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification_tokens` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `verification_tokens_token_key`(`token`),
    UNIQUE INDEX `verification_tokens_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contents` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `title_en` VARCHAR(191) NOT NULL,
    `title_cn` VARCHAR(191) NOT NULL,
    `value` LONGTEXT NOT NULL,
    `value_en` LONGTEXT NOT NULL,
    `value_cn` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `berita` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `title_en` VARCHAR(191) NOT NULL,
    `title_cn` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `description_en` LONGTEXT NOT NULL,
    `description_cn` LONGTEXT NOT NULL,
    `filepath` VARCHAR(191) NULL,
    `uploadat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `berkas` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `filepath` VARCHAR(191) NOT NULL,
    `uploadat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengumuman` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `title_en` VARCHAR(191) NOT NULL,
    `title_cn` VARCHAR(191) NOT NULL,
    `file_path` VARCHAR(191) NOT NULL,
    `uploadat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faq` (
    `id` VARCHAR(191) NOT NULL,
    `question` LONGTEXT NOT NULL,
    `question_en` LONGTEXT NOT NULL,
    `question_cn` LONGTEXT NOT NULL,
    `answer` LONGTEXT NOT NULL,
    `answer_en` LONGTEXT NOT NULL,
    `answer_cn` LONGTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prodi` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `nama_en` VARCHAR(191) NOT NULL,
    `nama_cn` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NULL,
    `visi` LONGTEXT NOT NULL,
    `visi_en` LONGTEXT NOT NULL,
    `visi_cn` LONGTEXT NOT NULL,
    `misi` LONGTEXT NOT NULL,
    `misi_en` LONGTEXT NOT NULL,
    `misi_cn` LONGTEXT NOT NULL,

    UNIQUE INDEX `prodi_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dosen` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `nama_en` VARCHAR(191) NOT NULL,
    `nama_cn` VARCHAR(191) NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `jenis_dosen` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `identitas` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `identitas_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ipAddress` VARCHAR(191) NOT NULL,
    `userAgent` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `visitedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
