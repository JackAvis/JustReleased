CREATE TABLE users (
	id serial PRIMARY KEY,
	username VARCHAR(250) NOT NULL UNIQUE,
	password VARCHAR(250) NOT NULL,
	email VARCHAR(250) NOT NULL,
	created TIMESTAMP,
	last_updated TIMESTAMP
)