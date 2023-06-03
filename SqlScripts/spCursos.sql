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
	SELECT A.course_name, B.first_name, B.last_name, A.score, A.created_at, A.price, A.image, A.course_description, A.is_active
    FROM course A
    INNER JOIN instructor B
    ON A.instructor_id = B.id
    WHERE A.id = _id;
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