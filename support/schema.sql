CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT not null,
  password TEXT not null
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT not null,
  school INT not null,
  expires DATE not null
);

CREATE TABLE schools (
  id SERIAL PRIMARY KEY,
  name TEXT not null,
  address TEXT not null
);

CREATE TABLE observations (
  id SERIAL PRIMARY KEY,
  users_id INT not null,
  students_id INT not null,
  tasks_id INT not null,
  duration INTERVAL not null
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name TEXT not null
);

INSERT INTO tasks (name) VALUES 
  ('Planned Presentation'),
  ('Response Presentation'),
  ('Monitoring'),
  ('Performing Feedback'),
  ('Motivation Feedback'),
  ('Beginning/End of Class Discussion'),
  ('Equipment Management'),
  ('Organization'),
  ('Behavior Management'),
  ('Other Tasks');