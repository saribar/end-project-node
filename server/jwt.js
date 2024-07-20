// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const mongo = require('./db');
// const { UserModel } = require('./schemas/user');
// const { db } = require('./schemas/message');

// // הגדרת סוד
// const secretKey = 'mySecretSecretKey';

// // הגדרת תביעות סטנדרטיות
// const standardClaims = {
//     sub: 'userId',
//     role: 'admin',
//     scope: ['read:users', 'write:posts'],
// };

// // פונקציה לאימות משתמש
// async function login(username, password) {
//     try {
//       const user = await UserModel.findOne({ username });
//       if (!user) {
//         throw new Error('משתמש לא נמצא');
//       }
  
//       const isValidPassword = await bcrypt.compare(password, user.password);
//       if (!isValidPassword) {
//         throw new Error('סיסמה לא חוקית');
//       }
  
//       // איחוד טענות סטנדרטיות וטענות ספציפיות למשתמש
//       const claims = {
//         sub: user.userId.toString(), // המרת מזהה המשתמש למחרוזת
//         ...standardClaims,
//         username,
//       };
  
//       const token = jwt.sign(claims, secretKey, { expiresIn: '1h' });
//       return token;
//     } catch (error) {
//       console.error(error); // רישום השגיאה לצורך ניפוי
//       throw error; // העברת השגיאה הלאה לטיפול נכון
//     }
//   }
  

// // פונקציה לאימות JWT
// async function verifyJWT(token) {
//     try {
//         const decodedToken = jwt.verify(token, secretKey);
//         const userId = decodedToken.userId;

//         const user = await collection('users').findOne({ userId: userId });

//         if (!user) {
//             throw new Error('Invalid token');
//         }

//         return user;
//     } catch (error) {
//         throw error;
//     }
// }

// module.exports = {
//     login,
//     verifyJWT,
// };

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserModel } = require('./schemas/user');
const  connectToDB  = require('./db');

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
    // await connectToDB(); // ודא חיבור ל-MongoDB

    try {
        // איתור משתמש לפי שם משתמש
        const user = await UserModel.findOne({ username });
        if (!user) {
            throw new Error('משתמש לא נמצא');
        }

        // אימות סיסמה באמצעות bcrypt
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('סיסמה לא חוקית');
        }

        // איחוד טענות סטנדרטיות וטענות ספציפיות למשתמש
        const claims = {
            sub: user.userId.toString(),
            ...standardClaims,
            username,
        };

        // יצירת JWT עם חתימה באמצעות סוד
        const token = jwt.sign(claims, secretKey, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// פונקציה לאימות JWT
async function verifyJWT(token) {
    // await connectToDB(); // ודא חיבור ל-MongoDB

    try {
        // אימות JWT באמצעות סוד
        const decodedToken = jwt.verify(token, secretKey);
        const userId = decodedToken.userId;

        // איתור משתמש לפי מזהה המשתמש מה-JWT
        const user = await UserModel.findOne({ userId: userId });
        if (!user) {
            throw new Error('Invalid token');
        }

        return user;
    } catch (error) {
        throw error;
    }
}

// פונקציה ליצירת משתמש חדש (הוספה)
async function register(username, password) {
    // await connectToDB(); // ודא חיבור ל-MongoDB

    try {
        // הצפנת סיסמה באמצעות bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // יצירת אובייקט משתמש חדש
        const newUser = new UserModel({
            username,
            password: hashedPassword,
        });

        // שמירת המשתמש במסד נתונים (MongoDB)
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
