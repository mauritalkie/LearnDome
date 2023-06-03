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