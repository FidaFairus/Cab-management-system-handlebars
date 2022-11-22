const db = require('./db');

function getAll(callback) {

    const sql = "SELECT id, FULLNAME,PHONE_NUMBER,EMIAL,USERNAME,PASSWORD FROM SIGNUP";

    db.executeQuery(sql, [], callback);

}

function addOne(FULLNAME, MOBILE_NUMBER,EMAIL,USERNAME, PASSWORD,CONFIRM_PASSWORD, callback) {

    const sql = "INSERT INTO SIGNUP (FULLNAME, MOBILE_NUMBER,EMAIL,USERNAME, PASSWORD,CONFIRM_PASSWORD) VALUES( ?, ?, ?, ?, ?, ?)"

    db.executeQuery(sql, [FULLNAME, MOBILE_NUMBER,EMAIL,USERNAME, PASSWORD,CONFIRM_PASSWORD], callback);
}

function updateOne(MOBILE_NUMBER,PASSWORD,CONFIRM_PASSWORD,EMAIL,callback) {
    const sql = "UPDATE SIGNUP SET PHONE_NUMBER = ?,PASSWORD=?,CONFIRM_PASSWORD WHERE EMAIL = ?"

    db.executeQuery(sql, [MOBILE_NUMBER, PASSWORD, CONFIRM_PASSWORD,EMAIL], callback);

}

function findOne(EMAIL, callback) {
    const sql = "SELECT id from users WHERE EMAIL = ?"

    db.executeQuery(sql, EMAIL, callback);

}

module.exports.addOne = addOne;
module.exports.getAll = getAll;
module.exports.updateOne = updateOne;
module.exports.findOne = findOne;
