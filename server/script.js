const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = (app, db) => {


    app.post('/api/login', async (req, res) => {
        const { username,
            password } = req.body;
        try {

            if (!(username && password)) {
                throw Error("All input is required");
            }
            const user = await db.one('select username from user_details where username = $1', [username]);
            console.log(user);
            if (user) {

                const getPassword = await db.one('select password from user_details where username= $1', [username]);
                console.log(getPassword.password);

                const comparePasswords = await bcrypt.compare(password, getPassword.password);

                console.log(comparePasswords);

                const token = await jwt.sign({ user }, `secretKey`, { expiresIn: `24h` });
                console.log(token);
                res.json({
                    status: 'success',
                    user,
                    token
                })
            }

            // let userExists = await db.many('select * from user_details where username = $1', [username]);
            // console.log(userExists);


        } catch (error) {
            res.json({
                status: error.stack,

            })
        }

    })
    app.post('/api/signUp', async (req, res) => {
        const {
            firstname,
            lastname,
            username,
            password } = req.body;
        try {
            console.log(username);
            if (!(username && password && firstname && lastname)) {
                throw Error("All input is required");
            }
            const oldUser = await db.manyOrNone('select * from user_details where username = $1', [username])
            console.log(oldUser.length === 0);

            if (oldUser.length === 0) {
                const cryptedPassword = await bcrypt.hash(password, 10)
                let insert = await db.any('INSERT INTO user_details (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)', [firstname, lastname, username, cryptedPassword]);
                console.log(insert);
                const user = await db.manyOrNone('select * from user_details where username = $1', [username])

                const token = await jwt.sign({ user }, `secretKey`, { expiresIn: `24h` });
                res.json({
                    status: 'success',
                    token
                })
            }
            else {
                throw Error("User Already Exist. Please Login");
            }


        } catch (error) {
            console.log(error.message);
            res.json({
                status: error.message,
            })

        }
    })

    app.post('/api/playlist', async (req, res) => {
        const {
            user_id,
            movie_id } = req.body
        try {

            let getUserId = await db.oneOrNone('INSERT INTO user_playlist (user_id, movie_id) VALUES ($1, $2)', [user_id, movie_id]);
            await db.oneOrNone('select movie_id from user_playlist where user_id = $1', [getUserId])
        } catch (error) {
            res.json({
                status: error.message
            })
        }
    })
}
