DELIMITER //
CREATE PROCEDURE sp_insert_instructor
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
    
	INSERT INTO instructor(username, user_password, first_name, last_name, genre, birthdate, email, image)
	VALUES(_username, _user_password, _first_name, _last_name, _genre, _birthdate, _email, _image);
    
    SET lastId = (SELECT MAX(id) AS id FROM instructor);
    
    SELECT id, id_for_message
    FROM instructor
    WHERE id = lastId;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_instructor
(
	IN _id INT
)
BEGIN
	SELECT username, user_password, first_name, last_name, email, image, courses_number, score
	FROM instructor
	WHERE id =_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_instructor
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
	UPDATE instructor
	SET username = _username, user_password = _user_password, first_name = _first_name,
		last_name = _last_name, email = _email, image = _image
	WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_instructor_username
(
	IN _username VARCHAR(30)
)
BEGIN
	SELECT id, username, unlocked
    FROM instructor
	WHERE username =_username;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_instructor_email
(
	IN _email VARCHAR(40)
)
BEGIN
	SELECT email
    FROM instructor
	WHERE email =_email;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_lock_instructor
(
	IN _id INT
)
BEGIN
	UPDATE instructor
	SET unlocked = FALSE
	WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_unlock_instructor
(
	IN _id INT
)
BEGIN
	UPDATE instructor
	SET unlocked = TRUE
	WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_login_instructor
(
	IN _username VARCHAR(30),
	IN _user_password VARCHAR(30)
)
BEGIN
	SELECT id, username, user_password, unlocked, id_for_message
    FROM instructor
    WHERE username = _username AND user_password = _user_password;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_locked_instructors()
BEGIN
	SELECT * FROM locked_instructors_view
    WHERE unlocked = FALSE;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_course_report
(
	IN _course_id INT
)
BEGIN
	CREATE TEMPORARY TABLE IF NOT EXISTS total_sublevels_table AS (
		SELECT A.course_id, COUNT(A.id) AS total_sublevels, B.student_id
		FROM course_sublevel A
		INNER JOIN course_bought_by_student B
		ON A.course_id = B.course_id
		GROUP BY A.course_id, B.student_id
    );
    
    CREATE TEMPORARY TABLE IF NOT EXISTS seen_sublevels_table AS (
		SELECT A.course_id, COUNT(A.sublevel_id) - 1 AS seen_sublevels, B.student_id
		FROM seen_sublevel A
		INNER JOIN course_bought_by_student B
		ON A.course_id = B.course_id AND A.student_id = B.student_id
		GROUP BY A.course_id, B.student_id
    );
    
    CREATE TEMPORARY TABLE IF NOT EXISTS compare_sublevels_table AS (
		SELECT A.course_id, A.total_sublevels, B.seen_sublevels, B.student_id
        FROM total_sublevels_table A
        INNER JOIN seen_sublevels_table B
        ON A.course_id = B.course_id AND A.student_id = B.student_id
    );
    
    SELECT A.total_sublevels, A.seen_sublevels, B.first_name, B.last_name, C.bought_date, D.price
    FROM (((compare_sublevels_table A
    INNER JOIN student B ON A.student_id = B.id)
    INNER JOIN course_bought_by_student C ON A.student_id = C.student_id AND A.course_id = C.course_id)
    INNER JOIN course D ON A.course_id = D.id)
    WHERE A.course_id = _course_id;
    
    CALL sp_drop_temporary_tables();
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_sales_report
(
	IN _instructor_id INT
)
BEGIN
	CREATE TEMPORARY TABLE IF NOT EXISTS total_income_table AS (
		SELECT A.id, A.course_name, COUNT(C.student_id) AS students, SUM(A.price) AS total_income
		FROM ((course A
		INNER JOIN instructor B ON A.instructor_id = B.id)
		INNER JOIN course_bought_by_student C ON A.id = C.course_id )
		WHERE B.id = _instructor_id
		GROUP BY A.id, A.course_name
	);

	CREATE TEMPORARY TABLE IF NOT EXISTS average_seen_table AS (
		SELECT A.course_id, ROUND(AVG(B.sublevel_number)) AS average_seen_sublevel
		FROM seen_sublevel A
		INNER JOIN course_sublevel B
		ON A.sublevel_id = B.id
		GROUP BY course_id
	);

	CREATE TEMPORARY TABLE IF NOT EXISTS sales_report_table AS (
		SELECT A.id, A.course_name, A.students, A.total_income, B.course_id, B.average_seen_sublevel
		FROM total_income_table A
		INNER JOIN average_seen_table B
		ON A.id = B.course_id
	);

	SELECT * FROM sales_report_table;
    
    DROP TABLE total_income_table;
    DROP TABLE average_seen_table;
    DROP TABLE sales_report_table;
    
END //
DELIMITER ;

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
	SELECT * FROM get_student_username_view
	WHERE username =_username;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_student_email
(
	IN _email VARCHAR(40)
)
BEGIN
	SELECT * FROM get_student_email_view
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
	SELECT * FROM login_student_view
    WHERE username = _username AND user_password = _user_password;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_locked_students()
BEGIN
	SELECT id, username
    FROM student
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