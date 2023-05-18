CREATE DATABASE IF NOT EXISTS learn_dome;

USE learn_dome;

CREATE TABLE IF NOT EXISTS administrator (
	id INT AUTO_INCREMENT,
	username VARCHAR(30) UNIQUE NOT NULL,
	user_password VARCHAR(30) NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	genre VARCHAR(20) NOT NULL,
	birthdate DATE NOT NULL,
	email VARCHAR(40) UNIQUE NOT NULL,
    image MEDIUMBLOB NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    is_active BOOL DEFAULT TRUE,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS instructor (
	id INT AUTO_INCREMENT,
	username VARCHAR(30) UNIQUE NOT NULL,
	user_password VARCHAR(30) NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	genre VARCHAR(20) NOT NULL,
	birthdate DATE NOT NULL,
	email VARCHAR(40) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    courses_number TINYINT DEFAULT 0,
    score DECIMAL(6, 2) DEFAULT -1,
    image MEDIUMBLOB NOT NULL,
    unlocked BOOL DEFAULT TRUE,
    is_active BOOL DEFAULT TRUE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS student (
	id INT AUTO_INCREMENT,
	username VARCHAR(30) UNIQUE NOT NULL,
	user_password VARCHAR(30) NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	genre VARCHAR(20) NOT NULL,
	birthdate DATE NOT NULL,
	email VARCHAR(40) UNIQUE NOT NULL,
	bought_courses TINYINT DEFAULT 0,
    completed_courses TINYINT DEFAULT 0,
    created_at DATETIME DEFAULT NOW(),
    image MEDIUMBLOB NOT NULL,
    unlocked BOOL DEFAULT TRUE,
    is_active BOOL DEFAULT TRUE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS course (
	id INT AUTO_INCREMENT,
	course_name VARCHAR(50) NOT NULL,
	instructor_id INT NOT NULL,
	score DECIMAL(6, 2) DEFAULT -1,
	created_at DATETIME DEFAULT NOW(),
	price DECIMAL(7, 2) NOT NULL,
	image MEDIUMBLOB NOT NULL,
	course_description VARCHAR(255) NOT NULL,
    is_active BOOL DEFAULT TRUE,
	PRIMARY KEY (id),
	FOREIGN KEY (instructor_id) REFERENCES instructor(id)
);

CREATE TABLE IF NOT EXISTS category (
	id INT AUTO_INCREMENT,
	category_name VARCHAR(20) NOT NULL,
	category_description VARCHAR(50) NOT NULL,
	created_at DATETIME DEFAULT NOW(),
    is_active BOOL DEFAULT TRUE,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS course_comment (
	id BIGINT AUTO_INCREMENT,
	student_id INT NOT NULL,
	course_id INT NOT NULL,
	comment_content VARCHAR(255) NOT NULL,
	commented_at DATETIME DEFAULT NOW(),
    is_active BOOL DEFAULT TRUE,
	PRIMARY KEY (id),
	FOREIGN KEY (student_id) REFERENCES student(id),
	FOREIGN KEY (course_id) REFERENCES course(id)
);

CREATE TABLE IF NOT EXISTS message (
	id BIGINT AUTO_INCREMENT,
	first_user_id INT NOT NULL,
	second_user_id INT NOT NULL,
    user_who_sent_id INT NOT NULL,
	message_content VARCHAR(255) NOT NULL,
	messaged_at DATETIME DEFAULT NOW(),
    is_active BOOL DEFAULT TRUE,
	PRIMARY KEY (id),
	FOREIGN KEY (first_user_id) REFERENCES student(id),
	FOREIGN KEY (second_user_id) REFERENCES student(id),
    FOREIGN KEY (user_who_sent_id) REFERENCES student(id)
);

CREATE TABLE IF NOT EXISTS course_score (
	id INT AUTO_INCREMENT,
	student_id INT NOT NULL,
	course_id INT NOT NULL,
	liked BOOL NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (student_id) REFERENCES student(id),
	FOREIGN KEY (course_id) REFERENCES course(id)
);

CREATE TABLE IF NOT EXISTS course_bought_by_student (
	id INT AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    bought_date DATETIME DEFAULT NOW(),
    completed_date DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (course_id) REFERENCES course(id)
);

CREATE TABLE IF NOT EXISTS course_level (
	id INT AUTO_INCREMENT,
    course_id INT NOT NULL,
    level_number TINYINT NOT NULL,
    block_title VARCHAR(30) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (course_id) REFERENCES course(id)
);

CREATE TABLE IF NOT EXISTS course_sublevel (
	id INT AUTO_INCREMENT,
    course_id INT NOT NULL,
    level_number TINYINT NOT NULL,
    sublevel_number TINYINT NOT NULL,
    topic_title VARCHAR(30) NOT NULL,
    media_file LONGBLOB NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (course_id) REFERENCES course(id)
);

CREATE TABLE IF NOT EXISTS course_category (
	id INT AUTO_INCREMENT,
    course_id INT NOT NULL,
    category_id INT NOT NULL,
    is_active BOOL DEFAULT TRUE,
    PRIMARY KEY (id),
    FOREIGN KEY (course_id) REFERENCES course(id),
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE IF NOT EXISTS seen_sublevel (
	id INT AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    sublevel_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (course_id) REFERENCES course(id)
);