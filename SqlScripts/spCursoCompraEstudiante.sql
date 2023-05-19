DELIMITER //
CREATE PROCEDURE sp_insert_purchase_course_student
(
	IN _student_id INT,
    IN _course_id INT
)
BEGIN
	INSERT INTO course_bought_by_student(student_id, course_id)
    VALUES(_student_id, _course_id);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_update_current_level
(
	IN _student_id INT,
    IN _course_id INT,
    IN new_level INT
)
BEGIN
	UPDATE course_bought_by_student
    SET current_level = new_level
    WHERE student_id = _student_id AND course_id = _course_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_set_completed_date
(
	IN _student_id INT,
    IN _course_id INT
)
BEGIN
	DECLARE _completed_date DATETIME;
    SET _completed_date = (SELECT completed_date FROM course_bought_by_student WHERE student_id = _student_id AND course_id = _course_id);
    IF _completed_date IS NULL THEN
		UPDATE course_bought_by_student
		SET completed_date = NOW()
		WHERE student_id = _student_id AND course_id = _course_id;
    END IF;
END //
DELIMITER ;