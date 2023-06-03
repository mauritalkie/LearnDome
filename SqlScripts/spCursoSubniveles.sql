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