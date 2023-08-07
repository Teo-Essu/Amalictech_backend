const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, email, pwd } = req.body;
    if (!user || !email || !pwd) return res.status(400).json({ 'message': 'Username, email and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.status(409).json({'message':'User already exists'}); //Conflict 
    //check for duplicate email in db
    const emailDupe = await User.findOne({email: email}).exec();
    if (emailDupe) return res.status(409).json({'message':'Email already exists'});

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await User.create({
            "username": user,
            "email": email,
            "password": hashedPwd
        });

        console.log(result);
        console.log(result.id);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };