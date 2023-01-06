CREATE TABLE reminders (
    reminder_id serial PRIMARY KEY,
    event_id integer references events(event_id) ON DELETE CASCADE,
    user_id integer references users(id) ON DELETE CASCADE,
    remind_date TIMESTAMP,
    remind_type VARCHAR(10),
	created TIMESTAMP,
	last_updated TIMESTAMP
)