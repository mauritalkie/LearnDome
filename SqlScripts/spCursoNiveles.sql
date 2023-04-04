DELIMITER //
CREATE PROCEDURE sp_insert_course_level
(
	IN _course_id INT,
    IN _number_level TINYINT,
    IN _block_title VARCHAR(30)
)
BEGIN
	INSERT INTO course_level(course_id, number_level, block_title)
    VALUES(_course_id, _number_level, _block_title);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_levels
(
	IN _course_id INT
)
BEGIN
	SELECT id, number_level, block_title
    FROM course_level
    WHERE course_id = _course_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_existing_level
(
	IN _course_id INT,
    IN _number_level TINYINT,
    IN _block_title VARCHAR(30)
)
BEGIN
	SELECT id
    FROM course_level
    WHERE course_id = _course_id AND (number_level = _number_level OR block_title = _block_title);
END //
DELIMITER ;