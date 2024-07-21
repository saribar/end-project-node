const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserModel } = require('../schemas/user');
const  connectToDB  = require('../db');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const standardClaims = {
    sub: 'userId',
    role: 'admin',
    scope: ['read:users', 'write:posts'],
};

async function login(username, password) {

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            throw new Error('user not found');
        }
        console.log("the user:", user);

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        const claims = {
            sub: user.userId,
            ...standardClaims,
            username,
            role: user.role,
        };

        const token = jwt.sign(claims, secretKey, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function verifyJWT(token) {
    try {
        const decodedToken = jwt.verify(token, secretKey);
        const userId = decodedToken.userId;

        const user = await UserModel.findOne({ userId: userId });
        console.log(user.username);
        if (!user) {
            throw new Error('Invalid token');
        }

        return user;
    } catch (error) {
        throw error;
    }
}

async function register(username, password, role) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        return newUser;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    login,
    verifyJWT,
    register,
};
