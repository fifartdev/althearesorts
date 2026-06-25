import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "rooms" ADD COLUMN "image_url" varchar;
  ALTER TABLE "_rooms_v" ADD COLUMN "version_image_url" varchar;
  ALTER TABLE "dining" ADD COLUMN "image_url" varchar;
  ALTER TABLE "_dining_v" ADD COLUMN "version_image_url" varchar;
  ALTER TABLE "journal" ADD COLUMN "image_url" varchar;
  ALTER TABLE "_journal_v" ADD COLUMN "version_image_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "rooms" DROP COLUMN "image_url";
  ALTER TABLE "_rooms_v" DROP COLUMN "version_image_url";
  ALTER TABLE "dining" DROP COLUMN "image_url";
  ALTER TABLE "_dining_v" DROP COLUMN "version_image_url";
  ALTER TABLE "journal" DROP COLUMN "image_url";
  ALTER TABLE "_journal_v" DROP COLUMN "version_image_url";`)
}
