CREATE DATABASE  IF NOT EXISTS peershare;
USE peershare;

CREATE TABLE IF NOT EXISTS users (
  user_id int auto_increment NOT NULL,
  user_type varchar(20) NOT NULL,
  email_id varchar(45) DEFAULT NULL,
  phone_number int DEFAULT NULL,
  f_name varchar(45) DEFAULT NULL,
  l_name varchar(45) DEFAULT NULL,
  address varchar(45) DEFAULT NULL,
  city varchar(20) DEFAULT NULL,
  state varchar(20) DEFAULT NULL,
  country varchar(10) DEFAULT NULL,
  zip_code varchar(45) DEFAULT NULL,
  eth_account varchar(50) DEFAULT NULL,
  img varchar(100) DEFAULT NULL,
  password varchar(100) DEFAULT NULL,
  created_at date NOT NULL,
  token varchar(255) NULL, 
  PRIMARY KEY (user_id)
);

alter table users auto_increment = 1000;

CREATE TABLE IF NOT EXISTS cars (
  car_id int auto_increment NOT NULL,
  make varchar(45) DEFAULT NULL,
  model varchar(45) DEFAULT NULL,
  transmission varchar(45) DEFAULT NULL,
  num_seat int DEFAULT NULL,
  registration varchar(45) DEFAULT NULL,
  user_id int NOT NULL,
  price int DEFAULT NULL,
  address varchar(45) DEFAULT NULL,
  status varchar(45) DEFAULT NULL,
  last_service datetime DEFAULT NULL,
  available_from datetime DEFAULT NULL,
  available_to datetime DEFAULT NULL,
  create_at date NOT NULL,
  PRIMARY KEY (car_id),
  FOREIGN KEY (user_id)
      REFERENCES users(user_id)
      ON UPDATE CASCADE ON DELETE RESTRICT
) ;

alter table cars auto_increment = 2000;