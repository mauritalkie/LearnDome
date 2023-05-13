USE learn_dome;

DELIMITER //
CREATE PROCEDURE sp_insert_administrator
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
	INSERT INTO administrator(username, user_password, first_name, last_name, genre, birthdate, email, image)
	VALUES(_username, _user_password, _first_name, _last_name, _genre, _birthdate, _email, _image);
    SELECT MAX(id) AS id FROM administrator;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_administrator
(
	IN _id INT
)
BEGIN
	SELECT username, user_password, first_name, last_name, email, image
	FROM administrator
	WHERE id =_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_administrator
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
	UPDATE administrator
	SET username = _username, user_password = _user_password, first_name = _first_name,
		last_name = _last_name, email = _email, image = _image
	WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_administrator
(
IN _id INT
)
BEGIN
	UPDATE administrator
    SET is_active = FALSE
    WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_administrator_username
(
	IN _username VARCHAR(30)
)
BEGIN
	SELECT * FROM get_administrator_username_view
	WHERE username =_username;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_administrator_email
(
	IN _email VARCHAR(40)
)
BEGIN
	SELECT * FROM get_administrator_email_view
	WHERE email =_email;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_login_administrator
(
	IN _username VARCHAR(30),
	IN _user_password VARCHAR(30)
)
BEGIN
	SELECT * FROM login_administrator_view
    WHERE username = _username AND user_password = _user_password;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insert_category
(
	IN _category_name VARCHAR(20),
    IN _category_description VARCHAR(50)
)
BEGIN
	INSERT INTO category(category_name, category_description)
    VALUES(_category_name, _category_description);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_categories()
BEGIN
	SELECT id, category_name
    FROM category
    WHERE is_active = TRUE;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_category
(
	IN _id INT,
    IN _category_name VARCHAR(20),
    IN _category_description VARCHAR(50)
)
BEGIN
	UPDATE category
    SET category_name = _category_name, category_description = _category_description
    WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_category
(
	IN _id INT
)
BEGIN
	UPDATE category
    SET is_active = FALSE
    WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insert_comment
(
	IN _student_id INT,
	IN _course_id INT,
	IN _comment_content VARCHAR(255)
)
BEGIN
	INSERT INTO course_comment(student_id, course_id, comment_content)
    VALUES(_student_id, _course_id, _comment_content);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_comments
(
	IN _course_id INT
)
BEGIN
	SELECT A.id, A.comment_content, A.commented_at, B.username
    FROM course_comment A
    INNER JOIN student B
    ON A.student_id = B.id
    WHERE A.course_id = _course_id AND A.is_active = TRUE;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_comment
(
	IN _id INT
)
BEGIN
	UPDATE course_comment
    SET is_active = FALSE
    WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insert_score
(
	IN _student_id INT,
    IN _course_id INT,
    IN _liked BOOL
)
BEGIN
	INSERT INTO course_score(student_id, course_id, liked)
    VALUES(_student_id, _course_id, _liked);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insert_course_category
(
	IN _course_id INT,
    IN _category_id INT
)
BEGIN
	INSERT INTO course_category(course_id, category_id)
    VALUES(_course_id, _category_id);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_remove_category_from_course
(
	IN _course_id INT,
    IN _category_id INT
)
BEGIN
	UPDATE course_category
    SET is_active = FALSE
    WHERE course_id = _course_id AND category_id = _category_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_categories_from_selected_course
(
	IN _course_id INT
)
BEGIN
	SELECT A.id, A.category_name
    FROM category
    INNER JOIN course_category B
    ON A.id = B.category_id
    WHERE B.course_id = _course_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insert_purchase_course_student
(
	IN _student_id INT,
    IN _course_id INT
)
BEGIN
	INSERT INTO course_bought_by_student(student_id, course_id)
    VALUES(_student_id, _course_id);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_current_level
(
	IN _student_id INT,
    IN _course_id INT,
    IN new_level INT
)
BEGIN
	UPDATE course_bought_by_student
    SET current_level = new_level
    WHERE student_id = _student_id AND course_id = _course_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_set_completed_date
(
	IN _student_id INT,
    IN _course_id INT
)
BEGIN
	UPDATE course_bought_by_student
    SET completed_date = NOW()
    WHERE student_id = _student_id AND course_id = _course_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insert_course_level
(
	IN _course_id INT,
    IN _level_number TINYINT,
    IN _block_title VARCHAR(30)
)
BEGIN
	INSERT INTO course_level(course_id, level_number, block_title)
    VALUES(_course_id, _level_number, _block_title);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_levels
(
	IN _course_id INT
)
BEGIN
	SELECT id, level_number, block_title
    FROM course_level
    WHERE course_id = _course_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_existing_level
(
	IN _course_id INT,
    IN _level_number TINYINT,
    IN _block_title VARCHAR(30)
)
BEGIN
	SELECT id
    FROM course_level
    WHERE course_id = _course_id AND (level_number = _level_number OR block_title = _block_title);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insert_course
(
	IN _course_name VARCHAR(50),
    IN _instructor_id INT,
    IN _price DECIMAL(5, 2),
    IN _image MEDIUMBLOB,
    IN _course_description VARCHAR(255)
)
BEGIN
	INSERT INTO course(course_name, instructor_id, price, image, course_description)
    VALUES(_course_name, _instructor_id, _price, _image, _course_description);
    SELECT MAX(id) AS id FROM course;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_course
