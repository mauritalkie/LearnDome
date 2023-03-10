CREATE DATABASE IF NOT EXISTS learn_dome;

USE learn_dome;

CREATE TABLE administrator (
	id INT AUTO_INCREMENT,
	username VARCHAR(30) UNIQUE NOT NULL,
	user_password VARCHAR(30) NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	genre VARCHAR(20) NOT NULL,
	birthdate DATE NOT NULL,
	email VARCHAR(40) UNIQUE NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE instructor (
	id INT AUTO_INCREMENT,
	username VARCHAR(30) UNIQUE NOT NULL,
	user_password VARCHAR(30) NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	genre VARCHAR(20) NOT NULL,
	birthdate DATE NOT NULL,
	email VARCHAR(40) UNIQUE NOT NULL,
    created_at DATE DEFAULT NOW(),
    courses_number TINYINT NOT NULL,
    score DECIMAL(3, 2) NOT NULL,
    image BLOB NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE student (
	id INT AUTO_INCREMENT,
	username VARCHAR(30) UNIQUE NOT NULL,
	user_password VARCHAR(30) NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	genre VARCHAR(20) NOT NULL,
	birthdate DATE NOT NULL,
	email VARCHAR(40) UNIQUE NOT NULL,
    created_at DATE DEFAULT NOW(),
    image BLOB NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE course (
	id INT AUTO_INCREMENT,
	course_name VARCHAR(50) NOT NULL,
	instructor_id INT,
	score DECIMAL(3, 2) NOT NULL,
	created_at DATE DEFAULT NOW(),
	price DECIMAL(5, 2) NOT NULL,
	image BLOB NOT NULL,
	course_description VARCHAR(255) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (instructor_id) REFERENCES instructor(id)
);

CREATE TABLE category (
	id INT AUTO_INCREMENT,
	category_name VARCHAR(20) NOT NULL,
	category_description VARCHAR(50) NOT NULL,
	instructor_id INT,
	administrator_id INT,
	created_at DATETIME DEFAULT NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (instructor_id) REFERENCES instructor(id),
	FOREIGN KEY (administrator_id) REFERENCES administrator(id)
);

CREATE TABLE course_comment (
	id BIGINT AUTO_INCREMENT,
	student_id INT NOT NULL,
	course_id INT NOT NULL,
	comment_content VARCHAR(255) NOT NULL,
	commented_at DATETIME DEFAULT NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (student_id) REFERENCES student(id),
	FOREIGN KEY (course_id) REFERENCES course(id)
);

CREATE TABLE message (
	id BIGINT AUTO_INCREMENT,
	student_id INT NOT NULL,
	instructor_id INT NOT NULL,
	message_content VARCHAR(255),
	messaged_at DATETIME DEFAULT NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (student_id) REFERENCES student(id),
	FOREIGN KEY (instructor_id) REFERENCES instructor(id)
);

CREATE TABLE score (
	id INT AUTO_INCREMENT,
	student_id INT NOT NULL,
	course_id INT NOT NULL,
	liked BOOL,
	PRIMARY KEY (id),
	FOREIGN KEY (student_id) REFERENCES student(id),
	FOREIGN KEY (course_id) REFERENCES course(id)
);