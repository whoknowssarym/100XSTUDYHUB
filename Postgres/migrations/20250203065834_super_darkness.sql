-- Create database  
CREATE DATABASE studyhub;  
-- Create tables  
CREATE TABLE subjects (  
  id SERIAL PRIMARY KEY,  
  name VARCHAR(255) NOT NULL,  
  slug VARCHAR(255) UNIQUE NOT NULL,  
  description TEXT,  
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE categories (  
  id SERIAL PRIMARY KEY,  
  name VARCHAR(255) NOT NULL,  
  slug VARCHAR(255) UNIQUE NOT NULL,  
  description TEXT,  
  icon VARCHAR(255),  
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE resources (  
  id SERIAL PRIMARY KEY,  
  title VARCHAR(255) NOT NULL,  
  description TEXT,  
  type TEXT CHECK (type IN ('past_paper', 'note', 'handout', 'guide')) NOT NULL,  
  subject_id INT REFERENCES subjects(id),  
  category_id INT REFERENCES categories(id),  
  file_url TEXT NOT NULL,  
  thumbnail_url TEXT,  
  download_count INT DEFAULT 0,  
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE users (  
  id SERIAL PRIMARY KEY,  
  email VARCHAR(255) UNIQUE NOT NULL,  
  password_hash VARCHAR(255) NOT NULL,  
  name VARCHAR(255),  
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE downloads (  
  id SERIAL PRIMARY KEY,  
  resource_id INT REFERENCES resources(id),  
  user_id INT REFERENCES users(id),  
  downloaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE newsletter_subscribers (  
  id SERIAL PRIMARY KEY,  
  email VARCHAR(255) UNIQUE NOT NULL,  
  subscribed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP  
);

-- Create indexes  
CREATE INDEX idx_resources_type ON resources(type);  
CREATE INDEX idx_resources_subject ON resources(subject_id);  
CREATE INDEX idx_resources_category ON resources(category_id);  
CREATE INDEX idx_downloads_resource ON downloads(resource_id);  
CREATE INDEX idx_downloads_user ON downloads(user_id);  
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);

-- Insert sample data  
INSERT INTO subjects (name, slug, description) VALUES  
  ('Mathematics', 'mathematics', 'Comprehensive mathematics study materials covering algebra, calculus, and more'),  
  ('Physics', 'physics', 'In-depth physics resources from mechanics to quantum physics'),  
  ('Chemistry', 'chemistry', 'Complete chemistry materials covering organic, inorganic, and physical chemistry'),  
  ('Biology', 'biology', 'Extensive biology resources from cellular biology to ecosystems');

INSERT INTO categories (name, slug, description, icon) VALUES  
  ('Past Papers', 'past-papers', 'Previous examination papers with detailed solutions', 'FileText'),  
  ('Study Notes', 'notes', 'Comprehensive study materials and lecture notes', 'Notebook'),  
  ('Handouts', 'handouts', 'Course handouts and supplementary materials', 'Files'),  
  ('Quick Guides', 'guides', 'Concise study guides and quick reference materials', 'BookOpen');

-- Insert sample resources  
INSERT INTO resources (title, description, type, subject_id, category_id, file_url, download_count) VALUES  
  ('Mathematics Past Paper 2023', 'Complete solved paper with detailed solutions and explanations', 'past_paper', 1, 1, '/samples/math-2023.pdf', 1234),  
  ('Physics Study Guide', 'Comprehensive study material for mechanics and thermodynamics', 'note', 2, 2, '/samples/physics-guide.pdf', 987),  
  ('Chemistry Notes Bundle', 'Complete organic chemistry notes with practice problems', 'note', 3, 2, '/samples/chemistry-notes.pdf', 756),  
  ('Biology Quick Guide', 'Essential concepts and diagrams for final exam preparation', 'guide', 4, 4, '/samples/biology-guide.pdf', 543);




-- 2nd step 


/*
  # University and Discussion System Schema Update

  1. New Tables
    - universities
      - Store university information
      - Track associated resources
    - discussions
      - Enable user discussions on resources
      - Track user interactions

  2. Updates
    - Modified subjects table to link with universities
    - Added subject code field
    - Enhanced user roles
*/

-- Create universities table
CREATE TABLE universities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Add university_id to subjects
ALTER TABLE subjects
ADD COLUMN university_id INT REFERENCES universities(id),
ADD COLUMN code VARCHAR(50);

-- Create discussions table
CREATE TABLE discussions (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  resource_id INT REFERENCES resources(id),
  user_id INT REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Add role to users
ALTER TABLE users
ADD COLUMN role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- Create indexes
CREATE INDEX idx_subjects_university ON subjects(university_id);
CREATE INDEX idx_subjects_code ON subjects(code);
CREATE INDEX idx_discussions_resource ON discussions(resource_id);
CREATE INDEX idx_discussions_user ON discussions(user_id);
CREATE INDEX idx_discussions_created ON discussions(created_at DESC);

-- Insert sample universities
INSERT INTO universities (name, code, description) VALUES
  ('FAST University', 'FAST', 'Foundation for Advancement of Science and Technology'),
  ('Virtual University', 'VU', 'Pakistan''s First Online University'),
  ('COMSATS University', 'COMSATS', 'Commission on Science and Technology for Sustainable Development');

-- Update sample subjects with university IDs and codes
UPDATE subjects SET 
  university_id = 1,
  code = 'CS-101'
WHERE name = 'Mathematics';

UPDATE subjects SET 
  university_id = 1,
  code = 'PHY-101'
WHERE name = 'Physics';

UPDATE subjects SET 
  university_id = 2,
  code = 'CHEM-101'
WHERE name = 'Chemistry';

UPDATE subjects SET 
  university_id = 3,
  code = 'BIO-101'
WHERE name = 'Biology';