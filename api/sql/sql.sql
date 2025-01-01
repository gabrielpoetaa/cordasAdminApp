CREATE DATABASE IF NOT EXISTS cordas_db;
USE cordas_db;

DROP TABLE IF EXISTS students;

CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Teacher_name VARCHAR(255)
);

CREATE TABLE courses (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Course_name VARCHAR(255)
);

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Student_name VARCHAR(255) NOT NULL,
    Date_of_birth VARCHAR(255),
    CPF VARCHAR(14) UNIQUE,
    Email VARCHAR(50) NOT NULL,
    Previous_knowledge boolean,
    Participate_projects boolean,
    Music_preferences JSON,
    How_did_you_find_us JSON,
    Created_at timestamp default current_timestamp()
);

CREATE TABLE addresses (
    id_address INT AUTO_INCREMENT PRIMARY KEY, 
    id_student INT, 
    Street VARCHAR(50),
    StreetNumber VARCHAR(25),
    StreetNumberComplement VARCHAR(15),
    Neighborhood VARCHAR(50),
    City VARCHAR(50),
    State VARCHAR(25),
    Country VARCHAR(25) default "Brasil",
    FOREIGN KEY (id_student) REFERENCES students(id) ON DELETE CASCADE 
);


CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,            
    id_student INT,                             
    Payment_date DATE,                         
    Amount DECIMAL(10, 2),                        
    Method_payment ENUM('dinheiro', 'cartao', 'boleto', 'pix'), 
    Month_reference DATE,  
    Payment_status ENUM('pago', 'pendente', 'cancelado') DEFAULT 'pendente',
    description TEXT,                                
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    FOREIGN KEY (id_student) REFERENCES students(id) ON DELETE CASCADE 
);

CREATE TABLE phones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Student_id INT,                  
    Phone_number VARCHAR(15),            
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE student_teacher (
    student_id INT,
    teacher_id INT,
    PRIMARY KEY (student_id, teacher_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
);

CREATE TABLE student_course (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE teacher_course (
    teacher_id INT,
    course_id INT,
    PRIMARY KEY (teacher_id, course_id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
