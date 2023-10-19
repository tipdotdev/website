const mysql = require('mysql2')
require('dotenv').config(
    {
        path: '../.env'
    }
)

const connect = () => {
    const db = mysql.createConnection(process.env.DATABASE_URL)

    db.connect((err) => {
        if (err) {
            console.log('Error connecting to Db')
            return
        }
        console.log('Connection established')
        return db
    })
}

module.exports = connect