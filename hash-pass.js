const bcrypt = require('bcrypt');

async function hashPass(){
    const password ="12345";
    const hashedPass = await bcrypt.hash(password,10);
    console.log(hashedPass);
}
hashPass();
hashPass();
