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