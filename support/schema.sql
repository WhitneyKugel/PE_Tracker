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
  name TEXT not null,
  duration INT not null
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name TEXT not null
);

INSERT INTO observations (name, duration) VALUES 
  ('Planned Presentation', 0),
  ('Response Presentation', 0),
  ('Monitoring', 0),
  ('Performing Feedback', 0),
  ('Motivation Feedback', 0),
  ('Beginning/End of Class Discussion', 0),
  ('Equipment Management', 0),
  ('Organization', 0),
  ('Behavior Management', 0),
  ('Other Tasks', 0);