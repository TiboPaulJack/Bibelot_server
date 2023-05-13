-- Deploy 3db:SeedingCategories to pg

BEGIN;

INSERT INTO "category" ("name") VALUES
                                    ('Cars'),
                                    ('Animals'),
                                    ('Buildings'),
                                    ('Weapons'),
                                    ('Plants'),
                                    ('Clothing'),
                                    ('Food'),
                                    ('Furniture'),
                                    ('Architecture'),
                                    ('Tools'),
                                    ('Machines'),
                                    ('Characters'),
                                    ('Sports equipment'),
                                    ('Musical instruments'),
                                    ('Jewelry'),
                                    ('Toys'),
                                    ('Electronics'),
                                    ('Planes'),
                                    ('Ships'),
                                    ('Robots'),
                                    ('Cities');

COMMIT;
