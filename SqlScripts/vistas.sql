USE learn_dome;

CREATE VIEW get_administrator_username_view
AS SELECT username FROM administrator;

CREATE VIEW get_administrator_email_view
AS SELECT email FROM administrator;

CREATE VIEW login_administrator_view
AS SELECT username, user_password
FROM administrator;

CREATE VIEW get_instructor_username_view
AS SELECT username FROM instructor;

CREATE VIEW get_instructor_email_view
AS SELECT email FROM instructor;

CREATE VIEW login_instructor_view
AS SELECT username, user_password
FROM instructor;

CREATE VIEW get_student_username_view
AS SELECT username FROM student;

CREATE VIEW get_student_email_view
AS SELECT email FROM student;

CREATE VIEW login_student_view
AS SELECT username, user_password
FROM student;