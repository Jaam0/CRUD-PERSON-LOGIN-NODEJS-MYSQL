
const firstLetterUpper = (myString) => {
        const firstChar = myString.charAt(0).toUpperCase();
        const otherChars = myString.substring(1, myString.length);
    return firstChar.concat(otherChars);
}

module.exports = {
    firstLetterUpper
};


const bcrypt = require('bcryptjs');

// const myFunctions = {};

// myFunctions.encryptPassword = async (password) =>{
//   const salt = await bcrypt.genSaltSync(10);
//    const newPassword = await bcrypt.hash(password, salt);
//     return newPassword;
// };

// myFunctions.comparePassword = async (password,savePassword) =>{
//     try {
//        return await bcrypt.compare(password,savePassword);
         
//     } catch (e) {
//         console.error(e);
//     }
// };

// module.exports = myFunctions;