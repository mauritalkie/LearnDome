DELIMITER //
CREATE PROCEDURE sp_insert_category
(
	IN _category_name VARCHAR(20),
    IN _category_description VARCHAR(50)
)
BEGIN
	INSERT INTO category(category_name, category_description)
    VALUES(_category_name, _category_description);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_categories()
BEGIN
	SELECT id, category_name
    FROM category
    WHERE is_active = TRUE;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_category
(
	IN _id INT,
    IN _category_name VARCHAR(20),
    IN _category_description VARCHAR(50)
)
BEGIN
	UPDATE category
    SET category_name = _category_name, category_description = _category_description
    WHERE id = _id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_category
(
	IN _id INT
)
BEGIN
	UPDATE category
    SET is_active = FALSE
    WHERE id = _id;
END //
DELIMITER ;