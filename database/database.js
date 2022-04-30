'use strict'

//Requires better-sqlite3 module for database
const database = require('better-sqlite3')

//Creates a constant to hold the database
const logdb = new database('data.db')

//This function creates the initial table to hold values
const stmt = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='dailylog';`)
let row = stmt.get()
if (row === undefined) {
    //Table holds 4 pieces of data for the user: name, password, new data entry, and date of last entry
    const sqlInit = `
        CREATE TABLE dailylog (name VARCHAR, password VARCHAR, data VARCHAR, lastLog INTEGER)
    `;
    logdb.exec(sqlInit)
}

//Exports the database so that the front and backends can access the database
module.exports = logdb