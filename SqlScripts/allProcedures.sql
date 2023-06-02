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
	DECLARE lastId INT;
    
	INSERT INTO administrator(username, user_password, first_name, last_name, genre, birthdate, email, image)
	VALUES(_username, _user_password, _first_name, _last_name, _genre, _birthdate, _email, _image);
    
    SET lastId = (SELECT MAX(id) AS id FROM administrator);
    
    SELECT id, id_for_message
    FROM administrator
    WHERE id = lastId;
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
CREATE PROCEDURE sp_get_administrator_username
(
	IN _username VARCHAR(30)
)
BEGIN
	SELECT id, username
    FROM administrator
	WHERE username =_username;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_administrator_email
(
	IN _email VARCHAR(40)
)
BEGIN
	SELECT email
    FROM administrator
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
	SELECT id, username, user_password, id_for_message
    FROM administrator
    WHERE username = _username AND user_password = _user_password;
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
    IN _image LONGBLOB,
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
	SELECT * FROM courses_by_instructor_view
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
	SELECT * FROM courses_by_search_view
    WHERE course_name LIKE CONCAT('%', course_search, '%') AND is_active = TRUE;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_best_scored_courses()
BEGIN
	SELECT id, course_name, image, course_description
    FROM course
    WHERE is_active = TRUE
    ORDER BY score DESC
    LIMIT 5;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_top_sold_courses()
BEGIN
	SELECT A.course_id, COUNT(A.course_id) AS purchases, B.course_name, B.image, B.course_description
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
	SELECT id, course_name, image, course_description
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
	SELECT A.id, A.course_name, A.image, A.course_description
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
	SELECT * FROM courses_by_date_range_view
    WHERE created_at BETWEEN first_date AND last_date AND is_active = TRUE;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_completed_courses
(
	IN student_id INT
)
BEGIN
	CALL sp_get_total_and_seen_sublevels(student_id);
    
    SELECT COUNT(*) AS completed_courses
    FROM compare_sublevels_table
    WHERE total_sublevels = seen_sublevels;
    
    CALL sp_drop_temporary_tables();
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_course_status
(
	IN _student_id INT,
    IN _course_id INT
)
BEGIN
    SELECT is_course_finished_function(_student_id, _course_id) AS is_finished;
    CALL sp_drop_temporary_tables();
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_course_certificate
(
	IN _student_id INT,
    IN _course_id INT
)
BEGIN
	SELECT A.first_name, A.last_name, B.completed_date, C.course_name
    FROM ((student A
    INNER JOIN course_bought_by_student B ON A.id = B.student_id)
    INNER JOIN course C ON B.course_id = C.id)
    WHERE B.student_id = _student_id AND B.course_id = _course_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_all_courses()
BEGIN
	SELECT id, course_name, course_description, image
    FROM course
    WHERE is_active = TRUE;
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
	SELECT * FROM categories_view
    WHERE is_active = TRUE;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_category_by_name
(
	IN _category_name VARCHAR(20)
)
BEGIN
	SELECT id
    FROM category
    WHERE category_name = _category_name;
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
CREATE PROCEDURE sp_insert_message
(
	IN _first_user_id VARCHAR(36),
    IN _second_user_id VARCHAR(36),
    IN _user_who_sent_id VARCHAR(36),
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
	IN _first_user_id VARCHAR(36),
    IN _second_user_id VARCHAR(36),
    IN _user_who_sent_id VARCHAR(36)
)
BEGIN
	SELECT * FROM messages_view
    WHERE (first_user_id = _first_user_id AND second_user_id = _second_user_id) OR (first_user_id = _second_user_id AND second_user_id = _first_user_id);
END //
DELIMITER ; 

DELIMITER //
CREATE PROCEDURE sp_get_user_by_username
(
	IN _username VARCHAR(30)
)
BEGIN
	DECLARE student_exists INT;
    DECLARE instructor_exists INT;
    DECLARE administrator_exists INT;
    
    SET student_exists = (SELECT COUNT(id_for_message) FROM student WHERE username = _username);
    SET instructor_exists = (SELECT COUNT(id_for_message) FROM instructor WHERE username = _username);
    SET administrator_exists = (SELECT COUNT(id_for_message) FROM administrator WHERE username = _username);
    
    IF student_exists > 0 THEN
		SELECT id_for_message FROM student WHERE username = _username;
	ELSE IF instructor_exists > 0 THEN
		SELECT id_for_message FROM instructor WHERE username = _username;
	ELSE
		SELECT id_for_message FROM administrator WHERE username = _username;
	END IF;
	END IF;
    
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
	DECLARE scored_before INT;
    SET scored_before = (SELECT COUNT(liked) FROM course_score WHERE student_id = _student_id AND course_id = _course_id);
    IF scored_before > 0 THEN
		UPDATE course_score
        SET liked = _liked
        WHERE student_id = _student_id AND course_id = _course_id;
	ELSE
		INSERT INTO course_score(student_id, course_id, liked)
		VALUES(_student_id, _course_id, _liked);
	END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insert_purchase_course_student
