DELIMITER //
CREATE PROCEDURE sp_insert_message
(
	IN _first_user_id INT,
    IN _second_user_id INT,
    IN _message_content VARCHAR(255)
)
BEGIN
	INSERT INTO message(first_user_id, second_user_id, message_content)
    VALUES(_first_user_id, _second_user_id, _message_content);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_messages
(
	IN _first_user_id INT,
    IN _second_user_id INT
)
BEGIN
	SELECT content_message
    FROM messages
    WHERE first_user_id = _first_user_id AND second_user_id = _second_user_id;
END //
DELIMITER ;

-- TODO: agregar nuevo campo en la tabla para saber quien envió el mensaje