DELIMITER //
CREATE PROCEDURE sp_insert_seen_sublevel
(
	IN _student_id INT,
    IN _course_id INT,
    IN _sublevel_id INT
)
BEGIN
	INSERT INTO seen_sublevel(student_id, course_id, sublevel_id)
    VALUES(_student_id, _course_id, _sublevel_id);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_total_and_seen_sublevels
(
	IN _student_id INT
)
BEGIN
	CREATE TEMPORARY TABLE IF NOT EXISTS total_sublevels_table AS (
		SELECT A.course_id, COUNT(A.id) AS total_sublevels
		FROM course_sublevel A
		INNER JOIN course_bought_by_student B
		ON A.course_id = B.course_id
		WHERE B.student_id = _student_id
		GROUP BY A.course_id
    );
    
    CREATE TEMPORARY TABLE IF NOT EXISTS seen_sublevels_table AS (
		SELECT A.course_id, COUNT(A.sublevel_id) - 1 AS seen_sublevels
		FROM seen_sublevel A
		INNER JOIN course_bought_by_student B
		ON A.course_id = B.course_id AND A.student_id = B.student_id
		WHERE B.student_id = _student_id
		GROUP BY A.course_id
    );
    
    CREATE TEMPORARY TABLE IF NOT EXISTS compare_sublevels_table AS (
		SELECT A.course_id, A.total_sublevels, B.seen_sublevels
        FROM total_sublevels_table A
        INNER JOIN seen_sublevels_table B
        ON A.course_id = B.course_id
    );
END //
DELIMITER ;
    
DELIMITER //
CREATE PROCEDURE sp_drop_temporary_tables()
BEGIN
	DROP TABLE total_sublevels_table;
    DROP TABLE seen_sublevels_table;
    DROP TABLE compare_sublevels_table;
END //
DELIMITER ;

/* SELECT A.course_name, B.bought_date, COUNT(B.student_id) AS bought_courses, C.total_sublevels, C.seen_sublevels, D.image, D.first_name, D.last_name
FROM (((course A
INNER JOIN course_bought_by_student B ON A.id = B.course_id)
INNER JOIN compare_sublevels_table C ON B.course_id = C.course_id)
INNER JOIN student D ON B.student_id = D.id)
WHERE B.student_id = 1
GROUP BY A.course_name, B.bought_date, B.student_id, C.total_sublevels, C.seen_sublevels, D.image, D.first_name, D.last_name; */