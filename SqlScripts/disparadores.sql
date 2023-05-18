USE learn_dome;

DELIMITER //
CREATE TRIGGER update_course_score_trigger
AFTER INSERT ON course_score FOR EACH ROW
BEGIN
	DECLARE likes, dislikes INT;
    SET likes = (SELECT COUNT(liked) FROM course_score WHERE course_id = NEW.course_id AND liked = TRUE);
    SET dislikes = (SELECT COUNT(liked) FROM course_score WHERE course_id = NEW.course_id AND liked = FALSE);
	UPDATE course SET score = get_course_percentege_function(likes, dislikes) WHERE id = NEW.course_id;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_instructor_score_trigger
AFTER UPDATE ON course FOR EACH ROW
BEGIN
	UPDATE instructor SET score = get_instructor_score_function(NEW.instructor_id);
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_kardex_trigger
AFTER INSERT ON course_bought_by_student FOR EACH ROW
BEGIN
	INSERT INTO seen_sublevel(student_id, course_id, sublevel_id) VALUES(NEW.student_id, NEW.course_id, 0);
END //
DELIMITER ;