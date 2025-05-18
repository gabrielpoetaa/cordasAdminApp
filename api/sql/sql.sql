-- Cria o banco (em PostgreSQL, criar banco é feito fora do script de tabelas)
-- CREATE DATABASE cordas_db;

DROP TABLE IF EXISTS student_course CASCADE;
DROP TABLE IF EXISTS student_teacher CASCADE;
DROP TABLE IF EXISTS teacher_course CASCADE;
DROP TABLE IF EXISTS phones CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;

CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    teacher_name VARCHAR(255)
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    course_name VARCHAR(255)
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    date_of_birth VARCHAR(255),
    cpf VARCHAR(14) UNIQUE,
    email VARCHAR(50) NOT NULL,
    previous_knowledge BOOLEAN,
    participate_projects BOOLEAN,
    music_preferences JSONB,
    how_did_you_find_us JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    id_address SERIAL PRIMARY KEY,
    id_student INT REFERENCES students(id) ON DELETE CASCADE,
    street VARCHAR(50),
    street_number VARCHAR(25),
    street_number_complement VARCHAR(15),
    neighborhood VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(25),
    country VARCHAR(25) DEFAULT 'Brasil'
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    id_student INT REFERENCES students(id) ON DELETE CASCADE,
    payment_date DATE,
    amount NUMERIC(10,2),
    method_payment VARCHAR(20) CHECK (method_payment IN ('dinheiro', 'cartao', 'boleto', 'pix')),
    month_reference DATE,
    payment_status VARCHAR(20) DEFAULT 'pendente' CHECK (payment_status IN ('pago', 'pendente', 'cancelado')),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON payments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE phones (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    phone_number VARCHAR(15)
);

CREATE TABLE student_teacher (
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    teacher_id INT REFERENCES teachers(id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, teacher_id)
);

CREATE TABLE student_course (
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, course_id)
);

CREATE TABLE teacher_course (
    teacher_id INT REFERENCES teachers(id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    PRIMARY KEY (teacher_id, course_id)
);
