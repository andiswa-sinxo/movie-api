const jwt = require('jsonwebtoken');
module.exports = (app, db) => {

app.post('/api/login', async (req, res) => {
    const { username,
        password } = req.body;

    try {
        const user = await db.oneOrNone('select * from user_details where username = $3', [username]);
        let token = await jwt.sign(user, `secretKey`, { expiresIn: `24h` });
        console.log({token, user});
        res.json({
            status: 'success',
            user,
            token
        })
    } catch (error) {
        res.json({
            status: 'error',

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
        await db.oneOrNone('INSERT INTO user_details (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)', [firstname, lastname, username, password]);
        res.json({
            status: 'success',
        })

    } catch (error) {
        console.log(error)
        res.json({
            status: error,
        })

    }
})

app.post('/playlist', async (req, res) => {
    try {
        await db.oneOrNone('select ')
    } catch (error) {

    }
})
}
