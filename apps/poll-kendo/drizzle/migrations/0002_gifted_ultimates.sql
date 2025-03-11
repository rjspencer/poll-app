PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_options` (
	`id` integer PRIMARY KEY NOT NULL,
	`questionId` text,
	`text` text,
	`updated_at` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_options`("id", "questionId", "text", "updated_at", "created_at", "deleted_at") SELECT "id", "questionId", "text", "updated_at", "created_at", "deleted_at" FROM `options`;--> statement-breakpoint
DROP TABLE `options`;--> statement-breakpoint
ALTER TABLE `__new_options` RENAME TO `options`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_questions` (
	`id` integer PRIMARY KEY NOT NULL,
	`text` text,
	`type` text,
	`updated_at` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
INSERT INTO `__new_questions`("id", "text", "type", "updated_at", "created_at", "deleted_at") SELECT "id", "text", "type", "updated_at", "created_at", "deleted_at" FROM `questions`;--> statement-breakpoint
DROP TABLE `questions`;--> statement-breakpoint
ALTER TABLE `__new_questions` RENAME TO `questions`;--> statement-breakpoint
CREATE TABLE `__new_responses` (
	`id` integer PRIMARY KEY NOT NULL,
	`surveysId` text,
	`optionId` text,
	`questionId` text,
	`updated_at` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`surveysId`) REFERENCES `surveys`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`optionId`) REFERENCES `options`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_responses`("id", "surveysId", "optionId", "questionId", "updated_at", "created_at", "deleted_at") SELECT "id", "surveysId", "optionId", "questionId", "updated_at", "created_at", "deleted_at" FROM `responses`;--> statement-breakpoint
DROP TABLE `responses`;--> statement-breakpoint
ALTER TABLE `__new_responses` RENAME TO `responses`;--> statement-breakpoint
CREATE TABLE `__new_surveys` (
	`id` integer PRIMARY KEY NOT NULL,
	`updated_at` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
INSERT INTO `__new_surveys`("id", "updated_at", "created_at", "deleted_at") SELECT "id", "updated_at", "created_at", "deleted_at" FROM `surveys`;--> statement-breakpoint
DROP TABLE `surveys`;--> statement-breakpoint
ALTER TABLE `__new_surveys` RENAME TO `surveys`;