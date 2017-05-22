CREATE TABLE Product (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    link TEXT,
    status TEXT DEFAULT 'up',
    type TEXT NOT NULL
);

-- Down
DROP TABLE Product;
--CHECK (status IN ('up', 'down', 'maintenance'))
-- CHECK (type IN ('Finance & Controlling', 'HR & organisational development', 'Information & communication technology', 'Institutional Partnership Development', 'Global Emergency Response', 'PSA Relations', 'Programme & Strategy'))