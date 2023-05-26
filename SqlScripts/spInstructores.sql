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
	INSERT INTO instructor(username, user_password, first_name, last_name, genre, birthdate, email, image)
	VALUES(_username, _user_password, _first_name, _last_name, _genre, _birthdate, _email, _image);
    SELECT MAX(id) AS id FROM instructor;
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
CREATE PROCEDURE sp_delete_instructor
(
IN _id INT
)
BEGIN
	UPDATE instructor
    SET is_active = FALSE
    WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_instructor_username
(
	IN _username VARCHAR(30)
)
BEGIN
	SELECT * FROM get_instructor_username_view
	WHERE username =_username;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_instructor_email
(
	IN _email VARCHAR(40)
)
BEGIN
	SELECT * FROM get_instructor_email_view
	WHERE email =_email;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_increase_courses_number
(
	IN _id TINYINT
)
BEGIN
	UPDATE instructor
	SET courses_number = courses_number + 1
	WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_decrease_courses_number
(
	IN _id TINYINT
)
BEGIN
	UPDATE instructor
	SET courses_number = courses_number - 1
	WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_instructor_score
(
-- funcion y trigger en la tabla de score para actualizar esto
)
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
	SELECT * FROM login_instructor_view
    WHERE username = _username AND user_password = _user_password;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_locked_instructors()
BEGIN
	SELECT id, username
    FROM instructor
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