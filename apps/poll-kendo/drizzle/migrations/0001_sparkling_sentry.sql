ALTER TABLE `option` RENAME TO `options`;--> statement-breakpoint
ALTER TABLE `question` RENAME TO `questions`;--> statement-breakpoint
ALTER TABLE `response` RENAME TO `responses`;--> statement-breakpoint
ALTER TABLE `responseGroup` RENAME TO `surveys`;--> statement-breakpoint
ALTER TABLE `responses` RENAME COLUMN "responseGroupId" TO "surveysId";--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_options` (
	`id` text PRIMARY KEY NOT NULL,
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
CREATE TABLE `__new_responses` (
	`id` text PRIMARY KEY NOT NULL,
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
ALTER TABLE `__new_responses` RENAME TO `responses`;