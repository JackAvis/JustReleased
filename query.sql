CREATE TABLE datadump (
	post_id serial PRIMARY KEY,
	title VARCHAR(250),
	text TEXT,
	created TIMESTAMP,
	last_updated TIMESTAMP
)