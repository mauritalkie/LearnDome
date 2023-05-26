USE learn_dome;

CREATE VIEW get_administrator_username_view
AS SELECT id, username FROM administrator;

CREATE VIEW get_administrator_email_view
AS SELECT email FROM administrator;

CREATE VIEW login_administrator_view
AS SELECT id, username, user_password, id_for_message
FROM administrator;

CREATE VIEW get_instructor_username_view
AS SELECT id, username, unlocked FROM instructor;

CREATE VIEW get_instructor_email_view
AS SELECT email FROM instructor;

CREATE VIEW login_instructor_view
AS SELECT id, username, user_password, unlocked, id_for_message
FROM instructor;

CREATE VIEW get_student_username_view
AS SELECT id, username, unlocked FROM student;

CREATE VIEW get_student_email_view
AS SELECT email FROM student;

CREATE VIEW login_student_view
AS SELECT id, username, user_password, unlocked, id_for_message
FROM student;