DELIMITER //
CREATE PROCEDURE sp_insert_administrator
(
	IN _username VARCHAR(30),
	IN _user_password VARCHAR(30),
	IN _first_name VARCHAR(50),
	IN _last_name VARCHAR(50),
	IN _genre VARCHAR(20),
	IN _birthdate DATE,
	IN _email VARCHAR(40),
	IN _image MEDIUMBLOB
)
BEGIN
	INSERT INTO administrator(username, user_password, first_name, last_name, genre, birthdate, email, image)
	VALUES(_username, _user_password, _first_name, _last_name, _genre, _birthdate, _email, _image);
    SELECT MAX(id) AS id FROM administrator;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_administrator
(
	IN _id INT
)
BEGIN
	SELECT username, user_password, first_name, last_name, email, image
	FROM administrator
	WHERE id =_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_administrator
(
	IN _username VARCHAR(30),
	IN _user_password VARCHAR(30),
	IN _first_name VARCHAR(50),
	IN _last_name VARCHAR(50),
    IN _email VARCHAR(40),
	IN _image MEDIUMBLOB,
    IN _id INT
)
BEGIN
	UPDATE administrator
	SET username = _username, user_password = _user_password, first_name = _first_name,
		last_name = _last_name, email = _email, image = _image
	WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_administrator
(
IN _id INT
)
BEGIN
	UPDATE administrator
    SET is_active = FALSE
    WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_administrator_username
(
	IN _username VARCHAR(30)
)
BEGIN
	SELECT * FROM get_administrator_username_view
	WHERE username =_username;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_administrator_email
(
	IN _email VARCHAR(40)
)
BEGIN
	SELECT * FROM get_administrator_email_view
	WHERE email =_email;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_login_administrator
(
	IN _username VARCHAR(30),
	IN _user_password VARCHAR(30)
)
BEGIN
	SELECT * FROM login_administrator_view
    WHERE username = _username AND user_password = _user_password;
END //
DELIMITER ;