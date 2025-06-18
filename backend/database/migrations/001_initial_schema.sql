CREATE DATABASE project_met_db;

USE project_met_db;

-- SEQUENCES FOR AUTO-INCREMENTING IDS
CREATE SEQUENCE IF NOT EXISTS users_user_id_seq;
CREATE SEQUENCE IF NOT EXISTS projects_project_id_seq;
CREATE SEQUENCE IF NOT EXISTS project_members_member_id_seq;
CREATE SEQUENCE IF NOT EXISTS sprints_sprint_id_seq;
CREATE SEQUENCE IF NOT EXISTS user_stories_story_id_seq;
CREATE SEQUENCE IF NOT EXISTS tasks_task_id_seq;
CREATE SEQUENCE IF NOT EXISTS roles_role_id_seq;

-- ROLES TABLE (referenced by users)
CREATE TABLE IF NOT EXISTS roles (
  role_id INT PRIMARY KEY DEFAULT nextval('roles_role_id_seq'),
  role_name VARCHAR(100) NOT NULL,
  description TEXT,
  responsibilities TEXT,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- USERS TABLE 
CREATE TABLE IF NOT EXISTS users (
  user_id INT PRIMARY KEY DEFAULT nextval('users_user_id_seq'),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP WITHOUT TIME ZONE,
  role_id INT NOT NULL
);

-- PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  project_id INT PRIMARY KEY DEFAULT nextval('projects_project_id_seq'),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  main_objective TEXT,
  estimated_time INT, 
  industry VARCHAR(100),
  project_type VARCHAR(100),
  owner_id INT NOT NULL,
  vision TEXT,
  methodology_type VARCHAR(50),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_archived BOOLEAN DEFAULT false
);

-- PROJECT MEMBERS TABLE (links users to projects)
CREATE TABLE IF NOT EXISTS project_members (
  member_id INT PRIMARY KEY DEFAULT nextval('project_members_member_id_seq'),
  project_id INT NOT NULL,
  user_id INT NOT NULL,
  alias_name VARCHAR(255),
  email VARCHAR(255),
  role VARCHAR(100),
  is_registered_user BOOLEAN NOT NULL DEFAULT true,
  added_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SPRINTS TABLE
CREATE TABLE IF NOT EXISTS sprints (
  sprint_id INT PRIMARY KEY DEFAULT nextval('sprints_sprint_id_seq'),
  project_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  objective TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  sprint_number INT NOT NULL,
  status VARCHAR(50) DEFAULT 'planned', 
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- USER STORIES TABLE
CREATE TABLE IF NOT EXISTS user_stories (
  story_id INT PRIMARY KEY DEFAULT nextval('user_stories_story_id_seq'),
  sprint_id INT, 
  title VARCHAR(255) NOT NULL,
  description TEXT,
  acceptance_criteria TEXT,
  story_points INT,
  priority INT DEFAULT 3, 
  status VARCHAR(50) DEFAULT 'pending', 
  assignee_id INT,
  creator_id INT NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  backlog_position INT
);

-- TASKS TABLE
CREATE TABLE IF NOT EXISTS tasks (
  task_id INT PRIMARY KEY DEFAULT nextval('tasks_task_id_seq'),
  user_story_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'to_do', 
  assignee_id INT,
  estimated_hours DECIMAL(10,2),
  actual_hours DECIMAL(10,2),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- FOREIGN KEY CONSTRAINTS

-- Relation Users -> Roles
ALTER TABLE users ADD CONSTRAINT fk_users_roles
    FOREIGN KEY (role_id) REFERENCES roles(role_id);

-- Relation Projects -> Users
ALTER TABLE projects ADD CONSTRAINT fk_projects_users_owner
    FOREIGN KEY (owner_id) REFERENCES users(user_id);

-- Relation Project Members -> Projects
ALTER TABLE project_members ADD CONSTRAINT fk_project_members_projects
    FOREIGN KEY (project_id) REFERENCES projects(project_id);

-- Relation Project Members -> Users
ALTER TABLE project_members ADD CONSTRAINT fk_project_members_users
    FOREIGN KEY (user_id) REFERENCES users(user_id);

-- Relation Sprints -> Projects
ALTER TABLE sprints ADD CONSTRAINT fk_sprints_projects
    FOREIGN KEY (project_id) REFERENCES projects(project_id);

-- Relation User Stories -> Sprints
ALTER TABLE user_stories ADD CONSTRAINT fk_user_stories_sprints
    FOREIGN KEY (sprint_id) REFERENCES sprints(sprint_id);

-- Relation User Stories -> Users
ALTER TABLE user_stories ADD CONSTRAINT fk_user_stories_users_assignee
    FOREIGN KEY (assignee_id) REFERENCES users(user_id);

-- Relation User Stories -> Users
ALTER TABLE user_stories ADD CONSTRAINT fk_user_stories_users_creator
    FOREIGN KEY (creator_id) REFERENCES users(user_id);

-- Relation Tasks -> User Stories
ALTER TABLE tasks ADD CONSTRAINT fk_tasks_user_stories
    FOREIGN KEY (user_story_id) REFERENCES user_stories(story_id);

-- Relation Tasks -> Users
ALTER TABLE tasks ADD CONSTRAINT fk_tasks_users_assignee
    FOREIGN KEY (assignee_id) REFERENCES users(user_id);


-- INDEXES FOR PERFORMANCE
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_projects_name ON projects(name);
CREATE INDEX idx_user_stories_title ON user_stories(title);
CREATE INDEX idx_tasks_status ON tasks(status);

-- Avoids adding the same user to the same project more than once
CREATE UNIQUE INDEX idx_unique_project_member ON project_members(project_id, user_id); 