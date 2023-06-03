DELIMITER //
CREATE PROCEDURE sp_insert_comment
(
	IN _student_id INT,
	IN _course_id INT,
	IN _comment_content VARCHAR(255)
)
BEGIN
	INSERT INTO course_comment(student_id, course_id, comment_content)
    VALUES(_student_id, _course_id, _comment_content);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_comments
(
	IN _course_id INT
)
BEGIN
	SELECT A.id, A.comment_content, A.commented_at, B.username
    FROM course_comment A
    INNER JOIN student B
    ON A.student_id = B.id
    WHERE A.course_id = _course_id AND A.is_active = TRUE;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_delete_comment
(
	IN _id INT
)
BEGIN
	UPDATE course_comment
    SET is_active = FALSE
    WHERE id = _id;
END //
DELIMITER ;