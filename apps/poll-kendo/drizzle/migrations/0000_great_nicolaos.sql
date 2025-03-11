CREATE TABLE `option` (
	`id` text PRIMARY KEY NOT NULL,
	`questionId` text,
	`text` text,
	`updated_at` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `question` (
	`id` text PRIMARY KEY NOT NULL,
	`text` text,
	`type` text,
	`updated_at` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE TABLE `response` (
	`id` text PRIMARY KEY NOT NULL,
	`responseGroupId` text,
	`optionId` text,
	`questionId` text,
	`updated_at` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`responseGroupId`) REFERENCES `responseGroup`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`optionId`) REFERENCES `option`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `responseGroup` (
	`id` text PRIMARY KEY NOT NULL,
	`updated_at` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`deleted_at` text
);
