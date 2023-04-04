DELIMITER //
CREATE PROCEDURE sp_insert_course_sublevel
(
	IN _course_id INT,
    IN _number_level TINYINT,
    IN _number_sublevel TINYINT,
    IN _topic_title VARCHAR(30),
    IN _media_file BLOB
)
BEGIN
	INSERT INTO course_sublevel(course_id, number_level, number_sublevel, topic_title, media_file)
    VALUES(_course_id, _number_level, _number_sublevel, _topic_title, _media_file);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_sublevels
(
	IN _course_id INT,
    IN _course_level INT
)
BEGIN
	SELECT id, number_sublevel, topic_title, media_file
    FROM course_sublevel
    WHERE course_id = _course_id AND course_level = _course_level;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_existing_sublevel
(
	IN _course_id INT,
    IN _number_level INT,
    IN _number_sublevel INT,
    IN _topic_title VARCHAR(30)
)
BEGIN
	SELECT id
    FROM course_sublevel
    WHERE course_id = _course_id AND number_level = _number_level AND (number_sublevel = _number_sublevel OR topic_title = _topic_title);
END //
DELIMITER ;