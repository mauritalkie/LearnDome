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
	SELECT * FROM categories_view
    WHERE is_active = TRUE;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_category_by_name
(
	IN _category_name VARCHAR(20)
)
BEGIN
	SELECT id
    FROM category
    WHERE category_name = _category_name;
END //
DELIMITER ;