const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const fMmsg = async(res, msg = "Success", result = []) => {
    res.status(200).json({
        con: true,
        msg,
        result
    });
}

module.exports = {
    encode: password => bcrypt.hashSync(password),
    comparepass: (plain, hash) => bcrypt.compareSync(plain, hash),
    maketoken : payload => jwt.sign(payload, process.env.SECRECT_KEY, {expiresIn: "1h"}),
    fMmsg
}