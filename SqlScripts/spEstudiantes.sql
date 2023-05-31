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
	IN _image MEDIUMBLOB
)
BEGIN
	DECLARE lastId INT;
    
	INSERT INTO student(username, user_password, first_name, last_name, genre, birthdate, email, image)
	VALUES(_username, _user_password, _first_name, _last_name, _genre, _birthdate, _email, _image);
    
    SET lastId = (SELECT MAX(id) AS id FROM student);
    
    SELECT id, id_for_message
    FROM student
    WHERE id = lastId;
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
	IN _image MEDIUMBLOB,
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
CREATE PROCEDURE sp_get_student_username
(
	IN _username VARCHAR(30)
)
BEGIN
	SELECT id, username, unlocked
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
	SELECT id, username, user_password, unlocked, id_for_message
    FROM student
    WHERE username = _username AND user_password = _user_password;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_locked_students()
BEGIN
	SELECT * FROM locked_students_view
    WHERE unlocked = FALSE;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE get_student_info
(
	IN _student_id INT
)
BEGIN
	DECLARE at_least_one_bought_course INT;
    SET at_least_one_bought_course = (SELECT COUNT(*) FROM course_bought_by_student WHERE student_id = _student_id);
    
    IF at_least_one_bought_course = 0 THEN
		CREATE TEMPORARY TABLE student_info_table(SELECT image, first_name, last_name FROM student WHERE id = _student_id);
        ALTER TABLE student_info_table ADD COLUMN bought_courses TINYINT;
        UPDATE student_info_table SET bought_courses = 0;
        SELECT * FROM student_info_table;
        DROP TABLE student_info_table;
    ELSE
		SELECT A.image, A.first_name, A.last_name, COUNT(B.student_id) AS bought_courses
		FROM student A
		INNER JOIN course_bought_by_student B
		ON A.id = B.student_id
		WHERE B.student_id = _student_id
		GROUP BY B.student_id;
	END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_student_kardex
(
	IN _student_id INT
)
BEGIN
	CALL sp_get_total_and_seen_sublevels(_student_id);
    
    SELECT A.course_name, B.bought_date, C.total_sublevels, C.seen_sublevels
    FROM ((course A
    INNER JOIN course_bought_by_student B ON A.id = B.course_id)
    INNER JOIN compare_sublevels_table C ON B.course_id = C.course_id)
    WHERE B.student_id = _student_id;
    
    CALL sp_drop_temporary_tables();
END //
DELIMITER ;