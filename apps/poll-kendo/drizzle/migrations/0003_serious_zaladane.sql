PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_options` (
	`id` integer PRIMARY KEY NOT NULL,
	`questionId` text,
	`text` text NOT NULL,
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
	`text` text NOT NULL,
	`type` text,
	`updated_at` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
INSERT INTO `__new_questions`("id", "text", "type", "updated_at", "created_at", "deleted_at") SELECT "id", "text", "type", "updated_at", "created_at", "deleted_at" FROM `questions`;--> statement-breakpoint
DROP TABLE `questions`;--> statement-breakpoint
ALTER TABLE `__new_questions` RENAME TO `questions`;