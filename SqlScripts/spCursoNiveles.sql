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