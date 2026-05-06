CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"date" date NOT NULL,
	"location" varchar(255) NOT NULL,
	"description" text,
	"categoryId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "event_title_idx" ON "events" USING btree ("title");--> statement-breakpoint
CREATE INDEX "event_category_idx" ON "events" USING btree ("categoryId");--> statement-breakpoint
CREATE INDEX "event_location_idx" ON "events" USING btree ("location");