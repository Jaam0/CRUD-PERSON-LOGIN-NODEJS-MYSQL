-- Creating  the database
CREATE DATABASE crud_person_login;

-- Using the database
USE crud_person_login;

-- Creating table person
CREATE TABLE tbl_person
(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(60) NULL,
    last_name VARCHAR(60) NULL,
    gender CHAR(1) NULL,
    age INT(2) NULL,
    nationality VARCHAR(100) NULL,
    status CHAR(1) DEFAULT 'A'
);

-- Creating table login
CREATE TABLE tbl_login
(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(500) NOT NULL,
    status CHAR(1)
);

-- Creating store procedure insert,update or delete row from person
DELIMITER $$
CREATE PROCEDURE prc_iud_person (
IN p_type_procedure CHAR(1),
IN p_id INT(11),
IN p_first_name VARCHAR(60),
IN p_last_name VARCHAR(60),
IN p_gender CHAR(1),
IN p_age INT(3),
IN p_nationality VARCHAR(100),
IN p_status CHAR(1)
)
BEGIN

    IF p_type_procedure = 'I' THEN
        INSERT 
            INTO tbl_person (id,first_name,last_name,gender,age,nationatily,status) 
			VALUES (null,UPPER(p_first_name),UPPER(p_last_name),UPPER(p_gender),p_age,UPPER(p_nationality),UPPER(p_status));
        COMMIT;
    ELSEIF p_type_procedure = 'U' THEN
        UPDATE tbl_person SET first_name = UPPER(p_first_name), last_name = UPPER(p_last_name), gender = UPPER(p_gender),
                              age = p_age, nationality = UPPER(p_nationality), status = UPPER(p_status)
        WHERE id = p_id;
        COMMIT;
    ELSEIF p_type_procedure = 'D' THEN
        DELETE FROM  tbl_person 
        WHERE id = p_id;
        COMMIT;
    END IF;
END$$
DELIMITER ;

-- Creating store procedure insert,update or delete row from login
DELIMITER $$
CREATE PROCEDURE prc_iud_login (
IN p_type_procedure CHAR(1),
IN p_id INT(11),
IN p_email VARCHAR(60),
IN p_password VARCHAR(500),
IN p_status CHAR(1)
)
BEGIN

    IF p_type_procedure = 'I' THEN
        INSERT 
            INTO tbl_login (id,email,password,status) 
			VALUES (null,p_email,p_password,UPPER(p_status));
        COMMIT;
    ELSEIF p_type_procedure = 'U' THEN
        UPDATE tbl_login SET email = p_email, password = p_password, status = UPPER(p_status)
        WHERE id = p_id;
        COMMIT;
    ELSEIF p_type_procedure = 'D' THEN
        DELETE FROM  tbl_login 
        WHERE id = p_id;
        COMMIT;
    END IF;
END$$
DELIMITER ;