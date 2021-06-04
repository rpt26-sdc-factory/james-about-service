CREATE TABLE IF NOT EXISTS courses (
  course_id BIGINT NOT NULL,
  recent_views INT,
  description TEXT,
  learner_career_outcomes TEXT,
  metadata TEXT,
  what_you_will_learn TEXT,
  skills_you_will_gain TEXT,
  PRIMARY KEY(course_id)
);