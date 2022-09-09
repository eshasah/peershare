const SQL_USER = {
    GET_USER_DETAILS: "SELECT * FROM user WHERE user_id = ?;",
    USER_REGISTER: "INSERT INTO user(f_name, l_name, email_id, city, zip_code, password) VALUES (?,?,?,?,?,?);",
};
module.exports = SQL_USER;