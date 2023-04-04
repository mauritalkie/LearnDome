DELIMITER //
CREATE PROCEDURE sp_insert_course
(
	IN _course_name VARCHAR(50),
    IN _instructor_id INT,
    IN _price DECIMAL(5, 2),
    IN _image BLOB,
    IN _course_description VARCHAR(255)
)
BEGIN
	INSERT INTO course(course_name, instructor_id, price, image, course_description)
    VALUES(_course_name, _instructor_id, _price, _image, _course_description);
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
    IN _image BLOB,
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
	UPDATE courses
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

-- TODO: sp de obtener cursos por categoría con like o con inner join