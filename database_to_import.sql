/*
 Navicat PostgreSQL Data Transfer

 Source Server         : school
 Source Server Type    : PostgreSQL
 Source Server Version : 130001
 Source Host           : localhost:5432
 Source Catalog        : pcshop
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 130001
 File Encoding         : 65001

 Date: 11/01/2021 19:02:16
*/


-- ----------------------------
-- Sequence structure for promocode_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "promocode_id_seq";
CREATE SEQUENCE "promocode_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for promocode
-- ----------------------------
DROP TABLE IF EXISTS "promocode";
CREATE TABLE "promocode" (
  "id" int8 NOT NULL DEFAULT nextval('promocode_id_seq'::regclass),
  "promo_code" text COLLATE "pg_catalog"."default",
  "description" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of promocode
-- ----------------------------
BEGIN;
INSERT INTO "promocode" VALUES (1, NULL, NULL);
INSERT INTO "promocode" VALUES (2, NULL, NULL);
INSERT INTO "promocode" VALUES (123, 'abcd', '123213');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
  "id" int8 NOT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "family_name" text COLLATE "pg_catalog"."default" NOT NULL,
  "email" text COLLATE "pg_catalog"."default",
  "promo_code" text COLLATE "pg_catalog"."default",
  "country" text COLLATE "pg_catalog"."default",
  "city" text COLLATE "pg_catalog"."default",
  "street" text COLLATE "pg_catalog"."default",
  "zip_code" text COLLATE "pg_catalog"."default",
  "password" text COLLATE "pg_catalog"."default",
  "spare1" text COLLATE "pg_catalog"."default",
  "spare2" text COLLATE "pg_catalog"."default",
  "spare3" int4,
  "spare4" int4
)
;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO "users" VALUES (12223, 'bshara', 'zahran', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "users" VALUES (1222223, 'bshara', 'zahran', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "users" VALUES (99999, 'bshara', 'zahran', 'bshara23@gmail.com', 'axasx', 'Israel', 'Haifa', '12', '3001200', 'b7b7b7b7', 'abc', 'abc', 11111, 2222);
COMMIT;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "promocode_id_seq"
OWNED BY "promocode"."id";
SELECT setval('"promocode_id_seq"', 4, true);

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "users" ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");
