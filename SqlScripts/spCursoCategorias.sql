DELIMITER //
CREATE PROCEDURE sp_insert_course_category
(
	IN _course_id INT,
    IN _category_id INT
)
BEGIN
	INSERT INTO course_category(course_id, category_id)
    VALUES(_course_id, _category_id);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_remove_category_from_course
(
	IN _course_id INT,
    IN _category_id INT
)
BEGIN
	UPDATE course_category
    SET is_active = FALSE
    WHERE course_id = _course_id AND category_id = _category_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_categories_from_selected_course
(
	IN _course_id INT
)
BEGIN
	SELECT A.id, A.category_name
    FROM category A
    INNER JOIN course_category B
    ON A.id = B.category_id
    WHERE B.course_id = _course_id AND A.is_active = TRUE AND B.is_active = TRUE;
END //
DELIMITER ;