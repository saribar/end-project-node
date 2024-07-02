const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// הגדרת סוד
const secretKey = 'mySecretSecretKey';

// הגדרת תביעות סטנדרטיות
const standardClaims = {
    sub: 'userId',
    role: 'admin',
    scope: ['read:users', 'write:posts'],
};

// פונקציה לאימות משתמש
async function login(username, password) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db('yourDatabase');
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        // יצירת JWT עם תביעות סטנדרטיות ותביעות משתמש
        const userClaims = {
            ...standardClaims,
            userId: user._id,
            email: user.email,
        };

        const token = jwt.sign(userClaims, secretKey, { expiresIn: '1h' });
        return token;
    } finally {
        await mongoClient.close();
    }
}

// פונקציה לאימות JWT
async function verifyJWT(token) {
    try {
        const decodedToken = jwt.verify(token, secretKey);
        const userId = decodedToken.userId;

        const user = await mongoose.connection.db.collection('users').findOne({ _id: userId });

        if (!user) {
            throw new Error('Invalid token');
        }

        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    login,
    verifyJWT,
};

