DELIMITER //
CREATE PROCEDURE sp_insert_score
(
	IN _student_id INT,
    IN _course_id INT,
    IN _liked BOOL
)
BEGIN
	DECLARE scored_before INT;
    SET scored_before = (SELECT COUNT(liked) FROM course_score WHERE student_id = _student_id AND course_id = _course_id);
    IF scored_before > 0 THEN
		UPDATE course_score
        SET liked = _liked
        WHERE student_id = _student_id AND course_id = _course_id;
	ELSE
		INSERT INTO course_score(student_id, course_id, liked)
		VALUES(_student_id, _course_id, _liked);
	END IF;
END //
DELIMITER ;