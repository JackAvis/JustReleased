CREATE TABLE events (
	event_id serial PRIMARY KEY,
    type VARCHAR(10) NOT NULL,
	title VARCHAR(250) NOT NULL UNIQUE,
    description TEXT,
    image TEXT,
    release_date TIMESTAMP,
	created TIMESTAMP,
	last_updated TIMESTAMP
)