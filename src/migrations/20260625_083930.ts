import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'el', 'fr');
  CREATE TYPE "public"."enum_users_role" AS ENUM('superadmin', 'admin', 'client');
  CREATE TYPE "public"."enum_users_preferred_locale" AS ENUM('en', 'el');
  CREATE TYPE "public"."enum_rooms_category" AS ENUM('standard-double', 'deluxe-double-mv-pv', 'deluxe-private-pool', 'superior-sea-view', 'junior-suite', 'loft-suite');
  CREATE TYPE "public"."enum_rooms_bed_type" AS ENUM('king-twin', 'king', 'twin');
  CREATE TYPE "public"."enum_rooms_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__rooms_v_version_category" AS ENUM('standard-double', 'deluxe-double-mv-pv', 'deluxe-private-pool', 'superior-sea-view', 'junior-suite', 'loft-suite');
  CREATE TYPE "public"."enum__rooms_v_version_bed_type" AS ENUM('king-twin', 'king', 'twin');
  CREATE TYPE "public"."enum__rooms_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__rooms_v_published_locale" AS ENUM('en', 'el', 'fr');
  CREATE TYPE "public"."enum_offers_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__offers_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__offers_v_published_locale" AS ENUM('en', 'el', 'fr');
  CREATE TYPE "public"."enum_experiences_category" AS ENUM('activities', 'spa', 'pool', 'events', 'corporate');
  CREATE TYPE "public"."enum_experiences_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__experiences_v_version_category" AS ENUM('activities', 'spa', 'pool', 'events', 'corporate');
  CREATE TYPE "public"."enum__experiences_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__experiences_v_published_locale" AS ENUM('en', 'el', 'fr');
  CREATE TYPE "public"."enum_dining_venue" AS ENUM('aither', 'breakfast', 'all-day', 'bar', 'pool-bar');
  CREATE TYPE "public"."enum_dining_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__dining_v_version_venue" AS ENUM('aither', 'breakfast', 'all-day', 'bar', 'pool-bar');
  CREATE TYPE "public"."enum__dining_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__dining_v_published_locale" AS ENUM('en', 'el', 'fr');
  CREATE TYPE "public"."enum_gallery_category" AS ENUM('rooms', 'dining', 'spa', 'exterior', 'pool', 'events');
  CREATE TYPE "public"."enum_testimonials_rating" AS ENUM('1', '2', '3', '4', '5');
  CREATE TYPE "public"."enum_testimonials_source" AS ENUM('google', 'booking', 'tripadvisor', 'direct');
  CREATE TYPE "public"."enum_journal_category" AS ENUM('local-guides', 'hotel-stories', 'gastronomy', 'wellness', 'events', 'corinthia');
  CREATE TYPE "public"."enum_journal_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__journal_v_version_category" AS ENUM('local-guides', 'hotel-stories', 'gastronomy', 'wellness', 'events', 'corinthia');
  CREATE TYPE "public"."enum__journal_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__journal_v_published_locale" AS ENUM('en', 'el', 'fr');
  CREATE TYPE "public"."enum_faqs_category" AS ENUM('rooms', 'checkin', 'dining', 'spa', 'family', 'location', 'reservations', 'general');
  CREATE TYPE "public"."enum_locations_category" AS ENUM('beaches', 'archaeological', 'towns', 'activities', 'dining', 'day-trips');
  CREATE TYPE "public"."enum_pages_blocks_content_block_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_content_block_width" AS ENUM('full', 'content', 'narrow');
  CREATE TYPE "public"."enum_pages_blocks_content_block_background" AS ENUM('white', 'cream', 'dark', 'gold');
  CREATE TYPE "public"."enum_pages_blocks_content_image_block_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_blocks_content_image_block_background" AS ENUM('white', 'cream', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_image_block_size" AS ENUM('full', 'content', 'small');
  CREATE TYPE "public"."enum_pages_blocks_image_block_aspect_ratio" AS ENUM('landscape', 'portrait', 'square', 'cinema');
  CREATE TYPE "public"."enum_pages_blocks_gallery_block_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_rooms_showcase_block_display_mode" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_pages_blocks_experiences_block_filter_by_category" AS ENUM('all', 'activities', 'spa', 'pool', 'events', 'corporate');
  CREATE TYPE "public"."enum_pages_blocks_dining_block_display_mode" AS ENUM('list', 'grid', 'featured');
  CREATE TYPE "public"."enum_pages_blocks_spa_highlight_block_background" AS ENUM('dark', 'cream', 'white');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_block_display_mode" AS ENUM('carousel', 'grid', 'single');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_block_background" AS ENUM('cream', 'white', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_stats_block_background" AS ENUM('dark', 'gold', 'cream');
  CREATE TYPE "public"."enum_pages_blocks_cta_block_style" AS ENUM('dark', 'gold', 'minimal');
  CREATE TYPE "public"."enum_pages_blocks_faq_block_filter_by_category" AS ENUM('all', 'rooms', 'checkin', 'dining', 'spa', 'location', 'reservations', 'general');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_block_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_block_card_style" AS ENUM('image', 'icon', 'text');
  CREATE TYPE "public"."enum_pages_blocks_video_block_video_type" AS ENUM('youtube', 'vimeo', 'upload');
  CREATE TYPE "public"."enum_pages_blocks_video_block_size" AS ENUM('full', 'content');
  CREATE TYPE "public"."enum_pages_blocks_spacer_block_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_hero_style" AS ENUM('cinematic', 'minimal', 'color', 'text');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_content_block_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_content_block_width" AS ENUM('full', 'content', 'narrow');
  CREATE TYPE "public"."enum__pages_v_blocks_content_block_background" AS ENUM('white', 'cream', 'dark', 'gold');
  CREATE TYPE "public"."enum__pages_v_blocks_content_image_block_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_content_image_block_background" AS ENUM('white', 'cream', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_image_block_size" AS ENUM('full', 'content', 'small');
  CREATE TYPE "public"."enum__pages_v_blocks_image_block_aspect_ratio" AS ENUM('landscape', 'portrait', 'square', 'cinema');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_block_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_rooms_showcase_block_display_mode" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum__pages_v_blocks_experiences_block_filter_by_category" AS ENUM('all', 'activities', 'spa', 'pool', 'events', 'corporate');
  CREATE TYPE "public"."enum__pages_v_blocks_dining_block_display_mode" AS ENUM('list', 'grid', 'featured');
  CREATE TYPE "public"."enum__pages_v_blocks_spa_highlight_block_background" AS ENUM('dark', 'cream', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_block_display_mode" AS ENUM('carousel', 'grid', 'single');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_block_background" AS ENUM('cream', 'white', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_block_background" AS ENUM('dark', 'gold', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_block_style" AS ENUM('dark', 'gold', 'minimal');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_block_filter_by_category" AS ENUM('all', 'rooms', 'checkin', 'dining', 'spa', 'location', 'reservations', 'general');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_cards_block_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_cards_block_card_style" AS ENUM('image', 'icon', 'text');
  CREATE TYPE "public"."enum__pages_v_blocks_video_block_video_type" AS ENUM('youtube', 'vimeo', 'upload');
  CREATE TYPE "public"."enum__pages_v_blocks_video_block_size" AS ENUM('full', 'content');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_block_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_version_hero_style" AS ENUM('cinematic', 'minimal', 'color', 'text');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'el', 'fr');
  CREATE TYPE "public"."enum_form_submissions_form_type" AS ENUM('contact', 'reservation', 'wedding', 'corporate', 'restaurant', 'general');
  CREATE TYPE "public"."enum_form_submissions_status" AS ENUM('new', 'read', 'replied', 'archived');
  CREATE TYPE "public"."enum_site_settings_announcement_style" AS ENUM('gold', 'dark', 'info');
  CREATE TYPE "public"."enum_header_nav_items_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_seo_settings_same_as_profiles_platform" AS ENUM('instagram', 'facebook', 'linkedin', 'tripadvisor', 'booking', 'google', 'other');
  CREATE TYPE "public"."enum_seo_settings_twitter_card_type" AS ENUM('summary_large_image', 'summary');
  CREATE TYPE "public"."enum_seo_settings_default_locale" AS ENUM('en', 'el', 'fr');
  CREATE TYPE "public"."enum_seo_settings_sitemap_change_freq" AS ENUM('always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never');
  CREATE TYPE "public"."enum_seo_settings_business_type" AS ENUM('LodgingBusiness', 'Hotel', 'Resort', 'BedAndBreakfast');
  CREATE TYPE "public"."enum_seo_settings_price_range" AS ENUM('€', '€€', '€€€', '€€€€');
  CREATE TYPE "public"."enum_geo_settings_opening_hours_spec_day_of_week" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
  CREATE TYPE "public"."enum_geo_settings_nested_places_schema_type" AS ENUM('Restaurant', 'Bar', 'HealthAndBeautyBusiness', 'SwimmingPool', 'ConferenceRoom', 'SportsActivityLocation');
  CREATE TYPE "public"."enum_geo_settings_price_range" AS ENUM('€', '€€', '€€€', '€€€€');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"role" "enum_users_role" DEFAULT 'client' NOT NULL,
  	"preferred_locale" "enum_users_preferred_locale" DEFAULT 'en',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "rooms_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "rooms_gallery_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "rooms_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar
  );
  
  CREATE TABLE "rooms_amenities_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "rooms_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "rooms_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "rooms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"category" "enum_rooms_category",
  	"featured" boolean DEFAULT false,
  	"hero_image_id" integer,
  	"size" varchar,
  	"max_occupancy" numeric DEFAULT 2,
  	"bed_type" "enum_rooms_bed_type",
  	"starting_price" numeric,
  	"booking_url" varchar DEFAULT 'https://althearesort.reserve-online.net',
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_rooms_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "rooms_locales" (
  	"tagline" varchar,
  	"short_description" varchar,
  	"description" jsonb,
  	"view_type" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_rooms_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rooms_v_version_gallery_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_rooms_v_version_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rooms_v_version_amenities_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_rooms_v_version_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rooms_v_version_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_rooms_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_category" "enum__rooms_v_version_category",
  	"version_featured" boolean DEFAULT false,
  	"version_hero_image_id" integer,
  	"version_size" varchar,
  	"version_max_occupancy" numeric DEFAULT 2,
  	"version_bed_type" "enum__rooms_v_version_bed_type",
  	"version_starting_price" numeric,
  	"version_booking_url" varchar DEFAULT 'https://althearesort.reserve-online.net',
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__rooms_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__rooms_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_rooms_v_locales" (
  	"version_tagline" varchar,
  	"version_short_description" varchar,
  	"version_description" jsonb,
  	"version_view_type" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "offers_conditions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "offers_conditions_locales" (
  	"condition" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "offers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"hero_image_id" integer,
  	"discount_percent" numeric,
  	"valid_from" timestamp(3) with time zone,
  	"valid_until" timestamp(3) with time zone,
  	"cta_url" varchar DEFAULT 'https://althearesort.reserve-online.net',
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_offers_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "offers_locales" (
  	"title" varchar,
  	"badge" varchar,
  	"tagline" varchar,
  	"description" jsonb,
  	"how_to_book" jsonb,
  	"cta_label" varchar DEFAULT 'Book Now',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_offers_v_version_conditions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offers_v_version_conditions_locales" (
  	"condition" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_offers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_hero_image_id" integer,
  	"version_discount_percent" numeric,
  	"version_valid_from" timestamp(3) with time zone,
  	"version_valid_until" timestamp(3) with time zone,
  	"version_cta_url" varchar DEFAULT 'https://althearesort.reserve-online.net',
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__offers_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__offers_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_offers_v_locales" (
  	"version_title" varchar,
  	"version_badge" varchar,
  	"version_tagline" varchar,
  	"version_description" jsonb,
  	"version_how_to_book" jsonb,
  	"version_cta_label" varchar DEFAULT 'Book Now',
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "experiences_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "experiences_gallery_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "experiences_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "experiences_highlights_locales" (
  	"label" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category" "enum_experiences_category",
  	"hero_image_id" integer,
  	"cta_url" varchar DEFAULT 'https://althearesort.reserve-online.net',
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_experiences_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "experiences_locales" (
  	"title" varchar,
  	"tagline" varchar,
  	"short_description" varchar,
  	"description" jsonb,
  	"cta_label" varchar DEFAULT 'Book Now',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_experiences_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_experiences_v_version_gallery_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_experiences_v_version_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_experiences_v_version_highlights_locales" (
  	"label" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_experiences_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_category" "enum__experiences_v_version_category",
  	"version_hero_image_id" integer,
  	"version_cta_url" varchar DEFAULT 'https://althearesort.reserve-online.net',
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__experiences_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__experiences_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_experiences_v_locales" (
  	"version_title" varchar,
  	"version_tagline" varchar,
  	"version_short_description" varchar,
  	"version_description" jsonb,
  	"version_cta_label" varchar DEFAULT 'Book Now',
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "dining_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "dining_gallery_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "dining" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"venue" "enum_dining_venue",
  	"hero_image_id" integer,
  	"reservation_url" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_dining_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "dining_locales" (
  	"name" varchar,
  	"tagline" varchar,
  	"short_description" varchar,
  	"description" jsonb,
  	"opening_hours" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_dining_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_dining_v_version_gallery_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_dining_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_venue" "enum__dining_v_version_venue",
  	"version_hero_image_id" integer,
  	"version_reservation_url" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__dining_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__dining_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_dining_v_locales" (
  	"version_name" varchar,
  	"version_tagline" varchar,
  	"version_short_description" varchar,
  	"version_description" jsonb,
  	"version_opening_hours" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"category" "enum_gallery_category",
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"author_name" varchar NOT NULL,
  	"author_origin" varchar,
  	"stay_date" varchar,
  	"room_stayed" varchar,
  	"rating" "enum_testimonials_rating" DEFAULT '5',
  	"featured" boolean DEFAULT false,
  	"source" "enum_testimonials_source",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "journal" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category" "enum_journal_category",
  	"published_at" timestamp(3) with time zone,
  	"author" varchar DEFAULT 'Althea Resorts',
  	"hero_image_id" integer,
  	"featured" boolean DEFAULT false,
  	"reading_time" numeric,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_journal_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "journal_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_journal_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_category" "enum__journal_v_version_category",
  	"version_published_at" timestamp(3) with time zone,
  	"version_author" varchar DEFAULT 'Althea Resorts',
  	"version_hero_image_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_reading_time" numeric,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__journal_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__journal_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_journal_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "enum_faqs_category",
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs_locales" (
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_locations_category",
  	"image_id" integer,
  	"distance" varchar,
  	"coordinates_lat" numeric,
  	"coordinates_lng" numeric,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "locations_locales" (
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"alignment" "enum_pages_blocks_content_block_alignment" DEFAULT 'left',
  	"width" "enum_pages_blocks_content_block_width" DEFAULT 'content',
  	"background" "enum_pages_blocks_content_block_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_block_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_content_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_content_image_block_image_position" DEFAULT 'right',
  	"cta_url" varchar,
  	"background" "enum_pages_blocks_content_image_block_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_image_block_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"image_id" integer,
  	"size" "enum_pages_blocks_image_block_size" DEFAULT 'full',
  	"aspect_ratio" "enum_pages_blocks_image_block_aspect_ratio" DEFAULT 'landscape',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_block_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery_block_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_gallery_block_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"columns" "enum_pages_blocks_gallery_block_columns" DEFAULT '3',
  	"cta_url" varchar DEFAULT '/gallery',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_block_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_rooms_showcase_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"display_mode" "enum_pages_blocks_rooms_showcase_block_display_mode" DEFAULT 'grid',
  	"max_items" numeric DEFAULT 6,
  	"cta_url" varchar DEFAULT '/accommodation',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rooms_showcase_block_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"cta_label" varchar DEFAULT 'View All Rooms',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_experiences_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"filter_by_category" "enum_pages_blocks_experiences_block_filter_by_category" DEFAULT 'all',
  	"cta_url" varchar DEFAULT '/experiences',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_experiences_block_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_dining_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"display_mode" "enum_pages_blocks_dining_block_display_mode" DEFAULT 'list',
  	"cta_url" varchar DEFAULT '/gastronomy',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_dining_block_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_spa_highlight_block_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar
  );
  
  CREATE TABLE "pages_blocks_spa_highlight_block_features_locales" (
  	"label" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_spa_highlight_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"image_id" integer,
  	"cta_url" varchar DEFAULT '/spa',
  	"background" "enum_pages_blocks_spa_highlight_block_background" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_spa_highlight_block_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"cta_label" varchar DEFAULT 'Discover the Spa',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"display_mode" "enum_pages_blocks_testimonials_block_display_mode" DEFAULT 'carousel',
  	"background" "enum_pages_blocks_testimonials_block_background" DEFAULT 'cream',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_block_locales" (
  	"heading" varchar DEFAULT 'What Guests Say',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats_block_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_block_stats_locales" (
  	"label" varchar,
  	"sublabel" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"background" "enum_pages_blocks_stats_block_background" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_block_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"image_id" integer,
  	"button_url" varchar DEFAULT 'https://althearesort.reserve-online.net',
  	"secondary_button_url" varchar,
  	"style" "enum_pages_blocks_cta_block_style" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_block_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subtext" varchar,
  	"button_label" varchar DEFAULT 'Book Now',
  	"secondary_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"filter_by_category" "enum_pages_blocks_faq_block_filter_by_category" DEFAULT 'all',
  	"cta_url" varchar DEFAULT '/faq',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_block_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_location_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"show_map" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_location_block_locales" (
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_journal_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"max_items" numeric DEFAULT 3,
  	"cta_url" varchar DEFAULT '/journal',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_journal_block_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"cta_label" varchar DEFAULT 'Read the Journal',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_offers_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"cta_url" varchar DEFAULT '/offers',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_offers_block_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_cards_block_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"image_id" integer,
  	"cta_url" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_cards_block_cards_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_cards_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"columns" "enum_pages_blocks_feature_cards_block_columns" DEFAULT '3',
  	"card_style" "enum_pages_blocks_feature_cards_block_card_style" DEFAULT 'image',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_cards_block_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_video_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"video_type" "enum_pages_blocks_video_block_video_type" DEFAULT 'youtube',
  	"video_url" varchar,
  	"video_file_id" integer,
  	"poster_image_id" integer,
  	"size" "enum_pages_blocks_video_block_size" DEFAULT 'full',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_block_locales" (
  	"heading" varchar,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_spacer_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"size" "enum_pages_blocks_spacer_block_size" DEFAULT 'md',
  	"show_divider" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"hero_style" "enum_pages_hero_style" DEFAULT 'cinematic',
  	"hero_image_id" integer,
  	"hero_overlay_opacity" numeric DEFAULT 40,
  	"hero_background_color" varchar DEFAULT '#102027',
  	"hero_cta_url" varchar,
  	"hero_secondary_cta_url" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"hero_label" varchar,
  	"hero_headline" varchar,
  	"hero_subheadline" varchar,
  	"hero_intro" varchar,
  	"hero_cta_label" varchar,
  	"hero_secondary_cta_label" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"rooms_id" integer,
  	"experiences_id" integer,
  	"dining_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer,
  	"locations_id" integer,
  	"journal_id" integer,
  	"offers_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"alignment" "enum__pages_v_blocks_content_block_alignment" DEFAULT 'left',
  	"width" "enum__pages_v_blocks_content_block_width" DEFAULT 'content',
  	"background" "enum__pages_v_blocks_content_block_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_block_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_content_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_content_image_block_image_position" DEFAULT 'right',
  	"cta_url" varchar,
  	"background" "enum__pages_v_blocks_content_image_block_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_image_block_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"image_id" integer,
  	"size" "enum__pages_v_blocks_image_block_size" DEFAULT 'full',
  	"aspect_ratio" "enum__pages_v_blocks_image_block_aspect_ratio" DEFAULT 'landscape',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_block_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_block_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_block_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"columns" "enum__pages_v_blocks_gallery_block_columns" DEFAULT '3',
  	"cta_url" varchar DEFAULT '/gallery',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_block_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_rooms_showcase_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"display_mode" "enum__pages_v_blocks_rooms_showcase_block_display_mode" DEFAULT 'grid',
  	"max_items" numeric DEFAULT 6,
  	"cta_url" varchar DEFAULT '/accommodation',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rooms_showcase_block_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"cta_label" varchar DEFAULT 'View All Rooms',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_experiences_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"filter_by_category" "enum__pages_v_blocks_experiences_block_filter_by_category" DEFAULT 'all',
  	"cta_url" varchar DEFAULT '/experiences',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_experiences_block_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_dining_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"display_mode" "enum__pages_v_blocks_dining_block_display_mode" DEFAULT 'list',
  	"cta_url" varchar DEFAULT '/gastronomy',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_dining_block_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_spa_highlight_block_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spa_highlight_block_features_locales" (
  	"label" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_spa_highlight_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"image_id" integer,
  	"cta_url" varchar DEFAULT '/spa',
  	"background" "enum__pages_v_blocks_spa_highlight_block_background" DEFAULT 'dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spa_highlight_block_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"cta_label" varchar DEFAULT 'Discover the Spa',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"display_mode" "enum__pages_v_blocks_testimonials_block_display_mode" DEFAULT 'carousel',
  	"background" "enum__pages_v_blocks_testimonials_block_background" DEFAULT 'cream',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_block_locales" (
  	"heading" varchar DEFAULT 'What Guests Say',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_stats_block_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_block_stats_locales" (
  	"label" varchar,
  	"sublabel" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_stats_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"background" "enum__pages_v_blocks_stats_block_background" DEFAULT 'dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_block_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"image_id" integer,
  	"button_url" varchar DEFAULT 'https://althearesort.reserve-online.net',
  	"secondary_button_url" varchar,
  	"style" "enum__pages_v_blocks_cta_block_style" DEFAULT 'dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_block_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subtext" varchar,
  	"button_label" varchar DEFAULT 'Book Now',
  	"secondary_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"filter_by_category" "enum__pages_v_blocks_faq_block_filter_by_category" DEFAULT 'all',
  	"cta_url" varchar DEFAULT '/faq',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_block_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_location_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"show_map" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_location_block_locales" (
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_journal_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"max_items" numeric DEFAULT 3,
  	"cta_url" varchar DEFAULT '/journal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_journal_block_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"cta_label" varchar DEFAULT 'Read the Journal',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_offers_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"cta_url" varchar DEFAULT '/offers',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_offers_block_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards_block_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"image_id" integer,
  	"cta_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards_block_cards_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"columns" "enum__pages_v_blocks_feature_cards_block_columns" DEFAULT '3',
  	"card_style" "enum__pages_v_blocks_feature_cards_block_card_style" DEFAULT 'image',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards_block_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_video_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"video_type" "enum__pages_v_blocks_video_block_video_type" DEFAULT 'youtube',
  	"video_url" varchar,
  	"video_file_id" integer,
  	"poster_image_id" integer,
  	"size" "enum__pages_v_blocks_video_block_size" DEFAULT 'full',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_block_locales" (
  	"heading" varchar,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_spacer_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"size" "enum__pages_v_blocks_spacer_block_size" DEFAULT 'md',
  	"show_divider" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_hero_style" "enum__pages_v_version_hero_style" DEFAULT 'cinematic',
  	"version_hero_image_id" integer,
  	"version_hero_overlay_opacity" numeric DEFAULT 40,
  	"version_hero_background_color" varchar DEFAULT '#102027',
  	"version_hero_cta_url" varchar,
  	"version_hero_secondary_cta_url" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_hero_label" varchar,
  	"version_hero_headline" varchar,
  	"version_hero_subheadline" varchar,
  	"version_hero_intro" varchar,
  	"version_hero_cta_label" varchar,
  	"version_hero_secondary_cta_label" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"rooms_id" integer,
  	"experiences_id" integer,
  	"dining_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer,
  	"locations_id" integer,
  	"journal_id" integer,
  	"offers_id" integer
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"form_type" "enum_form_submissions_form_type" DEFAULT 'contact',
  	"status" "enum_form_submissions_status" DEFAULT 'new',
  	"subject" varchar,
  	"message" varchar NOT NULL,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"rooms_id" integer,
  	"offers_id" integer,
  	"experiences_id" integer,
  	"dining_id" integer,
  	"gallery_id" integer,
  	"testimonials_id" integer,
  	"journal_id" integer,
  	"faqs_id" integer,
  	"locations_id" integer,
  	"pages_id" integer,
  	"form_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Althea Resorts' NOT NULL,
  	"logo_id" integer,
  	"logo_light_id" integer,
  	"favicon_id" integer,
  	"apple_touch_icon_id" integer,
  	"default_o_g_image_id" integer,
  	"instagram" varchar DEFAULT 'https://www.instagram.com/althearesorts',
  	"facebook" varchar DEFAULT 'https://www.facebook.com/profile.php?id=61589365637032',
  	"linkedin" varchar DEFAULT 'https://www.linkedin.com/company/althearesorts',
  	"twitter" varchar,
  	"youtube" varchar,
  	"tripadvisor" varchar,
  	"maintenance_mode" boolean DEFAULT false,
  	"cookie_consent_enabled" boolean DEFAULT true,
  	"announcement_banner_enabled" boolean DEFAULT false,
  	"announcement_cta_url" varchar,
  	"announcement_style" "enum_site_settings_announcement_style" DEFAULT 'gold',
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"tagline" varchar DEFAULT 'Redefining Hospitality With Timeless Elegance',
  	"maintenance_message" varchar,
  	"cookie_consent_message" varchar DEFAULT 'We use cookies to improve your experience on our website.',
  	"announcement_message" varchar,
  	"announcement_cta_label" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_nav_items_dropdown" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items_dropdown_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_header_nav_items_type" DEFAULT 'internal',
  	"url" varchar,
  	"internal_url" varchar
  );
  
  CREATE TABLE "header_nav_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_url" varchar DEFAULT 'https://althearesort.reserve-online.net',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_locales" (
  	"cta_label" varchar DEFAULT 'Book Now',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_columns_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"social_instagram" varchar,
  	"social_facebook" varchar,
  	"social_tripadvisor" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"copyright_text" varchar DEFAULT '© 2025 Althea Resorts. All rights reserved.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "booking_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"booking_engine_url" varchar DEFAULT 'https://althearesort.reserve-online.net' NOT NULL,
  	"sticky_bar_enabled" boolean DEFAULT true,
  	"floating_c_t_a_enabled" boolean DEFAULT true,
  	"direct_booking_discount" numeric DEFAULT 10,
  	"opening_offer_end_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "booking_settings_locales" (
  	"sticky_bar_text" varchar DEFAULT 'Reserve your stay — 60 minutes from Athens',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"address" varchar DEFAULT 'Ano Loutro, Xylokastro, Corinthia, Greece',
  	"phone" varchar DEFAULT '+30 211 41 84 108',
  	"email" varchar DEFAULT 'reservations@althearesorts.com',
  	"reservations_email" varchar DEFAULT 'reservations@althearesorts.com',
  	"coordinates_lat" numeric DEFAULT 38.0567,
  	"coordinates_lng" numeric DEFAULT 22.6345,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_info_locales" (
  	"directions" varchar DEFAULT '60 minutes from Athens by car. Follow the Athens–Corinth motorway toward the Peloponnese, exit at Xylokastro.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "seo_settings_additional_locales" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL,
  	"url_prefix" varchar NOT NULL
  );
  
  CREATE TABLE "seo_settings_available_languages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" varchar NOT NULL
  );
  
  CREATE TABLE "seo_settings_amenity_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "seo_settings_same_as_profiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_seo_settings_same_as_profiles_platform",
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "seo_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"default_o_g_image_id" integer,
  	"twitter_card_type" "enum_seo_settings_twitter_card_type" DEFAULT 'summary_large_image',
  	"twitter_handle" varchar,
  	"site_url" varchar DEFAULT 'https://althearesorts.com' NOT NULL,
  	"hreflang_enabled" boolean DEFAULT true,
  	"default_locale" "enum_seo_settings_default_locale" DEFAULT 'en',
  	"robots_txt" varchar DEFAULT 'User-agent: *
  Allow: /
  
  User-agent: GPTBot
  Disallow: /
  
  User-agent: anthropic-ai
  Disallow: /
  
  User-agent: CCBot
  Disallow: /
  
  Sitemap: https://althearesorts.com/sitemap.xml',
  	"no_index_sitewide" boolean DEFAULT false,
  	"sitemap_enabled" boolean DEFAULT true,
  	"sitemap_change_freq" "enum_seo_settings_sitemap_change_freq" DEFAULT 'weekly',
  	"google_analytics_id" varchar,
  	"google_tag_manager_id" varchar,
  	"meta_pixel_id" varchar,
  	"google_verification" varchar,
  	"bing_verification" varchar,
  	"facebook_domain_verification" varchar,
  	"business_name" varchar DEFAULT 'Althea Resorts',
  	"business_alternate_name" varchar DEFAULT 'Althea Exclusive Resorts & Spa',
  	"business_type" "enum_seo_settings_business_type" DEFAULT 'LodgingBusiness',
  	"price_range" "enum_seo_settings_price_range" DEFAULT '€€€€',
  	"star_rating" numeric DEFAULT 5,
  	"number_of_rooms" numeric DEFAULT 41,
  	"checkin_time" varchar DEFAULT '15:00',
  	"checkout_time" varchar DEFAULT '11:00',
  	"currencies_accepted" varchar DEFAULT 'EUR',
  	"payment_accepted" varchar DEFAULT 'Cash, Credit Card, Debit Card',
  	"schema_enabled" boolean DEFAULT true,
  	"hotel_schema_custom_json" varchar,
  	"breadcrumb_enabled" boolean DEFAULT true,
  	"llms_enabled" boolean DEFAULT true,
  	"llms_txt" varchar,
  	"ai_training_opt_out" boolean DEFAULT true,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "seo_settings_locales" (
  	"default_title" varchar DEFAULT 'Althea Resorts — Luxury Hotel in Corinthia, Greece',
  	"title_suffix" varchar DEFAULT '| Althea Resorts',
  	"default_description" varchar DEFAULT 'A luxury boutique resort on the hills of Ano Loutro, Corinthia. 41 rooms and suites with views of the Corinthian Gulf. 60 minutes from Athens.',
  	"default_keywords" varchar DEFAULT 'luxury hotel Greece, boutique resort Corinthia, hotel Xylokastro, Althea Resorts',
  	"entity_description" varchar DEFAULT 'Althea Resorts is a 5-star luxury boutique hotel located in Ano Loutro, Xylokastro, Corinthia, Greece, on the northern Peloponnese coast. It features 41 rooms and suites with views of the Corinthian Gulf, the Ocean Spa with Oceanis certified biodegradable cosmetics, the rooftop restaurant AITHER, an infinity pool, conference facilities, and a private beach shuttle. It is 60 minutes from Athens by car.',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "geo_settings_opening_hours_spec_day_of_week" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_geo_settings_opening_hours_spec_day_of_week",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "geo_settings_opening_hours_spec" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"opens" varchar,
  	"closes" varchar
  );
  
  CREATE TABLE "geo_settings_available_languages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" varchar NOT NULL
  );
  
  CREATE TABLE "geo_settings_amenity_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"value" boolean DEFAULT true
  );
  
  CREATE TABLE "geo_settings_nested_places" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"schema_type" "enum_geo_settings_nested_places_schema_type" DEFAULT 'Restaurant' NOT NULL,
  	"name" varchar NOT NULL,
  	"serves_cuisine" varchar,
  	"price_range" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "geo_settings_nested_places_locales" (
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "geo_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"legal_name" varchar DEFAULT 'Althea Resorts' NOT NULL,
  	"alternate_name" varchar DEFAULT 'Althea Exclusive Resorts & Spa',
  	"logo_image_id" integer,
  	"hero_image_id" integer,
  	"street_address" varchar DEFAULT 'Ano Loutro',
  	"address_locality" varchar DEFAULT 'Xylokastro',
  	"address_region" varchar DEFAULT 'Corinthia',
  	"postal_code" varchar DEFAULT '20400',
  	"address_country" varchar DEFAULT 'GR',
  	"coordinates_latitude" numeric DEFAULT 38.0945616,
  	"coordinates_longitude" numeric DEFAULT 22.5454614,
  	"google_maps_url" varchar,
  	"google_place_id" varchar,
  	"telephone" varchar DEFAULT '+30 27430 24063',
  	"mobile_phone" varchar DEFAULT '+30 211 41 84 108',
  	"email" varchar DEFAULT 'reservations@althearesorts.com',
  	"reservations_email" varchar DEFAULT 'reservations@althearesorts.com',
  	"info_email" varchar DEFAULT 'info@althearesorts.com',
  	"fax" varchar,
  	"url" varchar DEFAULT 'https://althearesorts.com',
  	"booking_url" varchar DEFAULT 'https://althearesort.reserve-online.net',
  	"reception247" boolean DEFAULT true,
  	"checkin_time" varchar DEFAULT '15:00',
  	"checkout_time" varchar DEFAULT '11:00',
  	"star_rating" numeric DEFAULT 5,
  	"number_of_rooms" numeric DEFAULT 41,
  	"price_range" "enum_geo_settings_price_range" DEFAULT '€€€€',
  	"currencies_accepted" varchar DEFAULT 'EUR',
  	"payment_accepted" varchar DEFAULT 'Cash, Credit Card, Debit Card',
  	"instagram" varchar DEFAULT 'https://www.instagram.com/althearesorts',
  	"facebook" varchar DEFAULT 'https://www.facebook.com/profile.php?id=61589365637032',
  	"linkedin" varchar DEFAULT 'https://www.linkedin.com/company/althearesorts',
  	"tripadvisor" varchar,
  	"bookingcom" varchar,
  	"google_business_profile" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "geo_settings_locales" (
  	"brand_name" varchar DEFAULT 'Althea Resorts',
  	"description" varchar DEFAULT 'A luxury boutique resort on the hillside of Ano Loutro, near Xylokastro, Corinthia, Greece. 60 minutes from Athens. 41 rooms and suites, Ocean Spa, rooftop restaurant AITHER, and private beach shuttle.',
  	"seasonal_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_gallery" ADD CONSTRAINT "rooms_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rooms_gallery" ADD CONSTRAINT "rooms_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_gallery_locales" ADD CONSTRAINT "rooms_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_amenities" ADD CONSTRAINT "rooms_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_amenities_locales" ADD CONSTRAINT "rooms_amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms_amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_highlights" ADD CONSTRAINT "rooms_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_highlights_locales" ADD CONSTRAINT "rooms_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rooms_locales" ADD CONSTRAINT "rooms_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rooms_locales" ADD CONSTRAINT "rooms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_gallery" ADD CONSTRAINT "_rooms_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_gallery" ADD CONSTRAINT "_rooms_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_gallery_locales" ADD CONSTRAINT "_rooms_v_version_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v_version_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_amenities" ADD CONSTRAINT "_rooms_v_version_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_amenities_locales" ADD CONSTRAINT "_rooms_v_version_amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v_version_amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_highlights" ADD CONSTRAINT "_rooms_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_highlights_locales" ADD CONSTRAINT "_rooms_v_version_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v_version_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v" ADD CONSTRAINT "_rooms_v_parent_id_rooms_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v" ADD CONSTRAINT "_rooms_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v_locales" ADD CONSTRAINT "_rooms_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v_locales" ADD CONSTRAINT "_rooms_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_conditions" ADD CONSTRAINT "offers_conditions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers_conditions_locales" ADD CONSTRAINT "offers_conditions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers_conditions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers" ADD CONSTRAINT "offers_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offers_locales" ADD CONSTRAINT "offers_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offers_locales" ADD CONSTRAINT "offers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_version_conditions" ADD CONSTRAINT "_offers_v_version_conditions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v_version_conditions_locales" ADD CONSTRAINT "_offers_v_version_conditions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v_version_conditions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offers_v" ADD CONSTRAINT "_offers_v_parent_id_offers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."offers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offers_v" ADD CONSTRAINT "_offers_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offers_v_locales" ADD CONSTRAINT "_offers_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_offers_v_locales" ADD CONSTRAINT "_offers_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_gallery" ADD CONSTRAINT "experiences_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_gallery" ADD CONSTRAINT "experiences_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_gallery_locales" ADD CONSTRAINT "experiences_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_highlights" ADD CONSTRAINT "experiences_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_highlights_locales" ADD CONSTRAINT "experiences_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_locales" ADD CONSTRAINT "experiences_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_locales" ADD CONSTRAINT "experiences_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_gallery" ADD CONSTRAINT "_experiences_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_gallery" ADD CONSTRAINT "_experiences_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_gallery_locales" ADD CONSTRAINT "_experiences_v_version_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v_version_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_highlights" ADD CONSTRAINT "_experiences_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v_version_highlights_locales" ADD CONSTRAINT "_experiences_v_version_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v_version_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experiences_v" ADD CONSTRAINT "_experiences_v_parent_id_experiences_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v" ADD CONSTRAINT "_experiences_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v_locales" ADD CONSTRAINT "_experiences_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experiences_v_locales" ADD CONSTRAINT "_experiences_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dining_gallery" ADD CONSTRAINT "dining_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dining_gallery" ADD CONSTRAINT "dining_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dining"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dining_gallery_locales" ADD CONSTRAINT "dining_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dining_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dining" ADD CONSTRAINT "dining_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dining_locales" ADD CONSTRAINT "dining_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dining_locales" ADD CONSTRAINT "dining_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dining"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dining_v_version_gallery" ADD CONSTRAINT "_dining_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dining_v_version_gallery" ADD CONSTRAINT "_dining_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dining_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dining_v_version_gallery_locales" ADD CONSTRAINT "_dining_v_version_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dining_v_version_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dining_v" ADD CONSTRAINT "_dining_v_parent_id_dining_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."dining"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dining_v" ADD CONSTRAINT "_dining_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dining_v_locales" ADD CONSTRAINT "_dining_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dining_v_locales" ADD CONSTRAINT "_dining_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dining_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_locales" ADD CONSTRAINT "gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal" ADD CONSTRAINT "journal_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journal_locales" ADD CONSTRAINT "journal_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journal_locales" ADD CONSTRAINT "journal_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journal_v" ADD CONSTRAINT "_journal_v_parent_id_journal_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."journal"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_journal_v" ADD CONSTRAINT "_journal_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_journal_v_locales" ADD CONSTRAINT "_journal_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_journal_v_locales" ADD CONSTRAINT "_journal_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_locales" ADD CONSTRAINT "locations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_block" ADD CONSTRAINT "pages_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_block_locales" ADD CONSTRAINT "pages_blocks_content_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_image_block" ADD CONSTRAINT "pages_blocks_content_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_image_block" ADD CONSTRAINT "pages_blocks_content_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_image_block_locales" ADD CONSTRAINT "pages_blocks_content_image_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_image_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_block" ADD CONSTRAINT "pages_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_block" ADD CONSTRAINT "pages_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_block_locales" ADD CONSTRAINT "pages_blocks_image_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_block_images" ADD CONSTRAINT "pages_blocks_gallery_block_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_block_images" ADD CONSTRAINT "pages_blocks_gallery_block_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_block_images_locales" ADD CONSTRAINT "pages_blocks_gallery_block_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_block_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_block" ADD CONSTRAINT "pages_blocks_gallery_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_block_locales" ADD CONSTRAINT "pages_blocks_gallery_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rooms_showcase_block" ADD CONSTRAINT "pages_blocks_rooms_showcase_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rooms_showcase_block_locales" ADD CONSTRAINT "pages_blocks_rooms_showcase_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rooms_showcase_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_experiences_block" ADD CONSTRAINT "pages_blocks_experiences_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_experiences_block_locales" ADD CONSTRAINT "pages_blocks_experiences_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_experiences_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dining_block" ADD CONSTRAINT "pages_blocks_dining_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_dining_block_locales" ADD CONSTRAINT "pages_blocks_dining_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_dining_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spa_highlight_block_features" ADD CONSTRAINT "pages_blocks_spa_highlight_block_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_spa_highlight_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spa_highlight_block_features_locales" ADD CONSTRAINT "pages_blocks_spa_highlight_block_features_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_spa_highlight_block_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spa_highlight_block" ADD CONSTRAINT "pages_blocks_spa_highlight_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_spa_highlight_block" ADD CONSTRAINT "pages_blocks_spa_highlight_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spa_highlight_block_locales" ADD CONSTRAINT "pages_blocks_spa_highlight_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_spa_highlight_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_block" ADD CONSTRAINT "pages_blocks_testimonials_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_block_locales" ADD CONSTRAINT "pages_blocks_testimonials_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_block_stats" ADD CONSTRAINT "pages_blocks_stats_block_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_block_stats_locales" ADD CONSTRAINT "pages_blocks_stats_block_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_block_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_block" ADD CONSTRAINT "pages_blocks_stats_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_block_locales" ADD CONSTRAINT "pages_blocks_stats_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_block" ADD CONSTRAINT "pages_blocks_cta_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_block" ADD CONSTRAINT "pages_blocks_cta_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_block_locales" ADD CONSTRAINT "pages_blocks_cta_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_block" ADD CONSTRAINT "pages_blocks_faq_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_block_locales" ADD CONSTRAINT "pages_blocks_faq_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_location_block" ADD CONSTRAINT "pages_blocks_location_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_location_block_locales" ADD CONSTRAINT "pages_blocks_location_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_location_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_journal_block" ADD CONSTRAINT "pages_blocks_journal_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_journal_block_locales" ADD CONSTRAINT "pages_blocks_journal_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_journal_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_offers_block" ADD CONSTRAINT "pages_blocks_offers_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_offers_block_locales" ADD CONSTRAINT "pages_blocks_offers_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_offers_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_block_cards" ADD CONSTRAINT "pages_blocks_feature_cards_block_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_block_cards" ADD CONSTRAINT "pages_blocks_feature_cards_block_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_cards_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_block_cards_locales" ADD CONSTRAINT "pages_blocks_feature_cards_block_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_cards_block_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_block" ADD CONSTRAINT "pages_blocks_feature_cards_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_block_locales" ADD CONSTRAINT "pages_blocks_feature_cards_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_cards_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_block" ADD CONSTRAINT "pages_blocks_video_block_video_file_id_media_id_fk" FOREIGN KEY ("video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_block" ADD CONSTRAINT "pages_blocks_video_block_poster_image_id_media_id_fk" FOREIGN KEY ("poster_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_block" ADD CONSTRAINT "pages_blocks_video_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_block_locales" ADD CONSTRAINT "pages_blocks_video_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_video_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spacer_block" ADD CONSTRAINT "pages_blocks_spacer_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_rooms_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_dining_fk" FOREIGN KEY ("dining_id") REFERENCES "public"."dining"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_journal_fk" FOREIGN KEY ("journal_id") REFERENCES "public"."journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_offers_fk" FOREIGN KEY ("offers_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_block" ADD CONSTRAINT "_pages_v_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_block_locales" ADD CONSTRAINT "_pages_v_blocks_content_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_image_block" ADD CONSTRAINT "_pages_v_blocks_content_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_image_block" ADD CONSTRAINT "_pages_v_blocks_content_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_image_block_locales" ADD CONSTRAINT "_pages_v_blocks_content_image_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_image_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_block" ADD CONSTRAINT "_pages_v_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_block" ADD CONSTRAINT "_pages_v_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_block_locales" ADD CONSTRAINT "_pages_v_blocks_image_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_block_images" ADD CONSTRAINT "_pages_v_blocks_gallery_block_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_block_images" ADD CONSTRAINT "_pages_v_blocks_gallery_block_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_block_images_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_block_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_block_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_block" ADD CONSTRAINT "_pages_v_blocks_gallery_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_block_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rooms_showcase_block" ADD CONSTRAINT "_pages_v_blocks_rooms_showcase_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rooms_showcase_block_locales" ADD CONSTRAINT "_pages_v_blocks_rooms_showcase_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rooms_showcase_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_experiences_block" ADD CONSTRAINT "_pages_v_blocks_experiences_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_experiences_block_locales" ADD CONSTRAINT "_pages_v_blocks_experiences_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_experiences_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_dining_block" ADD CONSTRAINT "_pages_v_blocks_dining_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_dining_block_locales" ADD CONSTRAINT "_pages_v_blocks_dining_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_dining_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spa_highlight_block_features" ADD CONSTRAINT "_pages_v_blocks_spa_highlight_block_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_spa_highlight_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spa_highlight_block_features_locales" ADD CONSTRAINT "_pages_v_blocks_spa_highlight_block_features_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_spa_highlight_block_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spa_highlight_block" ADD CONSTRAINT "_pages_v_blocks_spa_highlight_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spa_highlight_block" ADD CONSTRAINT "_pages_v_blocks_spa_highlight_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spa_highlight_block_locales" ADD CONSTRAINT "_pages_v_blocks_spa_highlight_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_spa_highlight_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_block" ADD CONSTRAINT "_pages_v_blocks_testimonials_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_block_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_block_stats" ADD CONSTRAINT "_pages_v_blocks_stats_block_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_block_stats_locales" ADD CONSTRAINT "_pages_v_blocks_stats_block_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_block_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_block" ADD CONSTRAINT "_pages_v_blocks_stats_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_block_locales" ADD CONSTRAINT "_pages_v_blocks_stats_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_block" ADD CONSTRAINT "_pages_v_blocks_cta_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_block" ADD CONSTRAINT "_pages_v_blocks_cta_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_block_locales" ADD CONSTRAINT "_pages_v_blocks_cta_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_block" ADD CONSTRAINT "_pages_v_blocks_faq_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_block_locales" ADD CONSTRAINT "_pages_v_blocks_faq_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_location_block" ADD CONSTRAINT "_pages_v_blocks_location_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_location_block_locales" ADD CONSTRAINT "_pages_v_blocks_location_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_location_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_journal_block" ADD CONSTRAINT "_pages_v_blocks_journal_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_journal_block_locales" ADD CONSTRAINT "_pages_v_blocks_journal_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_journal_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offers_block" ADD CONSTRAINT "_pages_v_blocks_offers_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_offers_block_locales" ADD CONSTRAINT "_pages_v_blocks_offers_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_offers_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards_block_cards" ADD CONSTRAINT "_pages_v_blocks_feature_cards_block_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards_block_cards" ADD CONSTRAINT "_pages_v_blocks_feature_cards_block_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_cards_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards_block_cards_locales" ADD CONSTRAINT "_pages_v_blocks_feature_cards_block_cards_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_cards_block_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards_block" ADD CONSTRAINT "_pages_v_blocks_feature_cards_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards_block_locales" ADD CONSTRAINT "_pages_v_blocks_feature_cards_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_cards_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_block" ADD CONSTRAINT "_pages_v_blocks_video_block_video_file_id_media_id_fk" FOREIGN KEY ("video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_block" ADD CONSTRAINT "_pages_v_blocks_video_block_poster_image_id_media_id_fk" FOREIGN KEY ("poster_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_block" ADD CONSTRAINT "_pages_v_blocks_video_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_block_locales" ADD CONSTRAINT "_pages_v_blocks_video_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_video_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spacer_block" ADD CONSTRAINT "_pages_v_blocks_spacer_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_rooms_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_dining_fk" FOREIGN KEY ("dining_id") REFERENCES "public"."dining"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_journal_fk" FOREIGN KEY ("journal_id") REFERENCES "public"."journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_offers_fk" FOREIGN KEY ("offers_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rooms_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_offers_fk" FOREIGN KEY ("offers_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dining_fk" FOREIGN KEY ("dining_id") REFERENCES "public"."dining"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_journal_fk" FOREIGN KEY ("journal_id") REFERENCES "public"."journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_apple_touch_icon_id_media_id_fk" FOREIGN KEY ("apple_touch_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_o_g_image_id_media_id_fk" FOREIGN KEY ("default_o_g_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_dropdown" ADD CONSTRAINT "header_nav_items_dropdown_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_dropdown_locales" ADD CONSTRAINT "header_nav_items_dropdown_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_dropdown"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links_locales" ADD CONSTRAINT "footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_locales" ADD CONSTRAINT "footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links_locales" ADD CONSTRAINT "footer_legal_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "booking_settings_locales" ADD CONSTRAINT "booking_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."booking_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_locales" ADD CONSTRAINT "contact_info_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_additional_locales" ADD CONSTRAINT "seo_settings_additional_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_available_languages" ADD CONSTRAINT "seo_settings_available_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_amenity_features" ADD CONSTRAINT "seo_settings_amenity_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_same_as_profiles" ADD CONSTRAINT "seo_settings_same_as_profiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings" ADD CONSTRAINT "seo_settings_default_o_g_image_id_media_id_fk" FOREIGN KEY ("default_o_g_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo_settings_locales" ADD CONSTRAINT "seo_settings_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo_settings_locales" ADD CONSTRAINT "seo_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geo_settings_opening_hours_spec_day_of_week" ADD CONSTRAINT "geo_settings_opening_hours_spec_day_of_week_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."geo_settings_opening_hours_spec"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geo_settings_opening_hours_spec" ADD CONSTRAINT "geo_settings_opening_hours_spec_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geo_settings_available_languages" ADD CONSTRAINT "geo_settings_available_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geo_settings_amenity_features" ADD CONSTRAINT "geo_settings_amenity_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geo_settings_nested_places" ADD CONSTRAINT "geo_settings_nested_places_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geo_settings_nested_places_locales" ADD CONSTRAINT "geo_settings_nested_places_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geo_settings_nested_places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geo_settings" ADD CONSTRAINT "geo_settings_logo_image_id_media_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "geo_settings" ADD CONSTRAINT "geo_settings_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "geo_settings_locales" ADD CONSTRAINT "geo_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geo_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "rooms_gallery_order_idx" ON "rooms_gallery" USING btree ("_order");
  CREATE INDEX "rooms_gallery_parent_id_idx" ON "rooms_gallery" USING btree ("_parent_id");
  CREATE INDEX "rooms_gallery_image_idx" ON "rooms_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "rooms_gallery_locales_locale_parent_id_unique" ON "rooms_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "rooms_amenities_order_idx" ON "rooms_amenities" USING btree ("_order");
  CREATE INDEX "rooms_amenities_parent_id_idx" ON "rooms_amenities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "rooms_amenities_locales_locale_parent_id_unique" ON "rooms_amenities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "rooms_highlights_order_idx" ON "rooms_highlights" USING btree ("_order");
  CREATE INDEX "rooms_highlights_parent_id_idx" ON "rooms_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "rooms_highlights_locales_locale_parent_id_unique" ON "rooms_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "rooms_slug_idx" ON "rooms" USING btree ("slug");
  CREATE INDEX "rooms_hero_image_idx" ON "rooms" USING btree ("hero_image_id");
  CREATE INDEX "rooms_updated_at_idx" ON "rooms" USING btree ("updated_at");
  CREATE INDEX "rooms_created_at_idx" ON "rooms" USING btree ("created_at");
  CREATE INDEX "rooms__status_idx" ON "rooms" USING btree ("_status");
  CREATE INDEX "rooms_meta_meta_image_idx" ON "rooms_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "rooms_locales_locale_parent_id_unique" ON "rooms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_rooms_v_version_gallery_order_idx" ON "_rooms_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_rooms_v_version_gallery_parent_id_idx" ON "_rooms_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_rooms_v_version_gallery_image_idx" ON "_rooms_v_version_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "_rooms_v_version_gallery_locales_locale_parent_id_unique" ON "_rooms_v_version_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_rooms_v_version_amenities_order_idx" ON "_rooms_v_version_amenities" USING btree ("_order");
  CREATE INDEX "_rooms_v_version_amenities_parent_id_idx" ON "_rooms_v_version_amenities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_rooms_v_version_amenities_locales_locale_parent_id_unique" ON "_rooms_v_version_amenities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_rooms_v_version_highlights_order_idx" ON "_rooms_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_rooms_v_version_highlights_parent_id_idx" ON "_rooms_v_version_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_rooms_v_version_highlights_locales_locale_parent_id_unique" ON "_rooms_v_version_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_rooms_v_parent_idx" ON "_rooms_v" USING btree ("parent_id");
  CREATE INDEX "_rooms_v_version_version_slug_idx" ON "_rooms_v" USING btree ("version_slug");
  CREATE INDEX "_rooms_v_version_version_hero_image_idx" ON "_rooms_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_rooms_v_version_version_updated_at_idx" ON "_rooms_v" USING btree ("version_updated_at");
  CREATE INDEX "_rooms_v_version_version_created_at_idx" ON "_rooms_v" USING btree ("version_created_at");
  CREATE INDEX "_rooms_v_version_version__status_idx" ON "_rooms_v" USING btree ("version__status");
  CREATE INDEX "_rooms_v_created_at_idx" ON "_rooms_v" USING btree ("created_at");
  CREATE INDEX "_rooms_v_updated_at_idx" ON "_rooms_v" USING btree ("updated_at");
  CREATE INDEX "_rooms_v_snapshot_idx" ON "_rooms_v" USING btree ("snapshot");
  CREATE INDEX "_rooms_v_published_locale_idx" ON "_rooms_v" USING btree ("published_locale");
  CREATE INDEX "_rooms_v_latest_idx" ON "_rooms_v" USING btree ("latest");
  CREATE INDEX "_rooms_v_autosave_idx" ON "_rooms_v" USING btree ("autosave");
  CREATE INDEX "_rooms_v_version_meta_version_meta_image_idx" ON "_rooms_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_rooms_v_locales_locale_parent_id_unique" ON "_rooms_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "offers_conditions_order_idx" ON "offers_conditions" USING btree ("_order");
  CREATE INDEX "offers_conditions_parent_id_idx" ON "offers_conditions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "offers_conditions_locales_locale_parent_id_unique" ON "offers_conditions_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "offers_slug_idx" ON "offers" USING btree ("slug");
  CREATE INDEX "offers_hero_image_idx" ON "offers" USING btree ("hero_image_id");
  CREATE INDEX "offers_updated_at_idx" ON "offers" USING btree ("updated_at");
  CREATE INDEX "offers_created_at_idx" ON "offers" USING btree ("created_at");
  CREATE INDEX "offers__status_idx" ON "offers" USING btree ("_status");
  CREATE INDEX "offers_meta_meta_image_idx" ON "offers_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "offers_locales_locale_parent_id_unique" ON "offers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_offers_v_version_conditions_order_idx" ON "_offers_v_version_conditions" USING btree ("_order");
  CREATE INDEX "_offers_v_version_conditions_parent_id_idx" ON "_offers_v_version_conditions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_offers_v_version_conditions_locales_locale_parent_id_unique" ON "_offers_v_version_conditions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_offers_v_parent_idx" ON "_offers_v" USING btree ("parent_id");
  CREATE INDEX "_offers_v_version_version_slug_idx" ON "_offers_v" USING btree ("version_slug");
  CREATE INDEX "_offers_v_version_version_hero_image_idx" ON "_offers_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_offers_v_version_version_updated_at_idx" ON "_offers_v" USING btree ("version_updated_at");
  CREATE INDEX "_offers_v_version_version_created_at_idx" ON "_offers_v" USING btree ("version_created_at");
  CREATE INDEX "_offers_v_version_version__status_idx" ON "_offers_v" USING btree ("version__status");
  CREATE INDEX "_offers_v_created_at_idx" ON "_offers_v" USING btree ("created_at");
  CREATE INDEX "_offers_v_updated_at_idx" ON "_offers_v" USING btree ("updated_at");
  CREATE INDEX "_offers_v_snapshot_idx" ON "_offers_v" USING btree ("snapshot");
  CREATE INDEX "_offers_v_published_locale_idx" ON "_offers_v" USING btree ("published_locale");
  CREATE INDEX "_offers_v_latest_idx" ON "_offers_v" USING btree ("latest");
  CREATE INDEX "_offers_v_autosave_idx" ON "_offers_v" USING btree ("autosave");
  CREATE INDEX "_offers_v_version_meta_version_meta_image_idx" ON "_offers_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_offers_v_locales_locale_parent_id_unique" ON "_offers_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experiences_gallery_order_idx" ON "experiences_gallery" USING btree ("_order");
  CREATE INDEX "experiences_gallery_parent_id_idx" ON "experiences_gallery" USING btree ("_parent_id");
  CREATE INDEX "experiences_gallery_image_idx" ON "experiences_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "experiences_gallery_locales_locale_parent_id_unique" ON "experiences_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experiences_highlights_order_idx" ON "experiences_highlights" USING btree ("_order");
  CREATE INDEX "experiences_highlights_parent_id_idx" ON "experiences_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "experiences_highlights_locales_locale_parent_id_unique" ON "experiences_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "experiences_slug_idx" ON "experiences" USING btree ("slug");
  CREATE INDEX "experiences_hero_image_idx" ON "experiences" USING btree ("hero_image_id");
  CREATE INDEX "experiences_updated_at_idx" ON "experiences" USING btree ("updated_at");
  CREATE INDEX "experiences_created_at_idx" ON "experiences" USING btree ("created_at");
  CREATE INDEX "experiences__status_idx" ON "experiences" USING btree ("_status");
  CREATE INDEX "experiences_meta_meta_image_idx" ON "experiences_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "experiences_locales_locale_parent_id_unique" ON "experiences_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_experiences_v_version_gallery_order_idx" ON "_experiences_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_experiences_v_version_gallery_parent_id_idx" ON "_experiences_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_experiences_v_version_gallery_image_idx" ON "_experiences_v_version_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "_experiences_v_version_gallery_locales_locale_parent_id_uniq" ON "_experiences_v_version_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_experiences_v_version_highlights_order_idx" ON "_experiences_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_experiences_v_version_highlights_parent_id_idx" ON "_experiences_v_version_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_experiences_v_version_highlights_locales_locale_parent_id_u" ON "_experiences_v_version_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_experiences_v_parent_idx" ON "_experiences_v" USING btree ("parent_id");
  CREATE INDEX "_experiences_v_version_version_slug_idx" ON "_experiences_v" USING btree ("version_slug");
  CREATE INDEX "_experiences_v_version_version_hero_image_idx" ON "_experiences_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_experiences_v_version_version_updated_at_idx" ON "_experiences_v" USING btree ("version_updated_at");
  CREATE INDEX "_experiences_v_version_version_created_at_idx" ON "_experiences_v" USING btree ("version_created_at");
  CREATE INDEX "_experiences_v_version_version__status_idx" ON "_experiences_v" USING btree ("version__status");
  CREATE INDEX "_experiences_v_created_at_idx" ON "_experiences_v" USING btree ("created_at");
  CREATE INDEX "_experiences_v_updated_at_idx" ON "_experiences_v" USING btree ("updated_at");
  CREATE INDEX "_experiences_v_snapshot_idx" ON "_experiences_v" USING btree ("snapshot");
  CREATE INDEX "_experiences_v_published_locale_idx" ON "_experiences_v" USING btree ("published_locale");
  CREATE INDEX "_experiences_v_latest_idx" ON "_experiences_v" USING btree ("latest");
  CREATE INDEX "_experiences_v_autosave_idx" ON "_experiences_v" USING btree ("autosave");
  CREATE INDEX "_experiences_v_version_meta_version_meta_image_idx" ON "_experiences_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_experiences_v_locales_locale_parent_id_unique" ON "_experiences_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "dining_gallery_order_idx" ON "dining_gallery" USING btree ("_order");
  CREATE INDEX "dining_gallery_parent_id_idx" ON "dining_gallery" USING btree ("_parent_id");
  CREATE INDEX "dining_gallery_image_idx" ON "dining_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "dining_gallery_locales_locale_parent_id_unique" ON "dining_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "dining_slug_idx" ON "dining" USING btree ("slug");
  CREATE INDEX "dining_hero_image_idx" ON "dining" USING btree ("hero_image_id");
  CREATE INDEX "dining_updated_at_idx" ON "dining" USING btree ("updated_at");
  CREATE INDEX "dining_created_at_idx" ON "dining" USING btree ("created_at");
  CREATE INDEX "dining__status_idx" ON "dining" USING btree ("_status");
  CREATE INDEX "dining_meta_meta_image_idx" ON "dining_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "dining_locales_locale_parent_id_unique" ON "dining_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_dining_v_version_gallery_order_idx" ON "_dining_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_dining_v_version_gallery_parent_id_idx" ON "_dining_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_dining_v_version_gallery_image_idx" ON "_dining_v_version_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "_dining_v_version_gallery_locales_locale_parent_id_unique" ON "_dining_v_version_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_dining_v_parent_idx" ON "_dining_v" USING btree ("parent_id");
  CREATE INDEX "_dining_v_version_version_slug_idx" ON "_dining_v" USING btree ("version_slug");
  CREATE INDEX "_dining_v_version_version_hero_image_idx" ON "_dining_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_dining_v_version_version_updated_at_idx" ON "_dining_v" USING btree ("version_updated_at");
  CREATE INDEX "_dining_v_version_version_created_at_idx" ON "_dining_v" USING btree ("version_created_at");
  CREATE INDEX "_dining_v_version_version__status_idx" ON "_dining_v" USING btree ("version__status");
  CREATE INDEX "_dining_v_created_at_idx" ON "_dining_v" USING btree ("created_at");
  CREATE INDEX "_dining_v_updated_at_idx" ON "_dining_v" USING btree ("updated_at");
  CREATE INDEX "_dining_v_snapshot_idx" ON "_dining_v" USING btree ("snapshot");
  CREATE INDEX "_dining_v_published_locale_idx" ON "_dining_v" USING btree ("published_locale");
  CREATE INDEX "_dining_v_latest_idx" ON "_dining_v" USING btree ("latest");
  CREATE INDEX "_dining_v_autosave_idx" ON "_dining_v" USING btree ("autosave");
  CREATE INDEX "_dining_v_version_meta_version_meta_image_idx" ON "_dining_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_dining_v_locales_locale_parent_id_unique" ON "_dining_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "gallery_image_idx" ON "gallery" USING btree ("image_id");
  CREATE INDEX "gallery_updated_at_idx" ON "gallery" USING btree ("updated_at");
  CREATE INDEX "gallery_created_at_idx" ON "gallery" USING btree ("created_at");
  CREATE UNIQUE INDEX "gallery_locales_locale_parent_id_unique" ON "gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "journal_slug_idx" ON "journal" USING btree ("slug");
  CREATE INDEX "journal_hero_image_idx" ON "journal" USING btree ("hero_image_id");
  CREATE INDEX "journal_updated_at_idx" ON "journal" USING btree ("updated_at");
  CREATE INDEX "journal_created_at_idx" ON "journal" USING btree ("created_at");
  CREATE INDEX "journal__status_idx" ON "journal" USING btree ("_status");
  CREATE INDEX "journal_meta_meta_image_idx" ON "journal_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "journal_locales_locale_parent_id_unique" ON "journal_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_journal_v_parent_idx" ON "_journal_v" USING btree ("parent_id");
  CREATE INDEX "_journal_v_version_version_slug_idx" ON "_journal_v" USING btree ("version_slug");
  CREATE INDEX "_journal_v_version_version_hero_image_idx" ON "_journal_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_journal_v_version_version_updated_at_idx" ON "_journal_v" USING btree ("version_updated_at");
  CREATE INDEX "_journal_v_version_version_created_at_idx" ON "_journal_v" USING btree ("version_created_at");
  CREATE INDEX "_journal_v_version_version__status_idx" ON "_journal_v" USING btree ("version__status");
  CREATE INDEX "_journal_v_created_at_idx" ON "_journal_v" USING btree ("created_at");
  CREATE INDEX "_journal_v_updated_at_idx" ON "_journal_v" USING btree ("updated_at");
  CREATE INDEX "_journal_v_snapshot_idx" ON "_journal_v" USING btree ("snapshot");
  CREATE INDEX "_journal_v_published_locale_idx" ON "_journal_v" USING btree ("published_locale");
  CREATE INDEX "_journal_v_latest_idx" ON "_journal_v" USING btree ("latest");
  CREATE INDEX "_journal_v_autosave_idx" ON "_journal_v" USING btree ("autosave");
  CREATE INDEX "_journal_v_version_meta_version_meta_image_idx" ON "_journal_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_journal_v_locales_locale_parent_id_unique" ON "_journal_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE UNIQUE INDEX "faqs_locales_locale_parent_id_unique" ON "faqs_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "locations_slug_idx" ON "locations" USING btree ("slug");
  CREATE INDEX "locations_image_idx" ON "locations" USING btree ("image_id");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE UNIQUE INDEX "locations_locales_locale_parent_id_unique" ON "locations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_content_block_order_idx" ON "pages_blocks_content_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_block_parent_id_idx" ON "pages_blocks_content_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_block_path_idx" ON "pages_blocks_content_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_content_block_locales_locale_parent_id_unique" ON "pages_blocks_content_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_content_image_block_order_idx" ON "pages_blocks_content_image_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_image_block_parent_id_idx" ON "pages_blocks_content_image_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_image_block_path_idx" ON "pages_blocks_content_image_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_image_block_image_idx" ON "pages_blocks_content_image_block" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_content_image_block_locales_locale_parent_id_un" ON "pages_blocks_content_image_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_image_block_order_idx" ON "pages_blocks_image_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_block_parent_id_idx" ON "pages_blocks_image_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_block_path_idx" ON "pages_blocks_image_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_block_image_idx" ON "pages_blocks_image_block" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_image_block_locales_locale_parent_id_unique" ON "pages_blocks_image_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_block_images_order_idx" ON "pages_blocks_gallery_block_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_block_images_parent_id_idx" ON "pages_blocks_gallery_block_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_block_images_image_idx" ON "pages_blocks_gallery_block_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_gallery_block_images_locales_locale_parent_id_u" ON "pages_blocks_gallery_block_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_block_order_idx" ON "pages_blocks_gallery_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_block_parent_id_idx" ON "pages_blocks_gallery_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_block_path_idx" ON "pages_blocks_gallery_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_gallery_block_locales_locale_parent_id_unique" ON "pages_blocks_gallery_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rooms_showcase_block_order_idx" ON "pages_blocks_rooms_showcase_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_rooms_showcase_block_parent_id_idx" ON "pages_blocks_rooms_showcase_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rooms_showcase_block_path_idx" ON "pages_blocks_rooms_showcase_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_rooms_showcase_block_locales_locale_parent_id_u" ON "pages_blocks_rooms_showcase_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_experiences_block_order_idx" ON "pages_blocks_experiences_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_experiences_block_parent_id_idx" ON "pages_blocks_experiences_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_experiences_block_path_idx" ON "pages_blocks_experiences_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_experiences_block_locales_locale_parent_id_uniq" ON "pages_blocks_experiences_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_dining_block_order_idx" ON "pages_blocks_dining_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_dining_block_parent_id_idx" ON "pages_blocks_dining_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dining_block_path_idx" ON "pages_blocks_dining_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_dining_block_locales_locale_parent_id_unique" ON "pages_blocks_dining_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_spa_highlight_block_features_order_idx" ON "pages_blocks_spa_highlight_block_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_spa_highlight_block_features_parent_id_idx" ON "pages_blocks_spa_highlight_block_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_spa_highlight_block_features_locales_locale_par" ON "pages_blocks_spa_highlight_block_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_spa_highlight_block_order_idx" ON "pages_blocks_spa_highlight_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_spa_highlight_block_parent_id_idx" ON "pages_blocks_spa_highlight_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spa_highlight_block_path_idx" ON "pages_blocks_spa_highlight_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_spa_highlight_block_image_idx" ON "pages_blocks_spa_highlight_block" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_spa_highlight_block_locales_locale_parent_id_un" ON "pages_blocks_spa_highlight_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_block_order_idx" ON "pages_blocks_testimonials_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_block_parent_id_idx" ON "pages_blocks_testimonials_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_block_path_idx" ON "pages_blocks_testimonials_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_block_locales_locale_parent_id_uni" ON "pages_blocks_testimonials_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_block_stats_order_idx" ON "pages_blocks_stats_block_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_block_stats_parent_id_idx" ON "pages_blocks_stats_block_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_stats_block_stats_locales_locale_parent_id_uniq" ON "pages_blocks_stats_block_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_block_order_idx" ON "pages_blocks_stats_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_block_parent_id_idx" ON "pages_blocks_stats_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_block_path_idx" ON "pages_blocks_stats_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_stats_block_locales_locale_parent_id_unique" ON "pages_blocks_stats_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_block_order_idx" ON "pages_blocks_cta_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_block_parent_id_idx" ON "pages_blocks_cta_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_block_path_idx" ON "pages_blocks_cta_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_block_image_idx" ON "pages_blocks_cta_block" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_block_locales_locale_parent_id_unique" ON "pages_blocks_cta_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_block_order_idx" ON "pages_blocks_faq_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_block_parent_id_idx" ON "pages_blocks_faq_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_block_path_idx" ON "pages_blocks_faq_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_faq_block_locales_locale_parent_id_unique" ON "pages_blocks_faq_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_location_block_order_idx" ON "pages_blocks_location_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_location_block_parent_id_idx" ON "pages_blocks_location_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_location_block_path_idx" ON "pages_blocks_location_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_location_block_locales_locale_parent_id_unique" ON "pages_blocks_location_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_journal_block_order_idx" ON "pages_blocks_journal_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_journal_block_parent_id_idx" ON "pages_blocks_journal_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_journal_block_path_idx" ON "pages_blocks_journal_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_journal_block_locales_locale_parent_id_unique" ON "pages_blocks_journal_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_offers_block_order_idx" ON "pages_blocks_offers_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_offers_block_parent_id_idx" ON "pages_blocks_offers_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_offers_block_path_idx" ON "pages_blocks_offers_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_offers_block_locales_locale_parent_id_unique" ON "pages_blocks_offers_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_block_cards_order_idx" ON "pages_blocks_feature_cards_block_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_cards_block_cards_parent_id_idx" ON "pages_blocks_feature_cards_block_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_block_cards_image_idx" ON "pages_blocks_feature_cards_block_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_feature_cards_block_cards_locales_locale_parent" ON "pages_blocks_feature_cards_block_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_block_order_idx" ON "pages_blocks_feature_cards_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_cards_block_parent_id_idx" ON "pages_blocks_feature_cards_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_block_path_idx" ON "pages_blocks_feature_cards_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_feature_cards_block_locales_locale_parent_id_un" ON "pages_blocks_feature_cards_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_video_block_order_idx" ON "pages_blocks_video_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_block_parent_id_idx" ON "pages_blocks_video_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_block_path_idx" ON "pages_blocks_video_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_block_video_file_idx" ON "pages_blocks_video_block" USING btree ("video_file_id");
  CREATE INDEX "pages_blocks_video_block_poster_image_idx" ON "pages_blocks_video_block" USING btree ("poster_image_id");
  CREATE UNIQUE INDEX "pages_blocks_video_block_locales_locale_parent_id_unique" ON "pages_blocks_video_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_spacer_block_order_idx" ON "pages_blocks_spacer_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_spacer_block_parent_id_idx" ON "pages_blocks_spacer_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spacer_block_path_idx" ON "pages_blocks_spacer_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_hero_hero_image_idx" ON "pages" USING btree ("hero_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_rooms_id_idx" ON "pages_rels" USING btree ("rooms_id");
  CREATE INDEX "pages_rels_experiences_id_idx" ON "pages_rels" USING btree ("experiences_id");
  CREATE INDEX "pages_rels_dining_id_idx" ON "pages_rels" USING btree ("dining_id");
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "pages_rels_faqs_id_idx" ON "pages_rels" USING btree ("faqs_id");
  CREATE INDEX "pages_rels_locations_id_idx" ON "pages_rels" USING btree ("locations_id");
  CREATE INDEX "pages_rels_journal_id_idx" ON "pages_rels" USING btree ("journal_id");
  CREATE INDEX "pages_rels_offers_id_idx" ON "pages_rels" USING btree ("offers_id");
  CREATE INDEX "_pages_v_blocks_content_block_order_idx" ON "_pages_v_blocks_content_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_block_parent_id_idx" ON "_pages_v_blocks_content_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_block_path_idx" ON "_pages_v_blocks_content_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_content_block_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_content_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_content_image_block_order_idx" ON "_pages_v_blocks_content_image_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_image_block_parent_id_idx" ON "_pages_v_blocks_content_image_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_image_block_path_idx" ON "_pages_v_blocks_content_image_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_image_block_image_idx" ON "_pages_v_blocks_content_image_block" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_content_image_block_locales_locale_parent_id" ON "_pages_v_blocks_content_image_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_image_block_order_idx" ON "_pages_v_blocks_image_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_block_parent_id_idx" ON "_pages_v_blocks_image_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_block_path_idx" ON "_pages_v_blocks_image_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_block_image_idx" ON "_pages_v_blocks_image_block" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_image_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_image_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_block_images_order_idx" ON "_pages_v_blocks_gallery_block_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_block_images_parent_id_idx" ON "_pages_v_blocks_gallery_block_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_block_images_image_idx" ON "_pages_v_blocks_gallery_block_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_gallery_block_images_locales_locale_parent_i" ON "_pages_v_blocks_gallery_block_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_block_order_idx" ON "_pages_v_blocks_gallery_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_block_parent_id_idx" ON "_pages_v_blocks_gallery_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_block_path_idx" ON "_pages_v_blocks_gallery_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_gallery_block_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_gallery_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_rooms_showcase_block_order_idx" ON "_pages_v_blocks_rooms_showcase_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rooms_showcase_block_parent_id_idx" ON "_pages_v_blocks_rooms_showcase_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rooms_showcase_block_path_idx" ON "_pages_v_blocks_rooms_showcase_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_rooms_showcase_block_locales_locale_parent_i" ON "_pages_v_blocks_rooms_showcase_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_experiences_block_order_idx" ON "_pages_v_blocks_experiences_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_experiences_block_parent_id_idx" ON "_pages_v_blocks_experiences_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_experiences_block_path_idx" ON "_pages_v_blocks_experiences_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_experiences_block_locales_locale_parent_id_u" ON "_pages_v_blocks_experiences_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_dining_block_order_idx" ON "_pages_v_blocks_dining_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_dining_block_parent_id_idx" ON "_pages_v_blocks_dining_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_dining_block_path_idx" ON "_pages_v_blocks_dining_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_dining_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_dining_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_spa_highlight_block_features_order_idx" ON "_pages_v_blocks_spa_highlight_block_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spa_highlight_block_features_parent_id_idx" ON "_pages_v_blocks_spa_highlight_block_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_spa_highlight_block_features_locales_locale_" ON "_pages_v_blocks_spa_highlight_block_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_spa_highlight_block_order_idx" ON "_pages_v_blocks_spa_highlight_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spa_highlight_block_parent_id_idx" ON "_pages_v_blocks_spa_highlight_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spa_highlight_block_path_idx" ON "_pages_v_blocks_spa_highlight_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_spa_highlight_block_image_idx" ON "_pages_v_blocks_spa_highlight_block" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_spa_highlight_block_locales_locale_parent_id" ON "_pages_v_blocks_spa_highlight_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_block_order_idx" ON "_pages_v_blocks_testimonials_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_block_parent_id_idx" ON "_pages_v_blocks_testimonials_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_block_path_idx" ON "_pages_v_blocks_testimonials_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_block_locales_locale_parent_id_" ON "_pages_v_blocks_testimonials_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_block_stats_order_idx" ON "_pages_v_blocks_stats_block_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_block_stats_parent_id_idx" ON "_pages_v_blocks_stats_block_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_stats_block_stats_locales_locale_parent_id_u" ON "_pages_v_blocks_stats_block_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_block_order_idx" ON "_pages_v_blocks_stats_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_block_parent_id_idx" ON "_pages_v_blocks_stats_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_block_path_idx" ON "_pages_v_blocks_stats_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_stats_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_stats_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_block_order_idx" ON "_pages_v_blocks_cta_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_block_parent_id_idx" ON "_pages_v_blocks_cta_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_block_path_idx" ON "_pages_v_blocks_cta_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_block_image_idx" ON "_pages_v_blocks_cta_block" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_block_order_idx" ON "_pages_v_blocks_faq_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_block_parent_id_idx" ON "_pages_v_blocks_faq_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_block_path_idx" ON "_pages_v_blocks_faq_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_location_block_order_idx" ON "_pages_v_blocks_location_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_location_block_parent_id_idx" ON "_pages_v_blocks_location_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_location_block_path_idx" ON "_pages_v_blocks_location_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_location_block_locales_locale_parent_id_uniq" ON "_pages_v_blocks_location_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_journal_block_order_idx" ON "_pages_v_blocks_journal_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_journal_block_parent_id_idx" ON "_pages_v_blocks_journal_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_journal_block_path_idx" ON "_pages_v_blocks_journal_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_journal_block_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_journal_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_offers_block_order_idx" ON "_pages_v_blocks_offers_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_offers_block_parent_id_idx" ON "_pages_v_blocks_offers_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_offers_block_path_idx" ON "_pages_v_blocks_offers_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_offers_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_offers_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_block_cards_order_idx" ON "_pages_v_blocks_feature_cards_block_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_cards_block_cards_parent_id_idx" ON "_pages_v_blocks_feature_cards_block_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_block_cards_image_idx" ON "_pages_v_blocks_feature_cards_block_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_feature_cards_block_cards_locales_locale_par" ON "_pages_v_blocks_feature_cards_block_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_block_order_idx" ON "_pages_v_blocks_feature_cards_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_cards_block_parent_id_idx" ON "_pages_v_blocks_feature_cards_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_block_path_idx" ON "_pages_v_blocks_feature_cards_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_feature_cards_block_locales_locale_parent_id" ON "_pages_v_blocks_feature_cards_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_video_block_order_idx" ON "_pages_v_blocks_video_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_block_parent_id_idx" ON "_pages_v_blocks_video_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_block_path_idx" ON "_pages_v_blocks_video_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_block_video_file_idx" ON "_pages_v_blocks_video_block" USING btree ("video_file_id");
  CREATE INDEX "_pages_v_blocks_video_block_poster_image_idx" ON "_pages_v_blocks_video_block" USING btree ("poster_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_video_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_video_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_spacer_block_order_idx" ON "_pages_v_blocks_spacer_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spacer_block_parent_id_idx" ON "_pages_v_blocks_spacer_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spacer_block_path_idx" ON "_pages_v_blocks_spacer_block" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_hero_version_hero_image_idx" ON "_pages_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_rooms_id_idx" ON "_pages_v_rels" USING btree ("rooms_id");
  CREATE INDEX "_pages_v_rels_experiences_id_idx" ON "_pages_v_rels" USING btree ("experiences_id");
  CREATE INDEX "_pages_v_rels_dining_id_idx" ON "_pages_v_rels" USING btree ("dining_id");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_pages_v_rels_faqs_id_idx" ON "_pages_v_rels" USING btree ("faqs_id");
  CREATE INDEX "_pages_v_rels_locations_id_idx" ON "_pages_v_rels" USING btree ("locations_id");
  CREATE INDEX "_pages_v_rels_journal_id_idx" ON "_pages_v_rels" USING btree ("journal_id");
  CREATE INDEX "_pages_v_rels_offers_id_idx" ON "_pages_v_rels" USING btree ("offers_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_rooms_id_idx" ON "payload_locked_documents_rels" USING btree ("rooms_id");
  CREATE INDEX "payload_locked_documents_rels_offers_id_idx" ON "payload_locked_documents_rels" USING btree ("offers_id");
  CREATE INDEX "payload_locked_documents_rels_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("experiences_id");
  CREATE INDEX "payload_locked_documents_rels_dining_id_idx" ON "payload_locked_documents_rels" USING btree ("dining_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_journal_id_idx" ON "payload_locked_documents_rels" USING btree ("journal_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_logo_light_idx" ON "site_settings" USING btree ("logo_light_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_apple_touch_icon_idx" ON "site_settings" USING btree ("apple_touch_icon_id");
  CREATE INDEX "site_settings_default_o_g_image_idx" ON "site_settings" USING btree ("default_o_g_image_id");
  CREATE INDEX "site_settings_meta_meta_image_idx" ON "site_settings_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_items_dropdown_order_idx" ON "header_nav_items_dropdown" USING btree ("_order");
  CREATE INDEX "header_nav_items_dropdown_parent_id_idx" ON "header_nav_items_dropdown" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_dropdown_locales_locale_parent_id_unique" ON "header_nav_items_dropdown_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_links_locales_locale_parent_id_unique" ON "footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_locales_locale_parent_id_unique" ON "footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_legal_links_locales_locale_parent_id_unique" ON "footer_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "booking_settings_locales_locale_parent_id_unique" ON "booking_settings_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_info_locales_locale_parent_id_unique" ON "contact_info_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "seo_settings_additional_locales_order_idx" ON "seo_settings_additional_locales" USING btree ("_order");
  CREATE INDEX "seo_settings_additional_locales_parent_id_idx" ON "seo_settings_additional_locales" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_available_languages_order_idx" ON "seo_settings_available_languages" USING btree ("_order");
  CREATE INDEX "seo_settings_available_languages_parent_id_idx" ON "seo_settings_available_languages" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_amenity_features_order_idx" ON "seo_settings_amenity_features" USING btree ("_order");
  CREATE INDEX "seo_settings_amenity_features_parent_id_idx" ON "seo_settings_amenity_features" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_same_as_profiles_order_idx" ON "seo_settings_same_as_profiles" USING btree ("_order");
  CREATE INDEX "seo_settings_same_as_profiles_parent_id_idx" ON "seo_settings_same_as_profiles" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_default_o_g_image_idx" ON "seo_settings" USING btree ("default_o_g_image_id");
  CREATE INDEX "seo_settings_meta_meta_image_idx" ON "seo_settings_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "seo_settings_locales_locale_parent_id_unique" ON "seo_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "geo_settings_opening_hours_spec_day_of_week_order_idx" ON "geo_settings_opening_hours_spec_day_of_week" USING btree ("order");
  CREATE INDEX "geo_settings_opening_hours_spec_day_of_week_parent_idx" ON "geo_settings_opening_hours_spec_day_of_week" USING btree ("parent_id");
  CREATE INDEX "geo_settings_opening_hours_spec_order_idx" ON "geo_settings_opening_hours_spec" USING btree ("_order");
  CREATE INDEX "geo_settings_opening_hours_spec_parent_id_idx" ON "geo_settings_opening_hours_spec" USING btree ("_parent_id");
  CREATE INDEX "geo_settings_available_languages_order_idx" ON "geo_settings_available_languages" USING btree ("_order");
  CREATE INDEX "geo_settings_available_languages_parent_id_idx" ON "geo_settings_available_languages" USING btree ("_parent_id");
  CREATE INDEX "geo_settings_amenity_features_order_idx" ON "geo_settings_amenity_features" USING btree ("_order");
  CREATE INDEX "geo_settings_amenity_features_parent_id_idx" ON "geo_settings_amenity_features" USING btree ("_parent_id");
  CREATE INDEX "geo_settings_nested_places_order_idx" ON "geo_settings_nested_places" USING btree ("_order");
  CREATE INDEX "geo_settings_nested_places_parent_id_idx" ON "geo_settings_nested_places" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "geo_settings_nested_places_locales_locale_parent_id_unique" ON "geo_settings_nested_places_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "geo_settings_logo_image_idx" ON "geo_settings" USING btree ("logo_image_id");
  CREATE INDEX "geo_settings_hero_image_idx" ON "geo_settings" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "geo_settings_locales_locale_parent_id_unique" ON "geo_settings_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "rooms_gallery" CASCADE;
  DROP TABLE "rooms_gallery_locales" CASCADE;
  DROP TABLE "rooms_amenities" CASCADE;
  DROP TABLE "rooms_amenities_locales" CASCADE;
  DROP TABLE "rooms_highlights" CASCADE;
  DROP TABLE "rooms_highlights_locales" CASCADE;
  DROP TABLE "rooms" CASCADE;
  DROP TABLE "rooms_locales" CASCADE;
  DROP TABLE "_rooms_v_version_gallery" CASCADE;
  DROP TABLE "_rooms_v_version_gallery_locales" CASCADE;
  DROP TABLE "_rooms_v_version_amenities" CASCADE;
  DROP TABLE "_rooms_v_version_amenities_locales" CASCADE;
  DROP TABLE "_rooms_v_version_highlights" CASCADE;
  DROP TABLE "_rooms_v_version_highlights_locales" CASCADE;
  DROP TABLE "_rooms_v" CASCADE;
  DROP TABLE "_rooms_v_locales" CASCADE;
  DROP TABLE "offers_conditions" CASCADE;
  DROP TABLE "offers_conditions_locales" CASCADE;
  DROP TABLE "offers" CASCADE;
  DROP TABLE "offers_locales" CASCADE;
  DROP TABLE "_offers_v_version_conditions" CASCADE;
  DROP TABLE "_offers_v_version_conditions_locales" CASCADE;
  DROP TABLE "_offers_v" CASCADE;
  DROP TABLE "_offers_v_locales" CASCADE;
  DROP TABLE "experiences_gallery" CASCADE;
  DROP TABLE "experiences_gallery_locales" CASCADE;
  DROP TABLE "experiences_highlights" CASCADE;
  DROP TABLE "experiences_highlights_locales" CASCADE;
  DROP TABLE "experiences" CASCADE;
  DROP TABLE "experiences_locales" CASCADE;
  DROP TABLE "_experiences_v_version_gallery" CASCADE;
  DROP TABLE "_experiences_v_version_gallery_locales" CASCADE;
  DROP TABLE "_experiences_v_version_highlights" CASCADE;
  DROP TABLE "_experiences_v_version_highlights_locales" CASCADE;
  DROP TABLE "_experiences_v" CASCADE;
  DROP TABLE "_experiences_v_locales" CASCADE;
  DROP TABLE "dining_gallery" CASCADE;
  DROP TABLE "dining_gallery_locales" CASCADE;
  DROP TABLE "dining" CASCADE;
  DROP TABLE "dining_locales" CASCADE;
  DROP TABLE "_dining_v_version_gallery" CASCADE;
  DROP TABLE "_dining_v_version_gallery_locales" CASCADE;
  DROP TABLE "_dining_v" CASCADE;
  DROP TABLE "_dining_v_locales" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "gallery_locales" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "journal" CASCADE;
  DROP TABLE "journal_locales" CASCADE;
  DROP TABLE "_journal_v" CASCADE;
  DROP TABLE "_journal_v_locales" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "faqs_locales" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "locations_locales" CASCADE;
  DROP TABLE "pages_blocks_content_block" CASCADE;
  DROP TABLE "pages_blocks_content_block_locales" CASCADE;
  DROP TABLE "pages_blocks_content_image_block" CASCADE;
  DROP TABLE "pages_blocks_content_image_block_locales" CASCADE;
  DROP TABLE "pages_blocks_image_block" CASCADE;
  DROP TABLE "pages_blocks_image_block_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery_block_images" CASCADE;
  DROP TABLE "pages_blocks_gallery_block_images_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery_block" CASCADE;
  DROP TABLE "pages_blocks_gallery_block_locales" CASCADE;
  DROP TABLE "pages_blocks_rooms_showcase_block" CASCADE;
  DROP TABLE "pages_blocks_rooms_showcase_block_locales" CASCADE;
  DROP TABLE "pages_blocks_experiences_block" CASCADE;
  DROP TABLE "pages_blocks_experiences_block_locales" CASCADE;
  DROP TABLE "pages_blocks_dining_block" CASCADE;
  DROP TABLE "pages_blocks_dining_block_locales" CASCADE;
  DROP TABLE "pages_blocks_spa_highlight_block_features" CASCADE;
  DROP TABLE "pages_blocks_spa_highlight_block_features_locales" CASCADE;
  DROP TABLE "pages_blocks_spa_highlight_block" CASCADE;
  DROP TABLE "pages_blocks_spa_highlight_block_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials_block" CASCADE;
  DROP TABLE "pages_blocks_testimonials_block_locales" CASCADE;
  DROP TABLE "pages_blocks_stats_block_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_block_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_stats_block" CASCADE;
  DROP TABLE "pages_blocks_stats_block_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_block" CASCADE;
  DROP TABLE "pages_blocks_cta_block_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_block" CASCADE;
  DROP TABLE "pages_blocks_faq_block_locales" CASCADE;
  DROP TABLE "pages_blocks_location_block" CASCADE;
  DROP TABLE "pages_blocks_location_block_locales" CASCADE;
  DROP TABLE "pages_blocks_journal_block" CASCADE;
  DROP TABLE "pages_blocks_journal_block_locales" CASCADE;
  DROP TABLE "pages_blocks_offers_block" CASCADE;
  DROP TABLE "pages_blocks_offers_block_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_cards_block_cards" CASCADE;
  DROP TABLE "pages_blocks_feature_cards_block_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_cards_block" CASCADE;
  DROP TABLE "pages_blocks_feature_cards_block_locales" CASCADE;
  DROP TABLE "pages_blocks_video_block" CASCADE;
  DROP TABLE "pages_blocks_video_block_locales" CASCADE;
  DROP TABLE "pages_blocks_spacer_block" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_content_block" CASCADE;
  DROP TABLE "_pages_v_blocks_content_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_content_image_block" CASCADE;
  DROP TABLE "_pages_v_blocks_content_image_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_image_block" CASCADE;
  DROP TABLE "_pages_v_blocks_image_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_block_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_block_images_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_block" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_rooms_showcase_block" CASCADE;
  DROP TABLE "_pages_v_blocks_rooms_showcase_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_experiences_block" CASCADE;
  DROP TABLE "_pages_v_blocks_experiences_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_dining_block" CASCADE;
  DROP TABLE "_pages_v_blocks_dining_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_spa_highlight_block_features" CASCADE;
  DROP TABLE "_pages_v_blocks_spa_highlight_block_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_spa_highlight_block" CASCADE;
  DROP TABLE "_pages_v_blocks_spa_highlight_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_block" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_block_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_block_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_block" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_block" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_block" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_location_block" CASCADE;
  DROP TABLE "_pages_v_blocks_location_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_journal_block" CASCADE;
  DROP TABLE "_pages_v_blocks_journal_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_offers_block" CASCADE;
  DROP TABLE "_pages_v_blocks_offers_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards_block_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards_block_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards_block" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_video_block" CASCADE;
  DROP TABLE "_pages_v_blocks_video_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_spacer_block" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "header_nav_items_dropdown" CASCADE;
  DROP TABLE "header_nav_items_dropdown_locales" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header_nav_items_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns_links_locales" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_columns_locales" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer_legal_links_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "booking_settings" CASCADE;
  DROP TABLE "booking_settings_locales" CASCADE;
  DROP TABLE "contact_info" CASCADE;
  DROP TABLE "contact_info_locales" CASCADE;
  DROP TABLE "seo_settings_additional_locales" CASCADE;
  DROP TABLE "seo_settings_available_languages" CASCADE;
  DROP TABLE "seo_settings_amenity_features" CASCADE;
  DROP TABLE "seo_settings_same_as_profiles" CASCADE;
  DROP TABLE "seo_settings" CASCADE;
  DROP TABLE "seo_settings_locales" CASCADE;
  DROP TABLE "geo_settings_opening_hours_spec_day_of_week" CASCADE;
  DROP TABLE "geo_settings_opening_hours_spec" CASCADE;
  DROP TABLE "geo_settings_available_languages" CASCADE;
  DROP TABLE "geo_settings_amenity_features" CASCADE;
  DROP TABLE "geo_settings_nested_places" CASCADE;
  DROP TABLE "geo_settings_nested_places_locales" CASCADE;
  DROP TABLE "geo_settings" CASCADE;
  DROP TABLE "geo_settings_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_users_preferred_locale";
  DROP TYPE "public"."enum_rooms_category";
  DROP TYPE "public"."enum_rooms_bed_type";
  DROP TYPE "public"."enum_rooms_status";
  DROP TYPE "public"."enum__rooms_v_version_category";
  DROP TYPE "public"."enum__rooms_v_version_bed_type";
  DROP TYPE "public"."enum__rooms_v_version_status";
  DROP TYPE "public"."enum__rooms_v_published_locale";
  DROP TYPE "public"."enum_offers_status";
  DROP TYPE "public"."enum__offers_v_version_status";
  DROP TYPE "public"."enum__offers_v_published_locale";
  DROP TYPE "public"."enum_experiences_category";
  DROP TYPE "public"."enum_experiences_status";
  DROP TYPE "public"."enum__experiences_v_version_category";
  DROP TYPE "public"."enum__experiences_v_version_status";
  DROP TYPE "public"."enum__experiences_v_published_locale";
  DROP TYPE "public"."enum_dining_venue";
  DROP TYPE "public"."enum_dining_status";
  DROP TYPE "public"."enum__dining_v_version_venue";
  DROP TYPE "public"."enum__dining_v_version_status";
  DROP TYPE "public"."enum__dining_v_published_locale";
  DROP TYPE "public"."enum_gallery_category";
  DROP TYPE "public"."enum_testimonials_rating";
  DROP TYPE "public"."enum_testimonials_source";
  DROP TYPE "public"."enum_journal_category";
  DROP TYPE "public"."enum_journal_status";
  DROP TYPE "public"."enum__journal_v_version_category";
  DROP TYPE "public"."enum__journal_v_version_status";
  DROP TYPE "public"."enum__journal_v_published_locale";
  DROP TYPE "public"."enum_faqs_category";
  DROP TYPE "public"."enum_locations_category";
  DROP TYPE "public"."enum_pages_blocks_content_block_alignment";
  DROP TYPE "public"."enum_pages_blocks_content_block_width";
  DROP TYPE "public"."enum_pages_blocks_content_block_background";
  DROP TYPE "public"."enum_pages_blocks_content_image_block_image_position";
  DROP TYPE "public"."enum_pages_blocks_content_image_block_background";
  DROP TYPE "public"."enum_pages_blocks_image_block_size";
  DROP TYPE "public"."enum_pages_blocks_image_block_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_gallery_block_columns";
  DROP TYPE "public"."enum_pages_blocks_rooms_showcase_block_display_mode";
  DROP TYPE "public"."enum_pages_blocks_experiences_block_filter_by_category";
  DROP TYPE "public"."enum_pages_blocks_dining_block_display_mode";
  DROP TYPE "public"."enum_pages_blocks_spa_highlight_block_background";
  DROP TYPE "public"."enum_pages_blocks_testimonials_block_display_mode";
  DROP TYPE "public"."enum_pages_blocks_testimonials_block_background";
  DROP TYPE "public"."enum_pages_blocks_stats_block_background";
  DROP TYPE "public"."enum_pages_blocks_cta_block_style";
  DROP TYPE "public"."enum_pages_blocks_faq_block_filter_by_category";
  DROP TYPE "public"."enum_pages_blocks_feature_cards_block_columns";
  DROP TYPE "public"."enum_pages_blocks_feature_cards_block_card_style";
  DROP TYPE "public"."enum_pages_blocks_video_block_video_type";
  DROP TYPE "public"."enum_pages_blocks_video_block_size";
  DROP TYPE "public"."enum_pages_blocks_spacer_block_size";
  DROP TYPE "public"."enum_pages_hero_style";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_content_block_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_content_block_width";
  DROP TYPE "public"."enum__pages_v_blocks_content_block_background";
  DROP TYPE "public"."enum__pages_v_blocks_content_image_block_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_content_image_block_background";
  DROP TYPE "public"."enum__pages_v_blocks_image_block_size";
  DROP TYPE "public"."enum__pages_v_blocks_image_block_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_block_columns";
  DROP TYPE "public"."enum__pages_v_blocks_rooms_showcase_block_display_mode";
  DROP TYPE "public"."enum__pages_v_blocks_experiences_block_filter_by_category";
  DROP TYPE "public"."enum__pages_v_blocks_dining_block_display_mode";
  DROP TYPE "public"."enum__pages_v_blocks_spa_highlight_block_background";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_block_display_mode";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_block_background";
  DROP TYPE "public"."enum__pages_v_blocks_stats_block_background";
  DROP TYPE "public"."enum__pages_v_blocks_cta_block_style";
  DROP TYPE "public"."enum__pages_v_blocks_faq_block_filter_by_category";
  DROP TYPE "public"."enum__pages_v_blocks_feature_cards_block_columns";
  DROP TYPE "public"."enum__pages_v_blocks_feature_cards_block_card_style";
  DROP TYPE "public"."enum__pages_v_blocks_video_block_video_type";
  DROP TYPE "public"."enum__pages_v_blocks_video_block_size";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_block_size";
  DROP TYPE "public"."enum__pages_v_version_hero_style";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_form_submissions_form_type";
  DROP TYPE "public"."enum_form_submissions_status";
  DROP TYPE "public"."enum_site_settings_announcement_style";
  DROP TYPE "public"."enum_header_nav_items_type";
  DROP TYPE "public"."enum_seo_settings_same_as_profiles_platform";
  DROP TYPE "public"."enum_seo_settings_twitter_card_type";
  DROP TYPE "public"."enum_seo_settings_default_locale";
  DROP TYPE "public"."enum_seo_settings_sitemap_change_freq";
  DROP TYPE "public"."enum_seo_settings_business_type";
  DROP TYPE "public"."enum_seo_settings_price_range";
  DROP TYPE "public"."enum_geo_settings_opening_hours_spec_day_of_week";
  DROP TYPE "public"."enum_geo_settings_nested_places_schema_type";
  DROP TYPE "public"."enum_geo_settings_price_range";`)
}
