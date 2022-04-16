'use strict'

const database = require('better-sqlite3')

const logdb = new database('data.db')

const stmt = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='dailylog';`)
let row = stmt.get()
if (row === undefined) {
    const sqlInit = `
        CREATE TABLE dailylog (name VARCHAR, password VARCHAR, data VARCHAR, lastLog INTEGER)
    `;
    logdb.exec(sqlInit)
}
module.exports = logdb