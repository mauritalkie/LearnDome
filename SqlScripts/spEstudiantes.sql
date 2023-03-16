DELIMITER //
CREATE PROCEDURE sp_insert_student
(
	IN _username VARCHAR(30),
	IN _user_password VARCHAR(30),
	IN _first_name VARCHAR(50),
	IN _last_name VARCHAR(50),
	IN _genre VARCHAR(20),
	IN _birthdate DATE,
	IN _email VARCHAR(40),
	IN _image BLOB
)
BEGIN
	INSERT INTO student(username, user_password, first_name, last_name, genre, birthdate, email, image)
	VALUES(_username, _user_password, _first_name, _last_name, _genre, _birthdate, _email, _image);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_student
(
	IN _id INT
)
BEGIN
	SELECT username, user_password, first_name, last_name, email, image, bought_courses, completed_courses
	FROM student
	WHERE id =_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_student
(
	IN _username VARCHAR(30),
	IN _user_password VARCHAR(30),
	IN _first_name VARCHAR(50),
	IN _last_name VARCHAR(50),
    IN _email VARCHAR(40),
	IN _image BLOB,
    IN _id INT
)
BEGIN
	UPDATE student
	SET username = _username, user_password = _user_password, first_name = _first_name,
		last_name = _last_name, email = _email, image = _image
	WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_student
(
IN _id INT
)
BEGIN
	UPDATE student
    SET is_active = FALSE
    WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_student_username
(
	IN _username VARCHAR(30)
)
BEGIN
	SELECT username
	FROM student
	WHERE username =_username;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_student_email
(
	IN _email VARCHAR(40)
)
BEGIN
	SELECT email
	FROM student
	WHERE email =_email;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_lock_student
(
	IN _id INT
)
BEGIN
	UPDATE student
	SET unlocked = FALSE
	WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_unlock_student
(
	IN _id INT
)
BEGIN
	UPDATE student
	SET unlocked = TRUE
	WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_login_student
(
	IN _username VARCHAR(30),
	IN _user_password VARCHAR(30)
)
BEGIN
	SELECT username, user_password
    FROM student
    WHERE username = _username AND user_password = _user_password;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_buy_course
(
	IN _id TINYINT
)
BEGIN
	UPDATE student
	SET bought_courses = bought_courses + 1
	WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_complete_course
(
	IN _id TINYINT
)
BEGIN
	UPDATE student
	SET completed_courses = completed_courses + 1
	WHERE id = _id;
END //
DELIMITER ;