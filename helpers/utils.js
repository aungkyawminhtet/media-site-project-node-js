const bcrypt = require("bcryptjs");

const fMmsg = async(res, msg = "Success", result = []) => {
    res.status(200).json({
        con: true,
        msg,
        result
    });
}

module.exports = {
    encode: password => bcrypt.hashSync(password),
    fMmsg
}