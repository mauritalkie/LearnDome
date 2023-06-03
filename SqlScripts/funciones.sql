DELIMITER //
CREATE FUNCTION get_course_percentege_function(likes INT, dislikes INT)
RETURNS DECIMAL(6, 2) DETERMINISTIC
BEGIN
	DECLARE total_votes INT;
    SET total_votes = likes + dislikes;
    IF total_votes = 0 THEN
		RETURN -1;
	ELSE
		RETURN (likes / total_votes) * 100;
	END IF;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION get_instructor_score_function(_instructor_id INT)
RETURNS DECIMAL(6, 2) DETERMINISTIC
BEGIN
	DECLARE total_scores INT;
    SET total_scores = (SELECT COUNT(score) FROM course WHERE instructor_id = _instructor_id);
    IF total_scores = 0 THEN
		RETURN -1;
	ELSE
		RETURN (SELECT AVG(score) FROM course WHERE instructor_id = _instructor_id);
	END IF;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION is_course_finished_function(_student_id INT, _course_id INT)
RETURNS BOOL DETERMINISTIC
BEGIN
	DECLARE counter INT;
	CALL sp_get_total_and_seen_sublevels(_student_id);
    SET counter = (SELECT COUNT(*) FROM compare_sublevels_table WHERE course_id = _course_id AND total_sublevels = seen_sublevels);
    IF counter = 0 THEN
		RETURN FALSE;
    ELSE
		CALL sp_set_completed_date(_student_id, _course_id);
		RETURN TRUE;
    END IF;
END //
DELIMITER ;