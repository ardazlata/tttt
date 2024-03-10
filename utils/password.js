const bcrypt=require("bcryptjs");
exports.createPassword = async (pass)=>{
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(pass,salt);
    return password
}
exports.checkPassword = async (loggedPassword,hashedPassword)=>{
    const isPassword =  bcrypt.compare(loggedPassword,hashedPassword);
    return isPassword;
}