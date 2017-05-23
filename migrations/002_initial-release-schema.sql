CREATE TABLE Release (
    id INTEGER PRIMARY KEY,
    productId INTEGER NOT NULL,
    releaseDate TEXT,
    version TEXT NOT NULL,
    notes TEXT,
    FOREIGN KEY(productID) REFERENCES Product(id)
);

-- Down
DROP TABLE Release;