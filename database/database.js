'use strict'

const database = require('better=sqlite3')

const logdb = new database('log.db')

const stmt = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='dailylog';`)
let row = stmt.get()
if (row === undefined) {
    const sqlInit = `
        CREATE TABLE dailylog (
            username VARCHAR,
            password VARCHAR,
            name VARCHAR,
            entry VARCHAR
        );
    `

    logdb.exec(sqlInit)
}

module.exports = logdb