(
	IN _id INT
)
BEGIN
	SELECT A.course_name, B.first_name, B.last_name, A.score, A.created_at, A.price, A.image, A.course_description
    FROM course A
    INNER JOIN instructor B
    ON A.instructor_id = B.id
    WHERE A.id = _id AND A.is_active = TRUE;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_course
(
	IN _id INT,
    IN _course_name VARCHAR(50),
    IN _price DECIMAL(5, 2),
    IN _image MEDIUMBLOB,
    IN _course_description VARCHAR(255)
)
BEGIN
	UPDATE course
    SET course_name = _course_name, price = _price, image = _image, course_description = _course_description
    WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_course
(
	IN _id INT
)
BEGIN
	UPDATE course
    SET is_active = FALSE
    WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_courses_by_instructor
(
	IN _instructor_id INT
)
BEGIN
	SELECT id, course_name
    FROM course
    WHERE instructor_id = _instructor_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_courses_by_category
(
	IN _category_id INT
)
BEGIN
	SELECT A.id, A.course_name, A.course_description, A.image
    FROM course A
    INNER JOIN course_category B
    ON A.id = B.course_id
    WHERE B.category_id = _category_id AND A.is_active = TRUE AND B.is_active = TRUE;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_courses_by_search
(
	IN course_search VARCHAR(30)
)
BEGIN
	SELECT id, course_name, course_description, image
    FROM course
    WHERE course_name LIKE CONCAT('%', course_search, '%') AND is_active = TRUE;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_best_scored_courses()
BEGIN
	SELECT id, course_name, score, created_at, price, image, course_description
    FROM course
    WHERE is_active = TRUE
    ORDER BY score DESC
    LIMIT 5;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_top_sold_courses()
BEGIN
	SELECT A.course_id, COUNT(A.course_id) AS purchases, B.course_name, B.score, B.created_at, B.price, B.image, B.course_description
	FROM course_bought_by_student A
	INNER JOIN course B
	ON A.course_id = B.id
	WHERE B.is_active = TRUE
	GROUP BY A.course_id
	ORDER BY COUNT(A.course_id) DESC
	LIMIT 5;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_most_recent_courses()
BEGIN
	SELECT id, course_name, score, created_at, price, image, course_description
    FROM course
    WHERE is_active = TRUE
    ORDER BY created_at DESC
    LIMIT 5;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_courses_by_instructor_name
(
	IN complete_name VARCHAR(50)
)
BEGIN
	SELECT A.id, A.course_name, A.score, A.created_at, A.price, A.image, A.course_description
    FROM course A
    INNER JOIN instructor B
    ON A.instructor_id = B.id
    WHERE CONCAT(B.first_name, ' ', B.last_name) LIKE CONCAT('%', complete_name, '%') AND A.is_active = TRUE;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_courses_by_date_range
(
	IN first_date DATETIME,
    IN last_date DATETIME
)
BEGIN
	SELECT id, course_name, score, created_at, price, image, course_description
    FROM course
    WHERE created_at BETWEEN first_date AND last_date AND is_active = TRUE;
END
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insert_course_sublevel
(
	IN _course_id INT,
    IN _level_number TINYINT,
    IN _sublevel_number TINYINT,
    IN _topic_title VARCHAR(30),
    IN _media_file LONGBLOB
)
BEGIN
	INSERT INTO course_sublevel(course_id, level_number, sublevel_number, topic_title, media_file)
    VALUES(_course_id, _level_number, _sublevel_number, _topic_title, _media_file);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_sublevels
(
	IN _course_id INT,
    IN _level_number INT
)
BEGIN
	SELECT id, sublevel_number, topic_title, media_file
    FROM course_sublevel
    WHERE course_id = _course_id AND level_number = _level_number;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_existing_sublevel
(
	IN _course_id INT,
    IN _level_number INT,
    IN _sublevel_number INT,
    IN _topic_title VARCHAR(30)
)
BEGIN
	SELECT id
    FROM course_sublevel
    WHERE course_id = _course_id AND level_number = _level_number AND (sublevel_number = _sublevel_number OR topic_title = _topic_title);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_set_seen_sublevel
(
	IN _id INT
)
BEGIN
	UPDATE course_sublevel
    SET seen = TRUE
    WHERE id = _id;
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
	INSERT INTO student(username, user_password, first_name, last_name, genre, birthdate, email, image)
	VALUES(_username, _user_password, _first_name, _last_name, _genre, _birthdate, _email, _image);
    SELECT MAX(id) AS id FROM student;
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
CREATE PROCEDURE sp_buy_course
(
	IN _id INT
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
	IN _id INT
)
BEGIN
	UPDATE student
	SET completed_courses = completed_courses + 1
	WHERE id = _id;
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
CREATE PROCEDURE sp_insert_message
(
	IN _first_user_id INT,
    IN _second_user_id INT,
    IN _user_who_sent_id INT,
    IN _message_content VARCHAR(255)
)
BEGIN
	INSERT INTO message(first_user_id, second_user_id, user_who_sent_id, message_content)
    VALUES(_first_user_id, _second_user_id, _user_who_sent_id, _message_content);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_messages
(
	IN _first_user_id INT,
    IN _second_user_id INT
)
BEGIN
	SELECT message_content, user_who_sent_id
    FROM message
    WHERE first_user_id = _first_user_id AND second_user_id = _second_user_id;
END //
DELIMITER ;