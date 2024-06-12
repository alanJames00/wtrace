-- Contains the schema for the database
-- only to be ran once to create the database
CREATE TABLE IF NOT EXISTS Users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	api_key VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Refercodes (
	username VARCHAR(255) NOT NULL,
	refer_code VARCHAR(255) NOT NULL
);

