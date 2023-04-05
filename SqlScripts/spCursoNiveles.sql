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