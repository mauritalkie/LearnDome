CREATE VIEW locked_instructors_view
AS SELECT id, username, unlocked
FROM instructor;

CREATE VIEW locked_students_view
AS SELECT id, username, unlocked
FROM student;

CREATE VIEW courses_by_instructor_view
AS SELECT id, course_name, course_description, image, instructor_id
FROM course;

CREATE VIEW courses_by_search_view
AS SELECT id, course_name, course_description, image, is_active
FROM course;

CREATE VIEW courses_by_date_range_view
AS SELECT id, course_name, image, course_description, created_at, is_active
FROM course;

CREATE VIEW categories_view
AS SELECT id, category_name, is_active
FROM category;

CREATE VIEW messages_view
AS SELECT message_content, user_who_sent_id, first_user_id, second_user_id
FROM message;

CREATE VIEW levels_view
AS SELECT id, level_number, block_title, course_id
FROM course_level