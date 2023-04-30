-- Revert 3db:SeedingCategories from pg

BEGIN;

DELETE FROM "category";

COMMIT;
