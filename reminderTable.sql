CREATE TABLE reminders (
    reminder_id serial PRIMARY KEY,
    event_id integer references events(event_id),
    user_id integer references users(id),
    remind_date TIMESTAMP,
    remind_type VARCHAR(10),
	created TIMESTAMP,
	last_updated TIMESTAMP
)