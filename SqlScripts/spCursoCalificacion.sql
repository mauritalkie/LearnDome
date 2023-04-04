DELIMITER //
CREATE PROCEDURE sp_insert_score
(
	IN _student_id INT,
    IN _course_id INT,
    IN _liked BOOL
)
BEGIN
	INSERT INTO course_score(student_id, course_id, liked)
    VALUES(_student_id, _course_id, _liked);
END //
DELIMITER ;