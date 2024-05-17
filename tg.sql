CREATE TABLE `Form` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `about` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logoUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isPublic` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `endedAt` datetime(3) DEFAULT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Form_userId_fkey` (`userId`),
  CONSTRAINT `Form_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

CREATE TABLE `Option` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` int NOT NULL,
  `emoji` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `questionId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `index` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `Option_questionId_fkey` (`questionId`),
  CONSTRAINT `Option_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

CREATE TABLE `Question` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isPublic` tinyint(1) NOT NULL DEFAULT '0',
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `formId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `index` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `Question_formId_fkey` (`formId`),
  CONSTRAINT `Question_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `Form` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

CREATE TABLE `Response` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `questionId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sessionId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `optionId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `formId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Response_questionId_fkey` (`questionId`),
  KEY `Response_sessionId_fkey` (`sessionId`),
  KEY `Response_optionId_fkey` (`optionId`),
  KEY `Response_formId_fkey` (`formId`),
  CONSTRAINT `Response_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `Form` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Response_optionId_fkey` FOREIGN KEY (`optionId`) REFERENCES `Option` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `Response_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Response_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

CREATE TABLE `Session` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `formId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Session_formId_fkey` (`formId`),
  CONSTRAINT `Session_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `Form` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `Topic` (
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `Topic_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accessLevel` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

CREATE TABLE `_FormToTopic` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_FormToTopic_AB_unique` (`A`,`B`),
  KEY `_FormToTopic_B_index` (`B`),
  CONSTRAINT `_FormToTopic_A_fkey` FOREIGN KEY (`A`) REFERENCES `Form` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_FormToTopic_B_fkey` FOREIGN KEY (`B`) REFERENCES `Topic` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

CREATE TABLE `_QuestionToTopic` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_QuestionToTopic_AB_unique` (`A`,`B`),
  KEY `_QuestionToTopic_B_index` (`B`),
  CONSTRAINT `_QuestionToTopic_A_fkey` FOREIGN KEY (`A`) REFERENCES `Question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_QuestionToTopic_B_fkey` FOREIGN KEY (`B`) REFERENCES `Topic` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci