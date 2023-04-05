DELIMITER //
CREATE PROCEDURE sp_insert_course_sublevel
(
	IN _course_id INT,
    IN _level_number TINYINT,
    IN _sublevel_number TINYINT,
    IN _topic_title VARCHAR(30),
    IN _media_file BLOB
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