(
	IN _student_id INT,
    IN _course_id INT
)
BEGIN
	DECLARE purchase INT;
    SET purchase = (SELECT COUNT(id) FROM course_bought_by_student WHERE student_id = _student_id AND course_id = _course_id);
    IF purchase = 0 THEN
		INSERT INTO course_bought_by_student(student_id, course_id)
		VALUES(_student_id, _course_id);
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_set_completed_date
(
	IN _student_id INT,
    IN _course_id INT
)
BEGIN
	DECLARE _completed_date DATETIME;
    SET _completed_date = (SELECT completed_date FROM course_bought_by_student WHERE student_id = _student_id AND course_id = _course_id);
    IF _completed_date IS NULL THEN
		UPDATE course_bought_by_student
		SET completed_date = NOW()
		WHERE student_id = _student_id AND course_id = _course_id;
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_purchase_status
(
	IN _student_id INT,
    IN _course_id INT
)
BEGIN
	SELECT COUNT(id) AS purchase
    FROM course_bought_by_student
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
	IN _course_id INT,
    IN _student_id INT
)
BEGIN
	DECLARE purchase INT;
    SET purchase = (SELECT COUNT(id) FROM course_bought_by_student WHERE course_id = _course_id AND student_id = _student_id);
    IF purchase > 0 THEN
		SELECT * FROM levels_view
		WHERE course_id = _course_id;
	ELSE
		SELECT id, level_number, block_title
		FROM course_level
		WHERE course_id = _course_id
        LIMIT 1;
	END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_all_levels
(
	IN _course_id INT
)
BEGIN
	SELECT * FROM levels_view
	WHERE course_id = _course_id;
END //
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
    IN _level_number INT,
    IN _student_id INT
)
BEGIN
	DECLARE purchase INT;
    SET purchase = (SELECT COUNT(id) FROM course_bought_by_student WHERE course_id = _course_id AND student_id = _student_id);
    IF purchase > 0 THEN
		SELECT id, sublevel_number, topic_title, media_file
		FROM course_sublevel
		WHERE course_id = _course_id AND level_number = _level_number;
	ELSE
		SELECT id, sublevel_number, topic_title, media_file
		FROM course_sublevel
		WHERE course_id = _course_id AND level_number = _level_number
        LIMIT 1;
	END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_all_sublevels
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
CREATE PROCEDURE sp_insert_seen_sublevel
(
	IN _student_id INT,
    IN _course_id INT,
    IN _sublevel_id INT
)
BEGIN
	DECLARE seen INT;
    DECLARE purchase INT;
    
    SET seen = (SELECT COUNT(id) FROM seen_sublevel WHERE student_id = _student_id AND course_id = _course_id AND sublevel_id = _sublevel_id);
    SET purchase = (SELECT COUNT(id) FROM course_bought_by_student WHERE student_id = _student_id AND course_id = _course_id);
    
    IF seen = 0 AND purchase > 0 THEN
		INSERT INTO seen_sublevel(student_id, course_id, sublevel_id)
		VALUES(_student_id, _course_id, _sublevel_id);
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_total_and_seen_sublevels
(
	IN _student_id INT
)
BEGIN
	CREATE TEMPORARY TABLE IF NOT EXISTS total_sublevels_table AS (
		SELECT A.course_id, COUNT(A.id) AS total_sublevels
		FROM course_sublevel A
		INNER JOIN course_bought_by_student B
		ON A.course_id = B.course_id
		WHERE B.student_id = _student_id
		GROUP BY A.course_id
    );
    
    CREATE TEMPORARY TABLE IF NOT EXISTS seen_sublevels_table AS (
		SELECT A.course_id, COUNT(A.sublevel_id) - 1 AS seen_sublevels
		FROM seen_sublevel A
		INNER JOIN course_bought_by_student B
		ON A.course_id = B.course_id AND A.student_id = B.student_id
		WHERE B.student_id = _student_id
		GROUP BY A.course_id
    );
    
    CREATE TEMPORARY TABLE IF NOT EXISTS compare_sublevels_table AS (
		SELECT A.course_id, A.total_sublevels, B.seen_sublevels
        FROM total_sublevels_table A
        INNER JOIN seen_sublevels_table B
        ON A.course_id = B.course_id
    );
END //
DELIMITER ;
    
DELIMITER //
CREATE PROCEDURE sp_drop_temporary_tables()
BEGIN
	DROP TABLE total_sublevels_table;
    DROP TABLE seen_sublevels_table;
    DROP TABLE compare_sublevels_table;
END //
DELIMITER ;