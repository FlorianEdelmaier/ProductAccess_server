ALTER TABLE Product ADD COLUMN linkUserManual TEXT;
ALTER TABLE Product ADD COLUMN linkSupportSite TEXT;
ALTER TABLE Product ADD COLUMN linkMarketingDoc TEXT;

-- Down
-- no way to remove a column in sqlite